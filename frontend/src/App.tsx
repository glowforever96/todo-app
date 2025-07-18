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
import TodoDetailPage from "./pages/todoDetail/index.tsx";
import TodoNewPage from "./pages/todoNew/index.tsx";

const AuthRoute = () => {
  const { isAuth, isLogoutRef, isLoading } = useAuth();
  if (isLoading) return null;

  if (!isAuth) {
    if (!isLogoutRef.current) {
      toast.warning("로그인이 필요합니다.");
    } else {
      isLogoutRef.current = false;
    }
  }
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

const LoginRoute = () => {
  const { isAuth, isLoading } = useAuth();
  if (isLoading) return null;

  return isAuth ? <Navigate to="/todos" replace /> : <LoginPage />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      { index: true, element: <LoginRoute /> },
      { path: "login", element: <LoginRoute /> },
      {
        element: <AuthRoute />,
        children: [
          { path: "todos", element: <TodoPage /> },
          { path: "todos/new", element: <TodoNewPage /> },
          { path: "todos/:id", element: <TodoDetailPage /> },
        ],
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
