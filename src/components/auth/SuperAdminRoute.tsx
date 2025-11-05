import { Navigate } from "react-router";
import { ReactNode, useEffect, useState } from "react";
import { getValidToken } from "../../utils/tokenUtils";

const API_BASE_URL = import.meta.env.VITE_WEBSITE_URL || 'https://webnotics-chatbot.onrender.com';

interface SuperAdminRouteProps {
  children: ReactNode;
}

export default function SuperAdminRoute({ children }: SuperAdminRouteProps) {
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = getValidToken();
    
    if (!token) {
      setIsSuperAdmin(false);
      setLoading(false);
      return;
    }

    // Fetch user profile to check subscription_type
    fetch(`${API_BASE_URL}/accounts/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data && data.subscription_type === 'superadmin') {
          setIsSuperAdmin(true);
        } else {
          setIsSuperAdmin(false);
        }
      })
      .catch(() => {
        setIsSuperAdmin(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!isSuperAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}



