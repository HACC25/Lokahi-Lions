import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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
      {showWelcome && (
        <div className="absolute inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowWelcome(false)}></div>
          <div className="relative bg-white border border-emerald-100 rounded-3xl shadow-2xl max-w-md w-full p-8 space-y-4 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold">Welcome</p>
            <h3 className="text-2xl font-bold text-slate-900">Sign in to continue</h3>
            <p className="text-sm text-slate-600">
              Use your UH Pathfinder credentials to pick up where you left off. Need an account? Click “Sign up.”
            </p>
            <Button
              onClick={() => setShowWelcome(false)}
              className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-400 text-white font-semibold shadow-emerald-200 shadow-lg"
            >
              Got it
            </Button>
          </div>
        </div>
      )}
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
              Welcome back!
            </h1>
            <p className="text-lg text-slate-600">
              Sign in to continue exploring curated pathways, saved careers, and your AI-generated action plans.
            </p>
            <div className="grid gap-4">
              {[
                'Resume saved pathways and action plans.',
                'Continue to use the AI assistant for quick questions.',
                'Use your saved interests and notes to plan your next steps.'
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-slate-700 mb-1 block">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-2xl border border-emerald-100 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-100 focus-visible:border-emerald-400"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700 mb-1 block">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-2xl border border-emerald-100 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-100 focus-visible:border-emerald-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-400 text-white font-semibold shadow-lg shadow-emerald-200 hover:scale-[1.01] transition-transform"
              >
                Continue
              </Button>
              {message && (
                <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-2">
                  {message}
                </p>
              )}
            </form>

            <p className="text-sm text-center text-slate-600">
              Don't have an account?{" "}
              <button 
                onClick={() => navigate("/signup")}
                className="text-emerald-600 font-semibold hover:text-emerald-500"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
