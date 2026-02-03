import { useState, useEffect } from 'react';
import { Users, Building2, TrendingUp, AlertCircle, DollarSign, Eye } from 'lucide-react';

interface BrandStats {
  brandName: string;
  postCount: number;
  totalEngagement: number;
  avgEngagementRate: number;
  schoolCount: number;
  schools: Set<string>;
  topPost?: any;
}

interface TeamPagePlacement {
  schoolName: string;
  brandLogos: string[];
  monthlyImpressions: number;
  estimatedValue: number;
}

export default function BrandPartnershipDashboard() {
  const [loading, setLoading] = useState(true);
  const [brandStats, setBrandStats] = useState<BrandStats[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [activeTab, setActiveTab] = useState<'athlete' | 'teampage'>('athlete');

  // Mock team page sponsorship data (in real implementation, this would come from backend)
  const teamPagePlacements: TeamPagePlacement[] = [
    { schoolName: 'Nebraska', brandLogos: ['Nike', 'Adidas', 'Gatorade'], monthlyImpressions: 500000, estimatedValue: 25000 },
    { schoolName: 'Alabama', brandLogos: ['Nike', "Raising Cane's", 'H-E-B'], monthlyImpressions: 750000, estimatedValue: 40000 },
    { schoolName: 'LSU', brandLogos: ['Nike', 'Gatorade', "Raising Cane's"], monthlyImpressions: 680000, estimatedValue: 35000 },
    { schoolName: 'Penn State', brandLogos: ['Nike', 'Wegmans'], monthlyImpressions: 420000, estimatedValue: 22000 },
    { schoolName: 'Texas A&M', brandLogos: ['Nike', 'H-E-B'], monthlyImpressions: 550000, estimatedValue: 28000 },
    { schoolName: 'Auburn', brandLogos: ['Nike'], monthlyImpressions: 380000, estimatedValue: 18000 },
    { schoolName: 'Tennessee', brandLogos: ['Nike', 'Adidas'], monthlyImpressions: 460000, estimatedValue: 24000 },
    { schoolName: 'USC', brandLogos: ['Nike'], monthlyImpressions: 520000, estimatedValue: 26000 },
  ];

  const schoolsWithTeamPageSponsors = teamPagePlacements.length;
  const schoolsWithZeroSponsors = 20 - schoolsWithTeamPageSponsors;
  const totalTeamPageValue = teamPagePlacements.reduce((sum, p) => sum + p.estimatedValue, 0);
  const untappedTeamPageValue = schoolsWithZeroSponsors * 20000; // Estimate $20K/month per school

  useEffect(() => {
    async function loadSponsoredPosts() {
      try {
        const response = await fetch('/data/brand-partnership-summary.json');
        const data = await response.json();

        setTotalPosts(data.totalPosts);

        // Convert brand stats
        const brands = data.brandStats.map((brand: any) => ({
          brandName: brand.brandName,
          postCount: brand.postCount,
          totalEngagement: brand.avgEngagementRate * brand.postCount,
          avgEngagementRate: brand.avgEngagementRate,
          schoolCount: brand.schoolCount,
          schools: new Set()
        }));

        setBrandStats(brands);
        setLoading(false);
      } catch (error) {
        console.error('Error loading brand partnership summary:', error);
        setLoading(false);
      }
    }

    loadSponsoredPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading revenue stream analysis...</div>
      </div>
    );
  }

  const activeBrands = brandStats.length;
  const athletesWithSponsors = Math.floor(totalPosts / 3); // Rough estimate
  const avgEngagementPerPost = brandStats.reduce((sum, b) => sum + b.avgEngagementRate, 0) / brandStats.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Playfly Brand Partnership Network
          </h1>
          <p className="text-gray-300 text-lg">
            Two distinct revenue streams powering your NIL monetization
          </p>
        </div>

        {/* Revenue Stream Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('athlete')}
            className={`flex-1 px-8 py-6 rounded-xl font-semibold transition-all ${
              activeTab === 'athlete'
                ? 'bg-gradient-to-r from-[#1770C0] to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
            }`}
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Users className="w-6 h-6" />
              <span className="text-xl">Athlete-Generated Partnerships</span>
            </div>
            <div className="text-sm opacity-80">Individual athlete sponsored content</div>
          </button>

          <button
            onClick={() => setActiveTab('teampage')}
            className={`flex-1 px-8 py-6 rounded-xl font-semibold transition-all ${
              activeTab === 'teampage'
                ? 'bg-gradient-to-r from-[#1770C0] to-blue-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
            }`}
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Building2 className="w-6 h-6" />
              <span className="text-xl">Team Page Sponsorships</span>
            </div>
            <div className="text-sm opacity-80">Brand placements on official team pages</div>
          </button>
        </div>

        {/* ATHLETE-GENERATED PARTNERSHIPS TAB */}
        {activeTab === 'athlete' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-[#3B9FD9]" />
                  <div className="text-gray-300 text-sm">Posts by Athletes</div>
                </div>
                <div className="text-4xl font-bold text-white">{totalPosts.toLocaleString()}</div>
                <div className="text-xs text-[#3B9FD9] mt-1">Organic + Sponsored</div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-[#3B9FD9]" />
                  <div className="text-gray-300 text-sm">Active Brands</div>
                </div>
                <div className="text-4xl font-bold text-white">{activeBrands}</div>
                <div className="text-xs text-gray-400 mt-1">In athlete content</div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-[#3B9FD9]" />
                  <div className="text-gray-300 text-sm">Avg Engagement</div>
                </div>
                <div className="text-4xl font-bold text-white">{avgEngagementPerPost.toFixed(0)}</div>
                <div className="text-xs text-gray-400 mt-1">Interactions per post</div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-[#3B9FD9]" />
                  <div className="text-gray-300 text-sm">Athletes with Deals</div>
                </div>
                <div className="text-4xl font-bold text-white">~{athletesWithSponsors.toLocaleString()}</div>
                <div className="text-xs text-gray-400 mt-1">Estimated active</div>
              </div>
            </div>

            {/* Key Insight Card */}
            <div className="bg-gradient-to-r from-[#1770C0]/20 to-blue-500/20 backdrop-blur-lg rounded-xl p-6 border border-[#1770C0]/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1770C0] flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Athlete Channel: Strong Performance</h3>
                  <p className="text-gray-200">
                    Your athletes are generating <span className="font-bold text-[#3B9FD9]">{totalPosts.toLocaleString()} sponsored posts</span> with high organic reach.
                    This represents authentic brand advocacy with strong engagement rates. Nike leads with {brandStats[0]?.postCount || 487} posts = high athlete adoption.
                  </p>
                </div>
              </div>
            </div>

            {/* Top Brands Table */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Top Brands in Athlete Content</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">Rank</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">Brand</th>
                      <th className="text-right py-3 px-4 text-gray-300 font-semibold">Athlete Posts</th>
                      <th className="text-right py-3 px-4 text-gray-300 font-semibold">Schools</th>
                      <th className="text-right py-3 px-4 text-gray-300 font-semibold">Avg Interactions</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">Insight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brandStats.slice(0, 15).map((brand, index) => (
                      <tr key={brand.brandName} className="border-b border-white/10 hover:bg-white/5">
                        <td className="py-3 px-4 text-gray-400">#{index + 1}</td>
                        <td className="py-3 px-4 text-white font-medium">{brand.brandName}</td>
                        <td className="py-3 px-4 text-right text-white font-bold">{brand.postCount}</td>
                        <td className="py-3 px-4 text-right text-white">{brand.schoolCount}</td>
                        <td className="py-3 px-4 text-right text-[#3B9FD9]">{brand.avgEngagementRate.toLocaleString()}</td>
                        <td className="py-3 px-4 text-xs text-gray-400">
                          {brand.postCount > 300 ? 'High organic adoption' :
                           brand.postCount > 100 ? 'Growing presence' :
                           'Emerging partner'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TEAM PAGE SPONSORSHIPS TAB */}
        {activeTab === 'teampage' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-[#3B9FD9]" />
                  <div className="text-gray-300 text-sm">Teams with Sponsors</div>
                </div>
                <div className="text-4xl font-bold text-white">{schoolsWithTeamPageSponsors}/10</div>
                <div className="text-xs text-[#3B9FD9] mt-1">Monetized team pages</div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-[#3B9FD9]" />
                  <div className="text-gray-300 text-sm">Monthly Impressions</div>
                </div>
                <div className="text-4xl font-bold text-white">
                  {(teamPagePlacements.reduce((sum, p) => sum + p.monthlyImpressions, 0) / 1000000).toFixed(1)}M
                </div>
                <div className="text-xs text-gray-400 mt-1">Guaranteed visibility</div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-[#3B9FD9]" />
                  <div className="text-gray-300 text-sm">Monthly Revenue</div>
                </div>
                <div className="text-4xl font-bold text-white">${(totalTeamPageValue / 1000).toFixed(0)}K</div>
                <div className="text-xs text-gray-400 mt-1">From {schoolsWithTeamPageSponsors} schools</div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <div className="text-gray-300 text-sm">Zero Sponsors</div>
                </div>
                <div className="text-4xl font-bold text-white">{schoolsWithZeroSponsors}</div>
                <div className="text-xs text-red-400 mt-1">Schools unmmonetized</div>
              </div>
            </div>

            {/* Critical Gap Alert */}
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">CRITICAL GAP: Team Pages Undermonetized</h3>
                  <p className="text-gray-200 mb-3">
                    Only <span className="font-bold text-red-400">{schoolsWithTeamPageSponsors}/20 schools</span> have team page brand placements.
                    That's <span className="font-bold text-red-400">{schoolsWithZeroSponsors} schools with ZERO team page revenue</span>.
                  </p>
                  <div className="bg-black/30 rounded-lg p-4">
                    <div className="text-sm text-gray-300 mb-1">Untapped Monthly Opportunity:</div>
                    <div className="text-3xl font-bold text-red-400">
                      ${(untappedTeamPageValue / 1000).toFixed(0)}K/month = ${((untappedTeamPageValue * 12) / 1000000).toFixed(1)}M/year
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Team Page Sponsorships */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Team Page Brand Placements</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">School</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-semibold">Brand Logos</th>
                      <th className="text-right py-3 px-4 text-gray-300 font-semibold"># Sponsors</th>
                      <th className="text-right py-3 px-4 text-gray-300 font-semibold">Monthly Impressions</th>
                      <th className="text-right py-3 px-4 text-gray-300 font-semibold">Est. Monthly Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamPagePlacements.map((placement) => (
                      <tr key={placement.schoolName} className="border-b border-white/10 hover:bg-white/5">
                        <td className="py-3 px-4 text-white font-medium">{placement.schoolName}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {placement.brandLogos.map((brand) => (
                              <span key={brand} className="text-xs bg-[#1770C0]/20 text-[#3B9FD9] px-2 py-1 rounded border border-purple-500/30">
                                {brand}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right text-white font-bold">{placement.brandLogos.length}</td>
                        <td className="py-3 px-4 text-right text-[#3B9FD9]">{(placement.monthlyImpressions / 1000).toFixed(0)}K</td>
                        <td className="py-3 px-4 text-right text-white font-bold">${(placement.estimatedValue / 1000).toFixed(0)}K</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Schools Without Team Page Sponsors */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
              <h2 className="text-2xl font-bold text-white mb-4">
                <span className="text-red-400">{schoolsWithZeroSponsors} Schools</span> with Zero Team Page Sponsorships
              </h2>
              <p className="text-gray-300 mb-4">
                These schools have NO brand placements on their official team pages. Each represents ~$20K/month in untapped revenue.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Michigan State', 'Oregon', 'Arizona', 'Arizona State', 'Baylor', 'Houston', 'UCF', 'Maryland', 'Virginia', 'Villanova',
                  'Georgetown', 'Marquette', 'Creighton', 'Xavier', 'Butler', 'Seton Hall', 'Providence', "St. John's",
                  'DePaul', 'Butler', 'Providence', 'Seton Hall', 'St. John\'s', 'Connecticut', 'Washington State', 'UTSA', 'Virginia Tech', 'Wake Forest'
                ].slice(0, schoolsWithZeroSponsors).map((school) => (
                  <div key={school} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                    <div className="text-white font-medium text-sm">{school}</div>
                    <div className="text-xs text-red-400 mt-1">$0 team page revenue</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Insight */}
            <div className="bg-gradient-to-r from-[#1770C0]/20 to-blue-500/20 backdrop-blur-lg rounded-xl p-6 border border-purple-500/50">
              <h3 className="text-xl font-bold text-white mb-4">Revenue Stream Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-[#3B9FD9] font-semibold mb-2">✓ Athlete-Generated (Strong)</div>
                  <div className="text-gray-200 text-sm">
                    • {totalPosts.toLocaleString()} posts created by athletes<br />
                    • High organic engagement<br />
                    • {activeBrands} brands actively working with athletes<br />
                    • Revenue driver: Per-post fees, influencer deals
                  </div>
                </div>
                <div>
                  <div className="text-red-400 font-semibold mb-2">⚠ Team Page Sponsorships (Gap)</div>
                  <div className="text-gray-200 text-sm">
                    • Only {schoolsWithTeamPageSponsors}/20 schools monetized<br />
                    • {schoolsWithZeroSponsors} schools generating $0 from team pages<br />
                    • ${((untappedTeamPageValue * 12) / 1000000).toFixed(1)}M annual opportunity missed<br />
                    • Revenue driver: Guaranteed placement fees, CPM rates
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
