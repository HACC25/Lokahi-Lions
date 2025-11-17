import { useState } from "react";
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
    <div className="min-h-screen text-slate-900 relative overflow-hidden bg-gradient-to-br from-[#e9fbf2] via-[#f0fff5] to-[#f7fff9]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-16 left-10 w-72 h-72 bg-emerald-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-lime-200 rounded-full blur-3xl opacity-35 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '140px 140px'
          }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-16">
        <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-500"
            >
              <span className="text-xs uppercase tracking-[0.35em] text-emerald-500">UH Pathfinder</span>
            </button>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Welcome back to your UH journey
            </h1>
            <p className="text-lg text-slate-600">
              Sign in to continue exploring curated pathways, saved careers, and your AI-generated action plans. Your progress syncs across every device.
            </p>
            <div className="grid gap-4">
              {[
                'Resume saved pathways and action plans.',
                'Chat with the AI advisor without losing context.',
                'Sync interests and notes with upcoming advising sessions.'
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></span>
                  <p className="text-sm text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-emerald-100 rounded-3xl shadow-xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold">Sign in</p>
              <h2 className="text-2xl font-bold text-slate-900">Access your dashboard</h2>
              <p className="text-sm text-slate-500">Use your UH Pathfinder credentials to continue.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-100 bg-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 text-slate-900 placeholder:text-slate-400"
                  placeholder="user@email.com"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-100 bg-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 text-slate-900 placeholder:text-slate-400"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-400 text-white font-semibold shadow-lg shadow-emerald-200 hover:scale-[1.01] transition-transform"
              >
                Continue
              </button>
            </form>

            {message && (
              <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-2">
                {message}
              </p>
            )}

            <div className="text-sm text-center text-slate-600">
              Don’t have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-emerald-600 font-semibold hover:text-emerald-500"
              >
                Create one
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
