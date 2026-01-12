import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { getValidToken } from "../../utils/tokenUtils";
import statesByCountry from "../../data/states.json";
import { State } from "country-state-city";
import countries from "../../data/countries.json";

const API_BASE_URL = import.meta.env.VITE_WEBSITE_URL || 'http://206.189.125.220:8000';

interface UserProfile {
  id?: number;
  email?: string;
  name?: string;
  phone_number?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  subscription_type?: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form fields (editable)
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [stateRegion, setStateRegion] = useState("");

  // Read-only fields
  const [email, setEmail] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  
  // Store the state value from API to set after country is loaded
  const [pendingState, setPendingState] = useState<string>("");

  // Function to find country from state name
  const findCountryFromState = (stateName: string): string => {
    if (!stateName) return "";
    
    // Try to find the country by searching through all countries
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
        
        // Set editable fields
        setName(data.name || "");
        setPhoneNumber(data.phone_number || "");
        setCity(data.city || "");
        
        // Handle country and state - check multiple possible field names
        const stateValue = data.state || (data as any).state_region || "";
        let countryValue = data.country || (data as any).country_code || "";
        
        // If country is not provided but state is, try to find the country
        if (!countryValue && stateValue) {
          countryValue = findCountryFromState(stateValue);
        }
        
        // Set country first, then state (so state dropdown gets populated)
        setCountry(countryValue);
        // Store state value to set after country dropdown is populated
        setPendingState(stateValue);

        // Set read-only fields
        setEmail(data.email || "");
        setSubscriptionType(data.subscription_type || "");
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
      // Check if the pending state exists in the available options
      if (stateOptions.includes(pendingState)) {
        setStateRegion(pendingState);
        setPendingState(""); // Clear pending state
      }
    }
  }, [country, pendingState, stateOptions]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const token = getValidToken();
    if (!token) {
      setError("Authentication required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/accounts/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name || null,
          phone_number: phoneNumber || null,
          city: city || null,
          state: stateRegion || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Failed to update profile");
      }

      setSuccess(true);
      // Optionally refresh profile data
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500 dark:text-gray-400">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Profile Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Update your profile information
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Read-only Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <Input
              type="email"
              value={email}
              disabled
              className="bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
              placeholder="Email"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Email cannot be changed
            </p>
          </div>

          {/* Read-only Subscription Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subscription Type
            </label>
            <Input
              type="text"
              value={subscriptionType === 'superadmin' ? 'Super Admin' : subscriptionType === 'paid' ? 'Premium' : 'Free'}
              disabled
              className="bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
              placeholder="Subscription Type"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Subscription type cannot be changed
            </p>
          </div>

          {/* Editable Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Editable Phone Number Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
            />
          </div>

          {/* Country Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Country
            </label>
            <select
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setStateRegion(""); // Reset state when country changes
              }}
            >
              <option value="">Select country</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* State Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              State/Region
            </label>
            <select
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
              value={stateRegion}
              onChange={(e) => setStateRegion(e.target.value)}
              disabled={!country}
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

          {/* Editable City Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              City
            </label>
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
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
                Profile updated successfully!
              </p>
            </div>
          )}

          {/* Change Password Link */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Want to change your password?
            </p>
            <Button
              type="button"
              onClick={() => navigate("/change-password")}
              className="w-full"
              size="sm"
              variant="outline"
            >
              Change Password
            </Button>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
              size="sm"
            >
              {loading ? "Updating..." : "Update Profile"}
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

