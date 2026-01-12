import { useEffect, useState } from "react";
import { getValidToken } from "../../utils/tokenUtils";

const API_BASE_URL = import.meta.env.VITE_WEBSITE_URL || 'http://206.189.125.220:8000';

interface BotUser {
  email: string;
  username: string;
  ip_address: string;
  phone_number: string | null;
  website_url: string;
  date: string;
}

export default function BotUsersList() {
  const [users, setUsers] = useState<BotUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedUsers, setExpandedUsers] = useState<Set<number>>(new Set());

  const fetchBotUsers = async () => {
    setLoading(true);
    setError(null);
    
    const token = getValidToken();
    if (!token) {
      setError("Authentication required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/botuserlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          setUsers([]);
          setLoading(false);
          return;
        }
        throw new Error(`Failed to fetch bot users: ${response.statusText}`);
      }

      const responseData: BotUser[] = await response.json();
      setUsers(responseData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch bot users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBotUsers();
  }, []);

  const toggleUser = (index: number) => {
    const newExpanded = new Set(expandedUsers);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedUsers(newExpanded);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-black">
        <div className="text-white">Loading bot users...</div>
      </div>
    );
  }

  if (error && users.length === 0) {
    return (
      <div className="w-full bg-black min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white">
            Bot Users List
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            View all bot users
          </p>
        </div>
        <div className="bg-black rounded-lg border border-gray-700 p-6">
          <div className="text-red-400">{error}</div>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="w-full bg-black min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white">
            Bot Users List
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            View all bot users
          </p>
        </div>
        <div className="bg-black rounded-lg border border-gray-700 p-6">
          <p className="text-gray-400 text-center">No users found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">
          Bot Users List
        </h1>
        <p className="text-sm text-gray-300 mt-1">
          Total: {users.length} user{users.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-4">
        {users.map((user, index) => {
          const isExpanded = expandedUsers.has(index);

          return (
            <div
              key={index}
              className="bg-black rounded-lg border border-gray-700 overflow-hidden"
            >
              {/* User Header - Always visible */}
              <button
                onClick={() => toggleUser(index)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-900 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <svg
                    className={`w-5 h-5 text-gray-300 transition-transform flex-shrink-0 ${
                      isExpanded ? "rotate-90" : ""
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
                  <div className="text-left flex-1 min-w-0">
                    <div className="font-semibold text-white truncate">
                      {user.email}
                    </div>
                    <div className="text-sm text-gray-300 mt-1">
                      Phone: {user.phone_number || "N/A"}
                    </div>
                  </div>
                </div>
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-gray-700 bg-gray-900">
                  <div className="p-4 pl-12 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-medium text-gray-400 mb-1">
                          Email
                        </div>
                        <div className="text-sm text-white">
                          {user.email}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs font-medium text-gray-400 mb-1">
                          Username
                        </div>
                        <div className="text-sm text-white">
                          {user.username || "N/A"}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs font-medium text-gray-400 mb-1">
                          Phone Number
                        </div>
                        <div className="text-sm text-white">
                          {user.phone_number || "N/A"}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs font-medium text-gray-400 mb-1">
                          IP Address
                        </div>
                        <div className="text-sm text-white">
                          {user.ip_address || "N/A"}
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <div className="text-xs font-medium text-gray-400 mb-1">
                          Website URL
                        </div>
                        <div className="text-sm text-white break-all">
                          <a
                            href={user.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline"
                          >
                            {user.website_url}
                          </a>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs font-medium text-gray-400 mb-1">
                          Date
                        </div>
                        <div className="text-sm text-white">
                          {formatDate(user.date)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}






