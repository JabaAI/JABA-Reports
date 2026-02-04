import { useState } from 'react';
import {
  TrendingUp, TrendingDown, Download, Share2, ArrowRight,
  ChevronDown, ChevronUp, Info, Filter, Search, Calendar,
  Award, Target, Users, BarChart3, FileText
} from 'lucide-react';

/**
 * PLAYFLY IP IMPACT REPORT
 *
 * Network-wide intellectual property performance analysis across 20 schools
 * Shows how IP signals (Logo, Collaboration, Mention) impact engagement and brand deals
 */

interface IPOverviewMetrics {
  totalEMV: number;
  totalLikes: number;
  totalComments: number;
  adoptionRate: number;
  averageLift: number;
  postsWithIP: number;
  totalPosts: number;
}

interface IPSignal {
  type: 'Logo' | 'Collaboration' | 'Mention';
  posts: number;
  emv: number;
  engagementLift: number;
  avgEngagement: number;
  emvLift: number;
  trend: number;
  insight?: string;
}

interface SchoolIPData {
  name: string;
  sportCount: number;
  athleteCount: number;
  ipAdoptionRate: number;
  avgEngagement: number;
  postsWithIP: number;
  avgEngagementLift: number;
  topIPSignal: 'Logo' | 'Collaboration' | 'Mention';
  conference: string;
  logoPercent: number;
  collabPercent: number;
  mentionPercent: number;
  topAthlete?: string;
  topAthleteEngagement?: number;
}

interface BrandData {
  name: string;
  schoolsActive: number;
  athleteCount: number;
  posts: number;
  avgLift: number;
}

interface PlayflyIPReportProps {
  onBack?: () => void;
}

