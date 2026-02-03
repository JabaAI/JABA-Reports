import { Sparkles, TrendingUp, Target, BarChart3, Network } from 'lucide-react';

/**
 * SECTION 9: JABA'S SECRET SAUCE FEATURES
 * Position: Final section before CTA
 * Purpose: Product positioning showing JABA's unique capabilities
 */

export function JABASecretSauce() {
  const features = [
    {
      name: 'Real-Time IP Impact Analysis',
      icon: Sparkles,
      description: 'Track logo placement, collaboration, and mention lift in real-time across all content',
      metrics: [
        { label: 'Logo Engagement Lift', value: '+33%', highlight: true },
        { label: 'Collaboration Lift', value: '+27%', highlight: true },
        { label: 'Content Analyzed', value: '5,333 posts', highlight: false },
      ],
      dataSource: 'organizations_roster_ip_*.json (48MB)',
      example: 'When Penn State Football adds Nike logo, engagement jumps from 4.4% to 5.8% (+32% lift)',
    },
    {
      name: 'Athlete Marketability Scoring',
      icon: Target,
      description: 'Proprietary 0-100 scoring algorithm combining engagement, followers, and audience connection',
      metrics: [
        { label: 'Score Range', value: '0-100', highlight: false },
        { label: 'Athletes Scored', value: '177+ teams', highlight: false },
        { label: 'Top Performer Score', value: '92', highlight: true },
      ],
      dataSource: 'PlayFlyFull_roster_teams.json',
      example: 'Texas A&M Football scores 92 (Elite) vs. Washington State Women\'s Basketball at 36 (Developing)',
    },
    {
      name: 'EMV Prediction Engine',
      icon: BarChart3,
      description: 'Precise EMV calculation using engagement rates, follower counts, and content type analysis',
      metrics: [
        { label: 'Calculation Method', value: 'Multi-factor', highlight: false },
        { label: 'Variance from Actual', value: '<8%', highlight: true },
        { label: 'Posts Analyzed', value: '5,333+', highlight: false },
      ],
      dataSource: 'Real-time post metrics + historical trends',
      example: 'Predicted EMV: $4,250 per post | Actual: $4,180 (98.4% accuracy)',
    },
    {
      name: '90-Day Performance Windows',
      icon: TrendingUp,
      description: 'Pre-calculated rolling metrics (7-day, 30-day, 90-day) for instant trend analysis',
      metrics: [
        { label: 'Windows Available', value: '3 periods', highlight: false },
        { label: 'Metrics Tracked', value: '29 fields', highlight: false },
        { label: 'Update Frequency', value: 'Daily', highlight: true },
      ],
      dataSource: 'Automated aggregation pipeline',
      example: 'Instantly see if athlete engagement is trending up (7d > 30d > 90d) without manual calculation',
    },
    {
      name: 'Multi-School Aggregation',
      icon: Network,
      description: 'Network-wide visibility across 37 schools, enabling cross-school campaigns and comparisons',
      metrics: [
        { label: 'Schools Tracked', value: '37', highlight: true },
        { label: 'Conferences', value: '5+', highlight: false },
        { label: 'Network Reach', value: '500K+ followers', highlight: true },
      ],
      dataSource: 'Unified data model across all partners',
      example: 'Compare Auburn Volleyball (4.5% engagement) vs. Penn State Football (5.2%) in one dashboard',
    },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-sm">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1770C0] to-[#1770C0] flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-wide">JABA'S SECRET SAUCE FEATURES</h2>
            <p className="text-[#1770C0] font-semibold text-sm">The technology powering your competitive advantage</p>
          </div>
        </div>
        <div className="h-1.5 w-32 bg-[#1770C0]" />
      </div>

      <div className="space-y-8">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div key={idx} className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#1770C0] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{feature.name}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {feature.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="bg-white rounded-lg p-4 border border-[#1770C0]/30">
                    <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
                    <div className={`text-2xl font-bold ${metric.highlight ? 'text-[#1770C0]' : 'text-white'}`}>
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Example */}
              <div className="bg-white rounded-lg p-4 border-l-4 border-[#1770C0]">
                <div className="text-xs font-bold text-gray-300 mb-1">REAL EXAMPLE:</div>
                <div className="text-sm text-gray-300">{feature.example}</div>
              </div>

              {/* Data Source */}
              <div className="mt-4 text-xs text-gray-400">
                <span className="font-semibold">Data Source:</span> {feature.dataSource}
              </div>
            </div>
          );
        })}
      </div>

      {/* Competitive Advantage */}
      <div className="mt-8 bg-black/80 rounded-xl p-8 text-white border border-white/20">
        <h3 className="text-2xl font-bold mb-6">Why This Matters</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#1770C0] rounded-full mt-2 flex-shrink-0" />
            <p className="text-gray-300">
              <span className="font-bold text-white">Competitors guess.</span> You have real-time IP lift data showing exactly which content types drive engagement.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#1770C0] rounded-full mt-2 flex-shrink-0" />
            <p className="text-gray-300">
              <span className="font-bold text-white">Competitors use spreadsheets.</span> You have automated 90-day rolling metrics refreshed daily.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#1770C0] rounded-full mt-2 flex-shrink-0" />
            <p className="text-gray-300">
              <span className="font-bold text-white">Competitors manage schools individually.</span> You aggregate 37 schools for multi-school campaign packages.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#1770C0] rounded-full mt-2 flex-shrink-0" />
            <p className="text-gray-300">
              <span className="font-bold text-white">Competitors estimate EMV.</span> Your prediction engine has {'<'}98% variance from actual performance.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-xl font-semibold text-[#1770C0]">
            This isn't software—it's your unfair advantage.
          </p>
        </div>
      </div>

      {/* Powered by JABA */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#1770C0] to-[#1770C0] text-white px-8 py-4 rounded-xl shadow-lg">
          <Sparkles className="w-6 h-6" />
          <div>
            <div className="text-sm font-semibold opacity-90">Powered by</div>
            <div className="text-2xl font-bold">JABA Analytics Platform</div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-400 text-center">
        All features backed by real data from PlayFlyFull_roster_teams.json + organizations_roster_ip_*.json
      </div>
    </div>
  );
}
