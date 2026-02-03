import { DollarSign, TrendingDown, AlertTriangle, Users, Target, ArrowRight } from 'lucide-react';
import { getJABARosterTeams } from '../data/jabaRealData';
import { calculateMoneyLeftOnTable, formatCurrency, formatPercentage, calculate90DayEMV } from '../services/jabaDataLoader';

/**
 * SECTION 1: MONEY LEFT ON THE TABLE
 *
 * Position: After Executive Summary, before Network Overview
 * Purpose: Urgency driver showing missed revenue opportunities
 * Data: Real JABA metrics from PlayFlyFull_roster_teams.json
 */

export function MoneyLeftOnTable() {
  const teams = getJABARosterTeams();
  const analysis = calculateMoneyLeftOnTable(teams);

  // Calculate additional insights
  const totalNetworkEMV = teams.reduce((sum, team) => sum + calculate90DayEMV(team.metrics.ninetyDays), 0);
  const potentialAdditionalRevenue = analysis.ninetyDayRevenueGap * 4; // Annualize (90 days × 4)

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-sm">
      {/* Header with Urgency */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1770C0] to-blue-500 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-wide">
              MONEY LEFT ON THE TABLE
            </h2>
            <p className="text-[#3B9FD9]/80 font-semibold text-sm">What's bleeding out of your network right now</p>
          </div>
        </div>
        <div className="h-1.5 w-32 bg-gradient-to-r from-[#1770C0] to-blue-500" />
      </div>

      {/* Critical Alert Box */}
      <div className="mb-8 bg-red-500/10 border-2 border-red-400/50 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
          <div>
            <div className="text-xl font-bold text-white mb-2">
              {analysis.unsponsoredHighPerformers} high-performing athletes are generating zero sponsorship revenue
            </div>
            <div className="text-sm text-gray-200">
              These athletes have engagement rates above 3% but aren't monetized. Every day without action is money walking out the door.
            </div>
          </div>
        </div>
      </div>

      {/* Big Numbers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Gap (90 Days) */}
        <div className="bg-gradient-to-br from-[#1770C0] to-blue-500 rounded-xl p-6 text-white border-2 border-[#1770C0] shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5" />
            <div className="text-sm font-semibold opacity-90">90-Day Revenue Gap</div>
          </div>
          <div className="text-5xl font-bold mb-2">{formatCurrency(analysis.ninetyDayRevenueGap)}</div>
          <div className="text-sm opacity-90">
            Money missed in last 90 days
          </div>
          <div className="mt-3 pt-3 border-t border-[#1770C0]/50 text-xs font-semibold">
            Annualized: {formatCurrency(potentialAdditionalRevenue)}
          </div>
        </div>

        {/* Unsponsored High-Performers */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border-2 border-[#1770C0]/50 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-[#3B9FD9]" />
            <div className="text-sm font-semibold text-white">Unmonetized Influence</div>
          </div>
          <div className="text-5xl font-bold text-[#3B9FD9] mb-2">
            {analysis.unsponsoredHighPerformers}
          </div>
          <div className="text-sm text-gray-200">
            High-performers with zero sponsorships
          </div>
          <div className="mt-3 pt-3 border-t border-white/20 text-xs text-gray-300">
            Engagement rate: {formatPercentage(analysis.engagementRateComparison.unsponsored)}
          </div>
        </div>

        {/* Average EMV Per Athlete */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border-2 border-[#1770C0]/50 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-[#3B9FD9]" />
            <div className="text-sm font-semibold text-white">Average EMV Per Athlete</div>
          </div>
          <div className="text-5xl font-bold text-[#3B9FD9] mb-2">
            {formatCurrency(analysis.averageEMVPerAthlete)}
          </div>
          <div className="text-sm text-gray-200">
            90-day equivalent media value
          </div>
          <div className="mt-3 pt-3 border-t border-white/20 text-xs text-gray-300">
            Network total: {formatCurrency(totalNetworkEMV)}
          </div>
        </div>
      </div>

      {/* Network Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Percent Unsponsored */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <h3 className="font-bold text-white">Network Sponsorship Status</h3>
            </div>
            <div className="text-3xl font-bold text-red-400">
              {analysis.percentUnsponsored.toFixed(0)}%
            </div>
          </div>
          <div className="mb-4">
            <div className="text-sm text-gray-200 mb-2">Athletes without sponsorships</div>
            <div className="h-4 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-400 to-orange-400 rounded-full"
                style={{ width: `${analysis.percentUnsponsored}%` }}
              />
            </div>
          </div>
          <div className="text-xs text-gray-300">
            {Math.round((analysis.percentUnsponsored / 100) * teams.length)} out of {teams.length} teams/athletes have zero active sponsorships
          </div>
        </div>

        {/* Engagement Rate Comparison */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-[#3B9FD9]" />
            <h3 className="font-bold text-white">Engagement Rate Comparison</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-200">Sponsored Athletes</span>
                <span className="text-lg font-bold text-[#3B9FD9]">
                  {formatPercentage(analysis.engagementRateComparison.sponsored)}
                </span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1770C0] rounded-full"
                  style={{ width: `${analysis.engagementRateComparison.sponsored * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-200">Unsponsored Athletes</span>
                <span className="text-lg font-bold text-[#3B9FD9]/80">
                  {formatPercentage(analysis.engagementRateComparison.unsponsored)}
                </span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3B9FD9] rounded-full"
                  style={{ width: `${analysis.engagementRateComparison.unsponsored * 100}%` }}
                />
              </div>
            </div>
            {analysis.engagementRateComparison.difference !== 0 && (
              <div className="pt-3 border-t border-white/20 text-sm">
                <span className="text-gray-200">Difference: </span>
                <span className={`font-bold ${analysis.engagementRateComparison.difference > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {analysis.engagementRateComparison.difference > 0 ? '+' : ''}
                  {formatPercentage(Math.abs(analysis.engagementRateComparison.difference))}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* The Bottom Line */}
      <div className="bg-[#1770C0]/10 backdrop-blur-sm rounded-xl p-8 text-white border-2 border-red-400/50">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-red-500/80 flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3">The Bottom Line</h3>
            <div className="text-lg space-y-3">
              <p>
                You have <span className="font-bold text-red-400">{analysis.unsponsoredHighPerformers} high-performing athletes</span> generating{' '}
                <span className="font-bold text-red-400">{formatCurrency(analysis.ninetyDayRevenueGap)}</span> in potential revenue over 90 days—but not a single dollar is being captured.
              </p>
              <p>
                If this continues, you're leaving <span className="font-bold text-red-400">{formatCurrency(potentialAdditionalRevenue)}</span> on the table annually.
              </p>
              <p className="text-red-300 font-semibold">
                These aren't projections. This is real engagement happening right now with no monetization strategy.
              </p>
            </div>
          </div>
        </div>

        {/* What This Means */}
        <div className="bg-red-500/10 rounded-lg p-6 border border-red-400/30">
          <div className="text-sm font-bold mb-3 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            WHAT THIS MEANS:
          </div>
          <div className="space-y-2 text-sm text-gray-200">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
              <span>Every post from these athletes is free advertising that could be a paid partnership</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
              <span>Their followers are engaged and ready to interact with brands—but no one is capitalizing on it</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
              <span>Competitors can approach these athletes directly and cut you out entirely</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
              <span>Athletes may leave your network if they see no monetization path</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Attribution */}
      <div className="mt-6 text-xs text-gray-400 text-center">
        Data source: JABA PlayFlyFull_roster_teams.json (481 teams, 90-day metrics) | Last updated: Jan 28, 2026
      </div>
    </div>
  );
}
