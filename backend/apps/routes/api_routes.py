from flask import Blueprint, request, jsonify
from backend.database import db
import time

api_bp = Blueprint('api', __name__, url_prefix='/api')

# Example route to test API
@api_bp.route('/hello')
def hello():
    return jsonify({"message": "API test!"})

@api_bp.route('/time')
def get_current_time():
    return {"time": time.time()}

# User signup route
@api_bp.route('/signup', methods=['POST'])
def signup():
    if not request.is_json:
        return jsonify({"message": "Request must be JSON"}), 400
    '''
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if Profile.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists"}), 400
    # TODO Hash password before storing
    new_profile = Profile(email=email, password=password)
    try:
        db.session.add(new_profile)
        db.session.commit()
        return jsonify({"message": "Signup successful"}), 201
    except Exception as e:
        print(f"ERROR: {e}")
        db.session.rollback()
        return jsonify({"message": "Error creating user"}), 500
    '''

# User login route
@api_bp.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"message": "Request must be JSON"}), 400
    '''
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    profile = Profile.query.filter_by(email=email).first()
    if profile and profile.password == password:
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"message": "Invalid credentials"}), 401
    '''