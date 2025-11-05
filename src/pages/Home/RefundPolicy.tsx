import React from "react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-16 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
      <p className="mb-4">
        We want you to be satisfied. This policy describes how refunds are
        handled for our service.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Requesting a Refund</h2>
      <p className="mb-4">
        Contact our team within 14 days of purchase for a full refund if you're
        not satisfied. Email{" "}
        <a
          href="mailto:refunds@chatbotpro.com"
          className="text-blue-400 underline"
        >
          refunds@chatbotpro.com
        </a>
        .
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Eligibility</h2>
      <p className="mb-4">
        Refunds apply to premium plans. You must request within the stated
        window.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Process</h2>
      <p className="mb-4">
        Reach out with your account details and reason. Your payment will be
        returned to the original method after review.
      </p>
    </div>
  );
}
