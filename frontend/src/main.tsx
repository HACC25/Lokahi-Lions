import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext.tsx";
import HomePage from './pages/LandingPage.tsx'
import ResultsPathway from './pages/Results.tsx'
import SignupForm from './pages/Signup.tsx'
import LoginForm from './pages/Login.tsx'
import ProfilePage from './pages/page-profile.tsx';
import SignIn from './pages/page-signin.tsx';
import SignUp from './pages/page-signup.tsx';
import SignOutModal from './pages/page-signout.tsx';

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
          <Route path="/pathway" 
            element={
            <ProtectedRoute>
              <ResultsPathway />
            </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
