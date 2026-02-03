import { useState, useMemo } from 'react';
import { AlertTriangle, TrendingUp, DollarSign, Target, ArrowRight, ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import { getAllSchools, getTeamsBySchool } from '../data/jabaRealData';

/**
 * TEAM PAGE SPONSORSHIP GAP - ALL PLAYFLY SCHOOLS
 *
 * Purpose: Show the team page sponsorship gap across ALL Playfly schools, ranked by opportunity
 * Data: Real JABA data showing all 177 team pages across 10 schools
 */

type SortField = 'school' | 'followers' | 'opportunity';
type SortDirection = 'asc' | 'desc';

interface SchoolOpportunity {
  schoolName: string;
  conference: string;
  totalFollowers: number;
  avgEngagement: number;
  teamCount: number;
  sponsoredPostsLast90Days: number;
  totalPostsLast90Days: number;
  sponsoredPercentage: number;
  annualPotential: number;
}

export function TeamPageSponsorshipGap() {
  const [sortField, setSortField] = useState<SortField>('opportunity');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [showAll, setShowAll] = useState(false);

  // Calculate metrics for all schools
  const schoolOpportunities: SchoolOpportunity[] = useMemo(() => {
    const schools = getAllSchools();

    return schools.map(schoolName => {
      const schoolTeams = getTeamsBySchool(schoolName);

      const totalFollowers = schoolTeams.reduce((sum, t) => sum + t.metrics.ninetyDays.followers, 0);
      const avgEngagement = schoolTeams.reduce((sum, t) => sum + t.metrics.ninetyDays.engagementRate, 0) / schoolTeams.length;
      const sponsoredPostsLast90Days = schoolTeams.reduce((sum, t) => sum + t.metrics.ninetyDays.sponsoredContentCount, 0);
      const totalPostsLast90Days = schoolTeams.reduce((sum, t) => sum + t.metrics.ninetyDays.contentCount, 0);
      const sponsoredPercentage = totalPostsLast90Days > 0 ? (sponsoredPostsLast90Days / totalPostsLast90Days) * 100 : 0;

      // Annual potential calculation:
      // Conservative: $2-5 per engaged user per year
      // (Total Followers × Avg Engagement) × $3.5 average value × 1 brand
      const engagedUsers = totalFollowers * avgEngagement;
      const annualPotential = engagedUsers * 3.5;

      const conference = schoolTeams[0]?.conferenceName || 'Unknown';

      return {
        schoolName,
        conference,
        totalFollowers,
        avgEngagement,
        teamCount: schoolTeams.length,
        sponsoredPostsLast90Days,
        totalPostsLast90Days,
        sponsoredPercentage,
        annualPotential,
      };
    });
  }, []);

  // Sort schools
  const sortedSchools = useMemo(() => {
    const sorted = [...schoolOpportunities];
    sorted.sort((a, b) => {
      let aVal: number | string = 0;
      let bVal: number | string = 0;

      if (sortField === 'school') {
        aVal = a.schoolName;
        bVal = b.schoolName;
      } else if (sortField === 'followers') {
        aVal = a.totalFollowers;
        bVal = b.totalFollowers;
      } else if (sortField === 'opportunity') {
        aVal = a.annualPotential;
        bVal = b.annualPotential;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      return sortDirection === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });

    return sorted;
  }, [schoolOpportunities, sortField, sortDirection]);

  const displayedSchools = showAll ? sortedSchools : sortedSchools.slice(0, 10);

  // Network totals
  const totalTeamPages = schoolOpportunities.reduce((sum, s) => sum + s.teamCount, 0);
  const totalFollowers = schoolOpportunities.reduce((sum, s) => sum + s.totalFollowers, 0);
  const totalAnnualPotential = schoolOpportunities.reduce((sum, s) => sum + s.annualPotential, 0);
  const top10Potential = sortedSchools.slice(0, 10).reduce((sum, s) => sum + s.annualPotential, 0);

  // Top 4 schools by followers with zero sponsored posts
  const top4BiggestGaps = [...schoolOpportunities]
    .filter(s => s.sponsoredPostsLast90Days === 0)
    .sort((a, b) => b.totalFollowers - a.totalFollowers)
    .slice(0, 4);

  const formatCurrency = (value: number): string => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  const formatNumber = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toLocaleString();
  };

  const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection(field === 'school' ? 'asc' : 'desc');
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1770C0] to-blue-500 flex items-center justify-center animate-pulse">
            <AlertTriangle className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-wide">
              TEAM PAGE SPONSORSHIP GAP
            </h2>
            <p className="text-[#3B9FD9] font-semibold text-sm">Across All {getAllSchools().length} Playfly Schools</p>
          </div>
        </div>
        <div className="h-1.5 w-32 bg-gradient-to-r from-[#1770C0] to-blue-500" />
      </div>

      {/* SECTION 1: Playfly Network Overview */}
      <div className="mb-8 bg-gradient-to-r from-[#1770C0] to-blue-500 rounded-xl p-6 text-white shadow-xl border-2 border-blue-700">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Network-Wide Team Page Opportunity</h3>
            <p className="text-lg opacity-95">
              {totalTeamPages} team pages across {getAllSchools().length} schools with minimal branded content = massive untapped revenue
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <div className="text-sm opacity-90 mb-2">Total Team Pages</div>
            <div className="text-4xl font-bold">{totalTeamPages}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <div className="text-sm opacity-90 mb-2">Total Followers</div>
            <div className="text-4xl font-bold">{formatNumber(totalFollowers)}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <div className="text-sm opacity-90 mb-2">Annual Untapped Revenue</div>
            <div className="text-4xl font-bold">{formatCurrency(totalAnnualPotential)}</div>
            <div className="text-xs opacity-75 mt-1">With just 1 brand partner</div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Top Schools by Opportunity - Sortable Table */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-[#3B9FD9]" />
            Schools Ranked by Team Page Opportunity
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <ArrowUpDown className="w-4 h-4" />
            <span>Click column headers to sort</span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#1770C0] to-blue-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold">RANK</th>
                  <th
                    className="px-4 py-3 text-left text-xs font-bold cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => handleSort('school')}
                  >
                    <div className="flex items-center gap-2">
                      SCHOOL NAME
                      {sortField === 'school' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold">CONFERENCE</th>
                  <th
                    className="px-4 py-3 text-right text-xs font-bold cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => handleSort('followers')}
                  >
                    <div className="flex items-center justify-end gap-2">
                      TOTAL TEAM FOLLOWERS
                      {sortField === 'followers' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-bold">AVG ENGAGEMENT</th>
                  <th className="px-4 py-3 text-right text-xs font-bold">SPONSORED POSTS (90 DAYS)</th>
                  <th
                    className="px-4 py-3 text-right text-xs font-bold cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => handleSort('opportunity')}
                  >
                    <div className="flex items-center justify-end gap-2">
                      ANNUAL POTENTIAL (1 BRAND)
                      {sortField === 'opportunity' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedSchools.map((school, idx) => {
                  const rank = sortedSchools.indexOf(school) + 1;
                  const isZeroSponsored = school.sponsoredPostsLast90Days === 0;

                  return (
                    <tr
                      key={school.schoolName}
                      className={`border-b border-white/20 ${idx % 2 === 0 ? 'bg-white/5' : 'bg-white/10'} hover:bg-white/20 transition-colors`}
                    >
                      <td className="px-4 py-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          rank <= 3 ? 'bg-gradient-to-br from-[#1770C0] to-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {rank}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-white">{school.schoolName}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">{school.conference}</td>
                      <td className="px-4 py-3 text-right">
                        <span className="font-semibold text-green-400">{formatNumber(school.totalFollowers)}</span>
                      </td>
                      <td className="px-4 py-3 text-right text-white">{formatPercentage(school.avgEngagement)}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`px-2 py-1 rounded-full text-sm font-bold ${
                          isZeroSponsored ? 'bg-red-600 text-white' : 'bg-[#1770C0] text-black'
                        }`}>
                          {school.sponsoredPostsLast90Days}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-[#3B9FD9]">
                        {formatCurrency(school.annualPotential)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {!showAll && sortedSchools.length > 10 && (
            <div className="bg-[#1770C0]/10 p-4 text-center border-t-2 border-[#1770C0]">
              <button
                onClick={() => setShowAll(true)}
                className="text-[#3B9FD9] font-bold hover:text-[#3B9FD9] transition-colors flex items-center gap-2 mx-auto"
              >
                <span>Show All {sortedSchools.length} Schools</span>
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          )}

          {showAll && (
            <div className="bg-[#1770C0]/10 p-4 text-center border-t-2 border-[#1770C0]">
              <button
                onClick={() => setShowAll(false)}
                className="text-[#3B9FD9] font-bold hover:text-[#3B9FD9] transition-colors flex items-center gap-2 mx-auto"
              >
                <span>Show Top 10 Only</span>
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: Market Concentration View */}
      <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[#3B9FD9]" />
          Market Concentration Analysis
        </h3>

        <div className="space-y-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-300">Top 10 Schools Opportunity</div>
              <div className="text-2xl font-bold text-[#3B9FD9]">{formatCurrency(top10Potential)}</div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#1770C0] to-blue-500"
                style={{ width: `${(top10Potential / totalAnnualPotential) * 100}%` }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {((top10Potential / totalAnnualPotential) * 100).toFixed(1)}% of total network opportunity
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-300">All {getAllSchools().length} Schools Total</div>
              <div className="text-2xl font-bold text-white">{formatCurrency(totalAnnualPotential)}</div>
            </div>
            <div className="text-xs text-gray-400">Annual revenue potential with just ONE brand partner per school</div>
          </div>

          <div className="bg-gradient-to-r from-[#1770C0] to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm opacity-90">With Premium Brand Partnerships</div>
              <div className="text-3xl font-bold">{formatCurrency(totalAnnualPotential * 4.3)}</div>
            </div>
            <div className="text-xs opacity-75">Potential increases 4-5X with top-tier national brand partners</div>
          </div>
        </div>
      </div>

      {/* SECTION 4: Critical Gap Summary */}
      <div className="bg-black/80 rounded-xl p-8 text-white border-2 border-red-500 mb-6">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <AlertTriangle className="w-7 h-7 text-red-400 animate-pulse" />
          Critical Gap: Highest-Value Schools with Zero Branded Content
        </h3>

        <div className="space-y-4 mb-6">
          {top4BiggestGaps.map((school, idx) => (
            <div key={school.schoolName} className="bg-red-900/30 rounded-lg p-5 border border-red-500">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div className="text-xl font-bold">{school.schoolName}</div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-gray-400">Followers:</span>{' '}
                      <span className="font-bold text-[#3B9FD9]">{formatNumber(school.totalFollowers)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Engagement:</span>{' '}
                      <span className="font-bold text-white">{formatPercentage(school.avgEngagement)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Branded Content:</span>{' '}
                      <span className="font-bold text-red-400">$0</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400 mb-1">Annual Opportunity</div>
                  <div className="text-2xl font-bold text-[#3B9FD9]">{formatCurrency(school.annualPotential)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-red-600 rounded-lg p-6 border-2 border-red-400">
          <div className="text-xl font-bold mb-3 flex items-center gap-2">
            <Target className="w-6 h-6" />
            These {top4BiggestGaps.length} schools alone:
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm opacity-90">Combined Followers</div>
              <div className="text-3xl font-bold">
                {formatNumber(top4BiggestGaps.reduce((sum, s) => sum + s.totalFollowers, 0))}
              </div>
            </div>
            <div>
              <div className="text-sm opacity-90">Untapped Revenue</div>
              <div className="text-3xl font-bold">
                {formatCurrency(top4BiggestGaps.reduce((sum, s) => sum + s.annualPotential, 0))}
              </div>
            </div>
          </div>
          <p className="text-sm opacity-90">
            With just ONE brand partner each. Every unmonetized post is revenue left on the table.
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button className="bg-gradient-to-r from-[#1770C0] to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-[#0D5A9F] hover:to-blue-700 transition-all shadow-lg flex items-center gap-3 mx-auto">
          <span>Activate Team Page Partnerships</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-xs text-gray-400 mt-3">Let's turn this opportunity into revenue</p>
      </div>

      {/* Data Attribution */}
      <div className="mt-6 text-xs text-gray-400 text-center">
        Data source: JABA PlayFlyFull_roster_teams.json ({totalTeamPages} teams, {getAllSchools().length} schools) |
        Calculation: (Total Followers × Avg Engagement × $3.50 per engaged user annually)
      </div>
    </div>
  );
}
