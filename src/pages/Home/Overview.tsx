import { Link } from "react-router";

export default function Overview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Header Bar */}
      <header className="flex justify-between items-center px-8 py-6 max-w-6xl mx-auto">
        <div className="text-2xl font-extrabold tracking-tight text-brand-500">
          AI Chatbot
        </div>
        <div className="flex gap-4">
          <Link to="/signin">
            <button className="px-5 py-2 rounded-md border border-brand-500 text-brand-500 bg-gray-900 font-medium hover:bg-brand-500 hover:text-white transition">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-5 py-2 rounded-md bg-brand-500 text-white font-semibold hover:bg-brand-600 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
          Meet Your AI Chatbot Assistant
        </h1>
        <p className="text-lg sm:text-xl max-w-xl text-gray-300 mb-8">
          Supercharge your website or business with a smart, customizable
          chatbot.
          <br />
          Engage users 24/7, answer instantly, and grow your brand efficiently!
        </p>
        <Link to="/signup">
          <button className="bg-brand-500 text-white text-lg px-10 py-4 rounded-xl font-bold shadow-lg hover:bg-brand-600 transition mb-2">
            Try Now
          </button>
        </Link>
        <div className="flex gap-8 mt-6 flex-wrap justify-center">
          <Link
            to="/home/features"
            className="px-6 py-2 rounded-full border border-brand-400 text-brand-400 hover:bg-brand-600 hover:text-white font-semibold transition"
          >
            Features
          </Link>
          <Link
            to="/home/pricing"
            className="px-6 py-2 rounded-full border border-brand-400 text-brand-400 hover:bg-brand-600 hover:text-white font-semibold transition"
          >
            Pricing
          </Link>
          <Link
            to="/home/about"
            className="px-6 py-2 rounded-full border border-brand-400 text-brand-400 hover:bg-brand-600 hover:text-white font-semibold transition"
          >
            About
          </Link>
          <Link
            to="/home/contact"
            className="px-6 py-2 rounded-full border border-brand-400 text-brand-400 hover:bg-brand-600 hover:text-white font-semibold transition"
          >
            Contact
          </Link>
          <Link
            to="/home/faq"
            className="px-6 py-2 rounded-full border border-brand-400 text-brand-400 hover:bg-brand-600 hover:text-white font-semibold transition"
          >
            FAQ
          </Link>
        </div>
      </section>

      {/* Features: Why Choose & Get Started */}
      <section className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-8 my-16 px-4">
        <div className="bg-gray-850 rounded-2xl shadow-md p-8 flex flex-col items-start">
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-block bg-brand-500 text-white rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4H8l4-8v6h3l-4 8v-6z"
                />
              </svg>
            </span>
            <h2 className="text-xl font-bold text-white">
              Why Choose Our Chatbot?
            </h2>
          </div>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>
              Instant AI-powered replies to your customers and site visitors
            </li>
            <li>Customizable to match your brand and goals</li>
            <li>Easy analytics &amp; usage tracking</li>
            <li>Seamless integration with your site or tools</li>
            <li>Reduce support costs, boost satisfaction</li>
          </ul>
        </div>
        <div className="bg-gray-850 rounded-2xl shadow-md p-8 flex flex-col items-start">
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-block bg-brand-500 text-white rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3"
                />
              </svg>
            </span>
            <h2 className="text-xl font-bold text-white">
              Get Started in Minutes
            </h2>
          </div>
          <ol className="list-decimal pl-6 text-gray-300 space-y-1">
            <li>Sign up for a free account</li>
            <li>Customize your chatbot and embed in your site</li>
            <li>Upgrade any time for pro features!</li>
          </ol>
        </div>
      </section>

      {/* Footer Legal Nav */}
      <footer className="text-center pb-10 pt-2">
        <div className="mb-2 space-x-4">
          <Link
            to="/home/terms"
            className="text-gray-400 text-sm hover:text-brand-400"
          >
            Terms
          </Link>
          <Link
            to="/home/privacy-policy"
            className="text-gray-400 text-sm hover:text-brand-400"
          >
            Privacy Policy
          </Link>
          <Link
            to="/home/refund-policy"
            className="text-gray-400 text-sm hover:text-brand-400"
          >
            Refund Policy
          </Link>
        </div>
        <span className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} AI Chatbot. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
