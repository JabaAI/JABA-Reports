import { AlertCircle, TrendingDown, Users, DollarSign, Clock, Shield } from 'lucide-react';
import { getJABARosterTeams } from '../data/jabaRealData';
import { calculateRiskAnalysis, formatCurrency } from '../services/jabaDataLoader';

/**
 * SECTION 4: RISK OF INACTION DASHBOARD
 *
 * Position: Before Campaign Performance section
 * Purpose: Fear/Urgency driver showing what happens if you don't act
 * Data: Real JABA metrics analyzing declining trends and vulnerabilities
 */

export function RiskOfInaction() {
  const teams = getJABARosterTeams();
  const riskAnalysis = calculateRiskAnalysis(teams);

  // Calculate additional risk metrics
  const annualHemorrhage = riskAnalysis.monthlyHemorrhage * 12;
  const quarterlyLoss = riskAnalysis.monthlyHemorrhage * 3;

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-sm">
      {/* Header with Urgency */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center animate-pulse">
            <AlertCircle className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-wide">
              RISK OF INACTION DASHBOARD
            </h2>
            <p className="text-red-600 font-semibold text-sm">What happens if you do nothing</p>
          </div>
        </div>
        <div className="h-1.5 w-32 bg-gradient-to-r from-red-600 to-orange-600" />
      </div>

      {/* Critical Alert */}
      <div className="mb-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-6 text-white shadow-xl border-2 border-red-700">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Time is Money—And You're Losing Both</h3>
            <div className="text-lg">
              <span className="font-bold">{riskAnalysis.atRiskAthletes} athletes</span> are at immediate risk of leaving your network or being poached by competitors. Every month you wait costs{' '}
              <span className="font-bold text-yellow-300">{formatCurrency(riskAnalysis.monthlyHemorrhage)}</span> in lost revenue.
            </div>
          </div>
        </div>
      </div>

      {/* Risk Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* At-Risk Athletes */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-400">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-red-600" />
            <div className="text-sm font-semibold text-red-900">At-Risk Athletes</div>
          </div>
          <div className="text-5xl font-bold text-red-600 mb-2">{riskAnalysis.atRiskAthletes}</div>
          <div className="text-sm text-red-800">
            Zero deals + declining engagement
          </div>
          <div className="mt-3 pt-3 border-t border-red-300 text-xs text-red-700">
            Vulnerable to competitor acquisition
          </div>
        </div>

        {/* Monthly Hemorrhage */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-400">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-5 h-5 text-red-600" />
            <div className="text-sm font-semibold text-red-900">Monthly Hemorrhage</div>
          </div>
          <div className="text-5xl font-bold text-red-600 mb-2">
            {formatCurrency(riskAnalysis.monthlyHemorrhage)}
          </div>
          <div className="text-sm text-red-800">
            Lost revenue per month
          </div>
          <div className="mt-3 pt-3 border-t border-red-300 text-xs text-red-700">
            Q1 impact: {formatCurrency(quarterlyLoss)}
          </div>
        </div>

        {/* Competitor Exposure */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-400">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-red-600" />
            <div className="text-sm font-semibold text-red-900">Competitor Exposure</div>
          </div>
          <div className="text-5xl font-bold text-red-600 mb-2">{riskAnalysis.competitorExposure}</div>
          <div className="text-sm text-red-800">
            High-value athletes unprotected
          </div>
          <div className="mt-3 pt-3 border-t border-red-300 text-xs text-red-700">
            Prime targets for rival networks
          </div>
        </div>

        {/* Engagement Decline */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-400">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-5 h-5 text-red-600" />
            <div className="text-sm font-semibold text-red-900">Engagement Decline</div>
          </div>
          <div className="text-5xl font-bold text-red-600 mb-2">
            {riskAnalysis.engagementDeclinePercent.toFixed(1)}%
          </div>
          <div className="text-sm text-red-800">
            Of network trending downward
          </div>
          <div className="mt-3 pt-3 border-t border-red-300 text-xs text-red-700">
            Accelerating talent attrition
          </div>
        </div>
      </div>

      {/* The Cost of Waiting */}
      <div className="mb-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Clock className="w-7 h-7 text-red-400" />
          The Cost of Waiting
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-gray-400 text-sm mb-2">Next 30 Days</div>
            <div className="text-4xl font-bold text-red-400 mb-1">{formatCurrency(riskAnalysis.monthlyHemorrhage)}</div>
            <div className="text-sm text-gray-300">in missed revenue</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-2">Next 90 Days (Q1)</div>
            <div className="text-4xl font-bold text-red-400 mb-1">{formatCurrency(quarterlyLoss)}</div>
            <div className="text-sm text-gray-300">in quarterly losses</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-2">Next 12 Months</div>
            <div className="text-4xl font-bold text-red-400 mb-1">{formatCurrency(annualHemorrhage)}</div>
            <div className="text-sm text-gray-300">in annual hemorrhage</div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-300 text-lg">
            This isn't a projection. This is what's happening <span className="font-bold text-red-400">right now</span>. Every day without action compounds the loss.
          </p>
        </div>
      </div>

      {/* At-Risk Athletes Detail */}
      {riskAnalysis.atRiskDetails.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-red-600" />
            Highest-Risk Athletes (Top 10)
          </h3>
          <div className="space-y-3">
            {riskAnalysis.atRiskDetails.slice(0, 10).map((athlete, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4 border-l-4 border-red-500"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">{athlete.schoolName}</div>
                    <div className="text-sm text-gray-300">{athlete.sport}</div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Days Without Deal</div>
                      <div className="text-lg font-bold text-red-600">{athlete.daysWithoutDeal}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Trend</div>
                      <div
                        className={`text-lg font-bold ${
                          athlete.engagementTrend === 'declining' ? 'text-red-600' : 'text-yellow-600'
                        }`}
                      >
                        {athlete.engagementTrend === 'declining' ? '↓ Declining' : '→ Flat'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Potential Annual Loss</div>
                      <div className="text-lg font-bold text-red-600">{formatCurrency(athlete.potentialLoss)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What Happens If You Don't Act */}
      <div className="bg-black/80 rounded-xl p-8 text-white border-2 border-red-600">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <AlertCircle className="w-7 h-7 text-red-400" />
          What Happens If You Don't Act
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-red-900/30 rounded-lg border border-red-700">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <div>
              <div className="font-bold mb-1">Athletes Leave Your Network</div>
              <div className="text-sm text-gray-300">
                High-performers without monetization opportunities will seek other representation. You lose not just revenue, but relationships.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-red-900/30 rounded-lg border border-red-700">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <div>
              <div className="font-bold mb-1">Competitors Poach Your Best Talent</div>
              <div className="text-sm text-gray-300">
                {riskAnalysis.competitorExposure} high-value athletes are completely unprotected. Rival networks can approach them directly.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-red-900/30 rounded-lg border border-red-700">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 font-bold">
              3
            </div>
            <div>
              <div className="font-bold mb-1">Engagement Spirals Downward</div>
              <div className="text-sm text-gray-300">
                {riskAnalysis.engagementDeclinePercent.toFixed(1)}% of your network is already declining. Without intervention, this accelerates.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-red-900/30 rounded-lg border border-red-700">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 font-bold">
              4
            </div>
            <div>
              <div className="font-bold mb-1">Revenue Opportunity Vanishes</div>
              <div className="text-sm text-gray-300">
                {formatCurrency(annualHemorrhage)} annually doesn't just disappear—it goes to someone else who moved faster than you.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-red-800">
          <p className="text-lg font-semibold text-red-300">
            The clock is ticking. Every week you delay, the hole gets deeper and harder to climb out of.
          </p>
        </div>
      </div>

      {/* Data Attribution */}
      <div className="mt-6 text-xs text-gray-400 text-center">
        Data source: JABA PlayFlyFull_roster_teams.json (177+ teams) | Risk algorithm: 7/30/90-day engagement trends + sponsorship status
      </div>
    </div>
  );
}
