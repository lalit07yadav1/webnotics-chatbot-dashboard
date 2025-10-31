import React from "react";

const features = [
  {
    title: "AI-Powered Smart Replies",
    desc: "Instant, context-aware responses to your users 24/7 with advanced NLP-powered AI.",
    icon: "🤖",
  },
  {
    title: "Brand Customization",
    desc: "Easily match your chatbot to your brand colors, avatar, and tone of voice.",
    icon: "🎨",
  },
  {
    title: "Analytics & Insights",
    desc: "View conversation trends, identify hot topics, and track engagement in an easy dashboard.",
    icon: "📊",
  },
  {
    title: "Multi-Channel Integrations",
    desc: "Deploy the chatbot on your website, WhatsApp, Facebook Messenger, and more.",
    icon: "🌐",
  },
  {
    title: "No-Code Setup",
    desc: "Get started quickly—just copy the widget script and paste into your site.",
    icon: "⚡",
  },
  {
    title: "Powerful Dashboard",
    desc: "Full control—from conversation scripts to detailed billing—all in one place.",
    icon: "📋",
  },
  {
    title: "Enterprise Grade Security",
    desc: "Your data is encrypted and privacy-protected—robust controls for all businesses.",
    icon: "🔒",
  },
  {
    title: "Priority Support",
    desc: "Our support team is ready to help you succeed—email or live chat help included.",
    icon: "💬",
  },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-20">
        <h1 className="text-center text-4xl font-bold mb-3 text-brand-400">
          Chatbot Features
        </h1>
        <p className="text-center text-lg mb-12 text-gray-300">
          Discover a robust AI chatbot platform built for modern brands and
          teams.
        </p>
        <div className="grid sm:grid-cols-2 gap-8 mb-10">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-gray-850 rounded-xl shadow-md p-7 flex gap-4 items-start hover:shadow-brand-800/20 transition"
            >
              <span className="text-3xl flex-shrink-0 select-none">
                {f.icon}
              </span>
              <div>
                <div className="font-bold text-lg text-white mb-1">
                  {f.title}
                </div>
                <div className="text-gray-300 leading-relaxed">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center pt-8">
          <p className="mb-3 text-xl font-semibold text-brand-400">
            All features, one simple platform.
          </p>
          <a href="/signup">
            <button className="bg-brand-500 text-white px-8 py-3 rounded-full text-lg font-bold shadow hover:bg-brand-600 transition">
              Try Free Now
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
