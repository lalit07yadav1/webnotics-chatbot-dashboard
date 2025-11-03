import { Navigate } from "react-router";
import { ReactNode } from "react";
import { getValidToken } from "../../utils/tokenUtils";

interface AuthRouteProps {
  children: ReactNode;
}

export default function AuthRoute({ children }: AuthRouteProps) {
  const token = getValidToken();
  
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}


