import { useEffect, useState } from "react";

interface Website { id: number; website_url: string; }
interface KBItem { id: number; website_id: number; question: string; answer: string; created_at: string; updated_at: string; }

const API_BASE_URL = import.meta.env.VITE_WEBSITE_URL || 'https://webnotics-chatbot.onrender.com';

export default function KnowledgeBaseManagement() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<number | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<KBItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
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
    } catch {}
  }

  async function fetchList(websiteId: number) {
    setLoading(true);
    setListError(null);
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${API_BASE_URL}/websites/${websiteId}/knowledge-base`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) {
        // If 404 or empty response, treat as no data found
        if (res.status === 404) {
          setItems([]);
          setLoading(false);
          return;
        }
        throw new Error('Failed to fetch knowledge base');
      }
      const data = await res.json();
      const itemsList = Array.isArray(data) ? data : (data ? [data] : []);
      setItems(itemsList);
    } catch (err: any) {
      // Only show error for actual errors, not for empty data
      const errorMessage = err.message || 'Failed to fetch knowledge base';
      // If it's a network error or authentication error, show it
      if (errorMessage.includes('Not authenticated') || errorMessage.includes('Failed to fetch')) {
        setListError(errorMessage);
      } else {
        // For other cases, assume no data
        setItems([]);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchWebsites(); }, []);
  useEffect(() => { if (selectedWebsiteId) fetchList(selectedWebsiteId); }, [selectedWebsiteId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedWebsiteId) return;
    setSubmitting(true);
    setMessage(null);
    setError(null);
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${API_BASE_URL}/websites/${selectedWebsiteId}/knowledge-base`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ question: question.trim(), answer: answer.trim() })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Failed to add knowledge base item');
      setMessage('Knowledge base item added successfully');
      setQuestion("");
      setAnswer("");
      await fetchList(selectedWebsiteId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(item: KBItem) {
    setEditingId(item.id);
    setEditQuestion(item.question);
    setEditAnswer(item.answer);
  }

  async function saveEdit() {
    if (!selectedWebsiteId || !editingId) return;
    setSavingEdit(true);
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${API_BASE_URL}/websites/${selectedWebsiteId}/knowledge-base/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ question: editQuestion.trim(), answer: editAnswer.trim() })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Failed to update knowledge base item');
      await fetchList(selectedWebsiteId);
      setEditingId(null);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSavingEdit(false);
    }
  }

  async function deleteItem(id: number) {
    if (!selectedWebsiteId) return;
    if (!confirm('Delete this item?')) return;
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${API_BASE_URL}/websites/${selectedWebsiteId}/knowledge-base/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete knowledge base item');
      await fetchList(selectedWebsiteId);
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="mb-4 text-xl font-semibold text-white">Knowledge Base</h1>

      <div className="mb-4">
        <label className="block mb-2 text-sm text-gray-300">Website</label>
        <select className="w-full max-w-xl px-3 py-2 rounded-lg border border-gray-700 bg-black text-white" value={selectedWebsiteId ?? ''} onChange={(e) => setSelectedWebsiteId(Number(e.target.value))}>
          {websites.map(w => (<option key={w.id} value={w.id}>{w.website_url}</option>))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <input className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white" placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} required />
        <textarea className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white min-h-28" placeholder="Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
        <button type="submit" disabled={submitting || !selectedWebsiteId} className="px-4 py-2 rounded-lg bg-brand-500 text-white disabled:opacity-60">{submitting ? 'Adding…' : 'Add Knowledge Base'}</button>
        {message && <p className="text-green-500 text-sm">{message}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Items</h2>
        {loading && <p className="text-gray-400">Loading...</p>}
        {listError && <p className="text-red-500 text-sm">{listError}</p>}
        {!loading && !listError && items.length === 0 && (<p className="text-gray-400">No record found</p>)}
        {!loading && !listError && items.length > 0 && (
          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.id} className="rounded-lg border border-gray-700 p-3">
                {editingId === it.id ? (
                  <div className="space-y-2">
                    <input className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white" value={editQuestion} onChange={(e) => setEditQuestion(e.target.value)} />
                    <textarea className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white min-h-24" value={editAnswer} onChange={(e) => setEditAnswer(e.target.value)} />
                    <div className="flex gap-2">
                      <button disabled={savingEdit} onClick={saveEdit} className="px-3 py-1 rounded bg-brand-500 text-white disabled:opacity-60">{savingEdit ? 'Saving…' : 'Save'}</button>
                      <button onClick={() => setEditingId(null)} className="px-3 py-1 rounded bg-gray-700 text-white">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-white font-medium">Q: {it.question}</p>
                    <p className="text-gray-300">A: {it.answer}</p>
                    <p className="text-gray-500 text-xs mt-1">Updated: {new Date(it.updated_at).toLocaleString()}</p>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => startEdit(it)} className="px-3 py-1 rounded bg-gray-700 text-white">Edit</button>
                      <button onClick={() => deleteItem(it.id)} className="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
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



