import { Target, Users, Zap, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';

export function RevenueUnlockRoadmap() {
  // STEP 1: Repricing
  const totalAthletes = 15000;
  const currentAthleteDeals = 4500;
  const avgCurrentDealValue = 3500;
  const tieredPricingUplift = 0.25; // 25% avg increase from tiered pricing
  const step1Revenue = currentAthleteDeals * avgCurrentDealValue * tieredPricingUplift;

  // STEP 2: Activation
  const idleAthletes = 10500;
  const targetIdleActivation = 2000; // Top 2,000 idle athletes
  const avgSmallDealValue = 3000; // $2K-$5K range, avg $3K
  const step2Revenue = targetIdleActivation * avgSmallDealValue;

  // STEP 3: IP Premium
  const brandedPostsPerYear = 52680; // Est branded posts across network
  const ipPremiumPerPost = 150; // $150 additional per post with IP guarantee
  const step3Revenue = brandedPostsPerYear * ipPremiumPerPost;

  const totalRevenue = step1Revenue + step2Revenue + step3Revenue;

  const formatCurrency = (num: number): string => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toFixed(0)}`;
  };

  const steps = [
    {
      number: 1,
      title: 'Repricing',
      subtitle: 'Fix Tier Pricing',
      icon: Target,
      color: 'blue',
      problem: 'Athletes with 50K followers on Instagram get paid same as athletes with 200K followers',
      solution: [
        'Create athlete tiers based on marketability score:',
        '  • Tier A (80+): Premium pricing, charge 40% higher',
        '  • Tier B (50-80): Standard pricing',
        '  • Tier C (<50): Entry pricing, 20% discount',
      ],
      action: 'Audit all 15K athletes, assign tiers, re-negotiate active deals',
      revenueImpact: step1Revenue,
      metrics: [
        { label: 'Athletes to re-tier', value: totalAthletes.toLocaleString() },
        { label: 'Active deals to renegotiate', value: currentAthleteDeals.toLocaleString() },
        { label: 'Avg uplift per deal', value: `${(tieredPricingUplift * 100).toFixed(0)}%` },
      ],
    },
    {
      number: 2,
      title: 'Activation',
      subtitle: 'Monetize Idle Athletes',
      icon: Users,
      color: 'purple',
      problem: '10.5K idle athletes generating engagement but no revenue',
      solution: [
        'Target top 2,000 idle athletes (50K+ followers, high engagement rate):',
        '  • Start with small deals ($2K-$5K per athlete per year)',
        '  • Prove the model, expand',
      ],
      action: 'Create deal templates, outreach, onboarding',
      revenueImpact: step2Revenue,
      metrics: [
        { label: 'Idle athletes', value: idleAthletes.toLocaleString() },
        { label: 'Target for activation', value: targetIdleActivation.toLocaleString() },
        { label: 'Avg deal value', value: formatCurrency(avgSmallDealValue) },
      ],
    },
    {
      number: 3,
      title: 'IP Premium',
      subtitle: 'Charge for Performance Guarantee',
      icon: Zap,
      color: 'green',
      problem: "Brands aren't paying for the 45% engagement lift we can guarantee",
      solution: [
        'Add 30% premium to all branded content deals:',
        '  • Generic post: $500',
        '  • IP-guaranteed post: $650 (with 45% engagement guarantee backed by data)',
      ],
      action: 'Update pricing, train sales team, pitch to current brands',
      revenueImpact: step3Revenue,
      metrics: [
        { label: 'Branded posts/year', value: brandedPostsPerYear.toLocaleString() },
        { label: 'Premium per post', value: formatCurrency(ipPremiumPerPost) },
        { label: 'Engagement guarantee', value: '+45%' },
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; icon: string; text: string; badge: string }> = {
      blue: {
        bg: 'from-blue-50 to-blue-100',
        border: 'border-blue-300',
        icon: 'text-blue-600',
        text: 'text-blue-900',
        badge: 'bg-blue-600',
      },
      purple: {
        bg: 'from-purple-50 to-purple-100',
        border: 'border-purple-300',
        icon: 'text-purple-600',
        text: 'text-purple-900',
        badge: 'bg-[#1770C0]',
      },
      green: {
        bg: 'from-green-50 to-green-100',
        border: 'border-green-300',
        icon: 'text-green-600',
        text: 'text-green-900',
        badge: 'bg-green-600',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-black mb-2">
          HOW TO UNLOCK THE {formatCurrency(totalRevenue)} OPPORTUNITY
        </h2>
        <div className="h-1.5 w-32 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mb-4" />
        <p className="text-lg text-gray-700">A 3-step roadmap with specific revenue impact per step</p>
      </div>

      {/* 3 Steps */}
      <div className="space-y-6 mb-8">
        {steps.map((step) => {
          const colors = getColorClasses(step.color);
          const Icon = step.icon;

          return (
            <div
              key={step.number}
              className={`bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-2xl p-6 shadow-lg`}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-full ${colors.badge} flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <span className="text-white font-bold text-2xl">{step.number}</span>
                </div>
                <div className="flex-1">
                  <div className={`text-2xl font-bold ${colors.text} mb-1`}>
                    STEP {step.number}: {step.title}
                  </div>
                  <div className="text-lg text-gray-700">{step.subtitle}</div>
                </div>
                <Icon className={`w-10 h-10 ${colors.icon}`} />
              </div>

              {/* Problem */}
              <div className="mb-4 bg-white rounded-lg p-4 border border-gray-300">
                <div className="text-sm font-semibold text-gray-700 mb-2">Problem:</div>
                <div className="text-sm text-gray-900">{step.problem}</div>
              </div>

              {/* Solution */}
              <div className="mb-4 bg-white rounded-lg p-4 border border-gray-300">
                <div className="text-sm font-semibold text-gray-700 mb-2">Solution:</div>
                <div className="space-y-1">
                  {step.solution.map((line, idx) => (
                    <div key={idx} className="text-sm text-gray-900">
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="mb-4 bg-white rounded-lg p-4 border border-gray-300">
                <div className="text-sm font-semibold text-gray-700 mb-2">Action:</div>
                <div className="text-sm text-gray-900">{step.action}</div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {step.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 border border-gray-300 text-center">
                    <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
                    <div className={`text-lg font-bold ${colors.text}`}>{metric.value}</div>
                  </div>
                ))}
              </div>

              {/* Revenue Impact */}
              <div className={`bg-gradient-to-r ${colors.badge} rounded-xl p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-6 h-6" />
                    <div className="text-sm font-semibold">Revenue Impact:</div>
                  </div>
                  <div className="text-3xl font-bold">{formatCurrency(step.revenueImpact)}</div>
                </div>
                <div className="text-xs mt-2">annual revenue increase from this step</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Comparison - Before/After Revenue */}
      <div className="mb-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-black mb-4 text-center">Before/After Revenue by Step</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const colors = getColorClasses(step.color);
            return (
              <div key={step.number} className="bg-white rounded-xl p-6 border-2 border-gray-300 shadow-md">
                <div className={`text-sm font-semibold ${colors.text} mb-4`}>
                  STEP {step.number}: {step.title}
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Before</div>
                    <div className="text-2xl font-bold text-gray-500">$0</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">After</div>
                    <div className={`text-2xl font-bold ${colors.text}`}>
                      {formatCurrency(step.revenueImpact)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Total Revenue Unlock */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-sm font-semibold mb-2">TOTAL REVENUE UNLOCK</div>
          <div className="text-7xl font-bold mb-4">{formatCurrency(totalRevenue)}</div>
          <div className="text-xl">annually</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {steps.map((step) => (
            <div key={step.number} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
              <div className="text-sm mb-1">Step {step.number}: {step.title}</div>
              <div className="text-2xl font-bold">{formatCurrency(step.revenueImpact)}</div>
            </div>
          ))}
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border-2 border-white/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6" />
              <div>
                <div className="text-xs mb-1">Repricing uplift</div>
                <div className="text-lg font-bold">{formatCurrency(step1Revenue)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6" />
              <div>
                <div className="text-xs mb-1">Idle activation</div>
                <div className="text-lg font-bold">{formatCurrency(step2Revenue)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6" />
              <div>
                <div className="text-xs mb-1">IP premium capture</div>
                <div className="text-lg font-bold">{formatCurrency(step3Revenue)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Message */}
      <div className="mt-8 text-center">
        <div className="text-2xl font-bold text-gray-900">
          Three clear steps. {formatCurrency(totalRevenue)} in new annual revenue. The roadmap is here.
        </div>
      </div>
    </div>
  );
}
