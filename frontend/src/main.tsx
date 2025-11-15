import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/input.css'
import { ProtectedRoute } from "./auth/ProtectedRoute";
import HomePage from './pages/LandingPage.tsx'
import ResultsPathway from './pages/Results.tsx'
import SignupForm from './pages/Signup.jsx'
import LoginForm from './pages/Login.jsx'

const isLoggedIn: boolean = false;

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/pathway" 
          element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <ResultsPathway />
          </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
