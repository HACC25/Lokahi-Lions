import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Button } from "../components/ui/button";

export default function SignOutPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="h-screen text-slate-900 relative overflow-hidden bg-gradient-to-br from-[#e9fbf2] via-[#f0fff5] to-[#f7fff9] flex items-center justify-center px-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-16 left-8 w-64 h-64 bg-emerald-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-24 right-16 w-80 h-80 bg-lime-200 rounded-full blur-3xl opacity-35 animate-pulse" style={{ animationDelay: "0.8s" }}></div>
      </div>
      <div className="relative z-10 max-w-lg w-full bg-white/95 backdrop-blur-xl border border-emerald-100 rounded-3xl shadow-2xl p-10 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-emerald-100 rounded-full bg-white/80 text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold">
          <span>UH Pathfinder</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">You’re signed out</h1>
        <p className="text-sm text-slate-600">
          Mahalo for exploring UH Pathfinder. When you’re ready to continue mapping your journey, sign back in and your saved interests will be waiting.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Button
            onClick={() => navigate("/login")}
            className="rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-400 text-white shadow-emerald-200 shadow-lg hover:shadow-xl"
          >
            Sign in again
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="rounded-2xl border border-emerald-100 text-emerald-700 hover:bg-emerald-50"
          >
            Return home
          </Button>
        </div>
      </div>
    </div>
  );
}
