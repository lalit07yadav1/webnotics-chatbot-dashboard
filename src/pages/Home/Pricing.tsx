
export default function Pricing() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Pricing</h1>
        <p className="text-xl text-gray-400 mb-8">
          Choose the plan that fits your needs. Start for free and upgrade
          anytime.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10 max-w-4xl mx-auto">
        <div className="flex-1 bg-white/5 rounded-2xl p-8 shadow-lg text-center border-2 border-white/10">
          <h2 className="text-2xl font-bold mb-4">Free</h2>
          <div className="text-4xl mb-2">
            $0<span className="text-lg text-gray-400">/mo</span>
          </div>
          <ul className="text-gray-300 mb-4 space-y-2">
            <li>1 Custom chatbot</li>
            <li>FAQ Builder</li>
            <li>100 conversations/month</li>
            <li>Email support</li>
            <li>Instant setup</li>
          </ul>
          <button className="bg-black text-white border border-white/20 px-6 py-2 rounded-full hover:bg-white/10">
            Start Free
          </button>
        </div>
        <div className="flex-1 bg-white rounded-2xl p-8 shadow-xl text-black text-center border-2 border-white/20">
          <h2 className="text-2xl font-bold mb-4">Premium</h2>
          <div className="text-4xl mb-2">
            $10<span className="text-lg text-gray-500">/mo</span>
          </div>
          <ul className="text-gray-700 mb-4 space-y-2">
            <li>Unlimited chatbots</li>
            <li>Full Knowledge Base</li>
            <li>Unlimited conversations</li>
            <li>Priority support</li>
            <li>All Features Included</li>
          </ul>
          <button className="bg-black text-white border border-white/30 px-6 py-2 rounded-full hover:bg-gray-900">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
