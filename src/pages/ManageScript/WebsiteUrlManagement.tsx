import { useState } from "react";
import Switch from "../../components/form/switch/Switch";

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

export default function WebsiteUrlManagement() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [maxPages, setMaxPages] = useState(200);
  const [maxDepth, setMaxDepth] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [crawlData, setCrawlData] = useState<CrawlResponse | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

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
            className="px-6 py-2 rounded-lg bg-brand-500 text-white disabled:opacity-60 disabled:cursor-not-allowed hover:bg-brand-600 transition-colors"
        >
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
      </div>
      )}
    </div>
  );
}
