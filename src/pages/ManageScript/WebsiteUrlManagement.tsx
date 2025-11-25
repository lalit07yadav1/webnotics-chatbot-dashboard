import { useState, useEffect } from "react";
import Switch from "../../components/form/switch/Switch";
import { getValidToken } from "../../utils/tokenUtils";

const API_BASE_URL = import.meta.env.VITE_WEBSITE_URL || 'https://webnotics-chatbot.onrender.com';

interface Page {
  url: string;
  title: string;
  description: string;
  page_count: number;
  enabled: boolean;
}

interface Category {
  category_name: string;
  page_count: number;
  enabled: boolean;
  pages: Page[];
}

interface CrawlResponse {
  website_url: string;
  total_pages: number;
  category_count: number;
  categories: Category[];
  message: string;
}

interface Website {
  id: number;
  website_url: string;
  publish_key?: string;
  website_url_pages?: string[];
  website_url_selected_pages?: string[];
  created_at?: string;
  updated_at?: string;
}

export default function WebsiteUrlManagement() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [maxPages, setMaxPages] = useState(200);
  const [maxDepth, setMaxDepth] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [crawlData, setCrawlData] = useState<CrawlResponse | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [savingLoading, setSavingLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loadingWebsites, setLoadingWebsites] = useState(false);
  const [websitesError, setWebsitesError] = useState<string | null>(null);
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null);
  const [editWebsiteUrl, setEditWebsiteUrl] = useState("");
  const [editMaxPages, setEditMaxPages] = useState(200);
  const [editMaxDepth, setEditMaxDepth] = useState(5);
  const [editCrawlData, setEditCrawlData] = useState<CrawlResponse | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editExpandedCategories, setEditExpandedCategories] = useState<Set<string>>(new Set());
  const [updatingWebsite, setUpdatingWebsite] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deletingWebsiteId, setDeletingWebsiteId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [regeneratingWebsiteId, setRegeneratingWebsiteId] = useState<number | null>(null);
  const [regenerateError, setRegenerateError] = useState<{ [key: number]: string }>({});
  const [regenerateSuccess, setRegenerateSuccess] = useState<{ [key: number]: string }>({});

  async function fetchWebsites() {
    setLoadingWebsites(true);
    setWebsitesError(null);
    try {
      const token = getValidToken();
      if (!token) {
        throw new Error("Not authenticated");
      }
      const res = await fetch(`${API_BASE_URL}/websites`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.detail || errorData?.message || 'Failed to fetch websites');
      }
      
      const data = await res.json();
      const list: Website[] = Array.isArray(data) ? data : [data];
      setWebsites(list);
    } catch (err: any) {
      setWebsitesError(err.message || 'An error occurred while fetching websites');
      console.error('Error fetching websites:', err);
    } finally {
      setLoadingWebsites(false);
    }
  }

  useEffect(() => {
    fetchWebsites();
  }, []);

  async function handleCrawl(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCrawlData(null);
    
    try {
      const params = new URLSearchParams({
        website_url: websiteUrl.trim(),
        max_pages: maxPages.toString(),
        max_depth: maxDepth.toString(),
      });

      const res = await fetch(`${API_BASE_URL}/crawl-website?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.detail || errorData?.message || 'Failed to crawl website');
      }

      const data: CrawlResponse = await res.json();
      setCrawlData(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while crawling the website');
    } finally {
      setLoading(false);
    }
  }

  const toggleCategory = (categoryName: string) => {
    const key = categoryName;
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCategoryToggle = (categoryIndex: number, enabled: boolean) => {
    if (!crawlData) return;
    
    const updatedData = { ...crawlData };
    updatedData.categories[categoryIndex].enabled = enabled;
    
    // If disabling category, disable all pages in it
    if (!enabled) {
      updatedData.categories[categoryIndex].pages.forEach(page => {
        page.enabled = false;
      });
    }
    
    setCrawlData(updatedData);
  };

  const handlePageToggle = (categoryIndex: number, pageIndex: number, enabled: boolean) => {
    if (!crawlData) return;
    
    const updatedData = { ...crawlData };
    updatedData.categories[categoryIndex].pages[pageIndex].enabled = enabled;
    
    // If enabling a page, check if all pages are enabled to enable category
    // If disabling a page, disable the category
    const category = updatedData.categories[categoryIndex];
    if (enabled) {
      const allPagesEnabled = category.pages.every(p => p.enabled);
      category.enabled = allPagesEnabled;
    } else {
      category.enabled = false;
    }
    
    setCrawlData(updatedData);
  };

  const handleContinue = async () => {
    if (!crawlData) return;

    setSavingLoading(true);
    setSaveError(null);
    setSaveSuccess(null);

    try {
      // Collect all website URLs from all categories
      const allUrls: string[] = [];
      crawlData.categories.forEach(category => {
        category.pages.forEach(page => {
          allUrls.push(page.url);
        });
      });

      // Collect selected pages (only enabled pages)
      const selectedPages: string[] = [];
      crawlData.categories.forEach(category => {
        category.pages.forEach(page => {
          if (page.enabled) {
            selectedPages.push(page.url);
          }
        });
      });

      // Create data object
      const data = {
        website_url: crawlData.website_url,
        website_url_pages: allUrls,
        website_url_selected_pages: selectedPages
      };

      // Log to console
      console.log('Website URL Data:', data);

      // Get authentication token
      const token = getValidToken();
      if (!token) {
        throw new Error("Not authenticated. Please login again.");
      }

      // Make API call to save data
      const response = await fetch(`${API_BASE_URL}/websites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.detail || errorData?.message || 'Failed to save website data');
      }

      const responseData = await response.json();
      setSaveSuccess('Website data saved successfully!');
      console.log('API Response:', responseData);
      
      // Refresh websites list after successful save
      await fetchWebsites();
    } catch (err: any) {
      setSaveError(err.message || 'An error occurred while saving the website data');
      console.error('Error saving website data:', err);
    } finally {
      setSavingLoading(false);
    }
  };

  const handleEditClick = (website: Website) => {
    setEditingWebsite(website);
    setEditWebsiteUrl(website.website_url);
    setEditMaxPages(200);
    setEditMaxDepth(5);
    setEditCrawlData(null);
    setEditError(null);
    setUpdateError(null);
    setEditExpandedCategories(new Set());
  };

  const handleCancelEdit = () => {
    setEditingWebsite(null);
    setEditWebsiteUrl("");
    setEditMaxPages(200);
    setEditMaxDepth(5);
    setEditCrawlData(null);
    setEditError(null);
    setUpdateError(null);
    setEditExpandedCategories(new Set());
  };

  const handleEditCrawl = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError(null);
    setEditCrawlData(null);
    
    try {
      const params = new URLSearchParams({
        website_url: editWebsiteUrl.trim(),
        max_pages: editMaxPages.toString(),
        max_depth: editMaxDepth.toString(),
      });

      const res = await fetch(`${API_BASE_URL}/crawl-website?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.detail || errorData?.message || 'Failed to crawl website');
      }

      const data: CrawlResponse = await res.json();
      setEditCrawlData(data);
    } catch (err: any) {
      setEditError(err.message || 'An error occurred while crawling the website');
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditCategoryToggle = (categoryIndex: number, enabled: boolean) => {
    if (!editCrawlData) return;
    
    const updatedData = { ...editCrawlData };
    updatedData.categories[categoryIndex].enabled = enabled;
    
    // If disabling category, disable all pages in it
    if (!enabled) {
      updatedData.categories[categoryIndex].pages.forEach(page => {
        page.enabled = false;
      });
    }
    
    setEditCrawlData(updatedData);
  };

  const handleEditPageToggle = (categoryIndex: number, pageIndex: number, enabled: boolean) => {
    if (!editCrawlData) return;
    
    const updatedData = { ...editCrawlData };
    updatedData.categories[categoryIndex].pages[pageIndex].enabled = enabled;
    
    // If enabling a page, check if all pages are enabled to enable category
    // If disabling a page, disable the category
    const category = updatedData.categories[categoryIndex];
    if (enabled) {
      const allPagesEnabled = category.pages.every(p => p.enabled);
      category.enabled = allPagesEnabled;
    } else {
      category.enabled = false;
    }
    
    setEditCrawlData(updatedData);
  };

  const toggleEditCategory = (categoryName: string) => {
    const key = categoryName;
    const newExpanded = new Set(editExpandedCategories);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setEditExpandedCategories(newExpanded);
  };

  const handleUpdateWebsite = async () => {
    if (!editingWebsite || !editCrawlData) return;

    setUpdatingWebsite(true);
    setUpdateError(null);

    try {
      // Collect all website URLs from all categories
      const allUrls: string[] = [];
      editCrawlData.categories.forEach(category => {
        category.pages.forEach(page => {
          allUrls.push(page.url);
        });
      });

      // Collect selected pages (only enabled pages)
      const selectedPages: string[] = [];
      editCrawlData.categories.forEach(category => {
        category.pages.forEach(page => {
          if (page.enabled) {
            selectedPages.push(page.url);
          }
        });
      });

      // Create data object
      const data = {
        website_url: editWebsiteUrl,
        website_url_pages: allUrls,
        website_url_selected_pages: selectedPages
      };

      // Log to console
      console.log('Update Website Data:', data);

      const token = getValidToken();
      if (!token) {
        throw new Error("Not authenticated. Please login again.");
      }

      const response = await fetch(`${API_BASE_URL}/websites/${editingWebsite.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.detail || errorData?.message || 'Failed to update website');
      }

      const responseData = await response.json();
      console.log('Update Response:', responseData);
      
      // Refresh websites list after successful update
      await fetchWebsites();
      handleCancelEdit();
    } catch (err: any) {
      setUpdateError(err.message || 'An error occurred while updating the website');
      console.error('Error updating website:', err);
    } finally {
      setUpdatingWebsite(false);
    }
  };

  const handleDeleteClick = (websiteId: number) => {
    setDeleteConfirmId(websiteId);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmId(null);
  };

  const handleDeleteWebsite = async (websiteId: number) => {
    setDeletingWebsiteId(websiteId);
    setDeleteConfirmId(null);

    try {
      const token = getValidToken();
      if (!token) {
        throw new Error("Not authenticated. Please login again.");
      }

      const response = await fetch(`${API_BASE_URL}/websites/${websiteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.detail || errorData?.message || 'Failed to delete website');
      }

      // Refresh websites list after successful delete
      await fetchWebsites();
    } catch (err: any) {
      setWebsitesError(err.message || 'An error occurred while deleting the website');
      console.error('Error deleting website:', err);
    } finally {
      setDeletingWebsiteId(null);
    }
  };

  const handleRegenerateWebsite = async (website: Website) => {
    if (!website.publish_key) {
      setRegenerateError({ [website.id]: 'Publish key not available for this website' });
      return;
    }

    setRegeneratingWebsiteId(website.id);
    setRegenerateError(prev => {
      const newState = { ...prev };
      delete newState[website.id];
      return newState;
    });
    setRegenerateSuccess(prev => {
      const newState = { ...prev };
      delete newState[website.id];
      return newState;
    });

    try {
      const token = getValidToken();
      if (!token) {
        throw new Error("Not authenticated. Please login again.");
      }

      const response = await fetch(`${API_BASE_URL}/regenerate-website-data`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          publish_key: website.publish_key
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.detail || errorData?.message || 'Failed to regenerate website data');
      }

      const responseData = await response.json();
      setRegenerateSuccess({ [website.id]: 'Website data regenerated successfully!' });
      console.log('Regenerate Response:', responseData);
      
      // Refresh websites list after successful regenerate
      await fetchWebsites();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setRegenerateSuccess(prev => {
          const newState = { ...prev };
          delete newState[website.id];
          return newState;
        });
      }, 3000);
    } catch (err: any) {
      setRegenerateError({ [website.id]: err.message || 'An error occurred while regenerating website data' });
      console.error('Error regenerating website data:', err);
    } finally {
      setRegeneratingWebsiteId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="mb-6 text-xl font-semibold text-white">Website URL Management</h1>
      
      {/* Website URL Input Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
          <h2 className="text-lg font-semibold text-white">Website</h2>
        </div>
        
        <form onSubmit={handleCrawl} className="max-w-2xl space-y-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
        <input
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="https://www.yourwebsite.com"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          required
          type="url"
        />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm text-gray-300">Max Pages</label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                type="number"
                min="1"
                value={maxPages}
                onChange={(e) => setMaxPages(Number(e.target.value))}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-300">Max Depth</label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                type="number"
                min="1"
                value={maxDepth}
                onChange={(e) => setMaxDepth(Number(e.target.value))}
                required
              />
            </div>
          </div>
          
        <button
          type="submit"
          disabled={loading}
            className="px-6 py-2 rounded-lg bg-brand-500 text-white disabled:opacity-60 disabled:cursor-not-allowed hover:bg-brand-600 transition-colors flex items-center justify-center gap-2"
        >
            {loading && (
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            )}
            {loading ? 'Crawling...' : 'Crawl Website'}
        </button>
          
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
      </form>
      </div>

      {/* Categories and Pages Display */}
      {crawlData && (
      <div className="mt-8">
          <div className="mb-4">
            <p className="text-gray-300 text-sm">
              ChatBot classified <strong className="text-white">{crawlData.total_pages} pages</strong> on your website into the following categories. 
              You can manage categories used in training. If you click on each category, you can decide which category pages should be used to train the bot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {crawlData.categories.map((category, categoryIndex) => {
              const isExpanded = expandedCategories.has(category.category_name);
              return (
                <div
                  key={category.category_name}
                  className="border border-gray-700 rounded-lg p-4 bg-gray-800/50 hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{category.category_name}</h3>
                      <p className="text-gray-400 text-sm">{category.page_count} pages</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch
                        label=""
                        checked={category.enabled}
                        onChange={(checked) => handleCategoryToggle(categoryIndex, checked)}
                        color="blue"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleCategory(category.category_name)}
                    className="w-full text-left text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1"
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {isExpanded ? 'Hide pages' : 'Show pages'}
                  </button>

                  {isExpanded && (
                    <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
                      {category.pages.map((page, pageIndex) => (
                        <div
                          key={page.url}
                          className="p-3 rounded-lg border border-gray-700 bg-gray-900/50"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white text-sm font-medium mb-1 line-clamp-2">
                                {page.title}
                              </h4>
                              {page.description && (
                                <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                                  {page.description}
                                </p>
                              )}
                              <a
                                href={page.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-400 text-xs hover:text-brand-300 truncate block"
                              >
                                {page.url}
                              </a>
                            </div>
                            <div className="flex-shrink-0">
                              <Switch
                                label=""
                                checked={page.enabled}
                                onChange={(checked) => handlePageToggle(categoryIndex, pageIndex, checked)}
                                color="blue"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {crawlData.message && (
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-green-400 text-sm">{crawlData.message}</p>
          </div>
        )}

          {/* Continue Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleContinue}
              disabled={savingLoading}
              className="px-6 py-2 rounded-lg bg-brand-500 text-white hover:bg-brand-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {savingLoading && (
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              )}
              {savingLoading ? 'Saving...' : 'Continue'}
            </button>
          </div>

          {/* Save Success Message */}
          {saveSuccess && (
            <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-green-400 text-sm">{saveSuccess}</p>
            </div>
          )}

          {/* Save Error Message */}
          {saveError && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-sm">{saveError}</p>
            </div>
          )}
      </div>
      )}

      {/* All Websites List */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">All Websites</h2>
          <button
            onClick={fetchWebsites}
            disabled={loadingWebsites}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm flex items-center gap-2"
          >
            <svg
              className={`w-4 h-4 ${loadingWebsites ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {loadingWebsites ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {loadingWebsites && websites.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">Loading websites...</p>
          </div>
        )}

        {websitesError && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 mb-4">
            <p className="text-red-400 text-sm">{websitesError}</p>
          </div>
        )}

        {!loadingWebsites && websites.length === 0 && !websitesError && (
          <div className="text-center py-8">
            <p className="text-gray-400">No websites found. Crawl and save a website to get started.</p>
          </div>
        )}

        {websites.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {websites.map((website) => (
              <div
                key={website.id}
                className="border border-gray-700 rounded-lg p-4 bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                {editingWebsite?.id === website.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    {!editCrawlData ? (
                      // Crawl Form
                      <form onSubmit={handleEditCrawl} className="space-y-4">
                        <div>
                          <label className="block mb-2 text-sm text-gray-300">Website URL</label>
                          <input
                            type="url"
                            value={editWebsiteUrl}
                            onChange={(e) => setEditWebsiteUrl(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                            placeholder="https://example.com"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block mb-2 text-xs text-gray-300">Max Pages</label>
                            <input
                              type="number"
                              min="1"
                              value={editMaxPages}
                              onChange={(e) => setEditMaxPages(Number(e.target.value))}
                              className="w-full px-2 py-1.5 rounded-lg border border-gray-700 bg-gray-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                              required
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-xs text-gray-300">Max Depth</label>
                            <input
                              type="number"
                              min="1"
                              value={editMaxDepth}
                              onChange={(e) => setEditMaxDepth(Number(e.target.value))}
                              className="w-full px-2 py-1.5 rounded-lg border border-gray-700 bg-gray-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                              required
                            />
                          </div>
                        </div>

                        {editError && (
                          <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                            <p className="text-red-400 text-xs">{editError}</p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <button
                            type="submit"
                            disabled={editLoading}
                            className="flex-1 px-3 py-2 rounded-lg bg-brand-500 text-white text-sm hover:bg-brand-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {editLoading && (
                              <svg
                                className="w-4 h-4 animate-spin"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                              </svg>
                            )}
                            {editLoading ? 'Crawling...' : 'Crawl Website'}
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            disabled={editLoading}
                            className="px-3 py-2 rounded-lg bg-gray-700 text-white text-sm hover:bg-gray-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      // Page Selection Interface
                      <div className="space-y-4">
                        <div className="mb-4">
                          <p className="text-gray-300 text-xs">
                            ChatBot classified <strong className="text-white">{editCrawlData.total_pages} pages</strong> on your website into the following categories. 
                            You can manage categories used in training. If you click on each category, you can decide which category pages should be used to train the bot.
                          </p>
                        </div>

                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {editCrawlData.categories.map((category, categoryIndex) => {
                            const isExpanded = editExpandedCategories.has(category.category_name);
                            return (
                              <div
                                key={category.category_name}
                                className="border border-gray-700 rounded-lg p-3 bg-gray-900/50"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex-1">
                                    <h4 className="text-white font-medium text-sm mb-1">{category.category_name}</h4>
                                    <p className="text-gray-400 text-xs">{category.page_count} pages</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Switch
                                      label=""
                                      checked={category.enabled}
                                      onChange={(checked) => handleEditCategoryToggle(categoryIndex, checked)}
                                      color="blue"
                                    />
                                  </div>
                                </div>
                                
                                <button
                                  onClick={() => toggleEditCategory(category.category_name)}
                                  className="w-full text-left text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1"
                                >
                                  <svg
                                    className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                  {isExpanded ? 'Hide pages' : 'Show pages'}
                                </button>

                                {isExpanded && (
                                  <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                                    {category.pages.map((page, pageIndex) => (
                                      <div
                                        key={page.url}
                                        className="p-2 rounded-lg border border-gray-700 bg-gray-800/50"
                                      >
                                        <div className="flex items-start justify-between gap-2">
                                          <div className="flex-1 min-w-0">
                                            <h5 className="text-white text-xs font-medium mb-1 line-clamp-1">
                                              {page.title}
                                            </h5>
                                            {page.description && (
                                              <p className="text-gray-400 text-xs mb-1 line-clamp-1">
                                                {page.description}
                                              </p>
                                            )}
                                            <a
                                              href={page.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-brand-400 text-xs hover:text-brand-300 truncate block"
                                            >
                                              {page.url}
                                            </a>
                                          </div>
                                          <div className="flex-shrink-0">
                                            <Switch
                                              label=""
                                              checked={page.enabled}
                                              onChange={(checked) => handleEditPageToggle(categoryIndex, pageIndex, checked)}
                                              color="blue"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {updateError && (
                          <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                            <p className="text-red-400 text-xs">{updateError}</p>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={handleUpdateWebsite}
                            disabled={updatingWebsite}
                            className="flex-1 px-3 py-2 rounded-lg bg-brand-500 text-white text-sm hover:bg-brand-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {updatingWebsite && (
                              <svg
                                className="w-4 h-4 animate-spin"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                              </svg>
                            )}
                            {updatingWebsite ? 'Saving...' : 'Save Changes'}
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            disabled={updatingWebsite}
                            className="px-3 py-2 rounded-lg bg-gray-700 text-white text-sm hover:bg-gray-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold mb-2 truncate">Website #{website.id}</h3>
                        <a
                          href={website.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-400 text-sm hover:text-brand-300 break-all"
                        >
                          {website.website_url}
                        </a>
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-2 text-xs text-gray-400">
                      {website.website_url_pages && (
                        <div>
                          <span className="font-medium text-gray-300">Total Pages: </span>
                          <span>{website.website_url_pages.length}</span>
                        </div>
                      )}
                      {website.website_url_selected_pages && (
                        <div>
                          <span className="font-medium text-gray-300">Selected Pages: </span>
                          <span>{website.website_url_selected_pages.length}</span>
                        </div>
                      )}
                      {website.created_at && (
                        <div>
                          <span className="font-medium text-gray-300">Created: </span>
                          <span>{new Date(website.created_at).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditClick(website)}
                          disabled={deletingWebsiteId === website.id || regeneratingWebsiteId === website.id}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(website.id)}
                          disabled={deletingWebsiteId === website.id || regeneratingWebsiteId === website.id}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {deletingWebsiteId === website.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                      <button
                        onClick={() => handleRegenerateWebsite(website)}
                        disabled={!website.publish_key || deletingWebsiteId === website.id || regeneratingWebsiteId === website.id}
                        className="w-full px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {regeneratingWebsiteId === website.id ? (
                          <>
                            <svg
                              className="w-3 h-3 animate-spin"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                            Regenerating...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                            Regenerate Website Content
                          </>
                        )}
                      </button>
                      {regenerateError[website.id] && (
                        <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                          <p className="text-red-400 text-xs">{regenerateError[website.id]}</p>
                        </div>
                      )}
                      {regenerateSuccess[website.id] && (
                        <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                          <p className="text-green-400 text-xs">{regenerateSuccess[website.id]}</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
              <h3 className="text-white font-semibold mb-4">Confirm Delete</h3>
              <p className="text-gray-300 text-sm mb-6">
                Are you sure you want to delete this website? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDeleteWebsite(deleteConfirmId)}
                  disabled={deletingWebsiteId !== null}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {deletingWebsiteId === deleteConfirmId ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  onClick={handleCancelDelete}
                  disabled={deletingWebsiteId !== null}
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
