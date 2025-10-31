"use client";

import { FormEvent, useMemo, useState } from "react";
import countries from "../../data/countries.json";
import statesByCountry from "../../data/states.json";
import { State } from "country-state-city";
import { Link, useNavigate } from "react-router";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function SignUpForm() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  // user inputs
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [pincode, setPincode] = useState("");
  const [subscriptionType, setSubscriptionType] = useState<"free" | "paid">(
    "free"
  );

  // UI states
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // derive state options for selected country
  const stateOptions = useMemo(() => {
    if (!country) return [];
    let libStates: string[] = [];
    try {
      libStates = State.getStatesOfCountry(country).map((s) => s.name);
    } catch {
      libStates = [];
    }
    const local = (statesByCountry as Record<string, string[]>)[country] ?? [];
    // Use union to ensure completeness while allowing local overrides
    const merged = Array.from(new Set<string>([...libStates, ...local]));
    return merged.sort((a, b) => a.localeCompare(b));
  }, [country]);

  const handleFreeAccountCreation = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://webnotics-chatbot.onrender.com/create-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          name: name,
          phone_number: phoneNumber || null,
          password: password || null,
          subscription_type: 'free',
          country: country || null,
          state: stateRegion || null,
          address_line1: address1 || null,
          address_line2: address2 || null,
          pincode: pincode || null
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create free account');
      }
      if (data.success) {
        setSuccess(true);
        console.log('Free account created:', data);
        setTimeout(() => navigate('/signin', { replace: true }), 4000);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaidAccountCreation = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!stripe || !elements) {
      setError('Stripe not loaded');
      setLoading(false);
      return;
    }
    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: name,
          email: email,
          phone: phoneNumber || undefined,
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
      const response = await fetch('https://webnotics-chatbot.onrender.com/create-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          name: name,
          phone_number: phoneNumber || null,
          password: password || null,
          subscription_type: 'paid',
          payment_method_id: paymentMethod?.id,
          country: country || null,
          state: stateRegion || null,
          address_line1: address1 || null,
          address_line2: address2 || null,
          pincode: pincode || null
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create subscription');
      }
      if (data.client_secret) {
        const { error: confirmError } = await stripe.confirmCardPayment(data.client_secret);
        if (confirmError) {
          throw new Error(confirmError.message);
        }
      }
      if (data.success) {
        setSuccess(true);
        console.log('Account created:', {
          accountId: data.account_id,
          customerId: data.stripe_customer_id,
          subscriptionId: data.stripe_subscription_id,
          status: data.subscription_status
        });
        setTimeout(() => navigate('/signin', { replace: true }), 4000);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">

      {loading && (
        <div
          className="absolute inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm"
          role="status"
          aria-live="polite"
          aria-label="Creating account"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
            <span className="text-white text-sm">Processing…</span>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-6">
          <h1 className="mb-2 font-semibold  text-title-sm text-white/90 sm:text-title-md">
            Create your account
          </h1>

        </div>

        <form className="space-y-5" onSubmit={subscriptionType === 'paid' ? handlePaidAccountCreation : handleFreeAccountCreation}>
          <div>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <div>
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <select
                className="w-full border rounded-lg px-3 py-2 bg-gray-800 text-white"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setStateRegion("");
                }}
              >
                <option value="">Select country</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                className="w-full border rounded-lg px-3 py-2 bg-gray-800 text-white"
                value={stateRegion}
                onChange={(e) => setStateRegion(e.target.value)}
                disabled={!country}
              >
                <option value="">{country ? "Select state/region" : "Select country first"}</option>
                {stateOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Input
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              placeholder="Address line 1"
            />
          </div>

          <div>
            <Input
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="Address line 2 (optional)"
            />
          </div>

          <div>
            <Input
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Postal code"
            />
          </div>

          <div>
            <select
              className="w-full border rounded-lg px-3 py-2 bg-gray-800 text-white"
              value={subscriptionType}
              onChange={(e) =>
                setSubscriptionType(e.target.value as "free" | "paid")
              }
            >
              <option value="free">Free</option>
              <option value="paid">Paid ($9.99/month)</option>
            </select>
          </div>

          {subscriptionType === "paid" && (
            <div className="p-4 border rounded-lg border-gray-700">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#fff",
                      "::placeholder": { color: "#aab7c4" },
                    },
                  },
                }}
              />
            </div>
          )}

          <div className="flex items-start gap-3">
            <Checkbox
              className="w-5 h-5"
              checked={isChecked}
              onChange={setIsChecked}
            />
            <p className="text-sm text-gray-400">
              By creating an account, you agree to our{" "}
              <span className="text-brand-500">Terms</span> and{" "}
              <span className="text-brand-500">Privacy Policy</span>.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !stripe || (subscriptionType === "paid" && !elements)}
            className="w-full py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm">
              Account created successfully!
            </p>
          )}

          <p className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-brand-500 hover:text-brand-600"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
