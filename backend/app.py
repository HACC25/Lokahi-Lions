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

    CORS(app, 
         resources={r"/api/*": {"origins": [
             "http://localhost:5173",  # Local development
             "http://localhost:3000",
             "https://uh-pathfinder.vercel.app",
             "https://uh-pathfinder-lokahi-lions.vercel.app",
             "https://uh-pathfinder-git-chatbot1-lokahi-lions.vercel.app"
         ]}},
         supports_credentials=True,
         allow_headers=["Content-Type", "Authorization"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
         expose_headers=["Content-Type"]
    )
    app.register_blueprint(api_bp)
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)