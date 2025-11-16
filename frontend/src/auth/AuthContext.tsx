import { createContext, useContext, useState } from "react";
import { loginUser } from "../services/api";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email: string, password: string) => {
    // API call to login user
    const response = await loginUser(email, password);
    const success = response.loginAttempt === "success";
    if (success) setIsLoggedIn(true);
    return success;
  };

  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}