import * as Icons from '../../icons';
import { useNavigate } from "react-router";

const docs = [
  {
    title: 'How to create your first chatbot',
    time: '5 min read',
  },
  {
    title: 'Customizing chatbot colors and styles',
    time: '8 min read',
  },
  {
    title: 'Adding chatbot to WordPress',
    time: '6 min read',
  },
  {
    title: 'Setting up FAQ responses',
    time: '10 min read',
  },
  {
    title: 'Using the JavaScript API',
    time: '12 min read',
  },
];

export default function FAQ() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-hidden">
      {/* Grid BG Overlay */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)] z-0"></div>
      {/* Top Header */}
      <nav className="relative z-10 border-b border-white/8 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="mr-3 cursor-pointer text-gray-400 hover:text-white text-base" tabIndex={0} role="button" onClick={() => navigate(-1)}>
              ← Back
            </span>
            <span className="relative w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow">
              <Icons.ChatIcon className="w-6 h-6 text-black" />
            </span>
            <span className="text-xl tracking-tight text-white font-semibold ml-1">ChatBot Pro</span>
      </div>
          <button
            className="bg-white text-black font-bold px-6 py-2 rounded-full shadow hover:bg-gray-200 flex items-center gap-2 text-base"
            onClick={() => navigate('/signup')}
          >
            Get Started Free <Icons.ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </nav>
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-2 relative z-10 w-full max-w-7xl mx-auto">
        {/* Docs badge/title/subtitle/search */}
        <div className="flex flex-col items-center mt-20 md:mt-28 mb-12 text-center w-full">
          <span className="mb-8 inline-block bg-white/10 border border-white/20 px-4 py-2 text-xs font-medium rounded-full text-gray-200 tracking-wide uppercase">
            <span className="inline-flex items-center gap-1"><Icons.DocsIcon className="w-5 h-5 mr-1 inline-block" /> Documentation</span>
          </span>
          <h1 className="text-6xl font-bold mb-6 text-white/90 tracking-tight">Documentation</h1>
          <p className="text-2xl text-gray-400 mb-11 max-w-2xl">Everything you need to know about ChatBot Pro</p>
          <input className="w-full max-w-2xl bg-[#181a1d] border border-white/10 rounded-xl p-4 text-gray-400 placeholder-gray-500 text-lg mb-14 focus:outline-none focus:border-white/20 transition shadow" placeholder="Search documentation..." disabled />
        </div>
        {/* Popular Articles */}
        <div className="w-full max-w-6xl mx-auto mt-8">
          <h3 className="text-2xl md:text-2xl font-bold text-white mb-7 pl-2">Popular Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
            {docs.map((d) => (
              <div key={d.title} className="rounded-2xl bg-white/5 border border-white/10 shadow-md p-7 flex flex-col gap-2 min-h-[120px] hover:bg-white/10 transition relative">
                <div className="flex items-center gap-3 mb-2">
                  <Icons.PageIcon className="w-6 h-6 text-white/80 flex-shrink-0" />
                  <span className="ml-auto text-xs text-gray-400 absolute right-7">{d.time}</span>
                </div>
                <div className="mt-1 text-lg font-medium text-white/90">{d.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Browse by Category Section */}
        <div className="w-full max-w-7xl mx-auto mt-24 mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {/* Getting Started */}
            <div className="rounded-2xl bg-white/5 border border-white/10 shadow-md p-8 flex flex-col gap-3 min-h-[280px]">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-blue-900 mb-2">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#3b82f6"/><polygon points="10,8 18,12 10,16" fill="#fff"/></svg>
              </div>
              <div className="text-2xl font-semibold text-white mb-1">Getting Started</div>
              <div className="text-gray-400 text-base mb-4">Quick start guides and tutorials</div>
              <ul className="flex flex-col gap-1 text-gray-300 text-base pl-2">
                <li>→ Create your first chatbot</li>
                <li>→ Design customization basics</li>
                <li>→ Integrate with your website</li>
                <li>→ Understanding the dashboard</li>
              </ul>
            </div>
            {/* Design & Customization */}
            <div className="rounded-2xl bg-white/5 border border-white/10 shadow-md p-8 flex flex-col gap-3 min-h-[280px]">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-purple-900 mb-2">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#a855f7"/><circle cx="12" cy="12" r="5" fill="#fff" opacity="0.6"/></svg>
              </div>
              <div className="text-2xl font-semibold text-white mb-1">Design & Customization</div>
              <div className="text-gray-400 text-base mb-4">Visual designer and styling options</div>
              <ul className="flex flex-col gap-1 text-gray-300 text-base pl-2">
                <li>→ Using the visual designer</li>
                <li>→ Custom color schemes</li>
                <li>→ Typography and fonts</li>
                <li>→ Chat bubble styles</li>
                <li>→ Position and layout</li>
                <li>→ Animations and effects</li>
              </ul>
            </div>
            {/* Integration */}
            <div className="rounded-2xl bg-white/5 border border-white/10 shadow-md p-8 flex flex-col gap-3 min-h-[280px]">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-green-900 mb-2">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#22c55e"/><path d="M8 14h8v-2H8v2zm0-4v2h8V8H8v2zm0-4v2h8V4H8z" fill="#fff"/></svg>
              </div>
              <div className="text-2xl font-semibold text-white mb-1">Integration</div>
              <div className="text-gray-400 text-base mb-4">Platform-specific integration guides</div>
              <ul className="flex flex-col gap-1 text-gray-300 text-base pl-2">
                <li>→ HTML/JavaScript integration</li>
                <li>→ React integration</li>
                <li>→ WordPress plugin setup</li>
                <li>→ Shopify installation</li>
                <li>→ Advanced JavaScript API</li>
                <li>→ Custom triggers</li>
              </ul>
            </div>
            {/* Configuration */}
            <div className="rounded-2xl bg-white/5 border border-white/10 shadow-md p-8 flex flex-col gap-3 min-h-[280px]">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-orange-900 mb-2">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ea580c"/><path d="M12 8v4l3 2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <div className="text-2xl font-semibold text-white mb-1">Configuration</div>
              <div className="text-gray-400 text-base mb-4">Bot settings and behavior</div>
              <ul className="flex flex-col gap-1 text-gray-300 text-base pl-2">
                <li>→ FAQ builder guide</li>
                <li>→ Knowledge base setup</li>
                <li>→ Conversation flows</li>
                <li>→ Auto-responses</li>
                <li>→ Greeting messages</li>
              </ul>
            </div>
            {/* Features */}
            <div className="rounded-2xl bg-white/5 border border-white/10 shadow-md p-8 flex flex-col gap-3 min-h-[280px]">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-purple-800 mb-2">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#a21caf"/><polygon points="12,6 19,21 5,21" fill="#fff"/></svg>
              </div>
              <div className="text-2xl font-semibold text-white mb-1">Features</div>
              <div className="text-gray-400 text-base mb-4">Platform features and capabilities</div>
              <ul className="flex flex-col gap-1 text-gray-300 text-base pl-2">
                <li>→ Analytics and reporting</li>
                <li>→ Multi-language support</li>
                <li>→ File upload handling</li>
                <li>→ Integration with tools</li>
                <li>→ User data management</li>
              </ul>
            </div>
            {/* API Reference */}
            <div className="rounded-2xl bg-white/5 border border-white/10 shadow-md p-8 flex flex-col gap-3 min-h-[280px]">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-teal-900 mb-2">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#0d9488"/><rect x="7" y="8" width="10" height="10" rx="2" fill="#fff"/></svg>
              </div>
              <div className="text-2xl font-semibold text-white mb-1">API Reference</div>
              <div className="text-gray-400 text-base mb-4">Developer documentation</div>
              <ul className="flex flex-col gap-1 text-gray-300 text-base pl-2">
                <li>→ REST API overview</li>
                <li>→ Authentication</li>
                <li>→ JavaScript SDK</li>
                <li>→ Webhooks</li>
                <li>→ Rate limiting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <footer className="w-full bg-gradient-to-r from-[#0a0a0a] to-[#10131a] px-8 py-5 flex items-center justify-between border-t border-white/5 text-white/80 text-base relative z-10" style={{boxShadow: '0 -1px 8px 0 rgba(0,0,0,0.2)'}}>
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center"><Icons.ChatIcon className="w-6 h-6 text-black" /></span>
          <span className="font-semibold text-xl text-white ml-1">ChatBot Pro</span>
        </div>
        <span className="text-gray-400 text-base">© 2025 ChatBot Pro. All rights reserved.</span>
      </footer>
    </div>
  );
}
