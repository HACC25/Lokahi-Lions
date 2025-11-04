import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SignupForm from './pages/Signup.jsx'
import LoginForm from './pages/Login.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <SignupForm />
    <LoginForm />
  </StrictMode>,
)
