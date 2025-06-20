import { jwtAuth } from "@/api/auth";
import { AuthContext } from "@/store/auth-context";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { parseJwt } from "./parseJwt";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isLogoutRef = useRef(false);

  const login = async (id: string, password: string) => {
    const res = await jwtAuth(id, password);
    if (res.status === 200) {
      isLogoutRef.current = false;
      setUsername(id);
      setIsAuth(true);
      const jwt = `Bearer ${res.data.token}`;
      localStorage.setItem("accessToken", jwt);

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
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const payload = parseJwt(token);
      setUsername(payload.sub);
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuth, username, login, logout, isLogoutRef, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
