import React from "react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-16 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <p className="mb-4">
        Welcome! By using our chatbot service, you agree to these terms.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">User Conduct</h2>
      <p className="mb-4">
        Do not use our service for unlawful or abusive purposes. Respect other
        users and the platform rules.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Service Limitations</h2>
      <p className="mb-4">
        We provide this service as-is, without guaranteed availability. Features
        are subject to change.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Updates & Changes</h2>
      <p className="mb-4">
        We may update these terms by posting to this site. Continued use
        indicates consent.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="mb-4">
        Questions? Email{" "}
        <a
          href="mailto:legal@chatbotpro.com"
          className="text-blue-400 underline"
        >
          legal@chatbotpro.com
        </a>
        .
      </p>
    </div>
  );
}
