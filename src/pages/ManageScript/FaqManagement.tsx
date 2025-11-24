import { useEffect, useState } from "react";
import RichTextEditor from "../../components/form/rich-text-editor/RichTextEditor";

interface Website { id: number; website_url: string; }
interface Faq { id: number; website_id: number; question: string; answer: string; created_at: string; updated_at: string; }

const API_BASE_URL = import.meta.env.VITE_WEBSITE_URL || 'https://webnotics-chatbot.onrender.com';

export default function FaqManagement() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<number | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(false);
  const [faqError, setFaqError] = useState<string | null>(null);
  const [editingFaqId, setEditingFaqId] = useState<number | null>(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  async function fetchWebsites() {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${API_BASE_URL}/websites`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      const list: Website[] = Array.isArray(data) ? data : [data];
      setWebsites(list);
      if (list.length > 0) setSelectedWebsiteId(list[0].id);
    } catch (err) {
      // ignore; UI will reflect empty list
    }
  }

  async function fetchFaqs(websiteId: number) {
    setLoadingFaqs(true);
    setFaqError(null);
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${API_BASE_URL}/websites/${websiteId}/faq`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) {
        // If 404 or empty response, treat as no data found
        if (res.status === 404) {
          setFaqs([]);
          setLoadingFaqs(false);
          return;
        }
        throw new Error('Failed to fetch FAQs');
      }
      const data = await res.json();
      const faqsList = Array.isArray(data) ? data : (data ? [data] : []);
      setFaqs(faqsList);
    } catch (err: any) {
      // Only show error for actual errors, not for empty data
      const errorMessage = err.message || 'Failed to fetch FAQs';
      // If it's a network error or authentication error, show it
      if (errorMessage.includes('Not authenticated') || errorMessage.includes('Failed to fetch')) {
        setFaqError(errorMessage);
      } else {
        // For other cases, assume no data
        setFaqs([]);
      }
    } finally {
      setLoadingFaqs(false);
    }
  }

  useEffect(() => { fetchWebsites(); }, []);
  useEffect(() => { if (selectedWebsiteId) fetchFaqs(selectedWebsiteId); }, [selectedWebsiteId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedWebsiteId) return;
    setSubmitting(true);
    setMessage(null);
    setError(null);
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${API_BASE_URL}/websites/${selectedWebsiteId}/faq`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ question: question.trim(), answer: answer.trim() })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Failed to add FAQ');
      setMessage('FAQ added successfully');
      setQuestion("");
      setAnswer("");
      await fetchFaqs(selectedWebsiteId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(f: Faq) {
    setEditingFaqId(f.id);
    setEditQuestion(f.question);
    setEditAnswer(f.answer);
  }

  async function saveEdit() {
    if (!selectedWebsiteId || !editingFaqId) return;
    setSavingEdit(true);
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${API_BASE_URL}/websites/${selectedWebsiteId}/faq/${editingFaqId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ question: editQuestion.trim(), answer: editAnswer.trim() })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Failed to update FAQ');
      await fetchFaqs(selectedWebsiteId);
      setEditingFaqId(null);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSavingEdit(false);
    }
  }

  async function deleteFaq(faqId: number) {
    if (!selectedWebsiteId) return;
    if (!confirm('Delete this FAQ?')) return;
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${API_BASE_URL}/websites/${selectedWebsiteId}/faq/${faqId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete FAQ');
      await fetchFaqs(selectedWebsiteId);
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="mb-4 text-xl font-semibold text-white">FAQ Management</h1>

      <div className="mb-4">
        <label className="block mb-2 text-sm text-gray-300">Website</label>
        <select
          className="w-full max-w-xl px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
          value={selectedWebsiteId ?? ''}
          onChange={(e) => setSelectedWebsiteId(Number(e.target.value))}
        >
          {websites.map(w => (
            <option key={w.id} value={w.id}>{w.website_url}</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <input
          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <div className="w-full">
          <RichTextEditor
            value={answer}
            onChange={setAnswer}
            placeholder="Enter your answer..."
          />
        </div>
        <button type="submit" disabled={submitting || !selectedWebsiteId} className="px-4 py-2 rounded-lg bg-brand-500 text-white disabled:opacity-60">
          {submitting ? 'Adding…' : 'Add FAQ'}
        </button>
        {message && <p className="text-green-500 text-sm">{message}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white">FAQs</h2>
        {loadingFaqs && <p className="text-gray-400">Loading...</p>}
        {faqError && <p className="text-red-500 text-sm">{faqError}</p>}
        {!loadingFaqs && !faqError && faqs.length === 0 && (
          <p className="text-gray-400">No record found</p>
        )}
        {!loadingFaqs && !faqError && faqs.length > 0 && (
          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.id} className="rounded-lg border border-gray-700 p-3">
                {editingFaqId === f.id ? (
                  <div className="space-y-2">
                    <input className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white" value={editQuestion} onChange={(e) => setEditQuestion(e.target.value)} />
                    <RichTextEditor
                      value={editAnswer}
                      onChange={setEditAnswer}
                      placeholder="Enter your answer..."
                    />
                    <div className="flex gap-2">
                      <button disabled={savingEdit} onClick={saveEdit} className="px-3 py-1 rounded bg-brand-500 text-white disabled:opacity-60">{savingEdit ? 'Saving…' : 'Save'}</button>
                      <button onClick={() => setEditingFaqId(null)} className="px-3 py-1 rounded bg-gray-700 text-white">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-white font-medium">Q: {f.question}</p>
                    <div className="text-gray-300">
                      <span className="text-gray-300">A: </span>
                      <div 
                        className="prose prose-invert max-w-none mt-1"
                        dangerouslySetInnerHTML={{ __html: f.answer }}
                      />
                    </div>
                    <p className="text-gray-500 text-xs mt-1">Updated: {new Date(f.updated_at).toLocaleString()}</p>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => startEdit(f)} className="px-3 py-1 rounded bg-gray-700 text-white">Edit</button>
                      <button onClick={() => deleteFaq(f.id)} className="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


