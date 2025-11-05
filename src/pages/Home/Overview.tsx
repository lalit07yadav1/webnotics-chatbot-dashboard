import Button from "../../components/ui/button/Button";
import {
  Bot,
  Palette,
  Code2,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Copy,
  Paintbrush,
  Globe,
  FileCode,
  ClipboardList,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";


export default function HomePage() {

  return (
    <div className="min-h-screen w-full" style={{ background: "#0a0a0a" }}>
      {/* Animated Mesh Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-gray-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]"></div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-md"></div>
                <div className="relative w-11 h-11 bg-white rounded-2xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-xl tracking-tight text-white">
                ChatBot Pro
              </span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link
                to="/signin"
                className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 border border-white/10 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/30 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-xl px-4 py-2 flex items-center gap-2 rounded-full mx-auto justify-center">
              <Sparkles className="w-4 h-4" />
              Design, Customize & Deploy
            </div>

            <h1 className="text-6xl lg:text-7xl mb-8 leading-[1.1] tracking-tight text-white">
              Create Custom Chatbots
              <br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Your Way
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
              Design beautiful chatbot interfaces, customize every element to
              match your brand, and integrate anywhere with a single line of
              code. No design or coding skills required.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 text-sm flex items-center gap-2 text-white">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Custom Brand Name</span>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 text-sm flex items-center gap-2 text-white">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Custom FAQ</span>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 text-sm flex items-center gap-2 text-white">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>KnowledgeBase Questions</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visual Demo Section */}
      <section className="relative z-10 container mx-auto px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

            {/* Mock Chatbot Designer Interface */}
            <div className="grid lg:grid-cols-2 gap-8 relative z-10">
              {/* Left: Design Controls */}
              <div className="space-y-4">
                <h3 className="text-2xl mb-6 flex items-center gap-3 text-white">
                  <Palette className="w-7 h-7" />
                  Build Your Custom FAQ & Knowledge Base
                </h3>

                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">FAQ Editor</span>
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
                    </svg>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-2">
                    <div className="text-xs text-white mb-2">
                      Sample Questions
                    </div>
                    <ul className="space-y-1 text-gray-300">
                      <li>How do I reset my password?</li>
                      <li>Where can I view my transcripts?</li>
                      <li>Can I upgrade my subscription?</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">
                      Knowledge base questions
                    </span>
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 8a6 6 0 01-12 0m12 3a6 6 0 01-12 0V5a6 6 0 0112 0v6z" />
                    </svg>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-center text-gray-400">
                    Customize your knowledge base questions
                  </div>
                </div>

                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">
                      Welcome Message
                    </span>
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8a9 9 0 1118 0z" />
                    </svg>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-center text-gray-400">
                    "Hi there! How can I help you today?"
                  </div>
                </div>
              </div>

              {/* Right: Live Preview */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-white/10 to-transparent rounded-3xl blur-2xl"></div>
                <div className="relative bg-gray-900 rounded-3xl p-6 border border-white/10 h-full min-h-[400px]">
                  <div className="mb-4 pb-4 text-sm text-white border-b border-white/10">
                    Knowledge Base Chat Preview
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-col items-end">
                      <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg mb-1">
                        How do I reset my password?
                      </div>
                      <div className="inline-block text-gray-400 text-xs">
                        user
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-lg mb-1">
                        To reset your password, go to settings &gt; security and
                        click "Reset Password." Follow the instructions in your
                        email.
                      </div>
                      <div className="inline-block text-green-400 text-xs">
                        bot
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg mb-1">
                        Can I upgrade my subscription?
                      </div>
                      <div className="inline-block text-gray-400 text-xs">
                        user
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-lg mb-1">
                        Yes, you can upgrade from your billing dashboard by
                        choosing a new plan.
                      </div>
                      <div className="inline-block text-green-400 text-xs">
                        bot
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Key Features - Bento Grid */}
      <section className="relative z-10 container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl mb-4 tracking-tight text-white">
            Powerful Designer,
            <br />
            <span className="text-gray-400">Simple Integration</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 max-w-7xl mx-auto my-12 px-4">
          {/* FAQ/Knowledge Card */}
          <motion.div className="bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl hover:ring-2 hover:ring-white/40 transition-all flex flex-col items-start">
            <ClipboardList className="w-12 h-12 mb-4 text-sky-400" />
            <h3 className="text-xl text-white font-bold mb-2">FAQ Builder</h3>
            <p className="text-gray-300 mb-4">
              Create and manage common Q&A pairs. Keep your chatbot relevant
              with easy updates.
            </p>
            <ul className="space-y-1 text-sm text-gray-400 list-disc list-inside mb-3">
              <li>Unlimited topics</li>
              <li>Simple text editor</li>
            </ul>
          </motion.div>

          {/* Knowledge Base Card */}
          <motion.div className="bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl hover:ring-2 hover:ring-white/40 transition-all flex flex-col items-start">
            <BookOpen className="w-12 h-12 mb-4 text-purple-400" />
            <h3 className="text-xl text-white font-bold mb-2">
              Knowledge Base
            </h3>
            <p className="text-gray-300 mb-4">
              Upload and manage knowledge documents. The bot can instantly
              answer questions using these resources.
            </p>
            <ul className="space-y-1 text-sm text-gray-400 list-disc list-inside mb-3">
              <li>Import PDF/DOCX/TXT</li>
              <li>Live KB search</li>
            </ul>
          </motion.div>

          {/* Embed Anywhere Card */}
          <motion.div className="bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl hover:ring-2 hover:ring-white/40 transition-all flex flex-col items-start">
            <Code2 className="w-12 h-12 mb-4 text-lime-400" />
            <h3 className="text-xl text-white font-bold mb-2">
              One-Click Embed
            </h3>
            <p className="text-gray-300 mb-3">
              Just copy one snippet to add your bot to any website or platform.
            </p>
            <div className="bg-black/90 rounded-lg p-3 shadow text-xs font-mono text-green-400 border border-white/10 w-full mb-2">
              {'<script src="..." />'}
            </div>
          </motion.div>

          {/* Platform Support Card */}
          <motion.div className="bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl hover:ring-2 hover:ring-white/40 transition-all flex flex-col items-start">
            <Globe className="w-12 h-12 mb-4 text-amber-400" />
            <h3 className="text-xl text-white font-bold mb-2">
              Works Everywhere
            </h3>
            <p className="text-gray-300 mb-4">
              Your chatbot runs on any site or major platform.
            </p>
            <div className="flex gap-3 mt-2">
              <div className="bg-white rounded-xl p-2">
                <span className="text-xl">⚛️</span>
              </div>
              <div className="bg-white rounded-xl p-2">
                <span className="text-xl">📦</span>
              </div>
              <div className="bg-white rounded-xl p-2">
                <span className="text-xl">🛒</span>
              </div>
              <div className="bg-white rounded-xl p-2">
                <span className="text-xl">📝</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl mb-4 tracking-tight text-white">
            Design to Deploy
            <br />
            <span className="text-gray-500">In Minutes</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-white">
          {[
            {
              number: "01",
              icon: Paintbrush,
              title: "Design Your Chatbot",
              description:
                "Use our visual designer to customize colors, styles, and layout. Choose from templates or start from scratch.",
            },
            {
              number: "02",
              icon: MessageSquare,
              title: "Configure Responses",
              description:
                "Set up conversation flows, custom messages, and automated replies. Train your bot with your content.",
            },
            {
              number: "03",
              icon: Copy,
              title: "Copy & Integrate",
              description:
                "Get your embed code and paste it into your website. Your custom chatbot goes live instantly.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 text-9xl text-white/5 font-bold -mr-4 -mt-4">
                {step.number}
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Integration Example */}
      <section className="relative z-10 container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 tracking-tight text-white">
              Simple Integration
            </h2>
            <p className="text-gray-400 text-lg">
              Just copy and paste one line of code
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">Embed Code</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="text-white/70 hover:text-white border-white/20 bg-transparent"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>

            <div className="bg-black/60 rounded-2xl p-6 font-mono text-sm border border-white/10">
              <div className="text-gray-500">
                {"<!-- Paste this before </body> -->"}
              </div>
              <div className="text-green-400 mt-2">
                {'<script src="https://chatbot.pro/embed.js" '}
              </div>
              <div className="text-green-400 ml-8">
                {'data-bot-id="your-bot-id"'}
              </div>
              <div className="text-green-400">{"></script>"}</div>
            </div>

            <div className="mt-6 flex items-center gap-3 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>Works with any website or platform</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Custom FAQ & Knowledge Base */}
      <section className="relative z-10 container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-8 font-bold text-center">
            Custom FAQ & Knowledge Base
          </h2>
          <div className="bg-black/40 border border-white/10 rounded-3xl px-6 py-8 divide-y divide-white/10 shadow-lg">
            {/* FAQ Item 1 */}
            <details className="py-4 group">
              <summary className="cursor-pointer text-xl text-white group-open:font-semibold flex items-center justify-between">
                How does the chatbot learn from my FAQs?
              </summary>
              <div className="mt-2 text-gray-300">
                You can upload your own documents or enter common questions. The
                bot uses this data to answer customer queries in natural
                language.
              </div>
            </details>
            {/* FAQ Item 2 */}
            <details className="py-4 group">
              <summary className="cursor-pointer text-xl text-white group-open:font-semibold flex items-center justify-between">
                Can I add my own knowledge base articles?
              </summary>
              <div className="mt-2 text-gray-300">
                Yes! You can import articles or manually add Q&A pairs. The
                chatbot will search these entries to provide instant answers.
              </div>
            </details>
            {/* Knowledge Base Q1 */}
            <details className="py-4 group">
              <summary className="cursor-pointer text-xl text-white group-open:font-semibold flex items-center justify-between">
                What file formats are supported for import?
              </summary>
              <div className="mt-2 text-gray-300">
                You can import PDF, TXT, or DOCX files. We automatically extract
                the text for training your knowledge base.
              </div>
            </details>
            {/* Knowledge Base Q2 */}
            <details className="py-4 group">
              <summary className="cursor-pointer text-xl text-white group-open:font-semibold flex items-center justify-between">
                How do I update an answer in my knowledge base?
              </summary>
              <div className="mt-2 text-gray-300">
                Just edit the Q&A entry and save changes. Updates are live
                instantly, so your chatbot always provides the latest
                information.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl text-white">ChatBot Pro</span>
              </div>
              <p className="text-white mb-6 max-w-sm">
                Design and deploy custom chatbots with our visual designer. No
                coding required, unlimited creativity.
              </p>
            </div>

            <div>
              <h4 className="text-white mb-4">Product</h4>
              <ul className="space-y-3 text-gray-500">
                <li>
                  <Link
                    to="/home/features"
                    className="hover:text-white transition"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/home/pricing"
                    className="hover:text-white transition"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-4">Resources</h4>
              <ul className="space-y-3 text-gray-500">
                <li>
                  <Link
                    to="/home/contact"
                    className="hover:text-white transition"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/home/faq" className="hover:text-white transition">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-4">Company</h4>
              <ul className="space-y-3 text-gray-500">
                <li>
                  <Link
                    to="/home/about"
                    className="hover:text-white transition"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/home/privacy-policy"
                    className="hover:text-white transition"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/home/terms"
                    className="hover:text-white transition"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    to="/home/refund-policy"
                    className="hover:text-white transition"
                  >
                    Refund
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} ChatBot Pro. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition">
                Status
              </a>
              <a href="#" className="hover:text-white transition">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
