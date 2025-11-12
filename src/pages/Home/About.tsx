import * as Icons from '../../icons';
import { useNavigate } from 'react-router';

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-hidden">
      {/* Grid overlay background */}
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
        {/* Badge/heading/subtitle */}
        <div className="flex flex-col items-center mt-20 md:mt-28 mb-12 text-center w-full">
          <span className="mb-8 inline-block bg-white/10 border border-white/20 px-4 py-2 text-xs font-medium rounded-full text-gray-200 tracking-wide uppercase">
            <span className="inline-flex items-center gap-1">
              <svg className="w-5 h-5 mr-1 inline-block" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" fill="#fff" fillOpacity=".14" /><path d="M10 4v8l4 2" stroke="#fff" strokeWidth="1.7"/></svg>
              About Us</span>
          </span>
          <h1 className="text-6xl font-bold mb-6 text-white/90 tracking-tight">About</h1>
          <p className="text-2xl text-gray-400 mb-11 max-w-2xl">Building the future of customer engagement, one chatbot at a time</p>
        </div>
        {/* Mission Card */}
        <div className="w-full flex flex-col items-center mt-8 mb-24">
          <div className="max-w-4xl w-full mx-auto bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-10 md:p-14 flex flex-col items-start">
            <div className="flex flex-row items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mr-4">
                {/* Target/mission icon */}
                <svg width="26" height="26" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#6d28d9"/><circle cx="12" cy="12" r="5" fill="#fff" opacity="0.6"/><circle cx="12" cy="12" r="2" fill="#fff"/></svg>
              </div>
              <div className="text-3xl font-bold text-white tracking-tight">Our Mission</div>
            </div>
            <div className="text-white text-lg mb-4 leading-relaxed">
              At ChatBot Pro, we believe that every business deserves powerful, beautiful, and easy-to-use chatbot technology. Our mission is to democratize customer engagement by making professional chatbot design accessible to everyone, regardless of technical expertise.
            </div>
            <div className="text-gray-300 text-base leading-relaxed">
              We're building a platform where creativity meets functionality, where anyone can design custom chatbots that truly represent their brand and connect with their customers in meaningful ways.
            </div>
          </div>
        </div>
        {/* Stats Card Row */}
        <div className="w-full flex flex-col items-center mt-2 mb-20">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="rounded-2xl bg-white/5 border border-white/10 shadow p-8 flex flex-col items-center">
              <div className="text-4xl font-bold text-white mb-1">10k+</div>
              <div className="text-gray-300 text-base">Active Users</div>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 shadow p-8 flex flex-col items-center">
              <div className="text-4xl font-bold text-white mb-1">50k+</div>
              <div className="text-gray-300 text-base">Chatbots Created</div>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 shadow p-8 flex flex-col items-center">
              <div className="text-4xl font-bold text-white mb-1">5M+</div>
              <div className="text-gray-300 text-base">Conversations</div>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 shadow p-8 flex flex-col items-center">
              <div className="text-4xl font-bold text-white mb-1">98%</div>
              <div className="text-gray-300 text-base">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="w-full flex flex-col items-center mb-28 mt-4">
          <h2 className="text-4xl font-bold text-white text-center mb-2">Our Values</h2>
          <div className="text-gray-400 text-lg text-center mb-12">The principles that guide everything we do</div>
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Customer First */}
            <div className="rounded-2xl bg-white/5 border border-white/10 shadow p-8 flex flex-col items-start">
              <div className="mb-5 rounded-xl w-11 h-11 flex items-center justify-center bg-white/10">
                {/* Heart SVG */}
                <svg className="w-6 h-6" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.09 3 12.58 3.81 13.41 5.08C14.25 3.81 15.73 3 17.33 3C20.41 3 22.83 5.42 22.83 8.5C22.83 13.36 15 21 15 21H12Z"/></svg>
              </div>
              <div className="text-xl font-semibold text-white mb-1">Customer First</div>
              <div className="text-gray-300 text-sm">We build products that solve real problems for real people</div>
            </div>
            {/* Innovation */}
            <div className="rounded-2xl bg-white/5 border border-white/10 shadow p-8 flex flex-col items-start">
              <div className="mb-5 rounded-xl w-11 h-11 flex items-center justify-center bg-white/10">
                <Icons.BoltIcon className="w-6 h-6 text-white" />
              </div>
              <div className="text-xl font-semibold text-white mb-1">Innovation</div>
              <div className="text-gray-300 text-sm">Constantly pushing the boundaries of what's possible</div>
            </div>
            {/* Simplicity */}
            <div className="rounded-2xl bg-white/5 border border-white/10 shadow p-8 flex flex-col items-start">
              <div className="mb-5 rounded-xl w-11 h-11 flex items-center justify-center bg-white/10">
                <Icons.UserIcon className="w-6 h-6 text-white" />
              </div>
              <div className="text-xl font-semibold text-white mb-1">Simplicity</div>
              <div className="text-gray-300 text-sm">Making complex technology accessible to everyone</div>
            </div>
            {/* Accessibility */}
            <div className="rounded-2xl bg-white/5 border border-white/10 shadow p-8 flex flex-col items-start">
              <div className="mb-5 rounded-xl w-11 h-11 flex items-center justify-center bg-white/10">
                {/* Globe SVG */}
                <svg className="w-6 h-6" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><ellipse cx="12" cy="12" rx="10" ry="4"/></svg>
              </div>
              <div className="text-xl font-semibold text-white mb-1">Accessibility</div>
              <div className="text-gray-300 text-sm">Building tools that work for businesses of all sizes</div>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="w-full flex flex-col items-center mb-24 mt-2">
          <div className="max-w-5xl w-full mx-auto bg-white/5 border border-white/10 rounded-3xl shadow-2xl px-10 py-12 md:px-16 flex flex-col items-start">
            <div className="text-4xl font-bold text-white mb-8">Our Story</div>
            <div className="text-gray-200 text-xl leading-relaxed mb-5">
              ChatBot Pro was born from a simple frustration: creating custom chatbots was either too expensive, too complicated, or resulted in generic-looking solutions that didn't match brand identity.
            </div>
            <div className="text-gray-200 text-xl leading-relaxed mb-5">
              We set out to change that. Our team of designers and developers worked to create a platform that puts design and customization first, while keeping the technical complexity hidden behind an intuitive visual interface.
            </div>
            <div className="text-gray-200 text-xl leading-relaxed">
              Today, thousands of businesses use ChatBot Pro to create beautiful, functional chatbots that help them connect with their customers in authentic ways. And we're just getting started.
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
