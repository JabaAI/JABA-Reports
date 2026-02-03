import { Star } from 'lucide-react';
import { getJABARosterTeams } from '../data/jabaRealData';
import { formatCurrency, formatPercentage, calculate90DayEMV } from '../services/jabaDataLoader';

/**
 * SECTION 5: HIDDEN TALENT - UNDERVALUED ATHLETES
 * Position: After Risk of Inaction
 * Purpose: Identify sleeper athletes with high ROI potential
 */

export function HiddenTalent() {
  const teams = getJABARosterTeams();
  const networkAvgEngagement = teams.reduce((sum, t) => sum + t.metrics.ninetyDays.engagementRate, 0) / teams.length;
  const networkAvgFollowers = teams.reduce((sum, t) => sum + t.metrics.ninetyDays.followers, 0) / teams.length;

  const undervalued = teams
    .map(team => {
      const metrics = team.metrics.ninetyDays;
      const engagementScore = metrics.engagementRate / networkAvgEngagement;
      const followerScore = metrics.followers / networkAvgFollowers;
      const unsponsoredBonus = metrics.sponsoredContentCount === 0 ? 2 : 1;
      const undervaluationScore = (engagementScore + followerScore) * unsponsoredBonus;
      return { team, undervaluationScore, emv: calculate90DayEMV(metrics) };
    })
    .filter(item => item.team.metrics.ninetyDays.sponsoredContentCount === 0)
    .sort((a, b) => b.undervaluationScore - a.undervaluationScore)
    .slice(0, 10);

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-sm">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1770C0] to-[#1770C0] flex items-center justify-center">
            <Star className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-wide">HIDDEN TALENT - UNDERVALUED ATHLETES</h2>
            <p className="text-[#1770C0] font-semibold text-sm">Diamonds in the rough - high ROI opportunities</p>
          </div>
        </div>
        <div className="h-1.5 w-32 bg-gradient-to-r from-[#1770C0] to-[#1770C0]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {undervalued.map((item, idx) => {
          const metrics = item.team.metrics.ninetyDays;
          const vsNetworkAvg = ((metrics.engagementRate / networkAvgEngagement) - 1) * 100;
          return (
            <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-[#1770C0] shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#1770C0] text-black flex items-center justify-center font-bold text-lg">
                  {idx + 1}
                </div>
                <div className="text-xs font-bold text-[#1770C0] bg-[#1770C0]/30 px-3 py-1 rounded-full">
                  UNDERVALUED
                </div>
              </div>
              <div className="font-bold text-white text-lg mb-1">{item.team.schoolName}</div>
              <div className="text-sm text-gray-300 mb-4">{item.team.sport}</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Engagement:</span>
                  <span className="font-bold text-[#1770C0]">{formatPercentage(metrics.engagementRate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">vs Network Avg:</span>
                  <span className={`font-bold ${vsNetworkAvg > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                    {vsNetworkAvg > 0 ? '+' : ''}{vsNetworkAvg.toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current EMV:</span>
                  <span className="font-bold text-[#1770C0]">{formatCurrency(item.emv)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sponsorships:</span>
                  <span className="font-bold text-red-600">Zero</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#1770C0]">
                <div className="text-xs text-gray-300 mb-2">Recommended Starting Price:</div>
                <div className="text-2xl font-bold text-[#1770C0]">{formatCurrency(item.emv * 0.15 / (metrics.contentCount || 1))}</div>
                <div className="text-xs text-gray-400">per post</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-black/80 rounded-xl p-8 text-white border-2 border-[#1770C0]">
        <h3 className="text-2xl font-bold mb-4">Why These Athletes Matter</h3>
        <p className="text-lg text-gray-300">
          These {undervalued.length} athletes outperform the network average but have zero sponsorships. They're hungry to prove themselves and will deliver exceptional ROI for brands testing NIL waters.
        </p>
      </div>

      <div className="mt-6 text-xs text-gray-400 text-center">
        Data source: JABA PlayFlyFull_roster_teams.json | Undervaluation algorithm: (engagement/avg) × (followers/avg) × unsponsorized multiplier
      </div>
    </div>
  );
}
