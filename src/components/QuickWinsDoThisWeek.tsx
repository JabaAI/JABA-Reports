import { Zap, TrendingUp, Target, AlertCircle } from 'lucide-react';
import { getJABARosterTeams } from '../data/jabaRealData';
import { formatCurrency, formatPercentage, calculate90DayEMV } from '../services/jabaDataLoader';

/**
 * SECTION 3: QUICK WINS - DO THIS WEEK
 * Position: After Athlete Tier Pricing
 * Purpose: Actionable opportunities with immediate ROI
 */

export function QuickWinsDoThisWeek() {
  const teams = getJABARosterTeams();

  // Find trending athletes (7-day engagement > 30-day avg)
  const trendingAthletes = teams
    .filter(t => {
      const sevenDay = t.metrics.sevenDays.engagementRate;
      const thirtyDay = t.metrics.thirtyDays.engagementRate;
      return sevenDay > thirtyDay * 1.15 && t.metrics.ninetyDays.sponsoredContentCount === 0;
    })
    .sort((a, b) => b.metrics.sevenDays.engagementRate - a.metrics.sevenDays.engagementRate)
    .slice(0, 5);

  // Find viral posts (top 10% engagement, unsponsored)
  const viralUnsponsored = teams
    .filter(t => t.metrics.ninetyDays.engagementRate >= 0.04 && t.metrics.ninetyDays.sponsoredContentCount === 0)
    .slice(0, 5);

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-sm">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-wide">QUICK WINS - DO THIS WEEK</h2>
            <p className="text-green-600 font-semibold text-sm">Immediate opportunities requiring zero prep</p>
          </div>
        </div>
        <div className="h-1.5 w-32 bg-gradient-to-r from-green-500 to-emerald-600" />
      </div>

      {/* Hot Right Now */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-600" />
          Hot Right Now - Trending Athletes
        </h3>
        <div className="space-y-3">
          {trendingAthletes.map((team, idx) => {
            const emv = calculate90DayEMV(team.metrics.ninetyDays);
            const growth = ((team.metrics.sevenDays.engagementRate / team.metrics.thirtyDays.engagementRate) - 1) * 100;
            return (
              <div key={idx} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{team.schoolName}</div>
                    <div className="text-sm text-gray-300">{team.sport}</div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-xs text-gray-400">7-Day Growth</div>
                      <div className="text-lg font-bold text-green-600">↑ {growth.toFixed(0)}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Engagement Rate</div>
                      <div className="text-lg font-bold text-green-600">{formatPercentage(team.metrics.sevenDays.engagementRate)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Potential Value</div>
                      <div className="text-lg font-bold text-green-600">{formatCurrency(emv)}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-green-200">
                  <div className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
                    <Target className="w-4 h-4" />
                    PRIORITY: Contact this week
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Untapped Goldmine */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-yellow-600" />
          Untapped Goldmine - High Engagement, Zero Sponsorships
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {viralUnsponsored.map((team, idx) => {
            const emv = calculate90DayEMV(team.metrics.ninetyDays);
            return (
              <div key={idx} className="bg-yellow-50 rounded-lg p-5 border-2 border-yellow-400">
                <div className="font-bold text-white mb-1">{team.schoolName}</div>
                <div className="text-sm text-gray-300 mb-3">{team.sport}</div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-gray-400">Followers</div>
                    <div className="font-bold text-white">{(team.metrics.ninetyDays.followers || 0).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Engagement</div>
                    <div className="font-bold text-yellow-700">{formatPercentage(team.metrics.ninetyDays.engagementRate)}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs text-gray-400">90-Day EMV</div>
                    <div className="font-bold text-yellow-700 text-lg">{formatCurrency(emv)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Plan */}
      <div className="bg-black/80 rounded-xl p-8 text-white border-2 border-green-500">
        <h3 className="text-2xl font-bold mb-6">This Week's Action Plan</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 font-bold">1</div>
            <div>
              <div className="font-bold mb-1">Contact Top 5 Trending Athletes</div>
              <div className="text-sm text-gray-300">These athletes are hot right now. Strike while momentum is high.</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 font-bold">2</div>
            <div>
              <div className="font-bold mb-1">Pitch Tier 2 Athletes to Mid-Market Brands</div>
              <div className="text-sm text-gray-300">$800-$2,500 price point is perfect for regional brands looking to test NIL.</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 font-bold">3</div>
            <div>
              <div className="font-bold mb-1">Package SEC Schools for National Campaign</div>
              <div className="text-sm text-gray-300">Bundle Auburn, LSU, Texas A&M for 25% discount. Total reach: 500K+ followers.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-400 text-center">
        Data source: JABA PlayFlyFull_roster_teams.json | Trend analysis: 7-day vs 30-day engagement rates
      </div>
    </div>
  );
}
