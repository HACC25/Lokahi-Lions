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
    CORS(app, resources={r"/*": {"origins": ["https://uh-pathfinder.vercel.app", "https://uh-pathfinder-lokahi-lions.vercel.app"]}}, supports_credentials=True)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)