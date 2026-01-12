import { useEffect, useState } from "react";
import { getValidToken } from "../../utils/tokenUtils";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import Switch from "../../components/form/switch/Switch";

const API_BASE_URL = import.meta.env.VITE_WEBSITE_URL || 'http://206.189.125.220:8000';

interface StripeConfig {
  public_key: string;
  secret_key: string;
  product_id: string;
  price_id: string;
}

interface Settings {
  mode?: string;
  sandbox_enabled?: boolean;
  openai_api_key?: string;
  stripe_test?: StripeConfig;
  stripe_live?: StripeConfig;
  resend_api_key?: string | null;
  resend_from_email?: string | null;
  resend_from_name?: string | null;
}

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings>({});

  // Form state
  const [mode, setMode] = useState<string>("test");
  const [sandboxEnabled, setSandboxEnabled] = useState(false);
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  
  // Stripe Test
  const [stripeTestPublicKey, setStripeTestPublicKey] = useState("");
  const [stripeTestSecretKey, setStripeTestSecretKey] = useState("");
  const [stripeTestProductId, setStripeTestProductId] = useState("");
  const [stripeTestPriceId, setStripeTestPriceId] = useState("");
  
  // Stripe Live
  const [stripeLivePublicKey, setStripeLivePublicKey] = useState("");
  const [stripeLiveSecretKey, setStripeLiveSecretKey] = useState("");
  const [stripeLiveProductId, setStripeLiveProductId] = useState("");
  const [stripeLivePriceId, setStripeLivePriceId] = useState("");
  
  // Resend
  const [resendApiKey, setResendApiKey] = useState("");
  const [resendFromEmail, setResendFromEmail] = useState("");
  const [resendFromName, setResendFromName] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    
    const token = getValidToken();
    if (!token) {
      setError("Authentication required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.detail || errorData?.message || 'Failed to fetch settings');
      }

      const data = await response.json();
      const settingsData = data.settings || {};
      
      setSettings(settingsData);
      
      // Populate form fields
      setMode(settingsData.mode || "test");
      setSandboxEnabled(settingsData.sandbox_enabled || false);
      setOpenaiApiKey(settingsData.openai_api_key || "");
      
      // Stripe Test
      if (settingsData.stripe_test) {
        setStripeTestPublicKey(settingsData.stripe_test.public_key || "");
        setStripeTestSecretKey(settingsData.stripe_test.secret_key || "");
        setStripeTestProductId(settingsData.stripe_test.product_id || "");
        setStripeTestPriceId(settingsData.stripe_test.price_id || "");
      }
      
      // Stripe Live
      if (settingsData.stripe_live) {
        setStripeLivePublicKey(settingsData.stripe_live.public_key || "");
        setStripeLiveSecretKey(settingsData.stripe_live.secret_key || "");
        setStripeLiveProductId(settingsData.stripe_live.product_id || "");
        setStripeLivePriceId(settingsData.stripe_live.price_id || "");
      }
      
      // Resend
      setResendApiKey(settingsData.resend_api_key || "");
      setResendFromEmail(settingsData.resend_from_email || "");
      setResendFromName(settingsData.resend_from_name || "");
    } catch (err: any) {
      setError(err.message || "Failed to load settings");
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const token = getValidToken();
    if (!token) {
      setError("Authentication required");
      setSaving(false);
      return;
    }

    try {
      // Build update payload with only changed fields
      const updatePayload: any = {};

      if (mode !== settings.mode) updatePayload.mode = mode;
      if (sandboxEnabled !== settings.sandbox_enabled) updatePayload.sandbox_enabled = sandboxEnabled;
      if (openaiApiKey !== settings.openai_api_key) updatePayload.openai_api_key = openaiApiKey;

      // Stripe Test
      const stripeTestChanged = 
        stripeTestPublicKey !== settings.stripe_test?.public_key ||
        stripeTestSecretKey !== settings.stripe_test?.secret_key ||
        stripeTestProductId !== settings.stripe_test?.product_id ||
        stripeTestPriceId !== settings.stripe_test?.price_id;

      if (stripeTestChanged) {
        updatePayload.stripe_test = {
          public_key: stripeTestPublicKey,
          secret_key: stripeTestSecretKey,
          product_id: stripeTestProductId,
          price_id: stripeTestPriceId
        };
      }

      // Stripe Live
      const stripeLiveChanged = 
        stripeLivePublicKey !== settings.stripe_live?.public_key ||
        stripeLiveSecretKey !== settings.stripe_live?.secret_key ||
        stripeLiveProductId !== settings.stripe_live?.product_id ||
        stripeLivePriceId !== settings.stripe_live?.price_id;

      if (stripeLiveChanged) {
        updatePayload.stripe_live = {
          public_key: stripeLivePublicKey,
          secret_key: stripeLiveSecretKey,
          product_id: stripeLiveProductId,
          price_id: stripeLivePriceId
        };
      }

      // Resend
      const currentResendApiKey = resendApiKey.trim() || null;
      const currentResendFromEmail = resendFromEmail.trim() || null;
      const currentResendFromName = resendFromName.trim() || null;
      
      if (currentResendApiKey !== (settings.resend_api_key || null)) {
        updatePayload.resend_api_key = currentResendApiKey;
      }
      if (currentResendFromEmail !== (settings.resend_from_email || null)) {
        updatePayload.resend_from_email = currentResendFromEmail;
      }
      if (currentResendFromName !== (settings.resend_from_name || null)) {
        updatePayload.resend_from_name = currentResendFromName;
      }

      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatePayload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.detail || errorData?.message || 'Failed to update settings');
      }

      const data = await response.json();
      setSuccess("Settings updated successfully!");
      
      // Update local settings state
      if (data.settings) {
        setSettings(data.settings);
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update settings");
      console.error('Error updating settings:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Settings
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage system settings
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500 dark:text-gray-400">Loading settings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage system settings and configurations
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
          <p className="text-green-400 text-sm">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Mode & General Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            General Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mode
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="test">Test</option>
                <option value="live">Live</option>
              </select>
            </div>
            <div>
              <Switch
                label="Sandbox Enabled"
                checked={sandboxEnabled}
                onChange={setSandboxEnabled}
                color="blue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                OpenAI API Key
              </label>
              <Input
                type="password"
                value={openaiApiKey}
                onChange={(e) => setOpenaiApiKey(e.target.value)}
                placeholder="sk-..."
              />
            </div>
          </div>
        </div>

        {/* Stripe Test Configuration */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Stripe Test Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Public Key
              </label>
              <Input
                type="text"
                value={stripeTestPublicKey}
                onChange={(e) => setStripeTestPublicKey(e.target.value)}
                placeholder="pk_test_..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Secret Key
              </label>
              <Input
                type="password"
                value={stripeTestSecretKey}
                onChange={(e) => setStripeTestSecretKey(e.target.value)}
                placeholder="sk_test_..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product ID
              </label>
              <Input
                type="text"
                value={stripeTestProductId}
                onChange={(e) => setStripeTestProductId(e.target.value)}
                placeholder="prod_..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price ID
              </label>
              <Input
                type="text"
                value={stripeTestPriceId}
                onChange={(e) => setStripeTestPriceId(e.target.value)}
                placeholder="price_..."
              />
            </div>
          </div>
        </div>

        {/* Stripe Live Configuration */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Stripe Live Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Public Key
              </label>
              <Input
                type="text"
                value={stripeLivePublicKey}
                onChange={(e) => setStripeLivePublicKey(e.target.value)}
                placeholder="pk_live_..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Secret Key
              </label>
              <Input
                type="password"
                value={stripeLiveSecretKey}
                onChange={(e) => setStripeLiveSecretKey(e.target.value)}
                placeholder="sk_live_..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product ID
              </label>
              <Input
                type="text"
                value={stripeLiveProductId}
                onChange={(e) => setStripeLiveProductId(e.target.value)}
                placeholder="prod_..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price ID
              </label>
              <Input
                type="text"
                value={stripeLivePriceId}
                onChange={(e) => setStripeLivePriceId(e.target.value)}
                placeholder="price_..."
              />
            </div>
          </div>
        </div>

        {/* Resend Email Configuration */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Resend Email Configuration
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Configure Resend service for sending emails (e.g., password reset emails)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Resend API Key <span className="text-red-500">*</span>
              </label>
              <Input
                type="password"
                value={resendApiKey}
                onChange={(e) => setResendApiKey(e.target.value)}
                placeholder="re_..."
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Your Resend API key from resend.com
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                value={resendFromEmail}
                onChange={(e) => setResendFromEmail(e.target.value)}
                placeholder="onboarding@resend.dev"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Verified sender email address in Resend
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From Name
              </label>
              <Input
                type="text"
                value={resendFromName}
                onChange={(e) => setResendFromName(e.target.value)}
                placeholder="Webnotics Chatbot"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Display name for sent emails
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="px-6 py-2"
          >
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}

