import { useState } from 'react';
import { Briefcase, Users, TrendingUp, DollarSign, Target, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { CURRENT_BRAND_PARTNERS } from '../data/playflyBrandData';

export function ActiveCampaigns() {
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // Calculate total metrics
  const totalCampaigns = CURRENT_BRAND_PARTNERS.reduce((sum, brand) => sum + brand.activeCampaigns.length, 0);
  const totalAthletes = CURRENT_BRAND_PARTNERS.reduce(
    (sum, brand) => sum + brand.activeCampaigns.reduce((s, c) => s + c.athleteParticipants, 0),
    0
  );
  const totalReach = CURRENT_BRAND_PARTNERS.reduce(
    (sum, brand) => sum + brand.activeCampaigns.reduce((s, c) => s + c.expectedReach, 0),
    0
  );

  // Featured campaigns with enhanced data
  const featuredCampaigns = [
    {
      id: 'wegmans-psu',
      brandName: 'Wegmans x Penn State',
      duration: 'Q1 2026',
      athleteParticipants: 12,
      totalReach: 3500000,
      engagementRate: 0.42,
      networkAvg: 0.35,
      brandSentiment: 'positive',
      status: 'active' as const,
      roi: 2.8,
      description: 'Game day food and tailgate content featuring Penn State football athletes',
      keyMetrics: {
        posts: 45,
        likes: 1200000,
        comments: 42000,
        shares: 8500,
      },
    },
    {
      id: 'nike-multi',
      brandName: 'Nike x Multi-School',
      duration: 'Season-long',
      athleteParticipants: 135,
      totalReach: 27700000,
      engagementRate: 0.48,
      networkAvg: 0.35,
      brandSentiment: 'positive',
      status: 'active' as const,
      roi: 3.2,
      description: 'Cross-school amplification campaign with top athletes across 5 schools',
      keyMetrics: {
        posts: 220,
        likes: 8400000,
        comments: 280000,
        shares: 52000,
      },
      reachMultiplier: '3.5x',
      lifetimeValue: 4500000,
    },
    {
      id: 'sheetz-psu',
      brandName: 'Sheetz x Penn State',
      duration: 'Ongoing',
      athleteParticipants: 8,
      totalReach: 2800000,
      engagementRate: 0.38,
      networkAvg: 0.35,
      brandSentiment: 'positive',
      status: 'active' as const,
      roi: 2.5,
      description: 'Local athlete spotlight with in-store appearances and regional market penetration',
      keyMetrics: {
        posts: 32,
        likes: 850000,
        comments: 28000,
        shares: 5200,
      },
      expansionNote: 'Expand to other schools in region',
    },
  ];

  const getStatusBadge = (status: 'active' | 'pending' | 'completed') => {
    const styles = {
      active: 'bg-[#1770C0] text-white border-[#1770C0]',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      completed: 'bg-gray-100 text-gray-800 border-gray-300',
    };

    return (
      <div className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${styles[status]} flex items-center gap-1`}>
        {status === 'active' && <CheckCircle2 className="w-3 h-3" />}
        <span>{status.toUpperCase()}</span>
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#091831] tracking-wide mb-2">
          ACTIVE CAMPAIGN PERFORMANCE
        </h2>
        <div className="h-1 w-24 bg-[#1770C0]" />
      </div>

      {/* Summary Stats */}
      <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="rounded-xl p-6 mb-8 border-2 border-[#1770C0]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-4xl font-bold text-[#1770C0]">{totalCampaigns}</div>
            <div className="text-sm text-gray-700 mt-1">Active Campaigns</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#1770C0]">{totalAthletes}+</div>
            <div className="text-sm text-gray-700 mt-1">Athletes Involved</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#1770C0]">{formatNumber(totalReach)}+</div>
            <div className="text-sm text-gray-700 mt-1">Combined Reach</div>
          </div>
        </div>
      </div>

      {/* Campaign Cards */}
      <div className="space-y-6 mb-8">
        {featuredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white border-l-4 border-[#1770C0] border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#1770C0] transition-all duration-300"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="w-6 h-6 text-[#1770C0]" />
                    <h3 className="text-xl font-bold text-[#091831]">{campaign.brandName}</h3>
                    {getStatusBadge(campaign.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{campaign.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{campaign.athleteParticipants} athletes</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      <span>{formatNumber(campaign.totalReach)} reach</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{(campaign.roi).toFixed(1)}x ROI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-4 gap-4 p-6 bg-white">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1770C0]">{(campaign.engagementRate * 100).toFixed(1)}%</div>
                <div className="text-xs text-gray-600 mt-1">Engagement Rate</div>
                {campaign.engagementRate > campaign.networkAvg && (
                  <div className="text-xs text-green-600 font-semibold mt-1">
                    +{(((campaign.engagementRate - campaign.networkAvg) / campaign.networkAvg) * 100).toFixed(0)}% vs network avg
                  </div>
                )}
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-[#1770C0]">{campaign.duration}</div>
                <div className="text-xs text-gray-600 mt-1">Duration</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-[#1770C0]">{campaign.brandSentiment === 'positive' ? '92%' : 'N/A'}</div>
                <div className="text-xs text-gray-600 mt-1">Brand Sentiment</div>
                <div className="text-xs text-green-600 font-semibold mt-1">Positive</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-[#1770C0]">${formatNumber(campaign.roi * 100000)}</div>
                <div className="text-xs text-gray-600 mt-1">Estimated Value</div>
              </div>
            </div>

            {/* Expandable Details */}
            {expandedCampaign === campaign.id && (
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Posts</div>
                    <div className="text-xl font-bold text-gray-900">{campaign.keyMetrics.posts}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Likes</div>
                    <div className="text-xl font-bold text-gray-900">{formatNumber(campaign.keyMetrics.likes)}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Comments</div>
                    <div className="text-xl font-bold text-gray-900">{formatNumber(campaign.keyMetrics.comments)}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Shares</div>
                    <div className="text-xl font-bold text-gray-900">{formatNumber(campaign.keyMetrics.shares)}</div>
                  </div>
                </div>

                {campaign.reachMultiplier && (
                  <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="rounded-lg p-4 border border-[#1770C0] mb-4">
                    <div className="text-sm font-semibold text-[#091831] mb-1">Cross-School Amplification</div>
                    <div className="text-xs text-gray-700">
                      Multi-school campaigns achieve <strong>{campaign.reachMultiplier}</strong> reach multiplier vs single-school campaigns
                    </div>
                  </div>
                )}

                {campaign.lifetimeValue && (
                  <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="rounded-lg p-4 border border-[#1770C0] mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#1770C0]" />
                      <div className="text-sm font-semibold text-[#091831]">Expected Lifetime Value</div>
                    </div>
                    <div className="text-2xl font-bold text-[#1770C0] mt-2">
                      ${formatNumber(campaign.lifetimeValue)}
                    </div>
                  </div>
                )}

                {campaign.expansionNote && (
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <div className="text-sm font-semibold text-amber-900 mb-1">Expansion Opportunity</div>
                    <div className="text-xs text-gray-700">{campaign.expansionNote}</div>
                  </div>
                )}
              </div>
            )}

            {/* Expand Button */}
            <button
              onClick={() => setExpandedCampaign(expandedCampaign === campaign.id ? null : campaign.id)}
              className="w-full p-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm font-semibold text-gray-700"
            >
              {expandedCampaign === campaign.id ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span>Show Less</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span>View Full Metrics</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Upsell Callout */}
      <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="rounded-xl p-6 border-2 border-[#1770C0]">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#1770C0] flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-bold text-[#091831] mb-2">Upsell Opportunity</div>
            <div className="text-sm text-gray-700 mb-3">
              Current campaigns show strong performance. Expand successful campaigns to additional schools for 2-3x reach amplification.
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-[#091831] border border-[#1770C0]">
                Expand Nike to +3 schools
              </div>
              <div className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-[#091831] border border-[#1770C0]">
                Replicate Wegmans model in ACC
              </div>
              <div className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-[#091831] border border-[#1770C0]">
                Scale Sheetz to Big Ten
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
