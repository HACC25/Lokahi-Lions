import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./auth/AuthContext.tsx";
import { ProtectedRoute } from "./auth/ProtectedRoute.tsx";
import HomePage from './pages/LandingPage.tsx'
import ResultsPathway from './pages/Results.tsx'
import SignupForm from './pages/Signup.tsx'
import LoginForm from './pages/Login.tsx'
import SignIn from './pages/page-signin.tsx'
import SignUp from './pages/page-signup.tsx'
import ProfilePage from './pages/page-profile.tsx';
import './styles/input.css';
import React from 'react';

let isLoggedIn: boolean = false;
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/profile" element={
              // <ProtectedRoute>
                <ProfilePage />
              // </ProtectedRoute>
            } 
          />
          <Route path="/pathway" 
            element={
            // <ProtectedRoute>
              <ResultsPathway />
            // </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
