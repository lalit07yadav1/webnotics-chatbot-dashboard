import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router';
import * as Icons from '../../icons';
import AppHeader from '../../layout/AppHeader';

export default function Pricing() {
  const navigate = useNavigate();
  return (
    <>
      <header className="flex items-center justify-between w-full px-8 py-4 bg-[#0a0a0a] border-b border-white/5">
        <div className="flex items-center gap-4">
          <button
            className="text-gray-400 hover:text-white text-base font-medium border-none bg-transparent p-0 flex items-center gap-1"
            onClick={() => navigate(-1)}
          >
            <span className="mr-1">←</span> Back
          </button>
          <span className="bg-white w-10 h-10 flex items-center justify-center rounded-xl"><Icons.ChatIcon className="text-black w-6 h-6" /></span>
          <span className="font-semibold text-xl text-white ml-1">ChatBot Pro</span>
        </div>
        <button
          className="px-6 py-3 bg-[#596aff] hover:bg-[#4251b5] text-white text-base font-semibold rounded-xl ml-2 transition-all"
          onClick={() => navigate('/signup')}
        >
          Get Started Free →
        </button>
      </header>
      {/* old AppHeader can be commented or removed if not needed */}
      {/* <AppHeader /> */}
      <div className="relative min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-hidden">
        {/* Subtle grid overlay bg, as seen in Feature page */}
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)] z-0"></div>
        <div className="flex-1 flex flex-col justify-center items-center relative z-10 px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto">
              Select the perfect plan for your chatbot needs
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center max-w-4xl w-full mx-auto">
            {/* Free Plan */}
            <div className="relative w-full max-w-md bg-white/5 rounded-2xl p-8 shadow-lg border-2 border-white/10 text-center">
              <div className="flex items-center gap-2 mx-auto w-fit mb-2">
                <span className="bg-gray-800 p-1 rounded-full"><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 text-gray-100'><path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6l4 2' /><circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='1.5' fill='none'/></svg></span>
                <h2 className="text-2xl font-bold">Free</h2>
              </div>
              <div className="text-4xl mb-2 font-bold">
                $0<span className="text-lg text-gray-400 font-normal">/month</span>
              </div>
              <div className="text-gray-400 mb-6">Perfect for getting started</div>
              <ul className="text-left text-gray-200 mb-8 space-y-2">
                <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-400" /> 1 Chatbot</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-400" /> 100 conversations/month</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-400" /> Basic analytics</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-400" /> Email support</li>
                <li className="flex items-center gap-2 text-gray-500"><XCircleIcon className="w-5 h-5 text-gray-500" /> Advanced AI features</li>
                <li className="flex items-center gap-2 text-gray-500"><XCircleIcon className="w-5 h-5 text-gray-500" /> Custom branding</li>
                <li className="flex items-center gap-2 text-gray-500"><XCircleIcon className="w-5 h-5 text-gray-500" /> Priority support</li>
                <li className="flex items-center gap-2 text-gray-500"><XCircleIcon className="w-5 h-5 text-gray-500" /> API access</li>
              </ul>
              <button
                className="w-full py-3 rounded-xl border border-white transition bg-black/30 hover:bg-white/10 text-white font-bold mt-4"
                onClick={() => navigate('/signup')}
              >
                Get Started Free
              </button>
            </div>
            {/* Premium Plan */}
            <div className="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl border-2 border-white text-black text-center">
              {/* Most Popular Badge */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                <span className="bg-white text-black px-4 py-1 rounded-full shadow font-semibold border border-gray-200 text-xs">
                  Most Popular
                </span>
              </div>
              <div className="flex items-center gap-2 justify-center mb-2">
                <span className="bg-black p-1 rounded-full"><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 text-white'><path strokeLinecap='round' strokeLinejoin='round' d='M5.5 19l1.4-4.2a5.1 5.1 0 014.6-3.5h0a5.1 5.1 0 014.6 3.5L18.5 19' /><circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='1.5' fill='none'/></svg></span>
                <h2 className="text-2xl font-bold">Premium</h2>
              </div>
              <div className="text-4xl mb-2 font-bold">
                $9.99<span className="text-lg text-gray-500 font-normal">/month</span>
              </div>
              <div className="text-gray-700 mb-6">For power users and businesses</div>
              <ul className="text-left text-gray-800 mb-8 space-y-2">
                <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> Unlimited chatbots</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> Unlimited conversations</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> Advanced analytics & insights</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> 24/7 priority support</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> Advanced AI features</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> Custom branding & styling</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> Full API access</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> Team collaboration</li>
              </ul>
              <button className="w-full py-3 rounded-xl border border-black transition bg-black text-white font-bold mt-4 hover:bg-gray-900">Upgrade to Premium</button>
            </div>
          </div>
          <div className="text-center mt-10">
            <button onClick={() => navigate('/signin')} className="text-gray-400 hover:underline text-sm bg-transparent border-none p-0 cursor-pointer">← Back to sign in</button>
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
    </>
  );
}
