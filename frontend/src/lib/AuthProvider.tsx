import { AuthContext } from "@/store/auth-context";
import { useRef, useState, type ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const isLogoutRef = useRef(false);

  const login = (id: string, password: string) => {
    if (id === "kwon" && password === "123") {
      isLogoutRef.current = false;
      setIsAuth(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    isLogoutRef.current = true;
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, isLogoutRef }}>
      {children}
    </AuthContext.Provider>
  );
}
