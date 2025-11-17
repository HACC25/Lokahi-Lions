from flask import Blueprint, request, jsonify
from dotenv import load_dotenv
from supabase import create_client, Client
import os
import time

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
    
@api_bp.route('/chatbot', methods=['POST', 'OPTIONS'])
def chatbot():
    if request.method == "OPTIONS":
        # Preflight request success response
        return "", 200
    if not request.is_json:
        return jsonify({"message": "Request must be JSON"}), 400
    
    data = request.get_json()
    prompt = data.get('prompt')
    interests = data.get('interests')

    from backend.apps.services.chatbot import chat

    try:
        response = chat(prompt, interests)
        return jsonify({"career_suggestion": response}), 200
    except Exception as e:
        return jsonify({"message": f"Error generating career suggestion: {e}"}), 500