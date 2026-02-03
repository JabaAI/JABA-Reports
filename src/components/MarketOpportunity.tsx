import { Target, TrendingUp, Globe, Award, DollarSign } from 'lucide-react';

export function MarketOpportunity() {
  const totalAddressableMarket = 130;
  const currentPenetration = 40;
  const penetrationPercent = (currentPenetration / totalAddressableMarket) * 100;

  const revenuePerMAXSchool = 1200000;
  const targetSchools = 75;
  const targetMAXPercent = 70;
  const projectedMAXSchools = Math.floor(targetSchools * (targetMAXPercent / 100));
  const projectedRevenue = projectedMAXSchools * revenuePerMAXSchool;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-black tracking-wide mb-2">
          THE PLAYFLY UNREALIZED POTENTIAL
        </h2>
        <div className="h-1.5 w-32 bg-[#1770C0]" />
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* SECTION A: Current State */}
        <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-black">Current State</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-3xl font-bold text-blue-900">40+</div>
              <div className="text-sm text-gray-600">schools in network</div>
            </div>

            <div>
              <div className="text-3xl font-bold text-blue-900">252K</div>
              <div className="text-sm text-gray-600">posts analyzed</div>
            </div>

            <div>
              <div className="text-3xl font-bold text-blue-900">2.5X</div>
              <div className="text-sm text-gray-600">revenue growth delivered</div>
            </div>

            <div className="pt-3 border-t border-blue-200">
              <div className="text-sm font-semibold text-gray-700 mb-2">Strong Partnerships</div>
              <div className="flex flex-wrap gap-1">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">Nike</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">Wegmans</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">Sheetz</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION B: Market Opportunity */}
        <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-6 border-2 border-purple-300">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-bold text-black">Market Opportunity</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-3xl font-bold text-purple-900">{totalAddressableMarket}+</div>
              <div className="text-sm text-gray-700">total addressable market</div>
            </div>

            <div>
              <div className="text-3xl font-bold text-purple-900">{penetrationPercent.toFixed(0)}%</div>
              <div className="text-sm text-gray-700">current penetration</div>
            </div>

            <div>
              <div className="text-3xl font-bold text-purple-900">+{totalAddressableMarket - currentPenetration}</div>
              <div className="text-sm text-gray-700">additional schools</div>
            </div>

            {/* Penetration Meter */}
            <div className="pt-3 border-t border-purple-300">
              <div className="text-sm font-semibold text-gray-800 mb-2">Market Penetration</div>
              <div className="relative h-8 bg-purple-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#1770C0] to-purple-600 flex items-center justify-end pr-2 transition-all duration-1000"
                  style={{ width: `${penetrationPercent}%` }}
                >
                  <span className="text-white text-xs font-bold">{penetrationPercent.toFixed(0)}%</span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>{currentPenetration} schools</span>
                <span className="text-purple-700 font-bold">70% unfilled opportunity</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION C: Expansion Play */}
        <div className="bg-white rounded-xl p-6 border-2 border-green-200">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-bold text-black">Expansion Play</h3>
          </div>

          <div className="space-y-3">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-lg font-bold text-green-900">SEC</div>
              <div className="text-xs text-gray-600">4 more schools to acquire</div>
            </div>

            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-lg font-bold text-green-900">Big Ten</div>
              <div className="text-xs text-gray-600">8 more schools to acquire</div>
            </div>

            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-lg font-bold text-green-900">ACC</div>
              <div className="text-xs text-gray-600">7 more schools to acquire</div>
            </div>

            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-lg font-bold text-green-900">Group of Five</div>
              <div className="text-xs text-gray-600">Major opportunity vertical</div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
              <div className="text-lg font-bold text-blue-900">International</div>
              <div className="text-xs text-gray-600">Future expansion vertical</div>
            </div>
          </div>
        </div>
      </div>

      {/* Conservative Estimate Box */}
      <div className="bg-gradient-to-br from-amber-100 to-yellow-100 border-4 border-amber-400 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#1770C0] flex items-center justify-center">
            <DollarSign className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-black">Conservative Growth Estimate</h3>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-amber-300">
          <div className="text-xl font-bold text-gray-900 mb-4">
            If Playfly reaches {targetSchools}+ schools (stated goal):
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <div className="text-3xl font-bold text-amber-900">{targetMAXPercent}%</div>
              <div className="text-xs text-gray-700 mt-1">at MAX tier</div>
              <div className="text-sm font-semibold text-amber-800 mt-2">{projectedMAXSchools} schools</div>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <div className="text-3xl font-bold text-amber-900">30x</div>
              <div className="text-xs text-gray-700 mt-1">revenue impact</div>
              <div className="text-sm font-semibold text-amber-800 mt-2">vs. current</div>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <div className="text-3xl font-bold text-amber-900">10M+</div>
              <div className="text-xs text-gray-700 mt-1">athletes reached</div>
              <div className="text-sm font-semibold text-amber-800 mt-2">network scale</div>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <div className="text-3xl font-bold text-amber-900">1B+</div>
              <div className="text-xs text-gray-700 mt-1">annual follower base</div>
              <div className="text-sm font-semibold text-amber-800 mt-2">reach potential</div>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-4 border-2 border-green-400">
              <div className="text-3xl font-bold text-green-900">
                ${(projectedRevenue / 1000000).toFixed(0)}M
              </div>
              <div className="text-xs text-gray-700 mt-1">network value</div>
              <div className="text-sm font-semibold text-green-800 mt-2">estimated</div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-amber-50 rounded-lg p-4 border-l-4 border-[#1770C0]">
          <div className="text-sm text-gray-800">
            <strong className="text-amber-900">Note:</strong> This assumes {targetMAXPercent}% MAX tier conversion at $
            {(revenuePerMAXSchool / 1000000).toFixed(1)}M average revenue per MAX school annually. Actual results may
            vary based on market conditions, partnership terms, and execution.
          </div>
        </div>
      </div>

      {/* Bottom Visual Impact */}
      <div className="mt-8 bg-gradient-to-r from-[#1770C0] via-indigo-600 to-blue-600 rounded-xl p-8 text-white text-center">
        <Globe className="w-16 h-16 mx-auto mb-4 opacity-80" />
        <div className="text-3xl font-bold mb-3">The Opportunity is NOW</div>
        <div className="text-purple-100 text-lg max-w-3xl mx-auto">
          70% of the addressable market remains untapped. First-mover advantage in conference partnerships creates
          structural barriers for competitors.
        </div>
      </div>
    </div>
  );
}
