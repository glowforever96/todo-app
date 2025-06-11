import LoginPage from "./pages/login/index.tsx";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router";
import NotFoundPage from "./pages/404/index.tsx";
import PageLayout from "./components/layout/page-layout.tsx";
import TodoPage from "./pages/todos/index.tsx";
import AuthProvider from "./lib/AuthProvider.tsx";
import { useAuth } from "./store/auth-context.ts";
import { Toaster } from "./components/ui/sonner.tsx";
import { toast } from "sonner";

const AuthRoute = () => {
  const { isAuth, isLogoutRef } = useAuth();
  if (!isAuth) {
    if (!isLogoutRef.current) {
      toast.warning("로그인이 필요합니다.");
    } else {
      isLogoutRef.current = false;
    }
  }
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "login", element: <LoginPage /> },
      {
        element: <AuthRoute />,
        children: [{ path: "todos", element: <TodoPage /> }],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors expand={false} />
    </AuthProvider>
  );
}

export default App;