export function PlayflyIPReport({ onBack }: PlayflyIPReportProps) {
  const [timeRange, setTimeRange] = useState<7 | 14 | 30 | 90>(14);
  const [selectedIPSignal, setSelectedIPSignal] = useState<'Logo' | 'Collaboration' | 'Mention'>('Logo');
  const [expandedSchool, setExpandedSchool] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof SchoolIPData>('ipAdoptionRate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [conferenceFilter, setConferenceFilter] = useState<string>('All');
  const [schoolSearchTerm, setSchoolSearchTerm] = useState('');
  const [compareSchool1, setCompareSchool1] = useState<string>('');
  const [compareSchool2, setCompareSchool2] = useState<string>('');

  // Mock data - in production this would come from API
  const overviewMetrics: IPOverviewMetrics = {
    totalEMV: 66200000,
    totalLikes: 4800000,
    totalComments: 210300,
    adoptionRate: 57.5,
    averageLift: 17.8,
    postsWithIP: 115,
    totalPosts: 200
  };

  const ipSignals: IPSignal[] = [
    {
      type: 'Logo',
      posts: 74,
      emv: 591,
      engagementLift: 21.2,
      avgEngagement: 8.3,
      emvLift: 0.7,
      trend: -1.8
    },
    {
      type: 'Collaboration',
      posts: 71,
      emv: 591,
      engagementLift: 17.1,
      avgEngagement: 8.1,
      emvLift: 0.5,
      trend: -2.3,
      insight: 'Collaboration posts outperform other IP modes by 23% in engagement. Consider increasing collaboration content with top-performing brands.'
    },
    {
      type: 'Mention',
      posts: 71,
      emv: 548,
      engagementLift: 15.8,
      avgEngagement: 8.1,
      emvLift: 18.3,
      trend: -10.0
    }
  ];

  const schoolData: SchoolIPData[] = [
    { name: 'Penn State', sportCount: 26, athleteCount: 565, ipAdoptionRate: 62, avgEngagement: 7.2, postsWithIP: 47, avgEngagementLift: 19.3, topIPSignal: 'Logo', conference: 'Big Ten', logoPercent: 35, collabPercent: 32, mentionPercent: 27, topAthlete: 'Drew Allar', topAthleteEngagement: 9.2 },
    { name: 'LSU', sportCount: 16, athleteCount: 487, ipAdoptionRate: 58, avgEngagement: 8.1, postsWithIP: 52, avgEngagementLift: 18.7, topIPSignal: 'Logo', conference: 'SEC', logoPercent: 38, collabPercent: 30, mentionPercent: 25, topAthlete: 'Livvy Dunne', topAthleteEngagement: 12.4 },
    { name: 'Nebraska', sportCount: 19, athleteCount: 423, ipAdoptionRate: 55, avgEngagement: 6.8, postsWithIP: 38, avgEngagementLift: 17.2, topIPSignal: 'Collaboration', conference: 'Big Ten', logoPercent: 30, collabPercent: 38, mentionPercent: 22, topAthlete: 'Dylan Raiola', topAthleteEngagement: 8.9 },
    { name: 'Michigan State', sportCount: 10, athleteCount: 312, ipAdoptionRate: 52, avgEngagement: 8.1, postsWithIP: 41, avgEngagementLift: 16.8, topIPSignal: 'Logo', conference: 'Big Ten', logoPercent: 36, collabPercent: 28, mentionPercent: 24, topAthlete: 'Jaden Akins', topAthleteEngagement: 7.6 },
    { name: 'Baylor', sportCount: 16, athleteCount: 398, ipAdoptionRate: 51, avgEngagement: 7.4, postsWithIP: 44, avgEngagementLift: 16.2, topIPSignal: 'Mention', conference: 'Big 12', logoPercent: 28, collabPercent: 30, mentionPercent: 34, topAthlete: 'Sarah Andrews', topAthleteEngagement: 8.3 },
    { name: 'Auburn', sportCount: 16, athleteCount: 356, ipAdoptionRate: 49, avgEngagement: 6.9, postsWithIP: 39, avgEngagementLift: 15.6, topIPSignal: 'Logo', conference: 'SEC', logoPercent: 34, collabPercent: 29, mentionPercent: 26, topAthlete: 'Johni Broome', topAthleteEngagement: 7.8 },
    { name: 'USC', sportCount: 17, athleteCount: 445, ipAdoptionRate: 48, avgEngagement: 7.6, postsWithIP: 42, avgEngagementLift: 15.3, topIPSignal: 'Collaboration', conference: 'Big Ten', logoPercent: 29, collabPercent: 35, mentionPercent: 24, topAthlete: 'JuJu Watkins', topAthleteEngagement: 11.2 },
    { name: 'Texas A&M', sportCount: 15, athleteCount: 367, ipAdoptionRate: 46, avgEngagement: 7.1, postsWithIP: 35, avgEngagementLift: 14.9, topIPSignal: 'Logo', conference: 'SEC', logoPercent: 33, collabPercent: 27, mentionPercent: 26, topAthlete: 'Wade Taylor', topAthleteEngagement: 8.1 },
    { name: 'Maryland', sportCount: 20, athleteCount: 289, ipAdoptionRate: 44, avgEngagement: 10.3, postsWithIP: 33, avgEngagementLift: 14.2, topIPSignal: 'Mention', conference: 'Big Ten', logoPercent: 26, collabPercent: 28, mentionPercent: 36, topAthlete: 'Shyanne Sellers', topAthleteEngagement: 9.7 },
    { name: 'UCF', sportCount: 10, athleteCount: 278, ipAdoptionRate: 38, avgEngagement: 6.4, postsWithIP: 28, avgEngagementLift: 12.8, topIPSignal: 'Logo', conference: 'Big 12', logoPercent: 32, collabPercent: 24, mentionPercent: 22, topAthlete: 'RJ Harvey', topAthleteEngagement: 7.2 }
  ];

  const brandData: BrandData[] = [
    { name: 'Nike', schoolsActive: 12, athleteCount: 87, posts: 124, avgLift: 18.3 },
    { name: 'Gatorade', schoolsActive: 8, athleteCount: 42, posts: 67, avgLift: 14.2 },
    { name: "Raising Cane's", schoolsActive: 6, athleteCount: 31, posts: 45, avgLift: 11.8 },
    { name: 'Adidas', schoolsActive: 7, athleteCount: 38, posts: 52, avgLift: 13.5 },
    { name: 'Wegmans', schoolsActive: 4, athleteCount: 24, posts: 34, avgLift: 10.2 }
  ];

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (num: number): string => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num}`;
  };

  const handleSort = (column: keyof SchoolIPData) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedSchools = schoolData
    .filter(school =>
      (conferenceFilter === 'All' || school.conference === conferenceFilter) &&
      school.name.toLowerCase().includes(schoolSearchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * multiplier;
      }
      return String(aVal).localeCompare(String(bVal)) * multiplier;
    });

  const selectedSignalData = ipSignals.find(s => s.type === selectedIPSignal)!;
  const soloEngagement = 6.9;

  const getAdoptionColor = (rate: number): string => {
    if (rate >= 60) return 'bg-green-500/10 text-green-400';
    if (rate >= 40) return 'bg-yellow-500/10 text-yellow-400';
    return 'bg-red-500/10 text-red-400';
  };

  return (
    <div className="min-h-screen bg-[#091831] text-white">
      {/* Header */}
      <div className="bg-black/40 border-b border-[#1770C0]/30 sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              {onBack && (
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                  Back
                </button>
              )}
              <div>
                <h1 className="text-3xl font-bold text-white">PLAYFLY IP REPORT</h1>
                <p className="text-white/60 text-sm mt-1">Network-Wide Intellectual Property Performance Analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(Number(e.target.value) as 7 | 14 | 30 | 90)}
                className="bg-[#1770C0] text-white px-4 py-2 rounded-lg font-semibold text-sm border-2 border-[#1770C0] hover:bg-[#1770C0]/80 transition-colors"
              >
                <option value={7}>Last 7 days</option>
                <option value={14}>Last 14 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </select>
              <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 border border-white/20 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-[#091831] px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
          <div className="text-xs text-white/40">
            Generated: {new Date().toLocaleString()} • {timeRange} day analysis
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-8 space-y-12">
        {/* JABA Hero Section - Data-Driven */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8">
          {/* Dark gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900" />

          {/* Content */}
          <div className="relative z-10 p-12">
            {/* Headline with highlighted stat */}
            <h2 className="text-5xl font-bold mb-8 leading-tight">
              <span className="text-white">JABA analyzed </span>
              <span className="text-[#3B9FD9] bg-[#1770C0]/20 px-3 py-1 rounded-lg">40,774 posts</span>
              <span className="text-white"> and </span>
              <span className="text-[#3B9FD9] bg-[#1770C0]/20 px-3 py-1 rounded-lg">2,487+ athletes</span>
              <span className="text-white"> in your network to find hidden opportunities.</span>
            </h2>

            {/* Accent bar */}
            <div className="h-1 w-40 bg-gradient-to-r from-[#3B9FD9] to-blue-500 mb-8" />

            {/* CTA / Value prop */}
            <div className="bg-white/10 backdrop-blur-sm border-2 border-[#1770C0]/50 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#1770C0] to-blue-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-white">
                  <div className="font-bold text-xl mb-1">JABA identifies, matches, and manages these opportunities automatically</div>
                  <div className="text-gray-300 text-sm">Real-time campaign management across your entire network</div>
                </div>
              </div>
            </div>

            {/* Transition arrow */}
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-2 text-[#3B9FD9] font-semibold text-lg">
                <span>Here's the full picture</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: IP IMPACT OVERVIEW */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-[#1770C0]" />
            <h2 className="text-2xl font-bold">IP Impact Overview</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Total EMV */}
            <div className="bg-black/40 border-2 border-[#1770C0] rounded-xl p-6 hover:border-[#FFFF00] transition-all cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-5 h-5 text-[#1770C0] group-hover:text-[#FFFF00] transition-colors" />
                <Info className="w-4 h-4 text-white/30" />
              </div>
              <div className="text-4xl font-bold text-[#FFFF00] mb-1">
                {formatCurrency(overviewMetrics.totalEMV)}
              </div>
              <div className="text-xs text-white/60">Total EMV</div>
              <div className="text-xs text-white/40 mt-1">Earned Media Value from IP-driven content</div>
            </div>

            {/* Total Likes */}
            <div className="bg-black/40 border-2 border-[#1770C0]/50 rounded-xl p-6 hover:border-[#1770C0] transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-5 h-5 text-[#1770C0]" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">
                {formatNumber(overviewMetrics.totalLikes)}
              </div>
              <div className="text-xs text-white/60">Total Likes</div>
              <div className="text-xs text-white/40 mt-1">Engagement from content with IP signals</div>
            </div>

            {/* Total Comments */}
            <div className="bg-black/40 border-2 border-[#1770C0]/50 rounded-xl p-6 hover:border-[#1770C0] transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-[#1770C0]" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">
                {formatNumber(overviewMetrics.totalComments)}
              </div>
              <div className="text-xs text-white/60">Total Comments</div>
              <div className="text-xs text-white/40 mt-1">Total comment interactions</div>
            </div>

            {/* IP Adoption Rate */}
            <div className="bg-black/40 border-2 border-[#1770C0]/50 rounded-xl p-6 hover:border-[#1770C0] transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-[#1770C0]" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">
                {overviewMetrics.adoptionRate}%
              </div>
              <div className="text-xs text-white/60">IP Adoption Rate</div>
              <div className="text-xs text-white/40 mt-1">% of posts using IP signals</div>
              <div className="mt-3 bg-white/10 rounded-full h-2">
                <div
                  className="bg-[#1770C0] h-2 rounded-full transition-all"
                  style={{ width: `${overviewMetrics.adoptionRate}%` }}
                />
              </div>
            </div>

            {/* Average Lift */}
            <div className="bg-black/40 border-2 border-[#1770C0]/50 rounded-xl p-6 hover:border-[#1770C0] transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-4xl font-bold text-green-400 mb-1">
                +{overviewMetrics.averageLift}%
              </div>
              <div className="text-xs text-white/60">Average Lift</div>
              <div className="text-xs text-white/40 mt-1">vs posts without IP</div>
            </div>

            {/* Posts with IP */}
            <div className="bg-black/40 border-2 border-[#1770C0]/50 rounded-xl p-6 hover:border-[#1770C0] transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-5 h-5 text-[#1770C0]" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">
                {overviewMetrics.postsWithIP}
              </div>
              <div className="text-xs text-white/60">Posts with IP</div>
              <div className="text-xs text-white/40 mt-1">of {overviewMetrics.totalPosts} total posts</div>
            </div>
          </div>
        </section>

        {/* SECTION 2: IP SIGNAL PERFORMANCE */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-[#1770C0]" />
            <h2 className="text-2xl font-bold">IP Signal Performance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ipSignals.map((signal) => (
              <div
                key={signal.type}
                onClick={() => setSelectedIPSignal(signal.type)}
                className={`bg-black/40 rounded-xl p-6 cursor-pointer transition-all border-2 ${
                  selectedIPSignal === signal.type
                    ? 'border-[#FFFF00] shadow-lg shadow-[#FFFF00]/20'
                    : 'border-[#1770C0]/30 hover:border-[#1770C0]'
                }`}
              >
                {/* Header with Badge */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{signal.type}</h3>
                  {signal.type === 'Logo' && (
                    <span className="bg-[#FFFF00] text-[#091831] px-3 py-1 rounded-full text-xs font-bold">
                      BEST
                    </span>
                  )}
                </div>

                {/* Engagement Lift - Large Display */}
                <div className="mb-4">
                  <div className="text-4xl font-bold text-green-400 flex items-center gap-2">
                    +{signal.engagementLift}%
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="text-xs text-white/60 mt-1">Engagement Lift</div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-white/60 mb-1">Posts</div>
                    <div className="text-lg font-bold text-white">{signal.posts}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-white/60 mb-1">EMV</div>
                    <div className="text-lg font-bold text-white">${signal.emv}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-white/60 mb-1">Avg Engagement</div>
                    <div className="text-lg font-bold text-white">{signal.avgEngagement}%</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-white/60 mb-1">EMV Lift</div>
                    <div className="text-lg font-bold text-white">+{signal.emvLift}%</div>
                  </div>
                </div>

                {/* Trend Indicator */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-xs text-white/60">Trend:</div>
                  <div className={`flex items-center gap-1 ${signal.trend < 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {signal.trend < 0 ? (
                      <TrendingDown className="w-4 h-4" />
                    ) : (
                      <TrendingUp className="w-4 h-4" />
                    )}
                    <span className="text-sm font-semibold">{signal.trend}%</span>
                  </div>
                </div>

                {/* AI Insight Box */}
                {signal.insight && (
                  <div className="bg-[#FFFF00]/10 border border-[#FFFF00]/30 rounded-lg p-3">
                    <div className="text-xs text-[#FFFF00] font-semibold mb-1 flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      AI Insight
                    </div>
                    <div className="text-xs text-white/80">{signal.insight}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: WITH vs WITHOUT IP COMPARISON */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-[#1770C0]" />
            <h2 className="text-2xl font-bold">With vs Without IP Comparison</h2>
            <div className="ml-auto flex items-center gap-3">
              <span className="text-sm text-white/60">Selected Signal:</span>
              <span className="text-sm font-bold text-[#FFFF00]">{selectedIPSignal}</span>
            </div>
          </div>

          <div className="bg-black/40 border-2 border-[#1770C0]/30 rounded-xl p-8">
            <div className="grid grid-cols-3 gap-8 items-center">
              {/* WITHOUT IP (Solo) */}
              <div className="text-center">
                <div className="text-sm text-white/60 mb-4 uppercase tracking-wide">Without IP</div>
                <div className="bg-white/5 rounded-xl p-8 border border-white/20">
                  <div className="text-xs text-white/40 mb-2">Solo Posts</div>
                  <div className="text-5xl font-bold text-white/60 mb-2">{soloEngagement}%</div>
                  <div className="text-xs text-white/40">Engagement Rate</div>
                  <div className="mt-4 text-sm text-white/60">Post Count: 120</div>
                </div>
              </div>

              {/* THE LIFT (Center) */}
              <div className="text-center">
                <div className="flex flex-col items-center justify-center">
                  <ArrowRight className="w-12 h-12 text-[#FFFF00] mb-3" />
                  <div className="text-6xl font-bold text-[#FFFF00] mb-2">
                    +{selectedSignalData.engagementLift}%
                  </div>
                  <div className="text-lg font-semibold text-white/80 uppercase tracking-wide">
                    Engagement Lift
                  </div>
                  <div className="mt-4 text-sm text-green-400 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +{(selectedSignalData.avgEngagement - soloEngagement).toFixed(1)}% absolute gain
                  </div>
                </div>
              </div>

              {/* WITH IP */}
              <div className="text-center">
                <div className="text-sm text-white/60 mb-4 uppercase tracking-wide">With IP ({selectedIPSignal})</div>
                <div className="bg-[#1770C0]/20 rounded-xl p-8 border-2 border-[#1770C0]">
                  <div className="text-xs text-[#1770C0] mb-2 font-semibold">{selectedIPSignal} Posts</div>
                  <div className="text-5xl font-bold text-[#1770C0] mb-2">{selectedSignalData.avgEngagement}%</div>
                  <div className="text-xs text-white/60">Engagement Rate</div>
                  <div className="mt-4 text-sm text-white/80">Post Count: {selectedSignalData.posts}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: IP ENGAGEMENT GROWTH TREND */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-[#1770C0]" />
            <h2 className="text-2xl font-bold">IP Engagement Growth Trend</h2>
            <div className="ml-auto text-sm text-white/60">
              {timeRange} Day Trend
            </div>
          </div>

          <div className="bg-black/40 border-2 border-[#1770C0]/30 rounded-xl p-8">
            {/* Placeholder for chart - would use Recharts/Chart.js in production */}
            <div className="relative h-64 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <Calendar className="w-12 h-12 text-[#1770C0] mx-auto mb-4" />
                <div className="text-white/60">Engagement trend visualization</div>
                <div className="text-sm text-white/40 mt-2">Nov 25 - Feb 26 • Peak: ~2.0K engagement (Jan 26)</div>
              </div>
            </div>

            {/* Trend Insights */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {ipSignals.map((signal) => (
                <div key={signal.type} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-white">{signal.type}</span>
                    <div className={`flex items-center gap-1 ${signal.trend < 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {signal.trend < 0 ? (
                        <TrendingDown className="w-4 h-4" />
                      ) : (
                        <TrendingUp className="w-4 h-4" />
                      )}
                      <span className="text-sm font-bold">{signal.trend}%</span>
                    </div>
                  </div>
                  <div className="text-xs text-white/60">
                    {signal.trend < 0 ? 'Declining' : 'Growing'} trend
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: SCHOOL-BY-SCHOOL COMPARISON TABLE */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-[#1770C0]" />
            <h2 className="text-2xl font-bold">School-by-School Performance</h2>
          </div>

          {/* Filters and Search */}
          <div className="bg-black/40 border border-[#1770C0]/30 rounded-xl p-4 mb-4 flex items-center gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search schools..."
                value={schoolSearchTerm}
                onChange={(e) => setSchoolSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder-white/40 flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-white/60" />
              <select
                value={conferenceFilter}
                onChange={(e) => setConferenceFilter(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white"
              >
                <option value="All">All Conferences</option>
                <option value="Big Ten">Big Ten</option>
                <option value="SEC">SEC</option>
                <option value="Big 12">Big 12</option>
              </select>
            </div>
          </div>

          {/* School Comparison Selector */}
          <div className="bg-[#FFFF00]/10 border border-[#FFFF00]/30 rounded-xl p-4 mb-4 flex items-center gap-4">
            <span className="text-sm font-semibold text-white">Compare Schools:</span>
            <select
              value={compareSchool1}
              onChange={(e) => setCompareSchool1(e.target.value)}
              className="bg-[#1770C0] border-2 border-[#1770C0] rounded-lg px-3 py-2 text-sm text-white font-semibold"
            >
              <option value="">Select School 1</option>
              {schoolData.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>
            <span className="text-white/60">vs</span>
            <select
              value={compareSchool2}
              onChange={(e) => setCompareSchool2(e.target.value)}
              className="bg-[#FFFF00] border-2 border-[#FFFF00] rounded-lg px-3 py-2 text-sm text-[#091831] font-semibold"
            >
              <option value="">Select School 2</option>
              {schoolData.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>
            {compareSchool1 && compareSchool2 && (
              <button
                onClick={() => {
                  setCompareSchool1('');
                  setCompareSchool2('');
                }}
                className="ml-auto text-sm text-white/60 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Table */}
          <div className="bg-black/40 border-2 border-[#1770C0]/30 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#1770C0]/20 border-b-2 border-[#1770C0]">
                    {[
                      { key: 'name', label: 'School' },
                      { key: 'sportCount', label: 'Sports' },
                      { key: 'athleteCount', label: 'Athletes' },
                      { key: 'ipAdoptionRate', label: 'IP Adoption (%)' },
                      { key: 'avgEngagement', label: 'Avg Engagement (%)' },
                      { key: 'postsWithIP', label: 'Posts with IP' },
                      { key: 'avgEngagementLift', label: 'Avg Lift (%)' },
                      { key: 'topIPSignal', label: 'Top IP Signal' }
                    ].map((col) => (
                      <th
                        key={col.key}
                        onClick={() => handleSort(col.key as keyof SchoolIPData)}
                        className="text-left py-4 px-4 text-sm font-semibold text-white cursor-pointer hover:bg-[#1770C0]/30 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {col.label}
                          {sortColumn === col.key && (
                            sortDirection === 'asc' ?
                              <ChevronUp className="w-4 h-4 text-[#FFFF00]" /> :
                              <ChevronDown className="w-4 h-4 text-[#FFFF00]" />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedSchools.map((school) => {
                    const compareColor = school.name === compareSchool1 ? 'bg-[#1770C0]/20 border-l-4 border-[#1770C0]' :
                                       school.name === compareSchool2 ? 'bg-[#FFFF00]/20 border-l-4 border-[#FFFF00]' : '';

                    return (
                      <tr
                        key={school.name}
                        className={`border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer ${compareColor}`}
                        onClick={() => setExpandedSchool(expandedSchool === school.name ? null : school.name)}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {expandedSchool === school.name ? (
                              <ChevronDown className="w-4 h-4 text-[#1770C0]" />
                            ) : (
                              <ChevronUp className="w-4 h-4 rotate-90 text-white/40" />
                            )}
                            <div>
                              <div className="font-semibold text-white">{school.name}</div>
                              <div className="text-xs text-white/60">{school.conference}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-white">{school.sportCount}</td>
                        <td className="py-4 px-4 text-white">{school.athleteCount}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getAdoptionColor(school.ipAdoptionRate)}`}>
                            {school.ipAdoptionRate}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-white font-semibold">{school.avgEngagement}%</td>
                        <td className="py-4 px-4 text-white">{school.postsWithIP}</td>
                        <td className="py-4 px-4 text-green-400 font-semibold">+{school.avgEngagementLift}%</td>
                        <td className="py-4 px-4">
                          <span className="text-[#1770C0] font-semibold">{school.topIPSignal}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Expanded School Details */}
            {expandedSchool && (() => {
              const school = schoolData.find(s => s.name === expandedSchool);
              if (!school) return null;

              return (
                <div className="bg-white/5 border-t-2 border-[#1770C0] p-6">
                  <h3 className="text-lg font-bold text-white mb-4">{school.name} - IP Signal Breakdown</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* IP Signal Distribution */}
                    <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                      <div className="text-sm font-semibold text-white/80 mb-3">IP Signal Distribution</div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-white/60">Logo</span>
                            <span className="text-sm font-bold text-white">{school.logoPercent}%</span>
                          </div>
                          <div className="bg-white/10 rounded-full h-2">
                            <div className="bg-[#1770C0] h-2 rounded-full" style={{ width: `${school.logoPercent}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-white/60">Collaboration</span>
                            <span className="text-sm font-bold text-white">{school.collabPercent}%</span>
                          </div>
                          <div className="bg-white/10 rounded-full h-2">
                            <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${school.collabPercent}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-white/60">Mention</span>
                            <span className="text-sm font-bold text-white">{school.mentionPercent}%</span>
                          </div>
                          <div className="bg-white/10 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${school.mentionPercent}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Top Athlete */}
                    <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                      <div className="text-sm font-semibold text-white/80 mb-3">Top Athlete by IP Engagement</div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#1770C0] rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-white">{school.topAthlete}</div>
                          <div className="text-xs text-white/60">{school.topAthleteEngagement}% engagement</div>
                          <div className="text-xs text-[#1770C0]">6 branded posts</div>
                        </div>
                      </div>
                    </div>

                    {/* 90-Day Trend */}
                    <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                      <div className="text-sm font-semibold text-white/80 mb-3">90-Day IP Adoption Trend</div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-8 h-8 text-green-400" />
                        <div>
                          <div className="text-2xl font-bold text-green-400">+3.2%</div>
                          <div className="text-xs text-white/60">Growth in IP adoption</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* SECTION 6: BRAND DEAL DATA SUMMARY */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-[#1770C0]" />
            <h2 className="text-2xl font-bold">Brand Partnership Performance</h2>
          </div>

          {/* Top-Level Brand Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-black/40 border-2 border-[#1770C0]/50 rounded-xl p-6">
              <div className="text-sm text-white/60 mb-2">Active Brands</div>
              <div className="text-3xl font-bold text-white">152</div>
              <div className="text-xs text-white/40 mt-1">Across all 20 schools</div>
            </div>
            <div className="bg-black/40 border-2 border-[#1770C0]/50 rounded-xl p-6">
              <div className="text-sm text-white/60 mb-2">Athletes with Deals</div>
              <div className="text-3xl font-bold text-white">487</div>
              <div className="text-xs text-white/40 mt-1">Engaged in campaigns</div>
            </div>
            <div className="bg-black/40 border-2 border-[#1770C0]/50 rounded-xl p-6">
              <div className="text-sm text-white/60 mb-2">Platform Distribution</div>
              <div className="flex items-center gap-3 mt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">68%</div>
                  <div className="text-xs text-white/60">Instagram</div>
                </div>
                <div className="text-white/40">/</div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">32%</div>
                  <div className="text-xs text-white/60">TikTok</div>
                </div>
              </div>
            </div>
            <div className="bg-black/40 border-2 border-[#1770C0]/50 rounded-xl p-6">
              <div className="text-sm text-white/60 mb-2">Brand Content</div>
              <div className="text-3xl font-bold text-white">815</div>
              <div className="text-xs text-white/40 mt-1">Posts • 7.8% avg engagement</div>
            </div>
          </div>

          {/* Top Brands Leaderboard */}
          <div className="bg-black/40 border-2 border-[#1770C0]/30 rounded-xl overflow-hidden">
            <div className="bg-[#1770C0]/20 border-b-2 border-[#1770C0] p-4">
              <h3 className="font-bold text-white">Top Brands by IP Engagement</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/60">Rank</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/60">Brand</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/60">Schools Active</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/60">Athletes</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/60">Posts</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/60">Avg Lift</th>
                  </tr>
                </thead>
                <tbody>
                  {brandData.map((brand, idx) => (
                    <tr key={brand.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4">
                        <div className="w-8 h-8 bg-[#FFFF00] text-[#091831] rounded-full flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-bold text-white">{brand.name}</td>
                      <td className="py-4 px-4 text-white">{brand.schoolsActive}</td>
                      <td className="py-4 px-4 text-white">{brand.athleteCount}</td>
                      <td className="py-4 px-4 text-white">{brand.posts}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-white/10 rounded-full h-2 max-w-[100px]">
                            <div
                              className="bg-[#1770C0] h-2 rounded-full"
                              style={{ width: `${(brand.avgLift / 20) * 100}%` }}
                            />
                          </div>
                          <span className="text-green-400 font-semibold">+{brand.avgLift}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="bg-black/60 border-t border-[#1770C0]/30 py-6 mt-12">
        <div className="max-w-[1600px] mx-auto px-8 flex items-center justify-between">
          <div className="text-xs text-white/40">
            © 2026 Playfly Sports • IP Impact Report
          </div>
          <div className="text-xs text-white/40">
            Powered by JABA Analytics
          </div>
        </div>
      </div>
    </div>
  );
}
