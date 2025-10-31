import { useState, useEffect } from "react";

interface Website {
  id: number;
  user_id: number;
  publish_key: string;
  website_url: string;
  created_at: string;
  updated_at: string;
}

const API_BASE_URL = import.meta.env.VITE_WEBSITE_URL || 'https://webnotics-chatbot.onrender.com';

export default function WebsiteUrlManagement() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  async function fetchWebsites() {
    setListLoading(true);
    setListError(null);
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        throw new Error("Not authenticated");
      }
      const res = await fetch(`${API_BASE_URL}/websites`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        throw new Error('Failed to fetch websites');
      }
      const data = await res.json();
      // Handle both array and single object response
      setWebsites(Array.isArray(data) ? data : [data]);
    } catch (err: any) {
      setListError(err.message);
    } finally {
      setListLoading(false);
    }
  }

  useEffect(() => {
    fetchWebsites();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        throw new Error("Not authenticated");
      }
      const res = await fetch(`${API_BASE_URL}/websites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ website_url: websiteUrl.trim() })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.detail || 'Failed to add website URL');
      }
      setMessage('Website URL added successfully');
      setWebsiteUrl("");
      // Refresh the list after successful addition
      await fetchWebsites();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="mb-4 text-xl font-semibold text-white">Website URL Management</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <input
          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
          placeholder="https://example.com"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          required
          type="url"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-brand-500 text-white disabled:opacity-60"
        >
          {loading ? 'Adding…' : 'Add Website URL'}
        </button>
        {message && <p className="text-green-500 text-sm">{message}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Website URLs</h2>
        {listLoading && <p className="text-gray-400">Loading...</p>}
        {listError && <p className="text-red-500 text-sm">{listError}</p>}
        {!listLoading && !listError && websites.length === 0 && (
          <p className="text-gray-400">No websites added yet.</p>
        )}
        {!listLoading && !listError && websites.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 rounded-lg">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white border-b border-gray-700">Website URL</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white border-b border-gray-700">Publish Key</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white border-b border-gray-700">Created At</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white border-b border-gray-700">Updated At</th>
                </tr>
              </thead>
              <tbody>
                {websites.map((website) => (
                  <tr key={website.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                    <td className="px-4 py-3 text-sm text-white">{website.website_url}</td>
                    <td className="px-4 py-3 text-sm text-gray-300 font-mono">{website.publish_key}</td>
                    <td className="px-4 py-3 text-sm text-gray-400">{new Date(website.created_at).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-400">{new Date(website.updated_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}


