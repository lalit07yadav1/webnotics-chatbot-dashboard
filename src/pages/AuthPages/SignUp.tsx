import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string
);
export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Webnotics Admin Dashboard"
        description="Webnotics Admin Dashboard"
      />
      <AuthLayout>
        <Elements stripe={stripePromise}>
          <SignUpForm />
        </Elements>
      </AuthLayout>
    </>
  );
}
