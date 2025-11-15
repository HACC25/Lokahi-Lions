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
@api_bp.route('/signup', methods=['POST'])
def signup():
    if not request.is_json:
        return jsonify({"message": "Request must be JSON"}), 400
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if email in database already exists
    response = (
        supabase.table("profiles")
        .select("email")
        .is_("email", email)
        .execute()
    )
    if response.data:
        return jsonify({"message": "A profile with this email already exists"}), 400
    
    # TODO Hash password and insert new user into database
    hashed_password = password 
    response = (
        supabase.table("profiles")
        .insert({"email": email, "password": password, "student_status": "null", "attending_campus": "null"})
        .execute()
    )
    return jsonify({"message": "User created successfully"}), 201

# User login route
@api_bp.route('/login', methods=['POST'])
def login():
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
        .is_("email", email)
        .is_("password", hashed_password)
        .execute()
    )
    if response.data:
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"message": "Invalid credentials"}), 401
    