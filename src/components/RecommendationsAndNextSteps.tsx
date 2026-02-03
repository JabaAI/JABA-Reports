import { Target, TrendingUp, Users, Award, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';

export function RecommendationsAndNextSteps() {
  // Current state calculations
  const currentSchools = 20; // 10 Playfly + 10 Playfly Max
  const currentBrands = 152;
  const currentPartnerships = 403;

  // Target state
  const targetSchools = 70;
  const targetMAXSchools = 50;
  const targetBrands = 500;
  const targetPartnerships = 2400;

  const growthMultiple = targetPartnerships / currentPartnerships;

  const recommendations = [
    {
      number: 1,
      title: 'CONFIRM THE THESIS',
      subtitle: 'Your network infrastructure is already substantial',
      icon: Target,
      color: 'blue',
      details: [
        { label: 'Total Posts Tracked', value: '5,277' },
        { label: 'Total Followers', value: '24.9M' },
        { label: 'Active Schools', value: '10' },
        { label: 'Active Partnerships', value: currentPartnerships.toString() },
      ],
      insight: 'Your existing network infrastructure is foundational. Data + scale = defensible moat.',
    },
    {
      number: 2,
      title: 'ACCELERATE SCHOOL ACQUISITION',
      subtitle: '20-30 new schools in next 18 months',
      icon: TrendingUp,
      color: 'green',
      details: [
        { label: 'Current Schools', value: currentSchools.toString() },
        { label: 'Target Schools', value: `${targetSchools}+` },
        { label: 'Growth Needed', value: `${targetSchools - currentSchools} schools` },
        { label: 'New Partnerships', value: `${(targetSchools - currentSchools) * 12}+` },
      ],
      insight: 'Each new standard school adds ~12 partnerships. Each MAX conversion adds ~30 partnerships. Prioritize SEC/Big Ten.',
    },
    {
      number: 3,
      title: 'EXPAND BRAND PARTNERSHIPS',
      subtitle: '50+ brands through data-driven pitching',
      icon: Award,
      color: 'purple',
      details: [
        { label: 'Current Brands', value: currentBrands.toString() },
        { label: 'Identified Opportunities', value: '200+' },
        { label: 'Target Total', value: `${targetBrands}+` },
        { label: 'Avg Partnerships/Brand', value: '3-8' },
      ],
      insight: 'Tech (Apple, Meta), Finance (Amex), CPG (Chipotle) are highest-value targets. Lead with +45% engagement data.',
    },
    {
      number: 4,
      title: 'OPTIMIZE MAX TIER OFFERINGS',
      subtitle: '8 MAX schools are your crown jewels',
      icon: Award,
      color: 'amber',
      details: [
        { label: 'MAX Schools', value: '8' },
        { label: 'Partnerships/MAX School', value: '30-50' },
        { label: 'Target MAX Schools', value: `${targetMAXSchools}` },
        { label: 'Retention Rate', value: '100%' },
      ],
      insight: 'Expand MAX tier to 50 schools based on proven 2.5x partnership growth and exclusive conference access.',
    },
    {
      number: 5,
      title: 'BUILD ATHLETE MARKETPLACE',
      subtitle: 'Direct brand-to-athlete collaboration tools',
      icon: Users,
      color: 'indigo',
      details: [
        { label: 'Total Athletes', value: '15,000+' },
        { label: 'Marketplace Potential', value: '5,000+ deals/year' },
        { label: 'Commission Model', value: '15-20%' },
        { label: 'Partnership Volume', value: '3-5X increase' },
      ],
      insight: 'Enable self-serve brand partnerships. Athletes choose campaigns, Playfly provides infrastructure & takes commission.',
    },
    {
      number: 6,
      title: 'INTERNATIONAL EXPANSION',
      subtitle: 'Same playbook, new markets',
      icon: Globe,
      color: 'rose',
      details: [
        { label: 'UK Rugby Market', value: '200K+ athletes' },
        { label: 'European Football', value: '500K+ athletes' },
        { label: 'Cricket (India)', value: '1M+ athletes' },
        { label: 'Partnership TAM', value: '50,000+ deals' },
      ],
      insight: 'International college/youth sports have same NIL dynamics. Partner with Rugby unions, cricket boards.',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; accent: string }> = {
      blue: { bg: 'from-blue-50 to-blue-100', border: 'border-blue-300', text: 'text-blue-900', accent: 'bg-blue-600' },
      green: { bg: 'from-green-50 to-green-100', border: 'border-green-300', text: 'text-green-900', accent: 'bg-green-600' },
      purple: { bg: 'from-purple-50 to-purple-100', border: 'border-purple-300', text: 'text-purple-900', accent: 'bg-[#1770C0]' },
      amber: { bg: 'from-amber-50 to-amber-100', border: 'border-amber-300', text: 'text-amber-900', accent: 'bg-amber-600' },
      indigo: { bg: 'from-indigo-50 to-indigo-100', border: 'border-indigo-300', text: 'text-indigo-900', accent: 'bg-indigo-600' },
      rose: { bg: 'from-rose-50 to-rose-100', border: 'border-rose-300', text: 'text-rose-900', accent: 'bg-rose-600' },
    };
    return colors[color];
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-black tracking-wide mb-2">
          KEY INSIGHTS FOR PLAYFLY LEADERSHIP
        </h2>
        <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-purple-600" />
        <p className="text-gray-600 mt-3">
          Strategic recommendations to maximize network value and accelerate growth
        </p>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {recommendations.map((rec) => {
          const colors = getColorClasses(rec.color);
          const Icon = rec.icon;

          return (
            <div
              key={rec.number}
              className={`bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full ${colors.accent} flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <span className="text-white font-bold text-xl">{rec.number}</span>
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold ${colors.text} mb-1`}>{rec.title}</h3>
                  <p className="text-sm text-gray-700">{rec.subtitle}</p>
                </div>
                <Icon className={`w-6 h-6 ${colors.text}`} />
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {rec.details.map((detail, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">{detail.label}</div>
                    <div className={`text-lg font-bold ${colors.text}`}>{detail.value}</div>
                  </div>
                ))}
              </div>

              {/* Insight */}
              <div className="bg-white rounded-lg p-3 border-l-4 border-gray-300">
                <div className="text-xs text-gray-700">
                  <strong>Key Insight:</strong> {rec.insight}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Implementation Roadmap */}
      <div className="mb-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-300">
        <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          Implementation Roadmap
        </h3>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-blue-900 font-bold text-sm">Q1</span>
            </div>
            <div>
              <div className="font-semibold text-gray-900">Validate Network Value</div>
              <div className="text-sm text-gray-600">Confirm thesis with financial models • Secure buy-in from leadership</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-green-900 font-bold text-sm">Q2</span>
            </div>
            <div>
              <div className="font-semibold text-gray-900">Accelerate School Acquisition</div>
              <div className="text-sm text-gray-600">Target 10-15 new schools • Focus SEC/Big Ten • Launch brand pitch campaigns</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-purple-900 font-bold text-sm">Q3</span>
            </div>
            <div>
              <div className="font-semibold text-gray-900">Optimize MAX Tier & Launch Marketplace</div>
              <div className="text-sm text-gray-600">Increase MAX pricing 25% • Build athlete marketplace MVP • Onboard 5 new brands</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-indigo-900 font-bold text-sm">Q4</span>
            </div>
            <div>
              <div className="font-semibold text-gray-900">Scale & International Exploration</div>
              <div className="text-sm text-gray-600">Reach 60+ schools • 20+ brands • Explore UK rugby partnerships</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Impact Box */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-10 h-10" />
          <h3 className="text-2xl font-bold">ESTIMATED 3-YEAR PARTNERSHIP GROWTH</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
            <div className="text-sm text-green-100 mb-2">Current Partnerships</div>
            <div className="text-4xl font-bold mb-1">{currentPartnerships}</div>
            <div className="text-xs text-green-100">Based on {currentSchools} schools with {currentBrands} brands</div>
          </div>

          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border-2 border-white/50 relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
              TARGET
            </div>
            <div className="text-sm text-green-100 mb-2">Optimized Partnerships</div>
            <div className="text-4xl font-bold mb-1">{targetPartnerships}</div>
            <div className="text-xs text-green-100">Target: {targetSchools} schools with {targetBrands} brands</div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
            <div className="text-sm text-green-100 mb-2">Growth Multiple</div>
            <div className="text-4xl font-bold mb-1">{growthMultiple.toFixed(1)}X</div>
            <div className="text-xs text-green-100">3-year partnership expansion</div>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <div className="flex items-center gap-3 mb-3">
            <ArrowRight className="w-6 h-6" />
            <div className="text-lg font-bold">Path to {targetPartnerships}+ Active Partnerships</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Grow to {targetSchools}+ schools ({targetMAXSchools} MAX tier)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Increase MAX tier partnerships to 30-50/school</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Expand brand partnerships to {targetBrands}+</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Launch athlete marketplace (5,000+ deals/year)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-6 text-center">
        <div className="text-sm text-gray-600 mb-2">
          These recommendations are based on existing partnership data, proven performance metrics, and conservative growth assumptions.
        </div>
        <div className="text-xs text-gray-500">
          Partnership projections are based on current network performance and industry benchmarks. Actual results may vary.
        </div>
      </div>
    </div>
  );
}
