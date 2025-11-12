import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ChatbotPerformanceChartProps {
  websites?: Array<{
    id: number;
    website_url: string;
    publish_key: string;
  }>;
  messages?: Array<any>;
}

export default function ChatbotPerformanceChart({ websites = [], messages = [] }: ChatbotPerformanceChartProps) {
  // Calculate performance per website
  const getWebsitePerformance = () => {
    if (!websites || websites.length === 0) {
      return {
        categories: ["Support Bot", "Sales Bot", "FAQ Bot", "Welcome Bot"],
        data: [0, 0, 0, 0],
      };
    }

    // Group messages by website
    const websiteMessageCounts: { [key: string]: number } = {};
    
    if (messages && messages.length > 0) {
      messages.forEach((message: any) => {
        // Use website_url from message or match by publish_key
        if (message.website_url) {
          websiteMessageCounts[message.website_url] = (websiteMessageCounts[message.website_url] || 0) + 1;
        } else if (message.publish_key) {
          // Try to match by publish_key if website_url is not available
          const matchingWebsite = websites.find(w => w.publish_key === message.publish_key);
          if (matchingWebsite) {
            websiteMessageCounts[matchingWebsite.website_url] = (websiteMessageCounts[matchingWebsite.website_url] || 0) + 1;
          }
        }
      });
    }

    // Get top 4 websites or pad with zeros
    const websiteCounts = websites.map((website) => {
      const count = websiteMessageCounts[website.website_url] || websiteMessageCounts[website.publish_key] || 0;
      return { name: website.website_url, count };
    }).sort((a, b) => b.count - a.count).slice(0, 4);

    // Pad to 4 if needed
    while (websiteCounts.length < 4) {
      websiteCounts.push({ name: `Bot ${websiteCounts.length + 1}`, count: 0 });
    }

    return {
      categories: websiteCounts.map((w) => {
        // Extract domain name or use shortened URL
        try {
          const url = new URL(w.name);
          return url.hostname.replace('www.', '') || w.name;
        } catch {
          return w.name.length > 20 ? w.name.substring(0, 20) + '...' : w.name;
        }
      }),
      data: websiteCounts.map((w) => w.count),
    };
  };

  const performance = getWebsitePerformance();
  const options: ApexOptions = {
    colors: ["#ffffff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 330,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: performance.categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  };
  const series = [
    {
      name: "Messages",
      data: performance.data,
    },
  ];


  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Chatbot Performance
        </h3>

      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <Chart options={options} series={series} type="bar" height={330} />
        </div>
      </div>
    </div>
  );
}
