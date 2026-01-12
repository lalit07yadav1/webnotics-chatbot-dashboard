import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import OverviewTopTiles from "../../components/Overview/OverviewTopTiles";
import ConversationTrendsChart from "../../components/Overview/ConversationTrendsChart";
import ChatbotPerformanceChart from "../../components/Overview/ChatbotPerformanceChart";
import { getValidToken } from "../../utils/tokenUtils";

const API_BASE_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://206.189.125.220:8000";

interface AccountStats {
  account_id: number;
  email: string;
  name: string;
  subscription_type: string;
  website_count: number;
  total_messages: number;
  total_ip_addresses: number;
  websites: Array<{
    id: number;
    website_url: string;
    publish_key: string;
  }>;
  messages: Array<any>;
  ip_addresses: Array<{
    ip_address: string;
    message_count: number;
    messages: Array<any>;
  }>;
}

export default function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<AccountStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      const token = getValidToken();

      if (!token) {
        navigate("/signin", { replace: true });
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/accounts/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data: AccountStats = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard");
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  if (loading) {
    return (
      <>
        <PageMeta
          title="Webnotics Admin Dashboard"
          description="Webnotics Admin Dashboard"
        />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-500 dark:text-gray-400">Loading...</div>
        </div>
      </>
    );
  }

  if (error || !stats) {
    return (
      <>
        <PageMeta
          title="Webnotics Admin Dashboard"
          description="Webnotics Admin Dashboard"
        />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-500 dark:text-red-400">
            {error || "Failed to load dashboard"}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Webnotics Admin Dashboard"
        description="Webnotics Admin Dashboard"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <OverviewTopTiles stats={stats} />
        </div>

        <div className="col-span-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            <ConversationTrendsChart messages={stats.messages} />
            <ChatbotPerformanceChart websites={stats.websites} messages={stats.messages} />
          </div>
        </div>

        <div className="col-span-12">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Recent Activity
              </h3>
            </div>
            <div className="flex flex-col gap-3 mt-5 mb-5">
              {stats.messages && stats.messages.length > 0 ? (
                stats.messages
                  .slice(0, 4)
                  .map((message: any, index: number) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-gray-800 bg-black p-3 md:p-4"
                    >
                      <div className="flex items-end justify-between">
                        <div>
                          <h4 className="font-bold text-gray-800 text-lg dark:text-white/90">
                            {message.user_message || message.message || "New Message"}
                          </h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                            {message.ai_response 
                              ? message.ai_response.replace(/<[^>]*>/g, '').substring(0, 50) + '...'
                              : message.response || "Response received"}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {message.created_at
                            ? new Date(message.created_at).toLocaleDateString()
                            : message.timestamp
                            ? new Date(message.timestamp).toLocaleDateString()
                            : "Recently"}
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No recent activity
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
