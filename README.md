Project Description

# Installation
Clone the repository and navigate to its directory. 

## Backend Setup
Navigate into the `backend` directory. Create and activate a virtual environment.
```
cd backend
python3 -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```
Install dependencies
```
pip install -r requirements.txt
```
Create a `.env` file with your environment variables.
```
FLASK_APP=app.py
FLASK_ENV=development
```

## Frontend Setup
Navigate into the `frontend` directory and install dependencies.
```
cd frontend
npm install
```

## Access the App
After setting up the backend and frontend, install `concurrently` and run `npm run app` to start both parts together.
```
npm install -g concurrently
npm run app
```

You can also run each part individually if you prefer.
*To test the backend independent from the frontend, navigate to the `backend` directory and run the Flask server (defaults at http://localhost:5000)*
```
cd backend
flask run   # Alternatively: venv\Scripts\flask run
```
*To test the frontend independent from the backend, navigate to the `frontend` directory and run the Vite server (defaults at http://localhost:5173)*
```
cd frontend
npm run dev
```

