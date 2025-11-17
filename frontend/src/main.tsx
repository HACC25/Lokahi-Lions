import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./auth/AuthContext.tsx";
import HomePage from './pages/LandingPage.tsx'
import ResultsPathway from './pages/Results.tsx'
import SignupForm from './pages/Signup.tsx'
import LoginForm from './pages/Login.tsx'

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
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/pathway" element={<ResultsPathway />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
