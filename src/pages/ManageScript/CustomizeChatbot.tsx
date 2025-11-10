import { useEffect, useState } from "react";

interface Website {
  id: number;
  website_url: string;
  publish_key: string;
}

interface Customization {
  id: string;
  user_id: number;
  website_url: string;
  logo_url: string;
  brand_name: string;
  primary_color: string;
  text_color: string;
  background_color: string;
  font_family: string;
  publish_key: string;
  created_at: string;
  bot_message_bg: string;
  bot_message_bg_font_size: string;
  bot_message_bg_text_color: string;
  bot_message_user_message: string;
  user_message_bg: string;
  user_message_bg_font_size: string;
  user_message_bg_text_color: string;
  user_message_font_family: string;
  header_bg: string;
  header_font_size: string;
  header_text_color: string;
  header_font_family: string;
  input_bg: string;
  input_text_color: string;
  input_placeholder_text: string;
  input_placeholder_text_color: string;
  input_placeholder_font_family: string;
  submit_button_bg: string;
  submit_button_color: string;
  submit_button_font_family: string;
}

const API_BASE_URL = import.meta.env.VITE_WEBSITE_URL || 'https://webnotics-chatbot.onrender.com';

export default function CustomizeChatbot() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<number | null>(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [brandName, setBrandName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#0000FF");
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [fontFamily, setFontFamily] = useState("Arial, sans-serif");
  const [botMessageBg, setBotMessageBg] = useState("#FFFFFF");
  const [botMessageBgFontSize, setBotMessageBgFontSize] = useState("16px");
  const [botMessageBgTextColor, setBotMessageBgTextColor] = useState("#000000");
  const [botMessageUserMessage, setBotMessageUserMessage] = useState("Thanks for reaching out!");
  const [userMessageBg, setUserMessageBg] = useState("#EEEEEE");
  const [userMessageBgFontSize, setUserMessageBgFontSize] = useState("14px");
  const [userMessageBgTextColor, setUserMessageBgTextColor] = useState("#000000");
  const [userMessageFontFamily, setUserMessageFontFamily] = useState("Arial, sans-serif");
  const [headerBg, setHeaderBg] = useState("#123456");
  const [headerFontSize, setHeaderFontSize] = useState("18px");
  const [headerTextColor, setHeaderTextColor] = useState("#FFFFFF");
  const [headerFontFamily, setHeaderFontFamily] = useState("Montserrat, sans-serif");
  const [inputBg, setInputBg] = useState("#FFFFFF");
  const [inputTextColor, setInputTextColor] = useState("#000000");
  const [inputPlaceholderText, setInputPlaceholderText] = useState("Type your question");
  const [inputPlaceholderTextColor, setInputPlaceholderTextColor] = useState("#888888");
  const [inputPlaceholderFontFamily, setInputPlaceholderFontFamily] = useState("Georgia, serif");
  const [submitButtonBg, setSubmitButtonBg] = useState("#FF6600");
  const [submitButtonColor, setSubmitButtonColor] = useState("#FFFFFF");
  const [submitButtonFontFamily, setSubmitButtonFontFamily] = useState("Lato, sans-serif");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [customizations, setCustomizations] = useState<Customization[]>([]);
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLogoUrl, setEditLogoUrl] = useState("");
  const [editBrandName, setEditBrandName] = useState("");
  const [editPrimaryColor, setEditPrimaryColor] = useState("#0000FF");
  const [editTextColor, setEditTextColor] = useState("#000000");
  const [editBackgroundColor, setEditBackgroundColor] = useState("#FFFFFF");
  const [editFontFamily, setEditFontFamily] = useState("Arial, sans-serif");
  const [editBotMessageBg, setEditBotMessageBg] = useState("#FFFFFF");
  const [editBotMessageBgFontSize, setEditBotMessageBgFontSize] = useState("16px");
  const [editBotMessageBgTextColor, setEditBotMessageBgTextColor] = useState("#000000");
  const [editBotMessageUserMessage, setEditBotMessageUserMessage] = useState("Thanks for reaching out!");
  const [editUserMessageBg, setEditUserMessageBg] = useState("#EEEEEE");
  const [editUserMessageBgFontSize, setEditUserMessageBgFontSize] = useState("14px");
  const [editUserMessageBgTextColor, setEditUserMessageBgTextColor] = useState("#000000");
  const [editUserMessageFontFamily, setEditUserMessageFontFamily] = useState("Arial, sans-serif");
  const [editHeaderBg, setEditHeaderBg] = useState("#123456");
  const [editHeaderFontSize, setEditHeaderFontSize] = useState("18px");
  const [editHeaderTextColor, setEditHeaderTextColor] = useState("#FFFFFF");
  const [editHeaderFontFamily, setEditHeaderFontFamily] = useState("Montserrat, sans-serif");
  const [editInputBg, setEditInputBg] = useState("#FFFFFF");
  const [editInputTextColor, setEditInputTextColor] = useState("#000000");
  const [editInputPlaceholderText, setEditInputPlaceholderText] = useState("Type your question");
  const [editInputPlaceholderTextColor, setEditInputPlaceholderTextColor] = useState("#888888");
  const [editInputPlaceholderFontFamily, setEditInputPlaceholderFontFamily] = useState("Georgia, serif");
  const [editSubmitButtonBg, setEditSubmitButtonBg] = useState("#FF6600");
  const [editSubmitButtonColor, setEditSubmitButtonColor] = useState("#FFFFFF");
  const [editSubmitButtonFontFamily, setEditSubmitButtonFontFamily] = useState("Lato, sans-serif");
  const [savingEdit, setSavingEdit] = useState(false);
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

  function getScriptTag(publishKey: string) {
    // Use current origin (dashboard URL) for widget.js
    const widgetUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : 'https://webnotics-chatbot-dashboard.onrender.com';
    return `<script src="${widgetUrl}/widget.js?publish_key=${publishKey}"></script>`;
  }

  async function copyScriptTag(script: string, id: string) {
    try {
      await navigator.clipboard.writeText(script);
      setCopiedScriptId(id);
      setTimeout(() => setCopiedScriptId(null), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = script;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedScriptId(id);
      setTimeout(() => setCopiedScriptId(null), 2000);
    }
  }

  async function fetchWebsites() {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${API_BASE_URL}/websites`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      const list: Website[] = Array.isArray(data) ? data : [data];
      setWebsites(list);
      if (list.length > 0) setSelectedWebsiteId(list[0].id);
    } catch {}
  }

  async function fetchCustomizations() {
    setLoading(true);
    setListError(null);
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${API_BASE_URL}/customize-chatbot`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        // If 404 or empty response, treat as no data found
        if (res.status === 404) {
          setCustomizations([]);
          setLoading(false);
          return;
        }
        throw new Error('Failed to fetch customizations');
      }
      const data = await res.json();
      const customizationsList = Array.isArray(data) ? data : (data ? [data] : []);
      setCustomizations(customizationsList);
    } catch (err: any) {
      // Only show error for actual errors, not for empty data
      const errorMessage = err.message || 'Failed to fetch customizations';
      // If it's a network error or authentication error, show it
      if (errorMessage.includes('Not authenticated') || errorMessage.includes('Failed to fetch')) {
        setListError(errorMessage);
      } else {
        // For other cases, assume no data
        setCustomizations([]);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWebsites();
    fetchCustomizations();
  }, []);

  function getSelectedWebsite() {
    return websites.find(w => w.id === selectedWebsiteId);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const selected = getSelectedWebsite();
    if (!selected) {
      setError("Please select a website");
      return;
    }
    setSubmitting(true);
    setMessage(null);
    setError(null);
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${API_BASE_URL}/customize-chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          website_url: selected.website_url,
          publish_key: selected.publish_key,
          logo_url: logoUrl.trim(),
          brand_name: brandName.trim(),
          primary_color: primaryColor,
          text_color: textColor,
          background_color: backgroundColor,
          font_family: fontFamily.trim(),
          bot_message_bg: botMessageBg,
          bot_message_bg_font_size: botMessageBgFontSize.trim(),
          bot_message_bg_text_color: botMessageBgTextColor,
          bot_message_user_message: botMessageUserMessage.trim(),
          user_message_bg: userMessageBg,
          user_message_bg_font_size: userMessageBgFontSize.trim(),
          user_message_bg_text_color: userMessageBgTextColor,
          user_message_font_family: userMessageFontFamily.trim(),
          header_bg: headerBg,
          header_font_size: headerFontSize.trim(),
          header_text_color: headerTextColor,
          header_font_family: headerFontFamily.trim(),
          input_bg: inputBg,
          input_text_color: inputTextColor,
          input_placeholder_text: inputPlaceholderText.trim(),
          input_placeholder_text_color: inputPlaceholderTextColor,
          input_placeholder_font_family: inputPlaceholderFontFamily.trim(),
          submit_button_bg: submitButtonBg,
          submit_button_color: submitButtonColor,
          submit_button_font_family: submitButtonFontFamily.trim()
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Failed to create customization');
      setMessage('Chatbot customization created successfully');
      setLogoUrl("");
      setBrandName("");
      setPrimaryColor("#0000FF");
      setTextColor("#000000");
      setBackgroundColor("#FFFFFF");
      setFontFamily("Arial, sans-serif");
      setBotMessageBg("#FFFFFF");
      setBotMessageBgFontSize("16px");
      setBotMessageBgTextColor("#000000");
      setBotMessageUserMessage("Thanks for reaching out!");
      setUserMessageBg("#EEEEEE");
      setUserMessageBgFontSize("14px");
      setUserMessageBgTextColor("#000000");
      setUserMessageFontFamily("Arial, sans-serif");
      setHeaderBg("#123456");
      setHeaderFontSize("18px");
      setHeaderTextColor("#FFFFFF");
      setHeaderFontFamily("Montserrat, sans-serif");
      setInputBg("#FFFFFF");
      setInputTextColor("#000000");
      setInputPlaceholderText("Type your question");
      setInputPlaceholderTextColor("#888888");
      setInputPlaceholderFontFamily("Georgia, serif");
      setSubmitButtonBg("#FF6600");
      setSubmitButtonColor("#FFFFFF");
      setSubmitButtonFontFamily("Lato, sans-serif");
      await fetchCustomizations();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(custom: Customization) {
    setEditingId(custom.id);
    setEditLogoUrl(custom.logo_url || "");
    setEditBrandName(custom.brand_name);
    setEditPrimaryColor(custom.primary_color);
    setEditTextColor(custom.text_color);
    setEditBackgroundColor(custom.background_color);
    setEditFontFamily(custom.font_family);
    setEditBotMessageBg(custom.bot_message_bg);
    setEditBotMessageBgFontSize(custom.bot_message_bg_font_size);
    setEditBotMessageBgTextColor(custom.bot_message_bg_text_color);
    setEditBotMessageUserMessage(custom.bot_message_user_message || "");
    setEditUserMessageBg(custom.user_message_bg);
    setEditUserMessageBgFontSize(custom.user_message_bg_font_size);
    setEditUserMessageBgTextColor(custom.user_message_bg_text_color);
    setEditUserMessageFontFamily(custom.user_message_font_family);
    setEditHeaderBg(custom.header_bg);
    setEditHeaderFontSize(custom.header_font_size);
    setEditHeaderTextColor(custom.header_text_color);
    setEditHeaderFontFamily(custom.header_font_family);
    setEditInputBg(custom.input_bg);
    setEditInputTextColor(custom.input_text_color);
    setEditInputPlaceholderText(custom.input_placeholder_text);
    setEditInputPlaceholderTextColor(custom.input_placeholder_text_color);
    setEditInputPlaceholderFontFamily(custom.input_placeholder_font_family);
    setEditSubmitButtonBg(custom.submit_button_bg);
    setEditSubmitButtonColor(custom.submit_button_color);
    setEditSubmitButtonFontFamily(custom.submit_button_font_family);
  }

  async function saveEdit() {
    if (!editingId) return;
    setSavingEdit(true);
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${API_BASE_URL}/customize-chatbot/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          logo_url: editLogoUrl.trim(),
          brand_name: editBrandName.trim(),
          primary_color: editPrimaryColor,
          text_color: editTextColor,
          background_color: editBackgroundColor,
          font_family: editFontFamily.trim(),
          bot_message_bg: editBotMessageBg,
          bot_message_bg_font_size: editBotMessageBgFontSize.trim(),
          bot_message_bg_text_color: editBotMessageBgTextColor,
          bot_message_user_message: editBotMessageUserMessage.trim(),
          user_message_bg: editUserMessageBg,
          user_message_bg_font_size: editUserMessageBgFontSize.trim(),
          user_message_bg_text_color: editUserMessageBgTextColor,
          user_message_font_family: editUserMessageFontFamily.trim(),
          header_bg: editHeaderBg,
          header_font_size: editHeaderFontSize.trim(),
          header_text_color: editHeaderTextColor,
          header_font_family: editHeaderFontFamily.trim(),
          input_bg: editInputBg,
          input_text_color: editInputTextColor,
          input_placeholder_text: editInputPlaceholderText.trim(),
          input_placeholder_text_color: editInputPlaceholderTextColor,
          input_placeholder_font_family: editInputPlaceholderFontFamily.trim(),
          submit_button_bg: editSubmitButtonBg,
          submit_button_color: editSubmitButtonColor,
          submit_button_font_family: editSubmitButtonFontFamily.trim()
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Failed to update customization');
      await fetchCustomizations();
      setEditingId(null);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSavingEdit(false);
    }
  }

  async function deleteCustomization(id: string) {
    if (!confirm('Delete this customization?')) return;
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${API_BASE_URL}/customize-chatbot/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete customization');
      await fetchCustomizations();
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="mb-4 text-xl font-semibold text-white">Customize Chatbot</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <label className="block mb-2 text-sm text-gray-300">Website URL</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
            value={selectedWebsiteId ?? ''}
            onChange={(e) => setSelectedWebsiteId(Number(e.target.value))}
            required
          >
            <option value="">Select website</option>
            {websites.map(w => (
              <option key={w.id} value={w.id}>{w.website_url}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-300">Publish Key</label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
            value={getSelectedWebsite()?.publish_key || ''}
            readOnly
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-300">Logo URL</label>
          <input
            type="url"
            className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
            placeholder="https://example.com/logo.png"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-300">Brand Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
            placeholder="My Brand"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-300">Primary Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                className="h-10 w-20 border border-gray-700 rounded"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
              <input
                type="text"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Text Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                className="h-10 w-20 border border-gray-700 rounded"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
              <input
                type="text"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Background Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                className="h-10 w-20 border border-gray-700 rounded"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
              <input
                type="text"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-300">Font Family</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            required
          >
            <option value="Arial, sans-serif">Arial</option>
            <option value="Helvetica, sans-serif">Helvetica</option>
            <option value="Times New Roman, serif">Times New Roman</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="Courier New, monospace">Courier New</option>
            <option value="Verdana, sans-serif">Verdana</option>
            <option value="Roboto, sans-serif">Roboto</option>
            <option value="Montserrat, sans-serif">Montserrat</option>
            <option value="Lato, sans-serif">Lato</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-300">Bot Message Background</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
              value={botMessageBg}
              onChange={(e) => setBotMessageBg(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">Bot Message Font Size</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
              value={botMessageBgFontSize}
              onChange={(e) => setBotMessageBgFontSize(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-300">Bot Message Text Color</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
              value={botMessageBgTextColor}
              onChange={(e) => setBotMessageBgTextColor(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">Default Bot Message</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
              value={botMessageUserMessage}
              onChange={(e) => setBotMessageUserMessage(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-300">User Message Background</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
              value={userMessageBg}
              onChange={(e) => setUserMessageBg(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">User Message Font Size</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
              value={userMessageBgFontSize}
              onChange={(e) => setUserMessageBgFontSize(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-300">User Message Text Color</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
              value={userMessageBgTextColor}
              onChange={(e) => setUserMessageBgTextColor(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">User Message Font Family</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
              value={userMessageFontFamily}
              onChange={(e) => setUserMessageFontFamily(e.target.value)}
            >
              <option value="Arial, sans-serif">Arial</option>
              <option value="Helvetica, sans-serif">Helvetica</option>
              <option value="Times New Roman, serif">Times New Roman</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Courier New, monospace">Courier New</option>
              <option value="Verdana, sans-serif">Verdana</option>
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="Montserrat, sans-serif">Montserrat</option>
              <option value="Lato, sans-serif">Lato</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-300">Header Background</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
              value={headerBg}
              onChange={(e) => setHeaderBg(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">Header Font Size</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
              value={headerFontSize}
              onChange={(e) => setHeaderFontSize(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-300">Header Text Color</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
              value={headerTextColor}
              onChange={(e) => setHeaderTextColor(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">Header Font Family</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
              value={headerFontFamily}
              onChange={(e) => setHeaderFontFamily(e.target.value)}
            >
              <option value="Arial, sans-serif">Arial</option>
              <option value="Helvetica, sans-serif">Helvetica</option>
              <option value="Times New Roman, serif">Times New Roman</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Courier New, monospace">Courier New</option>
              <option value="Verdana, sans-serif">Verdana</option>
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="Montserrat, sans-serif">Montserrat</option>
              <option value="Lato, sans-serif">Lato</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-300">Input Background</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
              value={inputBg}
              onChange={(e) => setInputBg(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">Input Text Color</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
              value={inputTextColor}
              onChange={(e) => setInputTextColor(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-300">Input Placeholder Text</label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
            value={inputPlaceholderText}
            onChange={(e) => setInputPlaceholderText(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-300">Input Placeholder Text Color</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
              value={inputPlaceholderTextColor}
              onChange={(e) => setInputPlaceholderTextColor(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">Input Placeholder Font Family</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
              value={inputPlaceholderFontFamily}
              onChange={(e) => setInputPlaceholderFontFamily(e.target.value)}
            >
              <option value="Arial, sans-serif">Arial</option>
              <option value="Helvetica, sans-serif">Helvetica</option>
              <option value="Times New Roman, serif">Times New Roman</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Courier New, monospace">Courier New</option>
              <option value="Verdana, sans-serif">Verdana</option>
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="Montserrat, sans-serif">Montserrat</option>
              <option value="Lato, sans-serif">Lato</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-300">Submit Button Background</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
              value={submitButtonBg}
              onChange={(e) => setSubmitButtonBg(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">Submit Button Text Color</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
              value={submitButtonColor}
              onChange={(e) => setSubmitButtonColor(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-300">Submit Button Font Family</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
            value={submitButtonFontFamily}
            onChange={(e) => setSubmitButtonFontFamily(e.target.value)}
          >
            <option value="Arial, sans-serif">Arial</option>
            <option value="Helvetica, sans-serif">Helvetica</option>
            <option value="Times New Roman, serif">Times New Roman</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="Courier New, monospace">Courier New</option>
            <option value="Verdana, sans-serif">Verdana</option>
            <option value="Roboto, sans-serif">Roboto</option>
            <option value="Montserrat, sans-serif">Montserrat</option>
            <option value="Lato, sans-serif">Lato</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting || !selectedWebsiteId}
          className="px-4 py-2 rounded-lg bg-brand-500 text-white disabled:opacity-60"
        >
          {submitting ? 'Creating...' : 'Create Customization'}
        </button>
        {message && <p className="text-green-500 text-sm">{message}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Existing Customizations</h2>
        {loading && <p className="text-gray-400">Loading...</p>}
        {listError && <p className="text-red-500 text-sm">{listError}</p>}
        {!loading && !listError && customizations.length === 0 && (
          <p className="text-gray-400">No record found</p>
        )}
        {!loading && !listError && customizations.length > 0 && (
          <div className="space-y-4">
            {customizations.map((custom) => (
              <div key={custom.id} className="rounded-lg border border-gray-700 p-4 bg-gray-800/50">
                {editingId === custom.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-sm text-gray-300">Logo URL</label>
                      <input
                        type="url"
                        className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                        value={editLogoUrl}
                        onChange={(e) => setEditLogoUrl(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-300">Brand Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                        value={editBrandName}
                        onChange={(e) => setEditBrandName(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">Primary Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            className="h-10 w-20 border border-gray-700 rounded"
                            value={editPrimaryColor}
                            onChange={(e) => setEditPrimaryColor(e.target.value)}
                          />
                          <input
                            type="text"
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                            value={editPrimaryColor}
                            onChange={(e) => setEditPrimaryColor(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">Text Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            className="h-10 w-20 border border-gray-700 rounded"
                            value={editTextColor}
                            onChange={(e) => setEditTextColor(e.target.value)}
                          />
                          <input
                            type="text"
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                            value={editTextColor}
                            onChange={(e) => setEditTextColor(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">Background Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            className="h-10 w-20 border border-gray-700 rounded"
                            value={editBackgroundColor}
                            onChange={(e) => setEditBackgroundColor(e.target.value)}
                          />
                          <input
                            type="text"
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                            value={editBackgroundColor}
                            onChange={(e) => setEditBackgroundColor(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-300">Font Family</label>
                      <select
                        className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                        value={editFontFamily}
                        onChange={(e) => setEditFontFamily(e.target.value)}
                      >
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="Helvetica, sans-serif">Helvetica</option>
                        <option value="Times New Roman, serif">Times New Roman</option>
                        <option value="Georgia, serif">Georgia</option>
                        <option value="Courier New, monospace">Courier New</option>
                        <option value="Verdana, sans-serif">Verdana</option>
                        <option value="Roboto, sans-serif">Roboto</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">Bot Message Background</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                          value={editBotMessageBg}
                          onChange={(e) => setEditBotMessageBg(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">Bot Message Font Size</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                          value={editBotMessageBgFontSize}
                          onChange={(e) => setEditBotMessageBgFontSize(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">Bot Message Text Color</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                          value={editBotMessageBgTextColor}
                          onChange={(e) => setEditBotMessageBgTextColor(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">Default Bot Message</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                          value={editBotMessageUserMessage}
                          onChange={(e) => setEditBotMessageUserMessage(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">User Message Background</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                          value={editUserMessageBg}
                          onChange={(e) => setEditUserMessageBg(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">User Message Font Size</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                          value={editUserMessageBgFontSize}
                          onChange={(e) => setEditUserMessageBgFontSize(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">User Message Text Color</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                          value={editUserMessageBgTextColor}
                          onChange={(e) => setEditUserMessageBgTextColor(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">User Message Font Family</label>
                        <select
                          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                          value={editUserMessageFontFamily}
                          onChange={(e) => setEditUserMessageFontFamily(e.target.value)}
                        >
                          <option value="Arial, sans-serif">Arial</option>
                          <option value="Helvetica, sans-serif">Helvetica</option>
                          <option value="Times New Roman, serif">Times New Roman</option>
                          <option value="Georgia, serif">Georgia</option>
                          <option value="Courier New, monospace">Courier New</option>
                          <option value="Verdana, sans-serif">Verdana</option>
                          <option value="Roboto, sans-serif">Roboto</option>
                          <option value="Montserrat, sans-serif">Montserrat</option>
                          <option value="Lato, sans-serif">Lato</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">Header Background</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                          value={editHeaderBg}
                          onChange={(e) => setEditHeaderBg(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">Header Font Size</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                          value={editHeaderFontSize}
                          onChange={(e) => setEditHeaderFontSize(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">Header Text Color</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                          value={editHeaderTextColor}
                          onChange={(e) => setEditHeaderTextColor(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">Header Font Family</label>
                        <select
                          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                          value={editHeaderFontFamily}
                          onChange={(e) => setEditHeaderFontFamily(e.target.value)}
                        >
                          <option value="Arial, sans-serif">Arial</option>
                          <option value="Helvetica, sans-serif">Helvetica</option>
                          <option value="Times New Roman, serif">Times New Roman</option>
                          <option value="Georgia, serif">Georgia</option>
                          <option value="Courier New, monospace">Courier New</option>
                          <option value="Verdana, sans-serif">Verdana</option>
                          <option value="Roboto, sans-serif">Roboto</option>
                          <option value="Montserrat, sans-serif">Montserrat</option>
                          <option value="Lato, sans-serif">Lato</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">Input Background</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                          value={editInputBg}
                          onChange={(e) => setEditInputBg(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">Input Text Color</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                          value={editInputTextColor}
                          onChange={(e) => setEditInputTextColor(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-300">Input Placeholder Text</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                        value={editInputPlaceholderText}
                        onChange={(e) => setEditInputPlaceholderText(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">Input Placeholder Text Color</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                          value={editInputPlaceholderTextColor}
                          onChange={(e) => setEditInputPlaceholderTextColor(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">Input Placeholder Font Family</label>
                        <select
                          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                          value={editInputPlaceholderFontFamily}
                          onChange={(e) => setEditInputPlaceholderFontFamily(e.target.value)}
                        >
                          <option value="Arial, sans-serif">Arial</option>
                          <option value="Helvetica, sans-serif">Helvetica</option>
                          <option value="Times New Roman, serif">Times New Roman</option>
                          <option value="Georgia, serif">Georgia</option>
                          <option value="Courier New, monospace">Courier New</option>
                          <option value="Verdana, sans-serif">Verdana</option>
                          <option value="Roboto, sans-serif">Roboto</option>
                          <option value="Montserrat, sans-serif">Montserrat</option>
                          <option value="Lato, sans-serif">Lato</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">Submit Button Background</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                          value={editSubmitButtonBg}
                          onChange={(e) => setEditSubmitButtonBg(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm text-gray-300">Submit Button Text Color</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                          value={editSubmitButtonColor}
                          onChange={(e) => setEditSubmitButtonColor(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-300">Submit Button Font Family</label>
                      <select
                        className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white"
                        value={editSubmitButtonFontFamily}
                        onChange={(e) => setEditSubmitButtonFontFamily(e.target.value)}
                      >
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="Helvetica, sans-serif">Helvetica</option>
                        <option value="Times New Roman, serif">Times New Roman</option>
                        <option value="Georgia, serif">Georgia</option>
                        <option value="Courier New, monospace">Courier New</option>
                        <option value="Verdana, sans-serif">Verdana</option>
                        <option value="Roboto, sans-serif">Roboto</option>
                        <option value="Montserrat, sans-serif">Montserrat</option>
                        <option value="Lato, sans-serif">Lato</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button
                        disabled={savingEdit}
                        onClick={saveEdit}
                        className="px-4 py-2 rounded-lg bg-brand-500 text-white disabled:opacity-60"
                      >
                        {savingEdit ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 rounded-lg bg-gray-700 text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-white font-medium">{custom.brand_name}</p>
                        <p className="text-gray-400 text-sm">{custom.website_url}</p>
                        <p className="text-gray-500 text-xs mt-1">Publish Key: {custom.publish_key}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-sm">Primary:</span>
                          <span className="inline-block w-6 h-6 rounded border border-gray-600" style={{ backgroundColor: custom.primary_color }}></span>
                          <span className="text-gray-300 text-sm">{custom.primary_color}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-sm">Text:</span>
                          <span className="inline-block w-6 h-6 rounded border border-gray-600" style={{ backgroundColor: custom.text_color }}></span>
                          <span className="text-gray-300 text-sm">{custom.text_color}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-sm">Background:</span>
                          <span className="inline-block w-6 h-6 rounded border border-gray-600" style={{ backgroundColor: custom.background_color }}></span>
                          <span className="text-gray-300 text-sm">{custom.background_color}</span>
                        </div>
                        <p className="text-gray-400 text-sm">Font: {custom.font_family}</p>
                        <p className="text-gray-400 text-sm">Bot message: bg {custom.bot_message_bg}, size {custom.bot_message_bg_font_size}, text {custom.bot_message_bg_text_color}</p>
                        <p className="text-gray-400 text-sm">User message: bg {custom.user_message_bg}, size {custom.user_message_bg_font_size}, text {custom.user_message_bg_text_color}</p>
                        <p className="text-gray-400 text-sm">Header: bg {custom.header_bg}, size {custom.header_font_size}, text {custom.header_text_color}</p>
                        <p className="text-gray-400 text-sm">Input: bg {custom.input_bg}, text {custom.input_text_color}</p>
                        <p className="text-gray-400 text-sm">Placeholder: "{custom.input_placeholder_text}" ({custom.input_placeholder_text_color})</p>
                        <p className="text-gray-400 text-sm">Submit button: bg {custom.submit_button_bg}, text {custom.submit_button_color}</p>
                        {custom.logo_url && (
                          <p className="text-gray-400 text-sm">Logo: <a href={custom.logo_url} target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:underline">{custom.logo_url}</a></p>
                        )}
                        {custom.bot_message_user_message && (
                          <p className="text-gray-400 text-sm">Default Bot Message: {custom.bot_message_user_message}</p>
                        )}
                        <p className="text-gray-500 text-xs mt-2">Created: {new Date(custom.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
                      <label className="block mb-2 text-sm font-medium text-gray-300">Installation Script</label>
                      <div className="flex gap-2">
                        <code className="flex-1 px-3 py-2 bg-black rounded text-xs text-gray-300 font-mono break-all">
                          {getScriptTag(custom.publish_key)}
                        </code>
                        <button
                          onClick={() => copyScriptTag(getScriptTag(custom.publish_key), custom.id)}
                          className="px-4 py-2 rounded-lg bg-brand-500 text-white hover:bg-brand-600 whitespace-nowrap"
                        >
                          {copiedScriptId === custom.id ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Copy and paste this script tag before the closing &lt;/body&gt; tag on your website</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => startEdit(custom)}
                        className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCustomization(custom.id)}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
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

