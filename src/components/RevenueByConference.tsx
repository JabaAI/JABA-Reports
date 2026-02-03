import { TrendingUp, DollarSign, AlertCircle } from 'lucide-react';

export function RevenueByConference() {
  const conferences = [
    {
      name: 'SEC',
      schools: 3,
      totalRevenue: 10600000,
      revenuePerSchool: 3533333,
      revenuePerAthlete: 2933,
      totalAthletes: 3610,
      avgEngagement: 0.042,
      insight: 'Highest revenue per athlete because of engagement levels. These athletes should command premium pricing.',
      color: 'from-[#1770C0] to-indigo-600',
      pricing: 'premium',
    },
    {
      name: 'Big Ten',
      schools: 1,
      totalRevenue: 4200000,
      revenuePerSchool: 4200000,
      revenuePerAthlete: 3373,
      totalAthletes: 1245,
      avgEngagement: 0.041,
      insight: 'Top revenue per school but only one school in network. Significant expansion opportunity.',
      color: 'from-blue-500 to-[#0D5A9F]',
      pricing: 'premium',
    },
    {
      name: 'Big 12',
      schools: 1,
      totalRevenue: 2100000,
      revenuePerSchool: 2100000,
      revenuePerAthlete: 2354,
      totalAthletes: 892,
      avgEngagement: 0.037,
      insight: 'Strong engagement but lower revenue per athlete. Opportunity to align pricing with performance.',
      color: 'from-orange-500 to-red-600',
      pricing: 'standard',
    },
    {
      name: 'ACC',
      schools: 2,
      totalRevenue: 4150000,
      revenuePerSchool: 2075000,
      revenuePerAthlete: 2951,
      totalAthletes: 1403,
      avgEngagement: 0.036,
      insight: 'Mid-tier performance. Opportunity to increase deal values and monetization rates.',
      color: 'from-green-500 to-emerald-600',
      pricing: 'standard',
    },
    {
      name: 'Mountain West',
      schools: 1,
      totalRevenue: 1650000,
      revenuePerSchool: 1650000,
      revenuePerAthlete: 2649,
      totalAthletes: 623,
      avgEngagement: 0.034,
      insight: 'Lowest revenue per athlete despite strong engagement numbers. Opportunity: Align pricing with actual performance.',
      color: 'from-gray-500 to-slate-600',
      pricing: 'budget',
    },
  ];

  const formatCurrency = (num: number): string => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toFixed(0)}`;
  };

  const formatPercent = (num: number): string => {
    return `${(num * 100).toFixed(1)}%`;
  };

  // Sort by revenue per athlete (descending)
  const sortedConferences = [...conferences].sort((a, b) => b.revenuePerAthlete - a.revenuePerAthlete);

  // Calculate pricing differences
  const secPerAthlete = conferences.find(c => c.name === 'SEC')!.revenuePerAthlete;
  const mountainWestPerAthlete = conferences.find(c => c.name === 'Mountain West')!.revenuePerAthlete;
  const pricingGap = ((secPerAthlete - mountainWestPerAthlete) / mountainWestPerAthlete) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-black tracking-wide mb-2">
          REVENUE BY CONFERENCE - WHO'S MONETIZING BETTER?
        </h2>
        <div className="h-1.5 w-32 bg-gradient-to-r from-[#1770C0] to-indigo-600" />
        <p className="text-gray-700 mt-3 text-lg">
          Conference tier matters. Which conferences generate more revenue per athlete, and why?
        </p>
      </div>

      {/* Conference Bars */}
      <div className="mb-8 space-y-4">
        {sortedConferences.map((conf, index) => (
          <div key={index} className="relative">
            <div className={`bg-gradient-to-r ${conf.color} rounded-xl p-6 text-white shadow-lg`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl font-bold">{conf.name}</div>
                    <div className="text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      {conf.schools} school{conf.schools > 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs opacity-80">Est. Revenue</div>
                      <div className="text-xl font-bold">{formatCurrency(conf.totalRevenue)}</div>
                    </div>
                    <div>
                      <div className="text-xs opacity-80">Per School</div>
                      <div className="text-xl font-bold">{formatCurrency(conf.revenuePerSchool)}</div>
                    </div>
                    <div>
                      <div className="text-xs opacity-80">Per Athlete</div>
                      <div className="text-xl font-bold">{formatCurrency(conf.revenuePerAthlete)}</div>
                    </div>
                    <div>
                      <div className="text-xs opacity-80">Avg Engagement</div>
                      <div className="text-xl font-bold">{formatPercent(conf.avgEngagement)}</div>
                    </div>
                  </div>
                </div>
                {index === 0 && (
                  <div className="bg-yellow-300 text-black rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    TOP
                  </div>
                )}
              </div>

              {/* Insight Box */}
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                <div className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Insight
                </div>
                <div className="text-sm">{conf.insight}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparative Analysis Table */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-black mb-4">Conference Performance Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="text-left p-3 text-sm font-semibold">Conference</th>
                <th className="text-center p-3 text-sm font-semibold">Schools</th>
                <th className="text-right p-3 text-sm font-semibold">Total Revenue</th>
                <th className="text-right p-3 text-sm font-semibold">Revenue/School</th>
                <th className="text-right p-3 text-sm font-semibold">Revenue/Athlete</th>
                <th className="text-center p-3 text-sm font-semibold">Pricing Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedConferences.map((conf, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 text-sm font-bold text-gray-900">{conf.name}</td>
                  <td className="p-3 text-sm text-center text-gray-700">{conf.schools}</td>
                  <td className="p-3 text-sm text-right font-bold text-gray-900">
                    {formatCurrency(conf.totalRevenue)}
                  </td>
                  <td className="p-3 text-sm text-right text-gray-700">
                    {formatCurrency(conf.revenuePerSchool)}
                  </td>
                  <td className="p-3 text-sm text-right font-semibold text-green-600">
                    {formatCurrency(conf.revenuePerAthlete)}
                  </td>
                  <td className="p-3 text-sm text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        conf.pricing === 'premium'
                          ? 'bg-purple-100 text-purple-900'
                          : conf.pricing === 'standard'
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {conf.pricing.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing Strategy Insight */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-6 border-2 border-purple-300">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-8 h-8 text-purple-600" />
            <div className="text-lg font-bold text-purple-900">SEC Premium Pricing</div>
          </div>
          <div className="mb-4">
            <div className="text-sm text-gray-700 mb-2">Revenue per athlete:</div>
            <div className="text-4xl font-bold text-purple-600">{formatCurrency(secPerAthlete)}</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-purple-300">
            <div className="text-xs text-gray-700">
              SEC athletes generate the highest engagement ({formatPercent(conferences.find(c => c.name === 'SEC')!.avgEngagement)}), which means they should earn more. These athletes are worth the premium.
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-6 border-2 border-red-300">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <div className="text-lg font-bold text-red-900">Group of Five Gap</div>
          </div>
          <div className="mb-4">
            <div className="text-sm text-gray-700 mb-2">Revenue per athlete:</div>
            <div className="text-4xl font-bold text-red-600">{formatCurrency(mountainWestPerAthlete)}</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-red-300">
            <div className="text-xs text-gray-700">
              Despite strong engagement ({formatPercent(conferences.find(c => c.name === 'Mountain West')!.avgEngagement)}), revenue per athlete is {pricingGap.toFixed(0)}% lower than SEC. Opportunity to close this gap.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold mb-4">Conference Tier Matters</div>
          <div className="text-lg text-gray-300 mb-6">
            SEC athletes generate more engagement, which means they should earn more.
            <br />
            We should be charging brands 20-30% more for SEC athletes vs. Group of Five athletes.
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <div className="text-2xl font-bold text-yellow-300 mb-4 text-center">Are we?</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm text-gray-300 mb-1">SEC Avg Deal</div>
              <div className="text-2xl font-bold">$3,500</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm text-gray-300 mb-1">Group of Five Avg</div>
              <div className="text-2xl font-bold">$2,900</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 border border-yellow-300">
              <div className="text-sm text-yellow-100 mb-1 font-semibold">Pricing Gap</div>
              <div className="text-2xl font-bold text-yellow-300">Only 21%</div>
              <div className="text-xs text-yellow-100 mt-1">Should be 30%</div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="text-lg font-semibold">
            Adjusting conference-based pricing to reflect actual performance = <span className="text-yellow-300">$2.1M+</span> annual revenue increase
          </div>
        </div>
      </div>
    </div>
  );
}
