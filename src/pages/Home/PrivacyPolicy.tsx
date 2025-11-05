
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-16 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important. This page describes what data we collect and
        how we use it.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">What We Collect</h2>
      <p className="mb-4">
        Information you provide (email, chatbot content, settings), and
        automated analytics (usage data, device, etc).
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">How We Use It</h2>
      <p className="mb-4">
        To operate your chatbot, contact you about updates, and improve our
        service. We do not sell your data.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Your Rights</h2>
      <p className="mb-4">
        Request correction, deletion, or a copy of your data any time by
        contacting our team.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="mb-4">
        For questions, email{" "}
        <a
          href="mailto:privacy@chatbotpro.com"
          className="text-blue-400 underline"
        >
          privacy@chatbotpro.com
        </a>
      </p>
    </div>
  );
}
