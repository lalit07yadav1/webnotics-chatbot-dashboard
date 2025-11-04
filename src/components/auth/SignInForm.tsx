import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

const API_BASE_URL = import.meta.env.VITE_WEBSITE_URL || 'https://webnotics-chatbot.onrender.com';

function tokenExists(): boolean {
  try {
    return Boolean(localStorage.getItem("auth_token"));
  } catch {
    return false;
  }
}

export default function SignInForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="flex flex-col flex-1">
      
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Login
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Access your chatbot dashboard
            </p>
          </div>
          <div>


            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError(null);
                setLoading(true);
                try {
                  const res = await fetch(
                    `${API_BASE_URL}/login`,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email, password })
                    }
                  );
                  const data = await res.json();
                  if (!res.ok || !data?.success) {
                    throw new Error(data?.detail || data?.message || "Login failed");
                  }
                  if (data?.token) {
                    try { 
                      localStorage.setItem("auth_token", data.token);
                      
                      // Check if user is superadmin and redirect accordingly
                      fetch(`${API_BASE_URL}/accounts/me`, {
                        headers: { Authorization: `Bearer ${data.token}` }
                      })
                        .then((r) => r.ok ? r.json() : null)
                        .then((userData) => {
                          if (userData && userData.subscription_type === 'superadmin') {
                            setTimeout(() => {
                              navigate("/admin-dashboard", { replace: true });
                            }, 2000);
                          } else {
                            setTimeout(() => {
                              navigate("/dashboard", { replace: true });
                            }, 2000);
                          }
                        })
                        .catch(() => {
                          // Fallback to regular dashboard if check fails
                          setTimeout(() => {
                            navigate("/dashboard", { replace: true });
                          }, 2000);
                        });
                    } catch {}
                  } else {
                    // Fallback if no token
                    setTimeout(() => {
                      navigate("/dashboard", { replace: true });
                    }, 2000);
                  }
                } catch (err: any) {
                  setError(err.message);
                } finally {
                  setLoading(false);
                }
              }}
            >
              <div className="space-y-6">
                <div>
                  <Input placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end">

                  <Link
                    to="#"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm" type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                {!error && loading === false && (tokenExists()) && (
                  <p className="text-sm text-green-500">Login successful...</p>
                )}
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don't have an account? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
