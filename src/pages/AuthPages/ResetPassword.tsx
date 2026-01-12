import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "../../icons";

const API_BASE_URL = import.meta.env.VITE_WEBSITE_URL || 'http://206.189.125.220:8000';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    if (!token) {
      setTokenError(true);
      setError("Invalid or missing reset token. Please request a new password reset link.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    // Validation
    if (!newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Failed to reset password");
      }

      if (data.success) {
        setSuccess(true);
        setNewPassword("");
        setConfirmPassword("");
        // Redirect to sign in after 3 seconds
        setTimeout(() => {
          navigate("/signin", { replace: true });
        }, 3000);
      } else {
        throw new Error(data.message || "Failed to reset password");
      }
    } catch (err: any) {
      setError(err.message || "Failed to reset password. The link may have expired. Please request a new one.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageMeta
        title="Reset Password - Webnotics Chatbot"
        description="Reset your password for Webnotics Chatbot account"
      />
      <AuthLayout>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
              <div className="mb-5 sm:mb-8">
                <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                  Reset Password
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enter your new password below.
                </p>
                {tokenError && (
                  <p className="text-sm text-red-500 dark:text-red-400 mt-2">
                    This link will expire in 1 hour.
                  </p>
                )}
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        New Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter your new password (min 8 characters)"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          disabled={!token || success}
                        />
                        <span
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                        >
                          {showNewPassword ? (
                            <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                          ) : (
                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                          )}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Password must be at least 8 characters long
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirm New Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          disabled={!token || success}
                        />
                        <span
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                        >
                          {showConfirmPassword ? (
                            <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                          ) : (
                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                          )}
                        </span>
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                      </div>
                    )}

                    {success && (
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Password reset successfully! Redirecting to sign in...
                        </p>
                      </div>
                    )}

                    <div>
                      <Button
                        className="w-full"
                        size="sm"
                        type="submit"
                        disabled={loading || success || !token}
                      >
                        {loading ? "Resetting Password..." : success ? "Password Reset" : "Reset Password"}
                      </Button>
                    </div>
                  </div>
                </form>

                <div className="mt-5 space-y-2">
                  <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                    Remember your password?{" "}
                    <Link
                      to="/signin"
                      className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      Sign In
                    </Link>
                  </p>
                  {tokenError && (
                    <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                      Need a new reset link?{" "}
                      <Link
                        to="/forgot-password"
                        className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                      >
                        Request Password Reset
                      </Link>
                    </p>
                  )}
                  <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                    <Link
                      to="/"
                      className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      ← Back to Home
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}


