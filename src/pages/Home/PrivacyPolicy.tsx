import * as Icons from '../../icons';
import { useNavigate } from 'react-router';

const UPDATED_DATE = 'November 12, 2025'; // Use current date as in the screenshot

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-hidden">
      {/* Grid BG */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)] z-0"></div>
      {/* Header nav */}
      <nav className="relative z-10 border-b border-white/8 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="mr-3 cursor-pointer text-gray-400 hover:text-white text-base" tabIndex={0} role="button" onClick={() => navigate(-1)}>← Back</span>
            <span className="relative w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow"><Icons.ChatIcon className="w-6 h-6 text-black" /></span>
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
      <div className="flex-1 flex flex-col items-center px-2 relative z-10 w-full max-w-5xl mx-auto">
        {/* Badge/title/subtitle/date */}
        <div className="flex flex-col items-center mt-20 md:mt-28 mb-10 text-center w-full">
          <span className="mb-6 inline-block bg-white/10 border border-white/20 px-5 py-1.5 text-xs font-medium rounded-full text-gray-200 tracking-wide uppercase">
            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4 mr-1 inline-block" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" fill="#fff" fillOpacity=".12" /><circle cx="10" cy="10" r="3" fill="#fff" fillOpacity=".33"/></svg>
              Your Privacy Matters
            </span>
          </span>
          <h1 className="text-6xl font-bold mb-6 text-white/90 tracking-tight">Privacy Policy</h1>
          <p className="text-xl text-gray-400 mb-1">How we collect, use, and protect your information</p>
          <div className="text-base text-gray-400 mt-1">Last updated: {UPDATED_DATE}</div>
        </div>
        {/* Glass Card intro */}
        <div className="w-full flex flex-col items-center mb-10">
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start">
            <div className="text-gray-200 text-lg mb-2">
              At ChatBot Pro, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </div>
            <div className="text-gray-400 text-sm">
              By using ChatBot Pro, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our service.
            </div>
          </div>
        </div>
        {/* Information We Collect Card */}
        <div className="w-full flex flex-col items-center mb-10">
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start">
            <div className="flex items-center mb-6">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="#fff" opacity="0.3"/></svg>
              </span>
              <span className="text-2xl font-bold text-white">Information We Collect</span>
            </div>
            <div className="mb-4">
              <div className="font-semibold text-white text-lg mb-1">Account Information</div>
              <div className="text-gray-300 text-base">When you create an account, we collect your name, email address, and payment information (processed securely through Stripe).</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold text-white text-lg mb-1">Usage Data</div>
              <div className="text-gray-300 text-base">We collect information about how you use our service, including chatbot configurations, conversation analytics, and feature usage.</div>
            </div>
            <div className="mb-2">
              <div className="font-semibold text-white text-lg mb-1">Technical Information</div>
              <div className="text-gray-300 text-base">We automatically collect device information, IP addresses, browser type, and operating system to improve our service.</div>
            </div>
          </div>
        </div>
        {/* How We Use Your Information Card */}
        <div className="w-full flex flex-col items-center mb-16">
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start">
            <div className="flex items-center mb-6">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/><path d="M12 8v4l3 2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              </span>
              <span className="text-2xl font-bold text-white">How We Use Your Information</span>
            </div>
            <div className="mb-4">
              <div className="font-semibold text-white text-lg mb-1">Service Delivery</div>
              <div className="text-gray-300 text-base">We use your information to provide, maintain, and improve ChatBot Pro services.</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold text-white text-lg mb-1">Communication</div>
              <div className="text-gray-300 text-base">We may send you service updates, security alerts, and support messages. Marketing emails are opt-in only.</div>
            </div>
            <div>
              <div className="font-semibold text-white text-lg mb-1">Analytics</div>
              <div className="text-gray-300 text-base">We analyze usage data to understand and improve product performance and user satisfaction.</div>
            </div>
          </div>
        </div>
        {/* Data Security */}
        <div className="w-full flex flex-col items-center mb-10">
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start">
            <div className="flex items-center mb-6">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2" stroke="#fff" strokeWidth="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="#fff" strokeWidth="2"/></svg>
              </span>
              <span className="text-2xl font-bold text-white">Data Security</span>
            </div>
            <div className="mb-4">
              <div className="font-semibold text-white text-lg mb-1">Encryption</div>
              <div className="text-gray-300 text-base">All data is encrypted in transit using SSL/TLS and at rest using industry-standard encryption.</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold text-white text-lg mb-1">Access Controls</div>
              <div className="text-gray-300 text-base">We implement strict access controls and authentication measures to protect your data.</div>
            </div>
            <div>
              <div className="font-semibold text-white text-lg mb-1">Regular Audits</div>
              <div className="text-gray-300 text-base">Our security practices are regularly reviewed and updated to meet industry standards.</div>
            </div>
          </div>
        </div>
        {/* Your Rights */}
        <div className="w-full flex flex-col items-center mb-10">
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start">
            <div className="text-2xl font-bold text-white mb-7">Your Rights</div>
            <ul className="space-y-3 pl-1 text-lg">
              {[
                'Access and receive a copy of your personal data',
                'Request correction of inaccurate or incomplete data',
                'Request deletion of your personal data',
                'Object to processing of your personal data',
                'Request restriction of processing your data',
                'Data portability rights',
              ].map((text) => (
                <li key={text} className="flex items-center gap-2 text-white/90">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="none" stroke="#22c55e" strokeWidth="2"><circle cx="10" cy="10" r="10" strokeOpacity="0.5"/><path d="M6 10.5l3 3 5-5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="text-base text-white/90">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Cookies and Tracking */}
        <div className="w-full flex flex-col items-center mb-10">
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start">
            <div className="text-2xl font-bold text-white mb-4">Cookies and Tracking</div>
            <div className="text-gray-300 text-lg mb-2">We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</div>
            <div className="text-gray-300 text-lg">We use both session and persistent cookies for analytics, preferences, and security purposes.</div>
          </div>
        </div>
        {/* Contact Us */}
        <div className="w-full flex flex-col items-center mb-16">
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start">
            <div className="text-2xl font-bold text-white mb-4">Contact Us</div>
            <div className="text-gray-300 text-lg mb-2">If you have any questions about this Privacy Policy, please contact us:</div>
            <div className="text-base text-gray-400 mb-1">Email: privacy@chatbotpro.com</div>
            <div className="text-base text-gray-400">Address: ChatBot Pro, Inc., San Francisco, CA</div>
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
