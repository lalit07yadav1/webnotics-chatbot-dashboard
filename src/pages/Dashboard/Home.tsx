import PageMeta from "../../components/common/PageMeta";
import OverviewTopTiles from "../../components/Overview/OverviewTopTiles";
import ConversationTrendsChart from "../../components/Overview/ConversationTrendsChart";
import ChatbotPerformanceChart from "../../components/Overview/ChatbotPerformanceChart";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Webnotics Admin Dashboard | Overview"
        description="Webnotics Admin Dashboard | Overview"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <OverviewTopTiles />
        </div>


        <div className="col-span-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            <ConversationTrendsChart />
            <ChatbotPerformanceChart />
          </div>

        </div>

        <div className="col-span-12">
          <div className="overflow-hidden rounded-2xl border px-5 pt-5border-gray-800bg-white/[0.03] sm:px-6 sm:pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white/90">
                Recent Activity
              </h3>

            </div>
            <div className="flex flex-col gap-3 mt-5 mb-5">
              <div className="rounded-2xl border border-gray-800 bg-black p-3 md:p-4">


                <div className="flex items-end justify-between">
                  <div>
                    <h4 className="font-boldtext-lg text-white/90">
                      Support Bot
                    </h4>
                    <span className="text-sm text-gray-400">
                      Answered customer query about pricing
                    </span>

                  </div>
                  <span className="text-sm text-gray-400">2 min ago</span>
                </div>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-black p-3 md:p-4">


                <div className="flex items-end justify-between">
                  <div>
                    <h4 className="font-bold text-lg text-white/90">
                      Sales Bot
                    </h4>
                    <span className="text-sm text-gray-400">
                      Converted lead to qualified prospect
                    </span>

                  </div>
                  <span className="text-sm text-gray-400">5 min ago</span>
                </div>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-black p-3 md:p-4">


                <div className="flex items-end justify-between">
                  <div>
                    <h4 className="font-bold  text-lg text-white/90">
                      FAQ Bot
                    </h4>
                    <span className="text-sm  text-gray-400">
                      Resolved 5 common questions
                    </span>

                  </div>
                  <span className="text-sm text-gray-400">2 min ago</span>
                </div>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-black p-3 md:p-4">


                <div className="flex items-end justify-between">
                  <div>
                    <h4 className="font-bold text-lg text-white/90">
                      Welcome Bot
                    </h4>
                    <span className="text-sm  text-gray-400">
                      Greeted 12 new visitors
                    </span>

                  </div>
                  <span className="text-sm text-gray-400">10 min ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
