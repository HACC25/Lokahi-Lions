import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from backend.database import db
from apps.routes.api_routes import api_bp

load_dotenv()

def create_app():
    app = Flask(__name__)

    @app.route("/_db_check")
    def db_check():
        try:
            db.session.execute("SELECT 1").scalar()
            return {"ok": True}, 200
        except Exception as e:
            return {"ok": False, "error": str(e)}, 500

    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise SystemExit("DATABASE_URL not found. Set it in your environment or .env file.")

    # Configuration for database
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Optional engine options to avoid too many connections
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        "pool_size": int(os.getenv("DB_POOL_SIZE", 5)),
        "max_overflow": int(os.getenv("DB_MAX_OVERFLOW", 10)),
    }

    db.init_app(app)

    app.register_blueprint(api_bp)
    CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://localhost:5000", "http://127.0.0.1:5000", "http://127.0.0.1:5173"]}})
    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)