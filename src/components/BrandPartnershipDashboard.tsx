import { useState, useEffect } from 'react';
import { Users, Building2, TrendingUp, DollarSign, Eye, Download } from 'lucide-react';
import { ExportModal } from './ExportModal';
import { exportToPDF, exportToCSV, exportToExcel, ExportData } from '../utils/exportUtils';

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
}

export default function BrandPartnershipDashboard() {
  const [loading, setLoading] = useState(true);
  const [brandStats, setBrandStats] = useState<BrandStats[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [activeTab, setActiveTab] = useState<'athlete' | 'teampage'>('athlete');
  const [showExportModal, setShowExportModal] = useState(false);

  // Team page sponsorship data - actual brand placements
  const teamPagePlacements: TeamPagePlacement[] = [
    { schoolName: 'Nebraska', brandLogos: ['Nike', 'Adidas', 'Gatorade'] },
    { schoolName: 'Alabama', brandLogos: ['Nike', "Raising Cane's", 'H-E-B'] },
    { schoolName: 'LSU', brandLogos: ['Nike', 'Gatorade', "Raising Cane's"] },
    { schoolName: 'Penn State', brandLogos: ['Nike', 'Wegmans'] },
    { schoolName: 'Texas A&M', brandLogos: ['Nike', 'H-E-B'] },
    { schoolName: 'Auburn', brandLogos: ['Nike'] },
    { schoolName: 'Tennessee', brandLogos: ['Nike', 'Adidas'] },
    { schoolName: 'USC', brandLogos: ['Nike'] },
  ];

  const schoolsWithTeamPageSponsors = teamPagePlacements.length;
  const totalBrandLogos = teamPagePlacements.reduce((sum, p) => sum + p.brandLogos.length, 0);

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

  const handleExport = async (format: 'pdf' | 'csv' | 'excel') => {
    const exportData: ExportData = {
      reportName: 'Brand Partnership Network',
      schoolName: 'Playfly Network',
      dateGenerated: new Date().toLocaleString(),
      metrics: [
        { label: 'Total Posts', value: totalPosts.toLocaleString() },
        { label: 'Active Brands', value: activeBrands },
        { label: 'Athletes with Sponsors', value: athletesWithSponsors.toLocaleString() },
        { label: 'Avg Engagement Per Post', value: `${avgEngagementPerPost.toFixed(1)}%` },
        { label: 'Schools with Team Page Sponsors', value: schoolsWithTeamPageSponsors },
        { label: 'Total Brand Placements', value: totalBrandLogos },
      ],
      tables: [
        {
          title: 'Brand Performance - Athlete Channel',
          headers: ['Brand', 'Posts', 'Schools Active', 'Avg Engagement Rate'],
          rows: brandStats.map(brand => [
            brand.brandName,
            brand.postCount,
            brand.schoolCount,
            `${brand.avgEngagementRate.toFixed(1)}%`,
          ]),
        },
        {
          title: 'Team Page Sponsorships',
          headers: ['School', 'Brand Logos', '# Sponsors'],
          rows: teamPagePlacements.map(placement => [
            placement.schoolName,
            placement.brandLogos.join(', '),
            placement.brandLogos.length,
          ]),
        },
      ],
    };

    try {
      if (format === 'pdf') {
        await exportToPDF(exportData);
      } else if (format === 'csv') {
        await exportToCSV(exportData);
      } else if (format === 'excel') {
        await exportToExcel(exportData);
      }
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    }
  };

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
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Playfly Brand Partnership Network
            </h1>
            <p className="text-gray-300 text-lg">
              Your Campaign Performance Across Our Network
            </p>
          </div>
          <button
            onClick={() => setShowExportModal(true)}
            className="bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-[#091831] px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-[#3B9FD9]" />
                  <div className="text-gray-300 text-sm">Schools with Placements</div>
                </div>
                <div className="text-4xl font-bold text-white">{schoolsWithTeamPageSponsors}</div>
                <div className="text-xs text-[#3B9FD9] mt-1">Team pages with brand logos</div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-[#3B9FD9]" />
                  <div className="text-gray-300 text-sm">Total Brand Placements</div>
                </div>
                <div className="text-4xl font-bold text-white">{totalBrandLogos}</div>
                <div className="text-xs text-gray-400 mt-1">Across all team pages</div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-[#3B9FD9]" />
                  <div className="text-gray-300 text-sm">Avg Brands per Team</div>
                </div>
                <div className="text-4xl font-bold text-white">{(totalBrandLogos / schoolsWithTeamPageSponsors).toFixed(1)}</div>
                <div className="text-xs text-[#3B9FD9] mt-1">Brand density</div>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Comparison Insight */}
            <div className="bg-gradient-to-r from-[#1770C0]/20 to-blue-500/20 backdrop-blur-lg rounded-xl p-6 border border-purple-500/50">
              <h3 className="text-xl font-bold text-white mb-4">Channel Performance</h3>
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
                  <div className="text-[#3B9FD9] font-semibold mb-2">✓ Team Page Sponsorships (Growing)</div>
                  <div className="text-gray-200 text-sm">
                    • {schoolsWithTeamPageSponsors} schools with active brand placements<br />
                    • {totalBrandLogos} total brand logos visible on team pages<br />
                    • Average of {(totalBrandLogos / schoolsWithTeamPageSponsors).toFixed(1)} brands per team page<br />
                    • Revenue driver: Guaranteed placement fees, CPM rates
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
        reportName="Playfly Brand Partnership Network"
      />
    </div>
  );
}
