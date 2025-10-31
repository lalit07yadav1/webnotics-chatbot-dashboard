import { Navigate } from "react-router";
import { ReactNode } from "react";

interface AuthRouteProps {
  children: ReactNode;
}

export default function AuthRoute({ children }: AuthRouteProps) {
  const token = localStorage.getItem("auth_token");
  
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

