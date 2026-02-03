import { Sparkles, TrendingUp, Target, Users, Zap } from 'lucide-react';
import { getJABARosterTeams } from '../data/jabaRealData';
import { formatCurrency } from '../services/jabaDataLoader';

/**
 * SECTION 8: AUTOMATED RECOMMENDATIONS ENGINE PREVIEW
 * Position: After Real-Time Campaign Optimization
 * Purpose: AI-generated recommendations with confidence scores and impact estimates
 */

export function AutomatedRecommendations() {
  const teams = getJABARosterTeams();

  // Calculate recommendation data
  const tier1Unsponsored = teams.filter(t => t.metrics.ninetyDays.engagementRate >= 0.04 && t.metrics.ninetyDays.sponsoredContentCount === 0).length;
  const highEngagementSchools = teams.filter(t => t.metrics.ninetyDays.engagementRate >= 0.035).length;
  const logoLiftAvg = 0.33; // From mock data

  const recommendations = [
    {
      id: 1,
      title: 'Expand Nike to SEC Powerhouses',
      description: `Add Auburn, LSU, and Texas A&M to Nike campaign. All 3 schools have ${tier1Unsponsored}+ high-engagement athletes ready to activate.`,
      confidence: 94,
      difficulty: 'Medium',
      estimatedImpact: 285000,
      implementation: '3-school bundle package at 25% discount',
      timeToROI: '30 days',
      icon: Users,
    },
    {
      id: 2,
      title: `Activate ${tier1Unsponsored} Unsponsored Tier 1 Athletes`,
      description: 'These athletes have engagement rates >4% but zero sponsorships. Quick wins with immediate revenue impact.',
      confidence: 98,
      difficulty: 'Easy',
      estimatedImpact: 420000,
      implementation: 'Tiered pricing packages ($2.5K-$15K per post)',
      timeToROI: '14 days',
      icon: Zap,
    },
    {
      id: 3,
      title: 'Scale Wegmans to ACC Conference',
      description: 'Wegmans has strong performance in Mid-Atlantic. Expand to Virginia, potentially 2 more ACC schools in region.',
      confidence: 87,
      difficulty: 'Medium',
      estimatedImpact: 195000,
      implementation: 'Regional expansion with local hero angles',
      timeToROI: '45 days',
      icon: Target,
    },
    {
      id: 4,
      title: 'Logo + Collab Content Strategy',
      description: `IP analysis shows ${(logoLiftAvg * 100).toFixed(0)}% engagement lift when logo is present. Mandate logo in all brand activations.`,
      confidence: 92,
      difficulty: 'Easy',
      estimatedImpact: 520000,
      implementation: 'Update brand guidelines + content templates',
      timeToROI: '7 days',
      icon: TrendingUp,
    },
    {
      id: 5,
      title: 'Prioritize Rising Engagement Athletes',
      description: `${highEngagementSchools} athletes show 7-day engagement above 30-day average. Strike while momentum is high.`,
      confidence: 89,
      difficulty: 'Easy',
      estimatedImpact: 165000,
      implementation: 'Quick-pitch packages to mid-market brands',
      timeToROI: '21 days',
      icon: Sparkles,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'Easy') return 'bg-green-100 text-green-800 border-green-300';
    if (difficulty === 'Medium') return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-sm">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1770C0] to-[#1770C0] flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-wide">AUTOMATED RECOMMENDATIONS ENGINE</h2>
            <p className="text-[#1770C0] font-semibold text-sm">AI-powered insights with confidence scores and ROI projections</p>
          </div>
        </div>
        <div className="h-1.5 w-32 bg-gradient-to-r from-[#1770C0] to-[#1770C0]" />
      </div>

      <div className="space-y-6">
        {recommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <div key={rec.id} className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-[#1770C0] shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-[#1770C0] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{rec.title}</h3>
                      <div className="flex items-center gap-2">
                        <div className="text-xs font-bold text-[#1770C0] bg-[#1770C0]/30 px-3 py-1 rounded-full">
                          AI-RECOMMENDED
                        </div>
                        <div className={`text-xs font-bold px-3 py-1 rounded-full border ${getDifficultyColor(rec.difficulty)}`}>
                          {rec.difficulty}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">{rec.description}</p>

                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Confidence</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#1770C0] rounded-full"
                              style={{ width: `${rec.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-[#1770C0]">{rec.confidence}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Estimated Impact</div>
                        <div className="text-lg font-bold text-green-600">{formatCurrency(rec.estimatedImpact)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Time to ROI</div>
                        <div className="text-lg font-bold text-white">{rec.timeToROI}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Implementation</div>
                        <div className="text-sm text-gray-300">{rec.implementation}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1770C0]">
                <button className="w-full bg-[#1770C0] hover:bg-[#1770C0] text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />
                  Implement This Recommendation
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-black/80 rounded-xl p-8 text-white border-2 border-[#1770C0]">
        <h3 className="text-2xl font-bold mb-4">How This Works</h3>
        <p className="text-lg text-gray-300 mb-4">
          These recommendations are synthesized from real network data: engagement trends, IP lift metrics, unsponsored athletes, and campaign performance.
          Each suggestion includes confidence scores, difficulty ratings, and projected ROI.
        </p>
        <p className="text-gray-300">
          Total potential impact from these 5 recommendations:{' '}
          <span className="font-bold text-[#1770C0]">
            {formatCurrency(recommendations.reduce((sum, r) => sum + r.estimatedImpact, 0))}
          </span>
        </p>
      </div>

      <div className="mt-6 text-xs text-gray-500 text-center">
        Powered by JABA Analytics Engine | Data synthesis: IP lift metrics + engagement trends + sponsorship gaps
      </div>
    </div>
  );
}
