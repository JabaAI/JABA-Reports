import { useEffect, useState } from 'react';

interface ComparisonBarChartProps {
  withoutIP: {
    engagement: number;
    emv: number;
  };
  withIP: {
    engagement: number;
    emv: number;
  };
  formatNumber: (num: number) => string;
  formatEMV: (num: number) => string;
}

export function ComparisonBarChart({ withoutIP, withIP, formatNumber, formatEMV }: ComparisonBarChartProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Calculate max values for scaling
  const maxEngagement = Math.max(withoutIP.engagement, withIP.engagement);
  const maxEMV = Math.max(withoutIP.emv, withIP.emv);

  // Calculate percentages for bar heights
  const engagementWithoutIPPercent = (withoutIP.engagement / maxEngagement) * 100;
  const engagementWithIPPercent = (withIP.engagement / maxEngagement) * 100;
  const emvWithoutIPPercent = (withoutIP.emv / maxEMV) * 100;
  const emvWithIPPercent = (withIP.emv / maxEMV) * 100;

  return (
    <div className="bg-black/40 border border-white/10 rounded-xl p-8">
      <h4 className="text-xl font-bold text-white mb-6 text-center">Performance Comparison: With vs Without IP</h4>

      <div className="grid grid-cols-2 gap-12">
        {/* ENGAGEMENT COMPARISON */}
        <div>
          <h5 className="text-sm font-semibold text-white/60 mb-4 text-center">Average Engagement Per Post</h5>
          <div className="flex items-end justify-center gap-8 h-64">
            {/* Without IP Bar */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="text-xs font-semibold text-gray-400 mb-1">Without IP</div>
              <div className="w-full bg-white/5 rounded-t-lg relative flex flex-col justify-end" style={{ height: '200px' }}>
                <div
                  className="w-full bg-gradient-to-t from-gray-500 to-gray-400 rounded-t-lg transition-all duration-1000 ease-out"
                  style={{
                    height: animate ? `${engagementWithoutIPPercent}%` : '0%'
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{formatNumber(withoutIP.engagement)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* With IP Bar */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="text-xs font-semibold text-[#00C9A7] mb-1">With IP</div>
              <div className="w-full bg-white/5 rounded-t-lg relative flex flex-col justify-end" style={{ height: '200px' }}>
                <div
                  className="w-full bg-gradient-to-t from-[#00C9A7] to-green-400 rounded-t-lg transition-all duration-1000 ease-out"
                  style={{
                    height: animate ? `${engagementWithIPPercent}%` : '0%'
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{formatNumber(withIP.engagement)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EMV COMPARISON */}
        <div>
          <h5 className="text-sm font-semibold text-white/60 mb-4 text-center">Average EMV Per Post</h5>
          <div className="flex items-end justify-center gap-8 h-64">
            {/* Without IP Bar */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="text-xs font-semibold text-gray-400 mb-1">Without IP</div>
              <div className="w-full bg-white/5 rounded-t-lg relative flex flex-col justify-end" style={{ height: '200px' }}>
                <div
                  className="w-full bg-gradient-to-t from-gray-500 to-gray-400 rounded-t-lg transition-all duration-1000 ease-out"
                  style={{
                    height: animate ? `${emvWithoutIPPercent}%` : '0%'
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{formatEMV(withoutIP.emv)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* With IP Bar */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="text-xs font-semibold text-[#3B9FD9] mb-1">With IP</div>
              <div className="w-full bg-white/5 rounded-t-lg relative flex flex-col justify-end" style={{ height: '200px' }}>
                <div
                  className="w-full bg-gradient-to-t from-[#3B9FD9] to-blue-400 rounded-t-lg transition-all duration-1000 ease-out"
                  style={{
                    height: animate ? `${emvWithIPPercent}%` : '0%'
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{formatEMV(withIP.emv)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-white/60">
        Posts with Playfly IP consistently outperform posts without IP in both engagement and earned media value
      </div>
    </div>
  );
}
