import React from "react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    features: [
      "Unlimited chats/month",
      "Embed on any site",
      "Basic AI replies",
      "Basic analytics dashboard",
      "Community email support",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    features: [
      "Unlimited chats & users",
      "Advanced AI/custom scripts",
      "Full analytics and export",
      "Integrations (WhatsApp, Messenger, more)",
      "No branding",
      "Priority live chat support",
    ],
    highlight: true,
    stripeUrl: "https://buy.stripe.com/test_4gw6pf06p89g7cY4gg", // Placeholder
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex flex-col items-center pb-20">
      <div className="mt-20 mb-3 text-brand-400 text-4xl font-bold">
        Simple, Affordable Pricing
      </div>
      <div className="text-gray-300 text-lg mb-14 text-center px-4">
        Start free. Scale only when you’re ready. No hidden fees, cancel
        anytime.
      </div>
      <div className="grid md:grid-cols-2 gap-12 max-w-4xl w-full px-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-2xl shadow-lg p-9 bg-gray-850 flex flex-col justify-between ${
              plan.highlight
                ? "border-brand-500 ring-2 ring-brand-500 scale-105 z-10"
                : "border-gray-700"
            }`}
          >
            <div>
              <div className="text-2xl font-extrabold mb-2 text-white flex items-center">
                {plan.name}
                {plan.highlight && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-brand-500 text-white text-xs font-semibold">
                    Pro
                  </span>
                )}
              </div>
              <div className="font-bold text-4xl mt-2 mb-3 text-brand-400 flex items-end gap-2">
                {plan.price}{" "}
                <span className="text-gray-400 text-base">{plan.period}</span>
              </div>
              <ul className="mb-7 pl-4 mt-4 space-y-2 text-gray-300">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            {plan.highlight ? (
              <a href={plan.stripeUrl} rel="noopener" target="_blank">
                <button className="w-full bg-brand-500 text-white rounded-lg font-semibold text-lg py-3 hover:bg-brand-600 transition">
                  Go Pro (Stripe checkout)
                </button>
              </a>
            ) : (
              <a href="/signup">
                <button className="w-full bg-gray-800 text-brand-400 border border-brand-400 rounded-lg font-semibold text-lg py-3 hover:bg-gray-900 transition">
                  Start for Free
                </button>
              </a>
            )}
          </div>
        ))}
      </div>
      <div
        className="text-xs text-gray-400 mt-11 text-center max-w-xl px-4"
        style={{ lineHeight: 1.7 }}
      >
        7-day money-back guarantee on paid plans. Annual option available after
        signup. All plans are billed securely via Stripe. Cancel anytime from
        your dashboard.
      </div>
    </div>
  );
}
