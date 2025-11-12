import * as Icons from '../../icons';
import { useNavigate } from 'react-router';

const UPDATED_DATE = 'November 12, 2025'; // Use current date as in the screenshot

export default function Terms() {
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
              <svg className="w-4 h-4 mr-1 inline-block" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="4" fill="#fff" fillOpacity=".15"/><path d="M7 6h6M7 10h6M7 14h4" stroke="#fff" strokeWidth="1.7" strokeLinecap="round"/></svg>
              Legal Agreement
            </span>
          </span>
          <h1 className="text-6xl font-bold mb-6 text-white/90 tracking-tight">Terms of Service</h1>
          <p className="text-xl text-gray-400 mb-1">Please read these terms carefully before using our service</p>
          <div className="text-base text-gray-400 mt-1">Last updated: {UPDATED_DATE}</div>
        </div>
        {/* Important warning card */}
        <div className="w-full flex flex-col items-center mb-12">
          <div className="max-w-5xl w-full mx-auto rounded-2xl bg-[#2c1810] border border-[#da8927] shadow-2xl p-7 flex flex-row gap-4 items-start">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#864500] mt-1">
              <svg className="w-4 h-4" fill="none" stroke="#ffbb4c" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#ffbb4c" strokeWidth="2"/><circle cx="12" cy="16" r="1.2" fill="#ffbb4c"/><path d="M12 8v5" stroke="#ffbb4c" strokeWidth="2"/></svg>
            </span>
            <div>
              <div className="font-semibold text-white mb-1 text-base">Important</div>
              <div className="text-white text-sm text-opacity-90">
                These Terms of Service constitute a legally binding agreement between you and ChatBot Pro. By using our service, you acknowledge that you have read, understood, and agree to be bound by these terms.
              </div>
            </div>
          </div>
        </div>
        {/* Section 2: Use License */}
        <div className="w-full flex flex-col items-center mb-10">
        <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start mb-10">
            <div className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</div>
            <div className="text-gray-200 text-base mb-2">By accessing and using ChatBot Pro, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</div>
          </div>
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start">
            <div className="text-xl font-bold text-white mb-4">2. Use License</div>
            <div className="text-gray-200 text-base mb-2">Permission is granted to temporarily use ChatBot Pro for personal or commercial use. This is the grant of a license, not a transfer of title, and under this license you may not:</div>
            <ul className="text-base text-gray-300 list-disc pl-6 space-y-1">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose without a valid subscription</li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              <li>Share your login credentials or allow third parties to access your account</li>
            </ul>
          </div>
        </div>
        {/* Section 3: Service Description */}
        <div className="w-full flex flex-col items-center mb-10">
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start">
            <div className="text-xl font-bold text-white mb-4">3. Service Description</div>
            <div className="text-gray-200 text-base mb-2">ChatBot Pro provides a platform for creating, customizing, and deploying chatbots. We reserve the right to modify, suspend, or discontinue the service at any time without notice. We may also impose limits on certain features or restrict your access to parts or all of the service without notice or liability.</div>
          </div>
        </div>
        {/* Section 4: Account Responsibilities */}
        <div className="w-full flex flex-col items-center mb-10">
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start">
            <div className="text-xl font-bold text-white mb-4">4. Account Responsibilities</div>
            <div className="text-gray-200 text-base mb-2">You are responsible for:</div>
            <ul className="text-base text-gray-300 list-disc pl-6 space-y-1">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Ensuring your use complies with applicable laws and regulations</li>
              <li>The content you upload and share through the service</li>
              <li>Any charges incurred under your account</li>
            </ul>
          </div>
        </div>
        {/* Section 5: Payment Terms */}
        <div className="w-full flex flex-col items-center mb-10">
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start">
            <div className="text-xl font-bold text-white mb-4">5. Payment Terms</div>
            <div className="text-gray-200 text-base mb-2">Subscription fees are charged in advance on a monthly or annual basis. All fees are non-refundable except where required by law. We reserve the right to change our pricing with 30 days notice. Your continued use of the service after a price change constitutes acceptance of the new price.</div>
          </div>
        </div>
        {/* Section 6: Prohibited Uses */}
        <div className="w-full flex flex-col items-center mb-10">
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start">
            <div className="text-xl font-bold text-white mb-4">6. Prohibited Uses</div>
            <div className="text-gray-200 text-base mb-2">You may not use ChatBot Pro to:</div>
            <ul className="text-base text-gray-300 list-disc pl-6 space-y-1">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit malware or harmful code</li>
              <li>Spam or harass users</li>
              <li>Collect personal information without consent</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt the service</li>
            </ul>
          </div>
        </div>
        {/* Section 7: Content Ownership */}
        <div className="w-full flex flex-col items-center mb-10">
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start">
            <div className="text-xl font-bold text-white mb-4">7. Content Ownership</div>
            <div className="text-gray-200 text-base mb-2">You retain all rights to the content you create and upload to ChatBot Pro. By uploading content, you grant us a license to use, store, and display that content as necessary to provide the service. We do not claim ownership of your content.</div>
          </div>
        </div>
        {/* Section 8: Termination */}
        <div className="w-full flex flex-col items-center mb-10">
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start">
            <div className="text-xl font-bold text-white mb-4">8. Termination</div>
            <div className="text-gray-200 text-base mb-2">We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including but not limited to breach of these Terms. Upon termination, your right to use the service will immediately cease. You may also terminate your account at any time through your account settings.</div>
          </div>
        </div>
        {/* Section 9: Disclaimer */}
        <div className="w-full flex flex-col items-center mb-10">
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start">
            <div className="text-xl font-bold text-white mb-4">9. Disclaimer</div>
            <div className="text-gray-200 text-base mb-2">The service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, and hereby disclaim all warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</div>
          </div>
        </div>
        {/* Section 10: Limitation of Liability */}
        <div className="w-full flex flex-col items-center mb-10">
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start">
            <div className="text-xl font-bold text-white mb-4">10. Limitation of Liability</div>
            <div className="text-gray-200 text-base mb-2">In no event shall ChatBot Pro or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use ChatBot Pro.</div>
          </div>
        </div>
        {/* Section 11: Changes to Terms */}
        <div className="w-full flex flex-col items-center mb-10">
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start">
            <div className="text-xl font-bold text-white mb-4">11. Changes to Terms</div>
            <div className="text-gray-200 text-base mb-2">We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the service. Your continued use of the service after such modifications constitutes acceptance of the updated terms.</div>
          </div>
        </div>
        {/* Questions About These Terms */}
        <div className="w-full flex flex-col items-center mb-20">
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-start">
            <div className="text-2xl font-bold text-white mb-4">Questions About These Terms?</div>
            <div className="text-gray-300 text-base mb-2">If you have any questions about these Terms of Service, please contact us:</div>
            <div className="text-base text-gray-400 mb-1">Email: legal@chatbotpro.com</div>
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
