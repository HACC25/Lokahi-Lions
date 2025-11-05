from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from backend.database import db
from backend.apps.routes.api_routes import api_bp

def create_app():
    app = Flask(__name__)

    # Configuration for database of users
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'

    db.init_app(app)

    app.register_blueprint(api_bp)
    CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://localhost:5000", "http://127.0.0.1:5000", "http://127.0.0.1:5173"]}})
    with app.app_context():
        db.create_all()  # Create database tables

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)