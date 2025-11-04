import { useEffect, useState } from "react";
import { getValidToken } from "../../utils/tokenUtils";

const API_BASE_URL = import.meta.env.VITE_WEBSITE_URL || 'https://webnotics-chatbot.onrender.com';

interface Message {
  id: number;
  username: string | null;
  email: string | null;
  user_message: string;
  ai_response: string;
  created_at: string;
}

interface IPAddress {
  ip_address: string;
  messages: Message[];
}

interface Website {
  website_url: string;
  publish_key: string;
  ip_addresses: IPAddress[];
}

interface MessagesResponse {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  websites: Website[];
}

export default function AllMessages() {
  const [data, setData] = useState<MessagesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(50);
  
  // Track expanded states
  const [expandedWebsites, setExpandedWebsites] = useState<Set<string>>(new Set());
  const [expandedIPs, setExpandedIPs] = useState<Set<string>>(new Set());

  const fetchMessages = async (page: number) => {
    setLoading(true);
    setError(null);
    
    const token = getValidToken();
    if (!token) {
      setError("Authentication required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/messages/all?page=${page}&page_size=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          setData({
            total: 0,
            page: 1,
            page_size: pageSize,
            total_pages: 0,
            websites: [],
          });
          setLoading(false);
          return;
        }
        throw new Error(`Failed to fetch messages: ${response.statusText}`);
      }

      const responseData: MessagesResponse = await response.json();
      setData(responseData);
      
      // Auto-expand first website on load
      if (responseData.websites.length > 0 && expandedWebsites.size === 0) {
        setExpandedWebsites(new Set([responseData.websites[0].website_url]));
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch messages");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const toggleWebsite = (websiteUrl: string) => {
    const newExpanded = new Set(expandedWebsites);
    if (newExpanded.has(websiteUrl)) {
      newExpanded.delete(websiteUrl);
      // Also collapse all IPs for this website
      const newExpandedIPs = new Set(expandedIPs);
      const website = data?.websites.find(w => w.website_url === websiteUrl);
      if (website) {
        website.ip_addresses.forEach(ip => {
          newExpandedIPs.delete(`${websiteUrl}-${ip.ip_address}`);
        });
      }
      setExpandedIPs(newExpandedIPs);
    } else {
      newExpanded.add(websiteUrl);
    }
    setExpandedWebsites(newExpanded);
  };

  const toggleIP = (websiteUrl: string, ipAddress: string) => {
    const key = `${websiteUrl}-${ipAddress}`;
    const newExpanded = new Set(expandedIPs);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedIPs(newExpanded);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && data && newPage <= data.total_pages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500 dark:text-gray-400">Loading messages...</div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500 dark:text-red-400">{error}</div>
      </div>
    );
  }

  if (!data || data.websites.length === 0) {
    return (
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            All Messages
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View all chatbot messages
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-gray-400 dark:text-gray-500 text-center">No record found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          All Messages
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Total: {data.total} messages | Page {data.page} of {data.total_pages}
        </p>
      </div>

      <div className="space-y-4">
        {data.websites.map((website) => {
          const isWebsiteExpanded = expandedWebsites.has(website.website_url);
          const websiteKey = website.website_url;

          return (
            <div
              key={websiteKey}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Website Header */}
              <button
                onClick={() => toggleWebsite(website.website_url)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
                      isWebsiteExpanded ? "rotate-90" : ""
                    }`}
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
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {website.website_url}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Publish Key: {website.publish_key}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {website.ip_addresses.length} IP{website.ip_addresses.length !== 1 ? 's' : ''}
                </div>
              </button>

              {/* IP Addresses */}
              {isWebsiteExpanded && (
                <div className="border-t border-gray-200 dark:border-gray-700">
                  {website.ip_addresses.map((ipData) => {
                    const ipKey = `${website.website_url}-${ipData.ip_address}`;
                    const isIPExpanded = expandedIPs.has(ipKey);

                    return (
                      <div
                        key={ipKey}
                        className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                      >
                        {/* IP Address Header */}
                        <button
                          onClick={() => toggleIP(website.website_url, ipData.ip_address)}
                          className="w-full flex items-center justify-between p-4 pl-12 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <svg
                              className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
                                isIPExpanded ? "rotate-90" : ""
                              }`}
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
                            <div className="font-medium text-gray-800 dark:text-gray-200">
                              IP: {ipData.ip_address}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {ipData.messages.length} message{ipData.messages.length !== 1 ? 's' : ''}
                          </div>
                        </button>

                        {/* Messages */}
                        {isIPExpanded && (
                          <div className="bg-gray-50 dark:bg-gray-900/50">
                            <div className="p-4 pl-20 space-y-4">
                              {ipData.messages.map((message) => (
                                <div
                                  key={message.id}
                                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-3"
                                >
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <div className="font-medium text-gray-900 dark:text-white">
                                        {message.username || "Anonymous"}
                                      </div>
                                      {message.email && (
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                          {message.email}
                                        </div>
                                      )}
                                    </div>
                                    <div className="text-xs text-gray-400 dark:text-gray-500">
                                      {formatDate(message.created_at)}
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <div>
                                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        User Message:
                                      </div>
                                      <div className="text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 rounded p-2">
                                        {message.user_message}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        AI Response:
                                      </div>
                                      <div className="text-sm text-gray-800 dark:text-gray-200 bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                                        {message.ai_response}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {data.total_pages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, data.total_pages) }, (_, i) => {
              let pageNum;
              if (data.total_pages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= data.total_pages - 2) {
                pageNum = data.total_pages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    currentPage === pageNum
                      ? "bg-brand-500 text-white"
                      : "text-gray-700 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === data.total_pages}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

