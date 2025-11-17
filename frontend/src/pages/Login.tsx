import { useState } from "react";
import '../styles/input.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import React from "react";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Redirect to pathway upon successful login
    const success = await login(email, password);
    if (success) {
      navigate("/pathway", { replace: true })
    } else {
      setMessage("Invalid email or password");
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-100">Login</button>
      </form>
      {message && <p className="mt-3 text-muted">{message}</p>}
    </div>
  );
}