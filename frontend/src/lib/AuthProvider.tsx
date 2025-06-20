import { basicAuth } from "@/api/auth";
import { AuthContext } from "@/store/auth-context";
import { useEffect, useRef, useState, type ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isLogoutRef = useRef(false);

  const login = async (id: string, password: string) => {
    const baToken = "Basic " + window.btoa(id + ":" + password);
    const res = await basicAuth(baToken);
    if (res.status === 200) {
      isLogoutRef.current = false;
      setUsername(id);
      setIsAuth(true);
      localStorage.setItem("accessToken", baToken);
      localStorage.setItem("user", id);
      return true;
    }
    setIsAuth(false);
    setUsername(null);
    return false;
  };

  const logout = () => {
    isLogoutRef.current = true;
    setIsAuth(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");
      if (token && user) {
        const res = await basicAuth(token);
        if (res.status === 200) {
          setIsAuth(true);
          setUsername(user);
        } else {
          setIsAuth(false);
          setUsername(null);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuth, username, login, logout, isLogoutRef, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
