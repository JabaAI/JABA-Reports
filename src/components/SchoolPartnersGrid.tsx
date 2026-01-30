import { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, Users, GitCompare } from 'lucide-react';
import { SchoolPartner, PlayflyPartnerTier } from '../data/playflyNetworkData';
import { SchoolPartnerCard } from './SchoolPartnerCard';
import { SchoolComparison } from './SchoolComparison';

interface SchoolPartnersGridProps {
  partners: SchoolPartner[];
}

type SortOption = 'posts' | 'engagement' | 'athletes' | 'name';
type TierFilter = 'all' | PlayflyPartnerTier;
type ConferenceFilter = 'all' | string;
type EngagementFilter = 'all' | 'high' | 'medium' | 'low';

export function SchoolPartnersGrid({ partners }: SchoolPartnersGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<TierFilter>('all');
  const [conferenceFilter, setConferenceFilter] = useState<ConferenceFilter>('all');
  const [engagementFilter, setEngagementFilter] = useState<EngagementFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('posts');
  const [showComparison, setShowComparison] = useState(false);

  // Get unique conferences
  const conferences = useMemo(() => {
    return Array.from(new Set(partners.map(p => p.conference))).sort();
  }, [partners]);

  // Filter and sort logic
  const filteredAndSortedPartners = useMemo(() => {
    let result = [...partners];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.schoolName.toLowerCase().includes(query) ||
          p.mascot.toLowerCase().includes(query)
      );
    }

    // Tier filter
    if (tierFilter !== 'all') {
      result = result.filter(p => p.tier === tierFilter);
    }

    // Conference filter
    if (conferenceFilter !== 'all') {
      result = result.filter(p => p.conference === conferenceFilter);
    }

    // Engagement filter
    if (engagementFilter !== 'all') {
      result = result.filter(p => {
        const rate = p.averageEngagementRate;
        if (engagementFilter === 'high') return rate >= 0.4;
        if (engagementFilter === 'medium') return rate >= 0.25 && rate < 0.4;
        if (engagementFilter === 'low') return rate < 0.25;
        return true;
      });
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'posts':
          return b.totalPosts - a.totalPosts;
        case 'engagement':
          return b.averageEngagementRate - a.averageEngagementRate;
        case 'athletes':
          return b.athletesTracked - a.athletesTracked;
        case 'name':
          return a.schoolName.localeCompare(b.schoolName);
        default:
          return 0;
      }
    });

    return result;
  }, [partners, searchQuery, tierFilter, conferenceFilter, engagementFilter, sortBy]);

  // Calculate aggregates for filtered results
  const aggregates = useMemo(() => {
    return {
      totalSchools: filteredAndSortedPartners.length,
      totalAthletes: filteredAndSortedPartners.reduce((sum, p) => sum + p.athletesTracked, 0),
      totalPosts: filteredAndSortedPartners.reduce((sum, p) => sum + p.totalPosts, 0),
      totalLikes: filteredAndSortedPartners.reduce((sum, p) => sum + p.totalLikes, 0),
      totalComments: filteredAndSortedPartners.reduce((sum, p) => sum + p.totalComments, 0),
      avgEngagement:
        filteredAndSortedPartners.reduce((sum, p) => sum + p.averageEngagementRate, 0) /
        (filteredAndSortedPartners.length || 1),
    };
  }, [filteredAndSortedPartners]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#091831] tracking-wide mb-2">
            PLAYFLY PARTNER SCHOOLS
          </h2>
          <div className="h-1 w-24 bg-[#1770C0]" />
        </div>
        <button
          onClick={() => setShowComparison(true)}
          className="px-4 py-2 bg-[#1770C0] hover:opacity-90 text-white rounded-lg font-semibold text-sm flex items-center gap-2 transition-all"
        >
          <GitCompare className="w-4 h-4" />
          Compare Schools
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="rounded-lg p-4 border border-[#1770C0]">
          <div className="text-2xl font-bold text-[#1770C0]">{aggregates.totalSchools}</div>
          <div className="text-xs text-gray-600">Schools</div>
        </div>
        <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="rounded-lg p-4 border border-[#1770C0]">
          <div className="text-2xl font-bold text-[#1770C0]">{formatNumber(aggregates.totalAthletes)}</div>
          <div className="text-xs text-gray-600">Athletes</div>
        </div>
        <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="rounded-lg p-4 border border-[#1770C0]">
          <div className="text-2xl font-bold text-[#1770C0]">{formatNumber(aggregates.totalPosts)}</div>
          <div className="text-xs text-gray-600">Posts</div>
        </div>
        <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="rounded-lg p-4 border border-[#1770C0]">
          <div className="text-2xl font-bold text-[#1770C0]">{formatNumber(aggregates.totalLikes)}</div>
          <div className="text-xs text-gray-600">Likes</div>
        </div>
        <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="rounded-lg p-4 border border-[#1770C0]">
          <div className="text-2xl font-bold text-[#1770C0]">{formatNumber(aggregates.totalComments)}</div>
          <div className="text-xs text-gray-600">Comments</div>
        </div>
        <div style={{ backgroundColor: 'rgba(23, 112, 192, 0.1)' }} className="rounded-lg p-4 border border-[#1770C0]">
          <div className="text-2xl font-bold text-[#1770C0]">{(aggregates.avgEngagement * 100).toFixed(1)}%</div>
          <div className="text-xs text-gray-600">Avg Engagement</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by school name or mascot..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1770C0] focus:border-transparent"
          />
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap gap-3">
          {/* Tier Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={tierFilter}
              onChange={e => setTierFilter(e.target.value as TierFilter)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1770C0]"
            >
              <option value="all">All Tiers</option>
              <option value={PlayflyPartnerTier.MAX}>Playfly MAX</option>
              <option value={PlayflyPartnerTier.STANDARD}>Standard</option>
            </select>
          </div>

          {/* Conference Filter */}
          <select
            value={conferenceFilter}
            onChange={e => setConferenceFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1770C0]"
          >
            <option value="all">All Conferences</option>
            {conferences.map(conf => (
              <option key={conf} value={conf}>
                {conf}
              </option>
            ))}
          </select>

          {/* Engagement Filter */}
          <select
            value={engagementFilter}
            onChange={e => setEngagementFilter(e.target.value as EngagementFilter)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1770C0]"
          >
            <option value="all">All Engagement Rates</option>
            <option value="high">High (&gt;40%)</option>
            <option value="medium">Medium (25-40%)</option>
            <option value="low">Low (&lt;25%)</option>
          </select>

          {/* Sort By */}
          <div className="flex items-center gap-2 ml-auto">
            <ArrowUpDown className="w-4 h-4 text-gray-600" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1770C0]"
            >
              <option value="posts">Sort by Posts</option>
              <option value="engagement">Sort by Engagement</option>
              <option value="athletes">Sort by Athletes</option>
              <option value="name">Sort by Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600">
          {filteredAndSortedPartners.length === 0 ? (
            <span className="text-orange-600 font-semibold">No schools match your filters</span>
          ) : (
            <span>
              <span className="font-semibold text-black">{filteredAndSortedPartners.length}</span>{' '}
              {filteredAndSortedPartners.length === 1 ? 'school' : 'schools'} matching filters
            </span>
          )}
        </div>
      </div>

      {/* Results Grid */}
      {filteredAndSortedPartners.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-semibold">No schools found</p>
          <p className="text-sm mt-2">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedPartners.map(partner => (
            <SchoolPartnerCard key={partner.schoolId} partner={partner} />
          ))}
        </div>
      )}

      {/* School Comparison Modal */}
      {showComparison && (
        <SchoolComparison schools={partners} onClose={() => setShowComparison(false)} />
      )}
    </div>
  );
}
