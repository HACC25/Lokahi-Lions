from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from backend.database import db
from backend.populate_db import populate
from backend.apps.routes.api_routes import api_bp
from backend.models.course import Course
from backend.models.profile import Profile

def create_app():
    app = Flask(__name__)

    # Configuration for database of users
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///default.db"
    app.config['SQLALCHEMY_BINDS'] = {
        'profiles' : 'sqlite:///profiles.db',
        'courses' : 'sqlite:///courses.db'
    }
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    app.register_blueprint(api_bp)
    CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://localhost:5000", "http://127.0.0.1:5000", "http://127.0.0.1:5173"]}})
    with app.app_context():
        db.create_all()
        db.create_all(bind_key=['profiles', 'courses'])  # Create database tables
        populate()  # Populate the database with initial data
        print("- Database tables created and populated. -")
        test_select = db.session.scalars(db.select(Course).where(Course.course_prefix == "ICS", Course.course_number == "311")).first()
        print("Test select result:", test_select)


    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)