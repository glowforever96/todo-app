import { createContext, useContext, type RefObject } from "react";

export type AuthContextType = {
  isAuth: boolean;
  username: string | null;
  login: (id: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLogoutRef: RefObject<boolean>;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
