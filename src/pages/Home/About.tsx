import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex flex-col items-center">
      <div className="max-w-3xl px-4 py-20 w-full">
        <h1 className="text-4xl font-bold text-brand-400 mb-5 text-center">
          About Us
        </h1>
        <p className="mb-7 text-lg text-gray-300 text-center">
          We're passionate builders and innovators on a mission to make
          enterprise-quality AI chatbots simple, affordable, and accessible for
          everyone.
        </p>
        <div className="bg-gray-850 rounded-2xl p-8 mb-9 shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-brand-500">
            Our Story
          </h2>
          <p className="text-gray-200 leading-relaxed mb-3">
            Our founding team brought together technology, marketing, and
            support backgrounds. We saw how hard it was for most brands to
            deploy helpful chatbots—heavy code, expensive, or confusing. We knew
            AI could help more people and businesses win.
          </p>
          <p className="text-gray-400 mb-0">
            So, we built a platform where anyone can add a smart, customizable
            assistant in <b>minutes</b>. Now, our chatbot powers businesses all
            over the world.
          </p>
        </div>
        <div className="bg-gray-850 rounded-2xl p-8 mb-9 shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-brand-500">
            Our Mission & Values
          </h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-300">
            <li>Make real AI accessible for everyone, everywhere</li>
            <li>Empower brands to engage and help their users automatically</li>
            <li>Protect privacy, security, and honest communication</li>
            <li>Support business owners at every stage of growth</li>
          </ul>
        </div>
        <div className="bg-gray-850 rounded-2xl p-8 shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-brand-500">
            Why Trust Us?
          </h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-300">
            <li>Thousands of chats processed daily worldwide</li>
            <li>
              Trusted by e-commerce businesses, support teams, and startups
            </li>
            <li>Top-notch security and GDPR privacy baked in</li>
            <li>Real customer support: humans ready to help</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
