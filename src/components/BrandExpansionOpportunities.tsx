import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, DollarSign, Target, TrendingUp, Sparkles } from 'lucide-react';
import { CURRENT_BRAND_PARTNERS, EXPANSION_OPPORTUNITIES } from '../data/playflyBrandData';

export function BrandExpansionOpportunities() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num}`;
  };

  const getCategoryIcon = (index: number) => {
    const icons = [Sparkles, DollarSign, Target, TrendingUp, DollarSign];
    const Icon = icons[index % icons.length];
    return Icon;
  };

  const getGrowthPotentialBadge = (potential: 'high' | 'medium' | 'low') => {
    const styles = {
      high: 'bg-[#1770C0] text-white border-[#1770C0]',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      low: 'bg-gray-100 text-gray-800 border-gray-300',
    };

    return (
      <div className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[potential]}`}>
        {potential.toUpperCase()} GROWTH
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#091831] tracking-wide mb-2">
          BRAND PARTNERSHIP OPPORTUNITIES
        </h2>
        <div className="h-1 w-24 bg-[#1770C0]" />
        <p className="text-gray-600 mt-3">
          Strategic expansion targets for Playfly to pitch
        </p>
      </div>

      {/* Current Partners */}
      <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="mb-8 rounded-xl p-6 border-2 border-[#1770C0]">
        <h3 className="text-lg font-bold text-[#091831] mb-4 flex items-center gap-2">
          <Check className="w-5 h-5 text-[#1770C0]" />
          Current Active Partners
        </h3>
        <div className="flex flex-wrap gap-3">
          {CURRENT_BRAND_PARTNERS.map((partner, index) => (
            <div
              key={index}
              className="bg-white border border-[#1770C0] rounded-lg px-4 py-2 flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-[#1770C0]" />
              <div>
                <div className="font-bold text-sm text-gray-900">{partner.brandName}</div>
                <div className="text-xs text-gray-600">{partner.industryCategory}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expansion Categories */}
      <div className="space-y-4">
        {EXPANSION_OPPORTUNITIES.map((category, index) => {
          const isExpanded = expandedCategory === category.category;
          const Icon = getCategoryIcon(index);

          return (
            <div
              key={index}
              className="border-t-4 border-[#1770C0] border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#1770C0] transition-all duration-300"
            >
              {/* Category Header */}
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : category.category)}
                className="w-full p-6 bg-gradient-to-r from-gray-50 to-gray-100 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#1770C0] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-[#091831]">{category.category}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-600">{category.brands.length} brands identified</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm font-semibold text-[#1770C0]">
                          {formatNumber(category.estimatedPartnershipValue)} opportunity
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getGrowthPotentialBadge(category.growthPotential)}
                    {isExpanded ? (
                      <ChevronUp className="w-6 h-6 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="p-6 bg-white border-t border-gray-200">
                  {/* Category Description */}
                  <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="mb-6 p-4 rounded-lg border border-[#1770C0]">
                    <div className="text-sm text-gray-700">{category.description}</div>
                  </div>

                  {/* Brands Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {category.brands.map((brand, brandIdx) => (
                      <div
                        key={brandIdx}
                        className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-lg p-4 hover:border-[#1770C0] hover:shadow-md transition-all duration-300"
                      >
                        <div className="font-bold text-gray-900 mb-1">{brand}</div>
                        <div className="text-xs text-gray-600">Target for outreach</div>
                      </div>
                    ))}
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="rounded-lg p-4 border border-[#1770C0]">
                      <div className="text-xs text-gray-600 mb-1">Athlete Reach</div>
                      <div className="text-2xl font-bold text-[#1770C0]">{category.athleteReach.toLocaleString()}</div>
                    </div>

                    <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="rounded-lg p-4 border border-[#1770C0]">
                      <div className="text-xs text-gray-600 mb-1">Partnership Value</div>
                      <div className="text-2xl font-bold text-[#1770C0]">{formatNumber(category.estimatedPartnershipValue)}</div>
                    </div>

                    <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="rounded-lg p-4 border border-[#1770C0]">
                      <div className="text-xs text-gray-600 mb-1">Growth Potential</div>
                      <div className="text-2xl font-bold text-[#1770C0]">{category.growthPotential.toUpperCase()}</div>
                    </div>
                  </div>

                  {/* Targeting Angle */}
                  <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-start gap-2">
                      <Target className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-amber-900 mb-1">Targeting Angle</div>
                        <div className="text-xs text-gray-700">
                          Pitch multi-school packages with data-backed performance guarantees. Emphasize {category.athleteReach.toLocaleString()}+ athlete reach and proven engagement lift metrics.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="rounded-xl p-6 border-2 border-[#1770C0]">
          <div className="text-sm text-gray-600 mb-2">Total Brands Identified</div>
          <div className="text-4xl font-bold text-[#1770C0]">
            {EXPANSION_OPPORTUNITIES.reduce((sum, cat) => sum + cat.brands.length, 0)}
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="rounded-xl p-6 border-2 border-[#1770C0]">
          <div className="text-sm text-gray-600 mb-2">Total Opportunity Value</div>
          <div className="text-4xl font-bold text-[#1770C0]">
            {formatNumber(EXPANSION_OPPORTUNITIES.reduce((sum, cat) => sum + cat.estimatedPartnershipValue, 0))}
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="rounded-xl p-6 border-2 border-[#1770C0]">
          <div className="text-sm text-gray-600 mb-2">High Growth Categories</div>
          <div className="text-4xl font-bold text-[#1770C0]">
            {EXPANSION_OPPORTUNITIES.filter(cat => cat.growthPotential === 'high').length}
          </div>
        </div>
      </div>

      {/* Bottom Callout */}
      <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="mt-8 rounded-xl p-6 border-2 border-[#1770C0]">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#1770C0] flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-lg font-bold text-[#091831] mb-3">Partnership Model Benefits</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#1770C0] rounded-full" />
                <span className="text-sm text-gray-700">
                  <strong>Multi-school packages:</strong> Brands can sponsor athletes across 3-5 schools for maximum reach
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#1770C0] rounded-full" />
                <span className="text-sm text-gray-700">
                  <strong>Data-backed guarantees:</strong> Proven +45% engagement lift on branded content
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#1770C0] rounded-full" />
                <span className="text-sm text-gray-700">
                  <strong>Seasonal customization:</strong> Campaigns tailored to football, basketball, or year-round schedules
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#1770C0] rounded-full" />
                <span className="text-sm text-gray-700">
                  <strong>Exclusive school partnerships:</strong> Category exclusivity within each school
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
