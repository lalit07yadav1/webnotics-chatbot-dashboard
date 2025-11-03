import { Navigate } from "react-router";
import { ReactNode } from "react";
import { getValidToken } from "../../utils/tokenUtils";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = getValidToken();
  
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  
  return <>{children}</>;
}


