import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import UpgradePlan from "./UpgradePlan";
import { getStripePublishKey } from "../../utils/stripeUtils";

export default function UpgradePlanPage() {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        const publishKey = await getStripePublishKey();
        if (publishKey) {
          setStripePromise(loadStripe(publishKey));
        } else {
          console.error('No Stripe publishable key available');
          setStripePromise(null);
        }
      } catch (error) {
        console.error('Error initializing Stripe:', error);
        setStripePromise(null);
      } finally {
        setLoading(false);
      }
    };

    initializeStripe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!stripePromise) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500 dark:text-red-400">
          Error: Stripe configuration not available
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <UpgradePlan />
    </Elements>
  );
}












