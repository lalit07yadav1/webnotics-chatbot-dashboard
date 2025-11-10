import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import { getValidToken } from "../../utils/tokenUtils";

const API_BASE_URL =
  import.meta.env.VITE_WEBSITE_URL || "https://webnotics-chatbot.onrender.com";

interface UserSubscription {
  id?: number;
  name?: string;
  email?: string;
  subscription_type?: string;
  subscription_id?: string | number | null;
  subscription_status?: string | null;
  subscription_plan?: string | null;
  subscription_product?: string | null;
  subscription_current_period_end?: string | null;
  [key: string]: unknown;
}

export default function CancelSubscription() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserSubscription | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setFetchError(null);

      const token = getValidToken();
      if (!token) {
        navigate("/signin", { replace: true });
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/accounts/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load subscription details");
        }

        const data: UserSubscription = await response.json();
        setProfile(data);
      } catch (error: unknown) {
        setFetchError(
          error instanceof Error
            ? error.message
            : "Unable to load subscription details"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const subscriptionId = useMemo(() => {
    if (!profile) return null;
    return profile.subscription_id ?? profile["stripe_subscription_id"] ?? null;
  }, [profile]);

  const isPaidUser =
    profile?.subscription_type &&
    profile.subscription_type.toLowerCase() === "paid";

  const cancellationDisabled = !isPaidUser || !subscriptionId || cancelling;

  const formattedRenewalDate = useMemo(() => {
    const raw =
      profile?.subscription_current_period_end ??
      (profile?.["current_period_end"] as string | undefined);
    if (!raw) return null;

    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleString();
  }, [profile]);

  const handleCancel = async () => {
    if (!profile) return;

    const token = getValidToken();
    if (!token) {
      navigate("/signin", { replace: true });
      return;
    }

    setCancelError(null);
    setSuccessMessage(null);
    setCancelling(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/accounts/cancel-subscription`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            subscriptionId ? { subscription_id: subscriptionId } : {}
          ),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.detail ||
            data?.message ||
            "Unable to cancel subscription. Please try again."
        );
      }

      setSuccessMessage(
        data?.message ||
          "Your subscription has been cancelled. You will retain access until the end of the billing cycle."
      );
      // Update local profile snapshot
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              subscription_type: data?.subscription_type ?? "free",
              subscription_status:
                data?.subscription_status ?? "cancellation_requested",
              subscription_id: null,
            }
          : prev
      );
    } catch (error: unknown) {
      setCancelError(
        error instanceof Error ? error.message : "Failed to cancel subscription"
      );
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading subscription…</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
          <h1 className="text-lg font-semibold text-red-700 dark:text-red-300">
            Unable to load subscription
          </h1>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {fetchError}
          </p>
          <div className="mt-4 flex gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button size="sm" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Cancel Subscription
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Manage your billing and cancel your paid subscription.
        </p>
      </header>

      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {successMessage ? (
          <div className="rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
            <p className="text-sm text-green-700 dark:text-green-300">
              {successMessage}
            </p>
          </div>
        ) : (
          <>
            {!isPaidUser ? (
              <div className="rounded-md border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  No active paid subscription
                </h2>
                <p className="mt-2 text-sm text-blue-600 dark:text-blue-200">
                  Your account is currently on the{" "}
                  <span className="font-medium">
                    {profile?.subscription_type ?? "free"}
                  </span>{" "}
                  plan. To access premium features, upgrade your plan.
                </p>
                <Button
                  className="mt-4"
                  size="sm"
                  onClick={() => navigate("/upgrade-plan")}
                >
                  View Upgrade Options
                </Button>
              </div>
            ) : !subscriptionId ? (
              <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
                <h2 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">
                  Subscription details unavailable
                </h2>
                <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                  We could not find an active subscription ID for your account.
                  Please contact support for assistance.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Subscription ID
                    </p>
                    <p className="mt-1 text-base font-medium text-gray-900 dark:text-white break-all">
                      {subscriptionId}
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Plan
                    </p>
                    <p className="mt-1 text-base font-medium text-gray-900 dark:text-white">
                      {profile?.subscription_plan ||
                        profile?.subscription_product ||
                        "Premium"}
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Status
                    </p>
                    <p className="mt-1 text-base font-medium text-gray-900 dark:text-white capitalize">
                      {profile?.subscription_status || "active"}
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Renews on
                    </p>
                    <p className="mt-1 text-base font-medium text-gray-900 dark:text-white">
                      {formattedRenewalDate || "Not available"}
                    </p>
                  </div>
                </div>

                {cancelError && (
                  <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
                    {cancelError}
                  </div>
                )}

                <div className="mt-6 space-y-4">
                  <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
                    Cancelling your subscription will stop future renewals. You
                    will continue to have access to premium features until the
                    end of your current billing cycle.
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={handleCancel}
                      disabled={cancellationDisabled}
                    >
                      {cancelling ? "Cancelling…" : "Cancel Subscription"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                    >
                      Back to Dashboard
                    </Button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
}

