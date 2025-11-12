import * as Icons from '../../icons';
import { useNavigate } from 'react-router';

export default function Contact() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-hidden">
      {/* Grid overlay background */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)] z-0"></div>
      {/* Header nav */}
      <nav className="relative z-10 border-b border-white/8 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="mr-3 cursor-pointer text-gray-400 hover:text-white text-base" tabIndex={0} role="button" onClick={() => navigate(-1)}>
              ← Back
            </span>
            <span className="relative w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow">
              <Icons.ChatIcon className="w-6 h-6 text-black" />
            </span>
            <span className="text-xl tracking-tight text-white font-semibold ml-1">
              ChatBot Pro
            </span>
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
      <div className="flex-1 flex flex-col items-center relative z-10 w-full max-w-7xl mx-auto px-2">
        {/* Badge and titles */}
        <div className="flex flex-col items-center mt-20 md:mt-28 mb-12 text-center">
          <span className="mb-7 inline-block bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-medium rounded-full text-gray-200 tracking-wide uppercase">
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 mr-1 inline-block" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="4" width="16" height="12" rx="5" fill="#fff" fillOpacity=".12" />
                <rect x="9" y="12" width="2" height="2" rx="1" fill="#fff" fillOpacity={0.5} />
              </svg>
              We&apos;re Here to Help
            </span>
          </span>
          <h1 className="text-6xl font-bold mb-5 text-white/90 tracking-tight">Support</h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl">Get help when you need it, however you need it</p>
          <h2 className="text-3xl font-bold text-white mb-14">How can we help?</h2>
        </div>
        {/* Cards Grid */}
        <div className="relative z-10 w-full max-w-6xl mx-auto mb-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 px-2">
          {/* Live chat card */}
          <div className="rounded-2xl bg-white/5 border border-white/10 shadow-2xl flex flex-col gap-6 p-8 min-h-[300px] items-start justify-between">
            <div className="flex flex-col gap-2 w-full">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#232e45] mb-2">
                {/* chat bubble icon */}
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="5" stroke="#aac0ee" strokeWidth="1.7" fill="#283249"/><rect x="11" y="14" width="2" height="2" rx="1" fill="#aac0ee"/></svg>
              </div>
              <div className="text-xl font-bold text-white">Live Chat</div>
              <div className="text-gray-300 mb-1 text-base">Chat with our support team in real-time</div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <svg className="inline w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 20 20"><path d="M12 8V4M8 8V4M3 8h14" strokeLinecap="round"/><circle cx="10" cy="14" r="4" /></svg>
                Available 24/7
              </div>
            </div>
            <button className="mt-auto w-full px-2 py-2 rounded-lg bg-black/30 border border-white/15 text-white font-semibold hover:bg-white/10">Start Chat</button>
          </div>
          {/* Email support card */}
          <div className="rounded-2xl bg-white/5 border border-white/10 shadow-2xl flex flex-col gap-6 p-8 min-h-[300px] items-start justify-between">
            <div className="flex flex-col gap-2 w-full">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#584179] mb-2">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="5" stroke="#b29be9" strokeWidth="1.7" fill="#39294b" /><path d="M5 7l7 5 7-5" stroke="#b29be9" strokeWidth="1.5" /></svg>
              </div>
              <div className="text-xl font-bold text-white">Email Support</div>
              <div className="text-gray-300 mb-1 text-base">Send us an email and we&apos;ll respond within 24 hours</div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <svg className="inline w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 20 20"><path d="M6.25 10L10 13.75 13.75 10" strokeLinecap="round"/><rect x="2.5" y="5.833" width="15" height="8.334" rx="4.167"/></svg>
                Response in 24h
              </div>
            </div>
            <button className="mt-auto w-full px-2 py-2 rounded-lg bg-black/30 border border-white/15 text-white font-semibold hover:bg-white/10">Send Email</button>
          </div>
          {/* Documentation card */}
          <div className="rounded-2xl bg-white/5 border border-white/10 shadow-2xl flex flex-col gap-6 p-8 min-h-[300px] items-start justify-between">
            <div className="flex flex-col gap-2 w-full">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#2d453c] mb-2">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="#8ecfbe" strokeWidth="1.7" fill="#173529"/><path d="M8 10h8M8 13h5" stroke="#8ecfbe" strokeWidth="1.5" /></svg>
              </div>
              <div className="text-xl font-bold text-white">Documentation</div>
              <div className="text-gray-300 mb-1 text-base">Browse our comprehensive guides and tutorials</div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <svg className="inline w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7"/></svg>
                Always available
              </div>
            </div>
            <button className="mt-auto w-full px-2 py-2 rounded-lg bg-black/30 border border-white/15 text-white font-semibold hover:bg-white/10">View Docs</button>
          </div>
        </div>
        {/* Contact Form Section */}
        <div className="w-full flex flex-col items-center justify-center pb-24">
          <div className="max-w-3xl w-full mx-auto">
            <div className="bg-[#16181a] bg-opacity-90 rounded-3xl shadow-2xl border border-white/10 p-10 md:p-12 flex flex-col items-center w-full">
              <div className="flex items-center w-full mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mr-4">
                  {/* Mail/email icon */}
                  <svg width='24' height='24' fill='none' viewBox='0 0 24 24'><rect x='2' y='4' width='20' height='16' rx='6' fill='#fff' fillOpacity='.12'/><rect x='11' y='14' width='2' height='2' rx='1' fill='#fff' fillOpacity='0.7'/></svg>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-0 text-left">Send us a message</h2>
                  <div className="text-gray-400 text-sm text-left">We&apos;ll get back to you within 24 hours</div>
                </div>
              </div>
              <form className="w-full flex flex-col gap-5">
                <div className="flex gap-5 w-full">
                  <div className="flex-1 flex flex-col">
                    <label className="mb-1 text-sm text-white/80 font-semibold" htmlFor="name">Name</label>
                    <input type="text" id="name" aria-label="Name" placeholder="John Doe" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <label className="mb-1 text-sm text-white/80 font-semibold" htmlFor="email">Email</label>
                    <input type="email" id="email" aria-label="Email" placeholder="john@example.com" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <label className="mb-1 text-sm text-white/80 font-semibold" htmlFor="subject">Subject</label>
                  <input type="text" id="subject" aria-label="Subject" placeholder="How can we help?" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary" />
                </div>
                <div className="flex flex-col w-full">
                  <label className="mb-1 text-sm text-white/80 font-semibold" htmlFor="message">Message</label>
                  <textarea id="message" aria-label="Message" placeholder="Tell us more about your question or issue..." rows={3} className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none" />
                </div>
                <button type="submit" className="mt-2 w-full py-3 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-2 transition hover:bg-white/80 focus:outline-none focus:ring focus:ring-primary text-base">
                  Send Message
                  <svg className="ml-2 inline w-4 h-4" fill="none" viewBox="0 0 24 24"><path d="M2 21l21-9-21-9v7l15 2-15 2z" fill="currentColor" /></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* FAQ Heading under form */}
        <div className="w-full text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">Frequently Asked Questions</h2>
          <div className="text-gray-400 text-lg mb-8">Quick answers to common questions</div>
        </div>
        {/* FAQ Card List */}
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pb-24">
          {[
            {
              q: 'How do I create my first chatbot?',
              a: 'Sign up for a free account, use our visual designer to customize your chatbot, and copy the embed code to your website.',
            },
            {
              q: 'Can I use ChatBot Pro on multiple websites?',
              a: 'Yes! Premium plan includes multi-domain support, allowing you to use your chatbots across unlimited websites.',
            },
            {
              q: 'What file formats can I upload to the knowledge base?',
              a: 'You can upload PDF, DOCX, and TXT files. Premium users can upload unlimited documents.',
            },
            {
              q: 'How do I customize the chatbot design?',
              a: 'Use our visual designer to customize colors, fonts, layouts, and animations without any coding required.',
            },
            {
              q: 'Is there a mobile app?',
              a: 'Currently, ChatBot Pro is web-based. However, chatbots you create work perfectly on all mobile devices.',
            },
            {
              q: 'How do I upgrade or downgrade my plan?',
              a: 'Go to your dashboard settings and select "Billing" to manage your subscription plan at any time.',
            },
          ].map((faq, i) => (
            <div key={faq.q} className="bg-[#18191b] rounded-2xl border border-white/10 px-7 py-6 flex flex-col gap-1 shadow-xl">
              <div className="flex items-start mb-1">
                {/* Info icon (question) */}
                <svg className="w-5 h-5 mt-0.5 mr-3 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" /><text x="6" y="15" fontSize="10" fill="#aaa">?</text></svg>
                <span className="font-semibold text-lg text-white leading-snug">{faq.q}</span>
              </div>
              <div className="pl-8 pt-1 text-gray-400 text-base">{faq.a}</div>
            </div>
          ))}
        </div>
        {/* Metrics Card Section */}
        <div className="w-full flex flex-col items-center justify-center mb-24">
          <div className="w-full max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row items-center md:items-stretch justify-between px-8 py-12 md:py-10 md:px-24 gap-8 md:gap-0">
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="text-4xl md:text-5xl font-bold text-black mb-2">24/7</div>
                <div className="text-gray-700 text-xl md:text-2xl text-center font-normal">Live Chat Support</div>
              </div>
              <div className="hidden md:block border-l border-gray-200 mx-8"></div>
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="text-4xl md:text-5xl font-bold text-black mb-2">&lt;24h</div>
                <div className="text-gray-700 text-xl md:text-2xl text-center font-normal">Email Response Time</div>
              </div>
              <div className="hidden md:block border-l border-gray-200 mx-8"></div>
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="text-4xl md:text-5xl font-bold text-black mb-2">98%</div>
                <div className="text-gray-700 text-xl md:text-2xl text-center font-normal">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer - like Pricing/Feature */}
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
