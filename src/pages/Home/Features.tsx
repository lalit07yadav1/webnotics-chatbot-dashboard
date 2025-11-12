import Button from "../../components/ui/button/Button";
import * as Icons from "../../icons";
import { Link, useNavigate } from "react-router";

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
            <Link
              to="/"
              className="mr-3 text-gray-400 hover:text-white transition-colors"
            >
              ← Back
            </Link>
            <div className="relative w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow">
              <Icons.ChatIcon className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl tracking-tight text-white font-semibold ml-1">
              ChatBot Pro
            </span>
          </div>
          <Button
            className="bg-black text-white font-bold px-6 py-2 rounded-full shadow-lg hover:bg-blue-light-100"
            onClick={() => navigate('/signup')}
          >
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

      {/* And Much More Section */}
      <div className="relative z-10 py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-6xl font-bold text-center mb-3 text-white/90 tracking-tight">And Much More</h2>
        <p className="text-2xl text-gray-400 mb-16 text-center font-medium">
          Powerful features to make your chatbot stand out
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 flex items-start gap-4 min-h-[160px] shadow-xl">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/[0.08] mr-2">
              <Icons.ConversationIcon className="w-8 h-8 text-gray-200" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Smart Conversations</h3>
              <p className="text-gray-400 text-base">AI-powered responses that understand context and intent</p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 flex items-start gap-4 min-h-[160px] shadow-xl">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/[0.08] mr-2">
              <Icons.BoltIcon className="w-8 h-8 text-gray-200" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Lightning Fast</h3>
              <p className="text-gray-400 text-base">Instant responses with optimized performance</p>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 flex items-start gap-4 min-h-[160px] shadow-xl">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/[0.08] mr-2">
              <Icons.FileIcon className="w-8 h-8 text-gray-200" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Multi-Format Support</h3>
              <p className="text-gray-400 text-base">Import content from various file formats</p>
            </div>
          </div>
          {/* Feature 4: Advanced Settings (using BoxIcon as substitute) */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 flex items-start gap-4 min-h-[160px] shadow-xl">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/[0.08] mr-2">
              <Icons.BoxIcon className="w-8 h-8 text-gray-200" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Advanced Settings</h3>
              <p className="text-gray-400 text-base">Fine-tune behavior and appearance</p>
            </div>
          </div>
          {/* Feature 5: Flexible Layouts */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 flex items-start gap-4 min-h-[160px] shadow-xl">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/[0.08] mr-2">
              <Icons.GridIcon className="w-8 h-8 text-gray-200" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Flexible Layouts</h3>
              <p className="text-gray-400 text-base">Multiple display options for different use cases</p>
            </div>
          </div>
          {/* Feature 6: Auto-Learning */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 flex items-start gap-4 min-h-[160px] shadow-xl">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/[0.08] mr-2">
              <Icons.ShootingStarIcon className="w-8 h-8 text-gray-200" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Auto-Learning</h3>
              <p className="text-gray-400 text-base">Improves responses based on interactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Free vs Premium Features Table Section */}
      <div className="relative z-10 flex justify-center items-center pb-24 px-4">
        <div className="w-full max-w-4xl bg-white/5 rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="py-10 px-5 md:px-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white/90">Free vs Premium Features</h2>
            <div className="divide-y divide-white/10">
              {/* Table header row */}
              <div className="grid grid-cols-3 gap-1 py-2 text-gray-400 text-lg font-medium">
                <div></div>
                <div className="text-center">Free</div>
                <div className="text-center">Premium</div>
              </div>
              {/* Table rows */}
              {[
                { label: 'Visual Chatbot Designer', free: 'check', premium: 'check' },
                { label: 'Custom Branding', free: '-', premium: 'check' },
                { label: 'FAQ Builder', free: 'Limited', premium: 'Unlimited' },
                { label: 'Knowledge Base Upload', free: '-', premium: 'check' },
                { label: 'Advanced Analytics', free: '-', premium: 'check' },
                { label: 'Custom CSS/JS', free: '-', premium: 'check' },
                { label: 'Priority Support', free: '-', premium: 'check' },
                { label: 'Remove Branding', free: '-', premium: 'check' },
              ].map(({ label, free, premium }) => (
                <div key={label} className="grid grid-cols-3 gap-1 py-3 items-center text-base md:text-lg">
                  <div className="text-left text-white/85 pl-1">{label}</div>
                  <div className="text-center">
                    {free === 'check' ? (
                      <Icons.CheckCircleIcon className="inline w-5 h-5 text-green-500" />
                    ) : free === '-' ? (
                      <span className="text-gray-400 text-xl">—</span>
                    ) : (
                      <span className="text-gray-400 font-semibold">{free}</span>
                    )}
                  </div>
                  <div className="text-center">
                    {premium === 'check' ? (
                      <Icons.CheckCircleIcon className="inline w-5 h-5 text-green-500" />
                    ) : premium === '-' ? (
                      <span className="text-gray-400 text-xl">—</span>
                    ) : (
                      <span className="font-bold text-white">{premium}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-gray-500 text-sm bg-[#0f0f0f] px-8 py-3 border-t border-white/10 rounded-b-3xl">
            <span>Free Plan</span>
            <span>Premium Plan</span>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-gradient-to-r from-[#0a0a0a] to-[#10131a] px-8 py-5 flex items-center justify-between border-t border-white/5 text-white/80 text-base" style={{boxShadow: '0 -1px 8px 0 rgba(0,0,0,0.2)'}}>
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center"><Icons.ChatIcon className="w-6 h-6 text-black" /></span>
          <span className="font-semibold text-xl text-white ml-1">ChatBot Pro</span>
        </div>
        <span className="text-gray-400 text-base">© 2025 ChatBot Pro. All rights reserved.</span>
      </footer>
    </div>
  );
}
