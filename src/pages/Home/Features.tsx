import React from "react";
import Button from "../../components/ui/button/Button";
import * as Icons from "../../icons";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <Icons.ListIcon className="w-7 h-7 text-blue-400" />, // FAQ
    title: "FAQ Builder",
    description:
      "Easily create and manage common Q&A pairs, keeping your chatbot up to date and relevant for users.",
  },
  {
    icon: <Icons.DocsIcon className="w-7 h-7 text-purple-400" />, // Knowledge
    title: "Knowledge Base",
    description:
      "Upload documents (PDF, DOCX, TXT) and let the bot provide instant, accurate answers from your knowledge base.",
  },
  {
    icon: <Icons.PlugInIcon className="w-7 h-7 text-green-400" />, // Embed/code
    title: "One-Click Embed",
    description:
      "Just one snippet integrates your chatbot with any major website or platform—no developer required.",
  },
  {
    icon: <Icons.GroupIcon className="w-7 h-7 text-orange-400" />, // Website/teams
    title: "Multi-Platform Support",
    description:
      "Your chatbot is ready to work instantly on websites, apps, or any digital channel you choose.",
  },
  {
    icon: <Icons.PieChartIcon className="w-7 h-7 text-pink-400" />, // Analytics
    title: "Analytics & Insights",
    description:
      "Track conversations, engagement, and user satisfaction metrics right from the dashboard.",
  },
  {
    icon: <Icons.PaperPlaneIcon className="w-7 h-7 text-cyan-400" />, // Custom branding
    title: "Custom Branding",
    description:
      "Easily match your chatbot’s style, name, and colors to your brand, for a fully custom experience.",
  },
];

export default function Features() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Header & navigation */}
      <nav className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <span
              className="mr-3 cursor-pointer text-gray-400 hover:text-white"
              onClick={() => navigate("/home/overview")}
              tabIndex={0} // for accessibility
              role="button"
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  navigate("/home/overview");
              }}
            >
              ← Back
            </span>
            <div className="relative w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow">
              <Icons.ChatIcon className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl tracking-tight text-white font-semibold ml-1">
              ChatBot Pro
            </span>
          </div>
          <Button className="bg-black text-white font-bold px-6 py-2 rounded-full shadow-lg hover:bg-blue-light-100">
            Get Started Free →
          </Button>
        </div>
      </nav>

      {/* Subtle grid overlay bg */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]"></div>

      {/* Centered title and subtitle */}
      <div className="relative z-10 w-full max-w-2xl mx-auto pt-20 pb-4 text-center">
        <h1 className="text-6xl font-bold mb-6 text-white/90 tracking-tight">
          Features
        </h1>
        <p className="text-2xl text-gray-400 mb-12">
          Everything you need to launch a helpful, smart, and brand-matched
          chatbot in minutes.
        </p>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 pb-24">
        {features.map(({ icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-gray-800 bg-white/[0.03] p-8 flex flex-col items-start gap-4 hover:bg-white/10 transition shadow-xl min-h-[210px]"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl mb-2">
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-white/90 mb-1">
              {title}
            </h3>
            <p className="text-gray-400 leading-relaxed text-base">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
