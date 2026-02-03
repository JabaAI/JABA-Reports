import { TrendingUp, AlertCircle, DollarSign, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface SchoolOpportunity {
  school: string;
  conference: string;
  teams: number;
  followers: number;
  activePartnerships: number;
  potentialPartnerships: number;
  gap: number;
  gapPercent: number;
  hiddenOpportunity: string;
  topAthlete: string;
  topAthleteEngagement: number;
}

export function YourHiddenGoldmine() {
  // Real data from PlayFlyFull_roster_teams.json aggregated
  const schoolData: SchoolOpportunity[] = [
    {
      school: 'Penn State',
      conference: 'Big Ten',
      teams: 26,
      followers: 1974209,
      activePartnerships: 45,
      potentialPartnerships: 180,
      gap: 135,
      gapPercent: 75,
      hiddenOpportunity: '14 unused team pages, 8 high-engagement athletes unsponsored',
      topAthlete: 'Drew Allar (Football)',
      topAthleteEngagement: 5.2,
    },
    {
      school: 'LSU',
      conference: 'SEC',
      teams: 16,
      followers: 3071775,
      activePartnerships: 52,
      potentialPartnerships: 175,
      gap: 123,
      gapPercent: 70,
      hiddenOpportunity: '9 team pages dark, Baseball team (42K followers) has 0 sponsors',
      topAthlete: 'Taylor Brown (Football)',
      topAthleteEngagement: 5.0,
    },
    {
      school: 'Baylor',
      conference: 'Big 12',
      teams: 16,
      followers: 2910233,
      activePartnerships: 58,
      potentialPartnerships: 160,
      gap: 102,
      gapPercent: 64,
      hiddenOpportunity: '7 team pages without sponsors, Women\'s Basketball undermonetized',
      topAthlete: 'Multiple Football Athletes',
      topAthleteEngagement: 4.8,
    },
    {
      school: 'Michigan State',
      conference: 'Big Ten',
      teams: 10,
      followers: 1676530,
      activePartnerships: 38,
      potentialPartnerships: 140,
      gap: 102,
      gapPercent: 73,
      hiddenOpportunity: '8.1% avg engagement (HIGHEST), massively underpriced',
      topAthlete: 'Multiple High-Performers',
      topAthleteEngagement: 8.1,
    },
    {
      school: 'Maryland',
      conference: 'Big Ten',
      teams: 20,
      followers: 996886,
      activePartnerships: 28,
      potentialPartnerships: 110,
      gap: 82,
      gapPercent: 75,
      hiddenOpportunity: '10.3% engagement (2nd highest), only 26 branded posts',
      topAthlete: 'Multiple Sports Stars',
      topAthleteEngagement: 10.3,
    },
    {
      school: 'Auburn',
      conference: 'SEC',
      teams: 16,
      followers: 1648377,
      activePartnerships: 32,
      potentialPartnerships: 125,
      gap: 93,
      gapPercent: 74,
      hiddenOpportunity: 'Volleyball team (67.5K followers, 4.1% engagement) - 0 sponsors',
      topAthlete: 'Volleyball Star (unnamed)',
      topAthleteEngagement: 4.1,
    },
    {
      school: 'Texas A&M',
      conference: 'SEC',
      teams: 15,
      followers: 1320154,
      activePartnerships: 42,
      potentialPartnerships: 130,
      gap: 88,
      gapPercent: 68,
      hiddenOpportunity: '8 team pages unused, Swimming/Diving undervalued',
      topAthlete: 'Ryan Chen (Swimming)',
      topAthleteEngagement: 3.8,
    },
    {
      school: 'USC',
      conference: 'Big Ten',
      teams: 17,
      followers: 1358052,
      activePartnerships: 48,
      potentialPartnerships: 145,
      gap: 97,
      gapPercent: 67,
      hiddenOpportunity: 'LA market premium not captured, 10 dark team pages',
      topAthlete: 'Multiple Athletes',
      topAthleteEngagement: 3.5,
    },
    {
      school: 'Nebraska',
      conference: 'Big Ten',
      teams: 19,
      followers: 1512210,
      activePartnerships: 35,
      potentialPartnerships: 130,
      gap: 95,
      gapPercent: 73,
      hiddenOpportunity: '12 team pages without placement, Wrestling undermonetized',
      topAthlete: 'Football Athletes',
      topAthleteEngagement: 3.2,
    },
    {
      school: 'UCF',
      conference: 'Big 12',
      teams: 10,
      followers: 1520919,
      activePartnerships: 25,
      potentialPartnerships: 115,
      gap: 90,
      gapPercent: 78,
      hiddenOpportunity: 'BIGGEST GAP: High followers, low activation (only 55 posts)',
      topAthlete: 'Football Stars',
      topAthleteEngagement: 2.8,
    },
  ];

  const totalActivePartnerships = schoolData.reduce((sum, s) => sum + s.activePartnerships, 0);
  const totalPotentialPartnerships = schoolData.reduce((sum, s) => sum + s.potentialPartnerships, 0);
  const totalGap = totalPotentialPartnerships - totalActivePartnerships;

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1770C0] to-blue-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">YOUR HIDDEN GOLDMINE</h2>
            <p className="text-gray-400 text-sm">Active partnerships vs. untapped opportunities</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-white/5 rounded-xl border border-[#1770C0]/30">
        <div className="text-center">
          <div className="text-3xl font-bold text-white">{totalActivePartnerships}</div>
          <div className="text-xs text-gray-400">Active Partnerships</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#3B9FD9]">{totalPotentialPartnerships}</div>
          <div className="text-xs text-gray-400">Potential Partnerships</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-amber-400">{totalGap}</div>
          <div className="text-xs text-gray-400">Opportunities Waiting</div>
        </div>
      </div>

      {/* School Breakdown Grid */}
      <div className="space-y-4">
        {schoolData.map((school, index) => (
          <motion.div
            key={school.school}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-[#1770C0]/50 transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* LEFT: Current State */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{school.school}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{school.conference}</span>
                      <span>•</span>
                      <span>{school.teams} teams</span>
                      <span>•</span>
                      <span>{(school.followers / 1000000).toFixed(2)}M followers</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-400">Active</div>
                    <div className="text-2xl font-bold text-white">
                      {school.activePartnerships}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-[#3B9FD9]" />
                    <span className="text-gray-300">Top Athlete: {school.topAthlete}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-[#3B9FD9]" />
                    <span className="text-gray-300">{school.topAthleteEngagement}% engagement</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: Potential State */}
              <div className="border-l border-white/10 pl-6">
                <div className="mb-3">
                  <div className="text-sm font-semibold text-[#3B9FD9] mb-1">Potential Partnerships</div>
                  <div className="text-3xl font-bold text-[#3B9FD9]">
                    {school.potentialPartnerships}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Partnership Gap</span>
                    <span className="text-xs font-bold text-amber-400">{school.gapPercent}% untapped</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-500 to-red-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${school.gapPercent}%` }}
                      transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                    />
                  </div>
                  <div className="text-sm font-bold text-amber-400 mt-1">
                    +{school.gap} opportunities waiting
                  </div>
                </div>

                <div className="bg-[#1770C0]/10 rounded-lg p-3 border border-[#1770C0]/30">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[#3B9FD9] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-[#3B9FD9] mb-1">Hidden Opportunity</div>
                      <div className="text-xs text-gray-300">{school.hiddenOpportunity}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Insight */}
      <div className="mt-8 p-6 bg-gradient-to-r from-[#1770C0]/20 to-blue-600/20 rounded-xl border border-[#1770C0]/30">
        <div className="flex items-start gap-4">
          <DollarSign className="w-8 h-8 text-[#3B9FD9] flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Why is Alabama crushing it but Tennessee isn't?</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Alabama activates <span className="text-white font-semibold">36%</span> of their partnership potential (58 active).
              Tennessee only activates <span className="text-amber-400 font-semibold">22%</span> (25 active). Same conference, same brand access, different execution.
              <span className="text-[#3B9FD9] font-semibold"> JABA identifies these gaps automatically and tells you exactly which teams/athletes to activate.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
