import React, { useState } from "react";

const faqs = [
  {
    q: "How do I create a chatbot?",
    a: "Start by signing up, then use the visual builder to design your bot and publish instantly—no coding required.",
  },
  {
    q: "Can I import my own FAQ or documents?",
    a: "Yes, you can upload documents (PDF, DOCX, TXT) or paste your questions/answers directly into the dashboard.",
  },
  {
    q: "How does pricing work?",
    a: "We offer a free plan for most users and an affordable premium plan for scaling teams. See the Pricing page for details.",
  },
  {
    q: "Where can I embed my chatbot?",
    a: "Your chatbot can be embedded on any website or app using our simple code snippet.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(-1);
  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">FAQ</h1>
        <p className="text-xl text-gray-400 mb-8">
          Answers to common questions about setup, integration, and plans.
        </p>
      </div>
      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map(({ q, a }, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="w-full text-left p-5 text-lg font-medium flex justify-between items-center focus:outline-none"
            >
              {q}
              <span>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <div className="p-5 pt-0 text-gray-300">{a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
