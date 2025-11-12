import {
  BaselineShowChartIcon,
  ChatIcon,
  ConversationIcon,
  GroupIcon
} from "../../icons";
import { Modal } from "../ui/modal";
import { useModal } from "../../hooks/useModal";

interface AccountStats {
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

interface OverviewTopTilesProps {
  stats: AccountStats;
}

export default function OverviewTopTiles({ stats }: OverviewTopTilesProps) {
  const websitesModal = useModal();
  const messagesModal = useModal();
  const ipAddressesModal = useModal();

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
        {/* <!-- Total Websites Item Start --> */}
        <div
          onClick={websitesModal.openModal}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <ChatIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Websites
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {formatNumber(stats.website_count)}
              </h4>
            </div>
          </div>
        </div>

        {/* <!-- Conversations Item Start --> */}
        <div
          onClick={messagesModal.openModal}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <ConversationIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Conversations
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {formatNumber(stats.total_messages)}
              </h4>
            </div>
          </div>
        </div>

        {/* <!-- Active Users Item Start --> */}
        <div
          onClick={ipAddressesModal.openModal}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Active Users
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {formatNumber(stats.total_ip_addresses)}
              </h4>
            </div>
          </div>
        </div>

        {/* <!-- Response Rate Item Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <BaselineShowChartIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Response Rate
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {stats.total_messages > 0 ? "100%" : "0%"}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Websites Modal */}
      <Modal isOpen={websitesModal.isOpen} onClose={websitesModal.closeModal}>
        <div className="p-6 max-w-4xl max-h-[80vh] overflow-y-auto dark:bg-gray-900">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-4">
            Websites ({stats.website_count})
          </h2>
          <div className="space-y-4">
            {stats.websites && stats.websites.length > 0 ? (
              stats.websites.map((website) => (
                <div
                  key={website.id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-white/90 mb-2">
                        {website.website_url}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Publish Key:</span>{" "}
                        {website.publish_key}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span className="font-medium">ID:</span> {website.id}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No websites found
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Messages Modal */}
      <Modal isOpen={messagesModal.isOpen} onClose={messagesModal.closeModal}>
        <div className="p-6 max-w-4xl max-h-[80vh] overflow-y-auto dark:bg-gray-900">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-4">
            Messages ({stats.total_messages})
          </h2>
          <div className="space-y-4">
            {stats.messages && stats.messages.length > 0 ? (
              stats.messages.map((message: any, index: number) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]"
                >
                  <div className="space-y-2">
                    {message.username && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Username:</span> {message.username}
                      </p>
                    )}
                    {message.email && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Email:</span> {message.email}
                      </p>
                    )}
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        <span className="font-medium">Message:</span>
                      </p>
                      <p className="text-gray-800 dark:text-white/90">
                        {message.user_message || message.message || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        <span className="font-medium">AI Response:</span>
                      </p>
                      <div 
                        className="text-gray-800 dark:text-white/90"
                        dangerouslySetInnerHTML={{ __html: message.ai_response || message.response || "N/A" }}
                      />
                    </div>
                    {message.created_at && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Time:</span>{" "}
                        {new Date(message.created_at).toLocaleString()}
                      </p>
                    )}
                    {message.ip_address && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">IP:</span> {message.ip_address}
                      </p>
                    )}
                    {message.website_url && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Website:</span> {message.website_url}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No messages found
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* IP Addresses Modal */}
      <Modal isOpen={ipAddressesModal.isOpen} onClose={ipAddressesModal.closeModal}>
        <div className="p-6 max-w-4xl max-h-[80vh] overflow-y-auto dark:bg-gray-900">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-4">
            IP Addresses ({stats.total_ip_addresses})
          </h2>
          <div className="space-y-4">
            {stats.ip_addresses && stats.ip_addresses.length > 0 ? (
              stats.ip_addresses.map((ipData, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white/90">
                        {ipData.ip_address}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span className="font-medium">Message Count:</span>{" "}
                        {ipData.message_count}
                      </p>
                    </div>
                  </div>
                  {ipData.messages && ipData.messages.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Recent Messages:
                      </p>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {ipData.messages.slice(0, 5).map((msg: any, msgIndex: number) => (
                          <div
                            key={msgIndex}
                            className="text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded"
                          >
                            {msg.username && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                <span className="font-medium">User:</span> {msg.username}
                              </p>
                            )}
                            <p className="text-gray-800 dark:text-white/90">
                              {msg.user_message || msg.message || "N/A"}
                            </p>
                            {msg.ai_response && (
                              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                                {msg.ai_response.replace(/<[^>]*>/g, '').substring(0, 100)}...
                              </p>
                            )}
                            {msg.created_at && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {new Date(msg.created_at).toLocaleString()}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No IP addresses found
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
