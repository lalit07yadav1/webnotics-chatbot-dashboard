import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UpgradePlan from "./UpgradePlan";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string
);

export default function UpgradePlanPage() {
  return (
    <Elements stripe={stripePromise}>
      <UpgradePlan />
    </Elements>
  );
}






