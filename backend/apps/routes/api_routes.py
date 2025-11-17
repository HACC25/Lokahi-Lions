from flask import Blueprint, request, jsonify
from dotenv import load_dotenv
from supabase import create_client, Client
import os
import json
import time
from google.genai import Client as GeminiClient
from backend.apps.services.pathways import generate_educational_paths


# Load environment variables from .env
load_dotenv()

# Fetch variables
USER = os.getenv("user")
PASSWORD = os.getenv("password")
HOST = os.getenv("host")
PORT = os.getenv("port")
DBNAME = os.getenv("dbname")

# Connect to supabase database
DATABASE_URL: str = os.getenv("DATABASE_URL")
#DATABASE_URL = f"postgres://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}"

# Publishable supabase key
SUPABASE_KEY: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(DATABASE_URL, SUPABASE_KEY)

# Gemini setup
client = GeminiClient(api_key=os.getenv("GEMINI_API_KEY"))

api_bp = Blueprint('api', __name__, url_prefix='/api')  

# User signup route
@api_bp.route('/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == "OPTIONS":
        # Preflight request success response
        return "", 200
    if not request.is_json:
        return jsonify({"message": "Request must be JSON"}), 400
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if email in database already exists
    response = (
        supabase.table("profiles")
        .select("email")
        .eq("email", email)
        .maybe_single()
        .execute()
    )
    if response is not None and response.data is not None:
        return jsonify({"message": "A profile with this email already exists"}), 400
    
    # TODO Hash password and insert new user into database
    hashed_password = password 
    response = (
        supabase.table("profiles")
        .insert({"email": email, "password": password, "student_status": "freshmen", "attending_campus": "manoa"})
        .execute()
    )
    return jsonify({"message": "User created successfully"}), 201

# User login route
@api_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == "OPTIONS":
        # Preflight request success response
        return "", 200
    if not request.is_json:
        return jsonify({"message": "Request must be JSON"}), 400
    
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    hashed_password = password

    # Check database for user with matching email and password
    response = (
        supabase.table("profiles")
        .select("email", "password")
        .eq("email", email)
        .eq("password", hashed_password)
        .maybe_single()
        .execute()
    )
    if response is not None and response.data is not None:
        return jsonify({"message": "Login successful", "loginAttempt": "success"}), 200
    return jsonify({"message": "Invalid credentials", "loginAttempt": "fail"}), 401

# AI-generated educational pathways route
@api_bp.route("/ai-paths", methods=["POST"])
def ai_paths():
    data = request.json

    email = data.get("email")
    interests = data.get("interests", [])

    if not email:
        return jsonify({"error": "No email provided"}), 400
    if not interests:
        return jsonify({"error": "No interests provided"}), 400

    #Check if stored already
    existing = (
        supabase.table("profiles")
        .select("*")
        .eq("email", email)
        .maybe_single()
        .execute()
    )

    if existing.data:
        print("Returning cached pathways from Supabase.")
        return jsonify(existing.data["ai_response"])

    # Generate new ones if none exist
    print("No stored pathways, generating new ones...")
    paths = generate_educational_paths(interests, email, max_paths=3)

    if not paths:
        return jsonify({"error": "AI failed to generate paths"}), 500

    return jsonify(paths)
