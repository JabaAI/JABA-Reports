import { useState } from 'react';
import { Search, TrendingUp, DollarSign, Users, AlertTriangle, Target, Calendar, ChevronDown, ChevronRight } from 'lucide-react';

interface School {
  name: string;
  conference: string;
  teams: number;
  followers: string;
  activePartnerships: number;
  potentialPartnerships: number;
  gap: number;
  topOpportunity: string;
}

export function SchoolPerformanceCards() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'athletes' | 'teams' | 'brands' | 'benchmarking' | 'actions' | 'roadmap'>('athletes');

  const schools: School[] = [
    { name: 'LSU', conference: 'SEC', teams: 16, followers: '3.07M', activePartnerships: 52, potentialPartnerships: 175, gap: 123, topOpportunity: 'Baseball team (42K followers, 0 sponsors)' },
    { name: 'Baylor', conference: 'Big 12', teams: 16, followers: '2.91M', activePartnerships: 58, potentialPartnerships: 160, gap: 102, topOpportunity: 'Women\'s Basketball undermonetized' },
    { name: 'Penn State', conference: 'Big Ten', teams: 26, followers: '1.97M', activePartnerships: 45, potentialPartnerships: 180, gap: 135, topOpportunity: '14 unused team pages' },
    { name: 'Michigan State', conference: 'Big Ten', teams: 10, followers: '1.68M', activePartnerships: 38, potentialPartnerships: 140, gap: 102, topOpportunity: '8.1% avg engagement (HIGHEST)' },
    { name: 'Maryland', conference: 'Big Ten', teams: 20, followers: '997K', activePartnerships: 28, potentialPartnerships: 110, gap: 82, topOpportunity: '10.3% engagement (2nd highest)' },
    { name: 'Auburn', conference: 'SEC', teams: 16, followers: '1.65M', activePartnerships: 32, potentialPartnerships: 125, gap: 93, topOpportunity: 'Volleyball (67K followers, 0 sponsors)' },
    { name: 'Texas A&M', conference: 'SEC', teams: 15, followers: '1.32M', activePartnerships: 42, potentialPartnerships: 130, gap: 88, topOpportunity: '8 team pages unused' },
    { name: 'USC', conference: 'Big Ten', teams: 17, followers: '1.36M', activePartnerships: 48, potentialPartnerships: 145, gap: 97, topOpportunity: 'LA market premium not captured' },
    { name: 'Nebraska', conference: 'Big Ten', teams: 19, followers: '1.51M', activePartnerships: 35, potentialPartnerships: 130, gap: 95, topOpportunity: '12 team pages dark' },
    { name: 'UCF', conference: 'Big 12', teams: 10, followers: '1.52M', activePartnerships: 25, potentialPartnerships: 115, gap: 90, topOpportunity: 'BIGGEST GAP: low activation' },
  ];

  // Sample athlete data (would come from real data)
  const getAthletesForSchool = (_schoolName: string) => [
    { rank: 1, name: 'Jordan Williams', sport: 'Football', followers: '127K', engagement: '6.8%', sponsorships: 3, brandMatches: 12, recommendation: 'Expand Nike partnership' },
    { rank: 2, name: 'Sarah Martinez', sport: 'Gymnastics', followers: '92K', engagement: '9.2%', sponsorships: 0, brandMatches: 18, recommendation: 'Urgent: Sign now before competition' },
    { rank: 3, name: 'Mike Johnson', sport: 'Basketball', followers: '78K', engagement: '5.4%', sponsorships: 2, brandMatches: 10, recommendation: 'Add Adidas co-sponsor' },
    { rank: 4, name: 'Emily Chen', sport: 'Volleyball', followers: '67K', engagement: '8.1%', sponsorships: 0, brandMatches: 15, recommendation: 'Package with football' },
    { rank: 5, name: 'David Brown', sport: 'Baseball', followers: '54K', engagement: '4.9%', sponsorships: 1, brandMatches: 8, recommendation: 'Raising Cane\'s regional fit' },
  ];

  const getTeamsForSchool = (_schoolName: string) => [
    { team: 'Women\'s Gymnastics', followers: '156K', engagement: '9.8%', currentSponsors: 0, expectedSponsors: 3, gap: 3 },
    { team: 'Women\'s Volleyball', followers: '134K', engagement: '7.5%', currentSponsors: 1, expectedSponsors: 3, gap: 2 },
    { team: 'Baseball', followers: '98K', engagement: '4.2%', currentSponsors: 0, expectedSponsors: 2, gap: 2 },
    { team: 'Men\'s Soccer', followers: '76K', engagement: '5.8%', currentSponsors: 1, expectedSponsors: 2, gap: 1 },
  ];

  const getMissingBrands = (_schoolName: string, _conference: string) => [
    { brand: 'Nike', status: 'Active in 12/14 Big Ten schools', action: 'Missing 8-12 partnership opportunities' },
    { brand: 'Raising Cane\'s', status: 'Active in 8/10 SEC schools', action: 'Expand for 5-8 new deals' },
    { brand: 'Adidas', status: 'Active in 6/10 Pac-12 schools', action: 'Untapped 4-6 opportunities' },
  ];

  const getBenchmarking = (_schoolName: string, _conference: string) => ({
    engagementRank: '3rd in Big Ten',
    monetizationRank: '11th in Big Ten',
    topSport: 'Gymnastics (top 5% engagement)',
    bottomSport: 'Football (73rd percentile monetization)',
    insight: 'You\'re great at engagement but poor at activation — classic case of leaving opportunities on table'
  });

  const getActions = (_schoolName: string) => [
    { priority: 1, action: 'Activate Nike team page sponsorships across 8 dark teams', upside: '16 deals', timeline: '2 weeks' },
    { priority: 2, action: 'Sign 3 high-engagement athletes with zero sponsors', upside: '12 deals', timeline: '4 weeks' },
    { priority: 3, action: 'Launch Raising Cane\'s partnership (SEC expansion)', upside: '8 deals', timeline: '8 weeks' },
  ];

  const getRoadmap = (_schoolName: string) => [
    { week: 'Week 1', focus: 'Audit all team page inventory and activate Nike partnerships', expected: '+6 deals' },
    { week: 'Week 2-4', focus: 'Sign top 3 undervalued athletes and launch campaigns', expected: '+12 deals' },
    { week: 'Week 5-8', focus: 'Expand Raising Cane\'s and secondary brand partnerships', expected: '+18 deals' },
    { week: 'Week 9-12', focus: 'Optimize existing deals and scale winning models', expected: '+8 deals' },
  ];

  const filtered = schools.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.conference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'athletes' as const, label: 'Top Athletes', icon: Users },
    { id: 'teams' as const, label: 'Underutilized Teams', icon: TrendingUp },
    { id: 'brands' as const, label: 'Missing Brands', icon: AlertTriangle },
    { id: 'benchmarking' as const, label: 'Benchmarking', icon: Target },
    { id: 'actions' as const, label: 'Recommended Actions', icon: DollarSign },
    { id: 'roadmap' as const, label: '90-Day Roadmap', icon: Calendar },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">SCHOOL-BY-SCHOOL PERFORMANCE DEEP DIVE</h2>
        <p className="text-gray-400 text-sm mb-4">Click your school. See exactly where you stand and what to fix.</p>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search schools or conferences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#1770C0]"
          />
        </div>
      </div>

      <div className="space-y-3 max-h-[800px] overflow-y-auto">
        {filtered.map((school) => (
          <div
            key={school.name}
            className="bg-white/5 rounded-xl border border-white/10 hover:border-[#1770C0]/50 transition-all"
          >
            {/* School Header - Always Visible */}
            <div
              className="p-4 cursor-pointer"
              onClick={() => setSelectedSchool(selectedSchool === school.name ? null : school.name)}
            >
              <div className="grid grid-cols-8 gap-4 items-center">
                <div className="col-span-1 flex items-center gap-2">
                  {selectedSchool === school.name ? (
                    <ChevronDown className="w-4 h-4 text-[#1770C0]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <div>
                    <div className="text-lg font-bold text-white">{school.name}</div>
                    <div className="text-xs text-gray-400">{school.conference}</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-white">{school.teams}</div>
                  <div className="text-xs text-gray-400">Teams</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-white">{school.followers}</div>
                  <div className="text-xs text-gray-400">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-white">{school.activePartnerships}</div>
                  <div className="text-xs text-gray-400">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-[#3B9FD9]">{school.potentialPartnerships}</div>
                  <div className="text-xs text-gray-400">Potential</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-amber-400">+{school.gap}</div>
                  <div className="text-xs text-gray-400">Opportunity</div>
                </div>
                <div className="col-span-2 text-sm text-gray-300">{school.topOpportunity}</div>
              </div>
            </div>

            {/* Expanded Tabs View */}
            {selectedSchool === school.name && (
              <div className="border-t border-white/10 p-4">
                {/* Tab Navigation */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                          activeTab === tab.id
                            ? 'bg-[#1770C0] text-white'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <div className="bg-white/5 rounded-lg p-4">
                  {activeTab === 'athletes' && (
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Top Athletes by Engagement</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="text-left text-gray-400 pb-2 font-semibold">Rank</th>
                              <th className="text-left text-gray-400 pb-2 font-semibold">Name</th>
                              <th className="text-left text-gray-400 pb-2 font-semibold">Sport</th>
                              <th className="text-right text-gray-400 pb-2 font-semibold">Followers</th>
                              <th className="text-right text-gray-400 pb-2 font-semibold">Engagement</th>
                              <th className="text-center text-gray-400 pb-2 font-semibold">Sponsors</th>
                              <th className="text-right text-gray-400 pb-2 font-semibold">Brand Matches</th>
                              <th className="text-left text-gray-400 pb-2 font-semibold">Recommendation</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getAthletesForSchool(school.name).map((athlete) => (
                              <tr key={athlete.rank} className="border-b border-white/5">
                                <td className="py-3 text-white font-bold">{athlete.rank}</td>
                                <td className="py-3 text-white">{athlete.name}</td>
                                <td className="py-3 text-gray-300">{athlete.sport}</td>
                                <td className="py-3 text-right text-white">{athlete.followers}</td>
                                <td className="py-3 text-right text-[#3B9FD9] font-semibold">{athlete.engagement}</td>
                                <td className="py-3 text-center">
                                  {athlete.sponsorships === 0 ? (
                                    <span className="text-red-400 font-bold">{athlete.sponsorships}</span>
                                  ) : (
                                    <span className="text-white">{athlete.sponsorships}</span>
                                  )}
                                </td>
                                <td className="py-3 text-right text-[#3B9FD9] font-semibold">{athlete.brandMatches}</td>
                                <td className="py-3 text-gray-300 text-sm">{athlete.recommendation}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === 'teams' && (
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Underutilized Teams</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="text-left text-gray-400 pb-2 font-semibold">Team</th>
                              <th className="text-right text-gray-400 pb-2 font-semibold">Followers</th>
                              <th className="text-right text-gray-400 pb-2 font-semibold">Engagement</th>
                              <th className="text-center text-gray-400 pb-2 font-semibold">Current</th>
                              <th className="text-center text-gray-400 pb-2 font-semibold">Expected</th>
                              <th className="text-right text-gray-400 pb-2 font-semibold">Revenue Gap</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getTeamsForSchool(school.name).map((team, idx) => (
                              <tr key={idx} className="border-b border-white/5">
                                <td className="py-3 text-white font-semibold">{team.team}</td>
                                <td className="py-3 text-right text-white">{team.followers}</td>
                                <td className="py-3 text-right text-[#3B9FD9] font-semibold">{team.engagement}</td>
                                <td className="py-3 text-center text-red-400 font-bold">{team.currentSponsors} sponsors</td>
                                <td className="py-3 text-center text-white">{team.expectedSponsors} sponsors</td>
                                <td className="py-3 text-right text-amber-400 font-bold">{team.gap}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === 'brands' && (
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Missing Brand Partnerships</h3>
                      <p className="text-sm text-gray-400 mb-4">Brands active in your conference but not at your school</p>
                      <div className="space-y-3">
                        {getMissingBrands(school.name, school.conference).map((item, idx) => (
                          <div key={idx} className="bg-white/5 rounded-lg p-4 border border-red-500/30">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="text-base font-bold text-white mb-1">{item.brand}</div>
                                <div className="text-sm text-gray-400">{item.status}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-bold text-red-400">{item.action}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'benchmarking' && (
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Competitive Benchmarking</h3>
                      <p className="text-sm text-gray-400 mb-4">How you rank vs similar schools</p>
                      <div className="space-y-4">
                        {(() => {
                          const data = getBenchmarking(school.name, school.conference);
                          return (
                            <>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-lg p-4">
                                  <div className="text-xs text-gray-400 mb-1">Engagement Rank</div>
                                  <div className="text-2xl font-bold text-[#3B9FD9]">{data.engagementRank}</div>
                                </div>
                                <div className="bg-white/5 rounded-lg p-4">
                                  <div className="text-xs text-gray-400 mb-1">Monetization Rank</div>
                                  <div className="text-2xl font-bold text-red-400">{data.monetizationRank}</div>
                                </div>
                              </div>
                              <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-xs text-gray-400 mb-2">Top Performing Sport</div>
                                <div className="text-base font-semibold text-white">{data.topSport}</div>
                              </div>
                              <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-xs text-gray-400 mb-2">Needs Improvement</div>
                                <div className="text-base font-semibold text-white">{data.bottomSport}</div>
                              </div>
                              <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
                                <div className="flex items-start gap-3">
                                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <div className="text-sm font-bold text-amber-400 mb-1">Key Insight</div>
                                    <div className="text-sm text-gray-300">{data.insight}</div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {activeTab === 'actions' && (
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Recommended Actions</h3>
                      <p className="text-sm text-gray-400 mb-4">Priority actions with revenue upside</p>
                      <div className="space-y-3">
                        {getActions(school.name).map((item) => (
                          <div key={item.priority} className="bg-white/5 rounded-lg p-4 border-l-4 border-[#1770C0]">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#1770C0] flex items-center justify-center text-white font-bold text-sm">
                                  {item.priority}
                                </div>
                                <div className="text-base font-semibold text-white">{item.action}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-[#3B9FD9]">{item.upside}</div>
                                <div className="text-xs text-gray-400">{item.timeline}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'roadmap' && (
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Your 90-Day Roadmap</h3>
                      <p className="text-sm text-gray-400 mb-4">Week-by-week execution plan</p>
                      <div className="space-y-3">
                        {getRoadmap(school.name).map((item, idx) => (
                          <div key={idx} className="bg-white/5 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Calendar className="w-4 h-4 text-[#3B9FD9]" />
                                  <div className="text-sm font-bold text-[#3B9FD9]">{item.week}</div>
                                </div>
                                <div className="text-sm text-gray-300">{item.focus}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-base font-bold text-white">{item.expected}</div>
                                <div className="text-xs text-gray-400">Expected impact</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 bg-[#1770C0]/10 rounded-lg p-4 border border-[#1770C0]/30">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#3B9FD9] mb-1">
                            {(() => {
                              const roadmap = getRoadmap(school.name);
                              const total = roadmap.reduce((sum, item) => {
                                const value = parseInt(item.expected.replace(/[+$K]/g, ''));
                                return sum + value;
                              }, 0);
                              return `+$${total}K`;
                            })()}
                          </div>
                          <div className="text-xs text-gray-400">Total 90-day impact</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
