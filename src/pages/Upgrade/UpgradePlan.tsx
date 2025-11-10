"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { getValidToken } from "../../utils/tokenUtils";
import countries from "../../data/countries.json";
import statesByCountry from "../../data/states.json";
import { State } from "country-state-city";

const API_BASE_URL = import.meta.env.VITE_WEBSITE_URL || 'https://webnotics-chatbot.onrender.com';

interface UserProfile {
  name?: string;
  email?: string;
  phone_number?: string | null;
  country?: string | null;
  state?: string | null;
  address_line1?: string | null;
  address_line2?: string | null;
  pincode?: string | null;
  subscription_type?: string;
}

export default function UpgradePlan() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  // Address fields
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [country, setCountry] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [pincode, setPincode] = useState("");

  // UI states
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Function to find country from state name
  const findCountryFromState = (stateName: string): string => {
    if (!stateName) return "";
    
    for (const countryData of countries) {
      const countryCode = countryData.code;
      try {
        const libStates = State.getStatesOfCountry(countryCode).map((s) => s.name);
        const local = (statesByCountry as Record<string, string[]>)[countryCode] ?? [];
        const allStates = Array.from(new Set<string>([...libStates, ...local]));
        
        if (allStates.includes(stateName)) {
          return countryCode;
        }
      } catch {
        // Continue to next country
      }
    }
    return "";
  };

  // Get state options based on selected country
  const stateOptions = useMemo(() => {
    if (!country) return [];
    let libStates: string[] = [];
    try {
      libStates = State.getStatesOfCountry(country).map((s) => s.name);
    } catch {
      libStates = [];
    }
    const local = (statesByCountry as Record<string, string[]>)[country] ?? [];
    const merged = Array.from(new Set<string>([...libStates, ...local]));
    return merged.sort((a, b) => a.localeCompare(b));
  }, [country]);

  // Store the state value from API to set after country is loaded
  const [pendingState, setPendingState] = useState<string>("");

  // Fetch current user profile
  useEffect(() => {
    const fetchProfile = async () => {
      setFetching(true);
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
          throw new Error("Failed to fetch profile");
        }

        const data: UserProfile = await response.json();
        setUserProfile(data);

        // Check if user is already on paid plan
        if (data.subscription_type !== 'free') {
          navigate("/dashboard", { replace: true });
          return;
        }

        // Pre-fill address fields if available
        setAddress1(data.address_line1 || "");
        setAddress2(data.address_line2 || "");
        setPincode(data.pincode || "");
        
        // Handle country and state
        const stateValue = data.state || "";
        let countryValue = data.country || "";
        
        if (!countryValue && stateValue) {
          countryValue = findCountryFromState(stateValue);
        }
        
        setCountry(countryValue);
        setPendingState(stateValue);
      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Set state after country is loaded and state options are available
  useEffect(() => {
    if (country && pendingState && stateOptions.length > 0) {
      if (stateOptions.includes(pendingState)) {
        setStateRegion(pendingState);
        setPendingState("");
      }
    }
  }, [country, pendingState, stateOptions]);

  const handleUpgrade = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!stripe || !elements) {
      setError('Stripe not loaded');
      setLoading(false);
      return;
    }

    // Validation
    if (!address1 || !country || !stateRegion || !pincode) {
      setError("Please fill in all required address fields");
      setLoading(false);
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Create payment method
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: userProfile?.name || "",
          email: userProfile?.email || "",
          phone: userProfile?.phone_number || undefined,
          address: {
            country: country || undefined,
            state: stateRegion || undefined,
            line1: address1 || undefined,
            line2: address2 || undefined,
            postal_code: pincode || undefined
          }
        }
      });

      if (pmError) {
        throw new Error(pmError.message);
      }

      if (!paymentMethod?.id) {
        throw new Error('Failed to create payment method');
      }

      // Call upgrade endpoint
      const token = getValidToken();
      if (!token) {
        setError("Authentication required");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/accounts/upgrade-plan`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          address_line1: address1,
          state: stateRegion,
          pincode: pincode,
          country: country
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || 'Failed to upgrade plan');
      }

      // Handle 3D Secure if required
      if (data.client_secret) {
        const { error: confirmError } = await stripe.confirmCardPayment(data.client_secret);
        if (confirmError) {
          throw new Error(confirmError.message);
        }
      }

      if (data.success) {
        setSuccess(true);
        console.log('Plan upgraded:', {
          customerId: data.stripe_customer_id,
          subscriptionId: data.stripe_subscription_id,
          status: data.subscription_status
        });
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || "Failed to upgrade plan");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {loading && (
        <div
          className="absolute inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm rounded-lg"
          role="status"
          aria-live="polite"
          aria-label="Processing upgrade"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
            <span className="text-white text-sm">Processing…</span>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Upgrade to Premium Plan
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Upgrade your account to access premium features
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <form onSubmit={handleUpgrade} className="space-y-5">
          {/* Plan Info */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Premium Plan - $9.99/month
            </h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
              <li>Access to all premium features</li>
              <li>Priority support</li>
              <li>Advanced analytics</li>
              <li>Unlimited chatbot interactions</li>
            </ul>
          </div>

          {/* Address Fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Billing Address
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address Line 1 <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                placeholder="Enter your address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address Line 2 (Optional)
              </label>
              <Input
                type="text"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                placeholder="Apartment, suite, etc."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setStateRegion("");
                  }}
                  required
                >
                  <option value="">Select country</option>
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  State/Region <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                  value={stateRegion}
                  onChange={(e) => setStateRegion(e.target.value)}
                  disabled={!country}
                  required
                >
                  <option value="">
                    {country ? "Select state/region" : "Select country first"}
                  </option>
                  {stateOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Postal Code <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter postal code"
                required
              />
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Payment Information
            </h3>

            <div className="p-4 border rounded-lg dark:border-gray-700">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400">
                Plan upgraded successfully! Redirecting to dashboard...
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading || !stripe || !elements}
              className="flex-1"
              size="sm"
            >
              {loading ? "Processing..." : "Upgrade to Premium"}
            </Button>
            <Button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1"
              size="sm"
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}







