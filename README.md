Project Description

# Installation
Ensure you have Python v3.11.9 or higher installed. You will need a working Gemini API key. Clone the repository and navigate to its directory. 

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
Create a `.env` file in the root directory with your environment variables.
```
FLASK_APP=backend.app:create_app
FLASK_ENV=development
REACT_APP_API_URL=http://localhost:5173
GEMINI_API_KEY=your_actual_api_key_here
DATABASE_URL=your_postgres_database_url_here
```
Databases are automatically created and populated when run and are located in the `instance` directory. 

## Frontend Setup
Navigate into the `frontend` directory and install dependencies.
```
cd frontend
npm install
```

## Access the App
After setting up the backend and frontend, go to the root directory and install `concurrently` then run `npm run app` to start both parts together.
```
npm install -g concurrently
npm run app
```

You can also run each part individually if you prefer.
*To test the backend independent from the frontend, run the Flask server (defaults at http://localhost:5000)*
```
flask run   # Alternatively: venv\Scripts\flask run
```
*To test the frontend independent from the backend, navigate to the `frontend` directory and run the Vite server (defaults at http://localhost:5173)*
```
cd frontend
npm run dev
```

