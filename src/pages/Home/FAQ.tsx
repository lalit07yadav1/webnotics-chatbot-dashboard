import React, { useState } from "react";

const faqs = [
  {
    q: "How do I add the chatbot to my website?",
    a: "Sign up, then copy your unique code snippet from the dashboard. Paste it into your website’s HTML before the </body> tag. Done!",
  },
  {
    q: "What AI model powers the replies?",
    a: "Our chatbot uses a secure, state-of-the-art NLP engine that understands and responds in natural language based on your script and settings.",
  },
  {
    q: "Do you support multiple languages?",
    a: "Yes! Our AI can converse in English, Spanish, French, and more. The dashboard makes it easy to localize responses.",
  },
  {
    q: "What’s included in the Free plan?",
    a: "You get unlimited messages/month, basic analytics, and email support. Upgrade to Pro anytime for advanced features.",
  },
  {
    q: "How do I upgrade or cancel my subscription?",
    a: "Head to your dashboard, click 'Billing', then select your preferred plan. Cancel anytime—no questions asked.",
  },
  {
    q: "Is my data secure?",
    a: "All customer and conversation data is secured using industry-leading encryption and privacy standards (GDPR-compliant).",
  },
  {
    q: "Can I get a refund?",
    a: "Yes! All paid plans come with a 7-day money-back guarantee.",
  },
  {
    q: "How do I get support?",
    a: "Chat with us via live chat on the dashboard or email our support team any time. We respond within 24 hours.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex flex-col items-center px-4 pt-20 pb-28">
      <div className="max-w-3xl w-full mx-auto">
        <h1 className="text-4xl font-bold text-brand-400 mb-8 text-center">
          Frequently Asked Questions
        </h1>
        {faqs.map((item, idx) => (
          <div key={item.q} className="mb-5">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full text-left px-6 py-4 bg-gray-850 rounded-t-xl text-lg font-semibold text-brand-400 focus:outline-none border-b-2 border-brand-500"
            >
              {item.q}
            </button>
            {openIdx === idx && (
              <div className="bg-gray-800 px-6 pb-6 rounded-b-xl text-gray-300 border-b border-brand-700 border-x">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
