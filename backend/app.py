import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import text
from flask_sqlalchemy import SQLAlchemy
from backend.database import db
from backend.apps.routes.api_routes import api_bp

load_dotenv()

def create_app():
    app = Flask(__name__)

    app.register_blueprint(api_bp)
    CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://localhost:5000", "http://127.0.0.1:5000", "http://127.0.0.1:5173"]}})

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)