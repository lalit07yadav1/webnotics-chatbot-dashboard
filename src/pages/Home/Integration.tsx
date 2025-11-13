import { ChatIcon } from "../../icons";
import Button from "../../components/ui/button/Button";
import { useNavigate } from "react-router";
import { ArrowRightIcon } from "../../icons";

export default function Integration() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Place the pattern overlay as the first child, outside any flex/column structure */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)] z-0"></div>
      {/* Header & navigation */}
      <nav className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <span
              className="mr-3 cursor-pointer text-gray-400 hover:text-white"
              onClick={() => navigate('/home/overview')}
              tabIndex={0}
              role="button"
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  navigate("/home/overview");
              }}
            >
              ← Back
            </span>
            <div className="relative w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow">
              <ChatIcon className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl tracking-tight text-white font-semibold ml-1">
              ChatBot Pro
            </span>
          </div>
          <Button
            className=" text-black hover:bg-white/30 shadow-white/90"
            endIcon={<ArrowRightIcon className="w-4 h-4 ml-2" />}
            onClick={() => navigate('/signup')}
          >
            Get Started Free →
          </Button>
        </div>
      </nav>

      {/* (Grid Overlay removed for solid black background) */}

      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]"></div>

      {/* Content hero section, wrapped in a div (outside the overlay) */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center mt-24 md:mt-36 mb-12 text-center">
        <span className="mb-6 inline-block bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-medium rounded-full text-gray-200 tracking-wide uppercase">
          Easy Integration
        </span>
        <h1 className="text-6xl font-bold mb-5 text-white/90 tracking-tight">
          Integration
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-2xl">
          Add your custom chatbot to any website or platform in minutes. No
          complex setup required.
        </p>
      </div>

      {/* Quick Setup Process */}
      <div className="relative z-10 max-w-5xl mx-auto mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-white">
          Quick Setup Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-lg flex flex-col items-center px-8 py-10 min-h-[230px]">
            <div className="text-[52px] font-black mb-3 opacity-10 absolute left-7 top-6 select-none pointer-events-none hidden md:block">
              01
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-3 mt-1 text-white">
                Design Your Bot
              </h3>
              <p className="text-gray-400 text-base max-w-xs">
                Create and customize your chatbot using our visual designer
              </p>
            </div>
          </div>
          {/* Step 2 */}
          <div className="rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-lg flex flex-col items-center px-8 py-10 min-h-[230px]">
            <div className="text-[52px] font-black mb-3 opacity-10 absolute left-7 top-6 select-none pointer-events-none hidden md:block">
              02
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-3 mt-1 text-white">
                Get Embed Code
              </h3>
              <p className="text-gray-400 text-base max-w-xs">
                Copy your unique integration code from the dashboard
              </p>
            </div>
          </div>
          {/* Step 3 */}
          <div className="rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-lg flex flex-col items-center px-8 py-10 min-h-[230px]">
            <div className="text-[52px] font-black mb-3 opacity-10 absolute left-7 top-6 select-none pointer-events-none hidden md:block">
              03
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-3 mt-1 text-white">
                Add to Website
              </h3>
              <p className="text-gray-400 text-base max-w-xs">
                Paste the code into your website and go live instantly
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Integrations section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 mb-24">
        <h2 className="text-5xl font-bold text-center mb-3 text-white">
          Platform Integrations
        </h2>
        <div className="text-center text-gray-400 text-lg mb-12">
          Choose your platform and follow the simple steps
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* HTML / JS */}
          <div className="rounded-2xl bg-white/5 border border-white/10 shadow-lg p-8 flex flex-col mb-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-orange-900/60">
                <svg width="24" height="24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#b46b27" />
                  <text
                    x="50%"
                    y="65%"
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="14"
                  >
                    🌐
                  </text>
                </svg>
              </span>
              <div>
                <div className="text-xl font-semibold text-white">
                  HTML / JavaScript
                </div>
                <div className="text-gray-400 text-sm">
                  Simple script tag integration for any HTML website
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap mb-3">
              <span className="bg-white/10 text-xs rounded px-2 py-0.5 text-gray-300">
                Easy
              </span>
              <span className="bg-white/10 text-xs rounded px-2 py-0.5 text-gray-300">
                2 min setup
              </span>
            </div>
            <div className="relative mt-2">
              <pre className="bg-black/80 rounded-xl border border-white/10 p-4 text-sm text-gray-200 overflow-x-auto mt-0">{`<!-- Paste before </body> -->\n<script \n  src="https://chatbot.pro/embed.js"\n  data-bot-id="your-bot-id"\n></script>`}</pre>
              <button className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 rounded-full p-1">
                <svg width="20" height="20" fill="none" className="text-white">
                  <rect
                    x="5"
                    y="7"
                    width="10"
                    height="7"
                    rx="2"
                    fill="currentColor"
                  />
                  <rect
                    x="8"
                    y="9"
                    width="7"
                    height="7"
                    rx="2"
                    fill="currentColor"
                    opacity=".6"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* React */}
          <div className="rounded-2xl bg-white/5 border border-white/10 shadow-lg p-8 flex flex-col mb-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-900/60">
                <svg width="24" height="24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#2955ad" />
                  <text
                    x="50%"
                    y="65%"
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="14"
                  >
                    📦
                  </text>
                </svg>
              </span>
              <div>
                <div className="text-xl font-semibold text-white">React</div>
                <div className="text-gray-400 text-sm">
                  React component for seamless integration
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap mb-3">
              <span className="bg-white/10 text-xs rounded px-2 py-0.5 text-gray-300">
                Easy
              </span>
              <span className="bg-white/10 text-xs rounded px-2 py-0.5 text-gray-300">
                3 min setup
              </span>
            </div>
            <div className="relative mt-2">
              <pre className="bg-black/80 rounded-xl border border-white/10 p-4 text-sm text-gray-200 overflow-x-auto mt-0">{`import ChatBot from '@chatbot-pro/react';\n\nfunction App() {\n  return (<ChatBot botId=\"your-bot-id\" />);\n}`}</pre>
              <button className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 rounded-full p-1">
                <svg width="20" height="20" fill="none" className="text-white">
                  <rect
                    x="5"
                    y="7"
                    width="10"
                    height="7"
                    rx="2"
                    fill="currentColor"
                  />
                  <rect
                    x="8"
                    y="9"
                    width="7"
                    height="7"
                    rx="2"
                    fill="currentColor"
                    opacity=".6"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* WordPress */}
          <div className="rounded-2xl bg-white/5 border border-white/10 shadow-lg p-8 flex flex-col mb-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-purple-900/60">
                <svg width="24" height="24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#7d37bb" />
                  <text
                    x="50%"
                    y="65%"
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="14"
                  >
                    🟪
                  </text>
                </svg>
              </span>
              <div>
                <div className="text-xl font-semibold text-white">
                  WordPress
                </div>
                <div className="text-gray-400 text-sm">
                  Plugin available in WordPress directory
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap mb-3">
              <span className="bg-white/10 text-xs rounded px-2 py-0.5 text-gray-300">
                Very Easy
              </span>
              <span className="bg-white/10 text-xs rounded px-2 py-0.5 text-gray-300">
                5 min setup
              </span>
            </div>
            <div className="relative mt-2">
              <pre className="bg-black/80 rounded-xl border border-white/10 p-4 text-sm text-gray-200 overflow-x-auto mt-0">{`1. Install "ChatBot Pro" plugin\n2. Activate the plugin\n3. Enter your Bot ID in settings\n4. Save and you're done!`}</pre>
              <button className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 rounded-full p-1">
                <svg width="20" height="20" fill="none" className="text-white">
                  <rect
                    x="5"
                    y="7"
                    width="10"
                    height="7"
                    rx="2"
                    fill="currentColor"
                  />
                  <rect
                    x="8"
                    y="9"
                    width="7"
                    height="7"
                    rx="2"
                    fill="currentColor"
                    opacity=".6"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Shopify */}
          <div className="rounded-2xl bg-white/5 border border-white/10 shadow-lg p-8 flex flex-col mb-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-green-900/60">
                <svg width="24" height="24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#348553" />
                  <text
                    x="50%"
                    y="65%"
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="14"
                  >
                    🟩
                  </text>
                </svg>
              </span>
              <div>
                <div className="text-xl font-semibold text-white">Shopify</div>
                <div className="text-gray-400 text-sm">
                  Add to your Shopify store theme
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap mb-3">
              <span className="bg-white/10 text-xs rounded px-2 py-0.5 text-gray-300">
                Easy
              </span>
              <span className="bg-white/10 text-xs rounded px-2 py-0.5 text-gray-300">
                4 min setup
              </span>
            </div>
            <div className="relative mt-2">
              <pre className="bg-black/80 rounded-xl border border-white/10 p-4 text-sm text-gray-200 overflow-x-auto mt-0">{`1. Go to Online Store > Themes\n2. Click "Edit code"\n3. Open theme.liquid\n4. Paste embed code before </body>\n5. Save`}</pre>
              <button className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 rounded-full p-1">
                <svg width="20" height="20" fill="none" className="text-white">
                  <rect
                    x="5"
                    y="7"
                    width="10"
                    height="7"
                    rx="2"
                    fill="currentColor"
                  />
                  <rect
                    x="8"
                    y="9"
                    width="7"
                    height="7"
                    rx="2"
                    fill="currentColor"
                    opacity=".6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Integration Options section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 mb-32">
        <div className="rounded-3xl bg-white/5 border border-white/10 shadow-2xl px-10 py-12 md:px-16 flex flex-col gap-10">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Advanced Integration Options
          </h2>
          {/* JavaScript API */}
          <div className="flex items-start gap-6">
            {/* Icon */}
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/10 mt-1">
              <svg
                viewBox="0 0 22 22"
                width="24"
                height="24"
                fill="none"
                className="text-gray-300"
              >
                <rect
                  x="3"
                  y="6"
                  width="16"
                  height="10"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  fill="none"
                />
                <path
                  d="M7 10l-2 1 2 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 11h-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <div className="flex-1">
              <div className="text-xl text-white font-semibold mb-0.5">
                JavaScript API
              </div>
              <div className="text-gray-400 mb-2 text-base">
                Control your chatbot programmatically with our JavaScript API
                for advanced customization.
              </div>
              <pre className="inline-block bg-black/90 text-green-400 rounded-md px-3 py-2 text-sm mt-0 font-mono">
                ChatBotPro.show(); ChatBotPro.hide();
              </pre>
            </div>
          </div>
          {/* Custom Triggers */}
          <div className="flex items-start gap-6">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/10 mt-1">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <rect
                  x="6"
                  y="6"
                  width="12"
                  height="12"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <rect
                  x="3"
                  y="3"
                  width="5"
                  height="5"
                  rx="2"
                  fill="currentColor"
                  className="text-gray-300"
                  opacity=".3"
                />
                <rect
                  x="16"
                  y="3"
                  width="5"
                  height="5"
                  rx="2"
                  fill="currentColor"
                  className="text-gray-300"
                  opacity=".3"
                />
                <rect
                  x="3"
                  y="16"
                  width="5"
                  height="5"
                  rx="2"
                  fill="currentColor"
                  className="text-gray-300"
                  opacity=".3"
                />
                <rect
                  x="16"
                  y="16"
                  width="5"
                  height="5"
                  rx="2"
                  fill="currentColor"
                  className="text-gray-300"
                  opacity=".3"
                />
              </svg>
            </span>
            <div className="flex-1">
              <div className="text-xl text-white font-semibold mb-0.5">
                Custom Triggers
              </div>
              <div className="text-gray-400 text-base">
                Set up custom triggers based on user behavior, time on page,
                scroll depth, or exit intent.
              </div>
            </div>
          </div>
          {/* Multi-Domain Support */}
          <div className="flex items-start gap-6">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/10 mt-1">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M7 12a5 5 0 0 1 10 0v0a5 5 0 0 1-10 0"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="2.5"
                  fill="currentColor"
                  className="text-gray-300"
                  opacity=".3"
                />
              </svg>
            </span>
            <div className="flex-1">
              <div className="text-xl text-white font-semibold mb-0.5">
                Multi-Domain Support
              </div>
              <div className="text-gray-400 text-base">
                Use the same chatbot across multiple domains with centralized
                analytics and settings.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - simple copyright bar */}
      <footer className="w-full border-t border-white/10 bg-[#0a0a0a] px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-3 mt-20">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-white rounded-xl">
            <ChatIcon className="w-6 h-6 text-black" />
          </span>
          <span className="text-xl text-white font-medium">ChatBot Pro</span>
        </div>
        <div className="text-gray-400 text-sm">
          © {new Date().getFullYear()} ChatBot Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
