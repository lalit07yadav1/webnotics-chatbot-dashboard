/**
 * Utility functions for Stripe integration
 */

const API_BASE_URL = import.meta.env.VITE_WEBSITE_URL || 'http://206.189.125.220:8000';

interface StripePublishKeyResponse {
  success: boolean;
  publish_key?: string;
  mode?: string;
  message?: string;
}

/**
 * Fetches Stripe publishable key from API
 * Falls back to environment variable if API call fails or returns no key
 */
export async function getStripePublishKey(): Promise<string> {
  const fallbackKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string;

  try {
    const response = await fetch(`${API_BASE_URL}/stripe-publish-key`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn('Failed to fetch Stripe publish key from API, using environment variable');
      return fallbackKey || '';
    }

    const data: StripePublishKeyResponse = await response.json();

    if (data.success && data.publish_key) {
      return data.publish_key;
    }

    console.warn('API response did not contain publish_key, using environment variable');
    return fallbackKey || '';
  } catch (error) {
    console.warn('Error fetching Stripe publish key from API, using environment variable:', error);
    return fallbackKey || '';
  }
}








