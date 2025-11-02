from flask import Flask, jsonify, request
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)  # allow requests from React

@app.route('/api/hello')
def hello():
    return jsonify({"message": "API test!"})

@app.route('/api/time')
def get_current_time():
    return {"time": time.time()}

if __name__ == '__main__':
    app.run(debug=True)