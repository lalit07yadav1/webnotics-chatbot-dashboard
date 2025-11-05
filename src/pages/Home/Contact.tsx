
export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">
      <div className="max-w-xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Contact</h1>
        <p className="text-xl text-gray-400 mb-8">
          Need help? Reach out to our team and we’ll get back to you as soon as
          possible.
        </p>
      </div>
      <form className="max-w-lg mx-auto bg-white/5 p-8 rounded-2xl shadow-lg space-y-6">
        <div>
          <label className="block text-left mb-2 text-white">Your Email</label>
          <input
            type="email"
            className="w-full p-3 rounded-lg bg-black border border-white/10 text-white"
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className="block text-left mb-2 text-white">Message</label>
          <textarea
            className="w-full min-h-[120px] p-3 rounded-lg bg-black border border-white/10 text-white"
            placeholder="Type your message..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-100"
        >
          Send
        </button>
      </form>
      <div className="max-w-lg mx-auto text-center text-gray-400 mt-8">
        Or email us directly at{" "}
        <a
          href="mailto:support@chatbotpro.com"
          className="text-white underline"
        >
          support@chatbotpro.com
        </a>
      </div>
    </div>
  );
}
