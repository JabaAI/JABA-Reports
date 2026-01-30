import { useState } from 'react';
import {
  Users,
  TrendingUp,
  Trophy,
  Briefcase,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Calendar,
  Award,
} from 'lucide-react';
import { SchoolPartner, PlayflyPartnerTier } from '../data/playflyNetworkData';
import { format } from 'date-fns';
import { getSchoolById, SchoolConfig } from '../data/schoolConfig';
import { getTopPerformers } from '../data/playflyIPAnalytics';

interface SchoolPartnerCardProps {
  partner: SchoolPartner;
}

export function SchoolPartnerCard({ partner }: SchoolPartnerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get school config for colors and logo
  const schoolConfig: SchoolConfig | null = getSchoolById(partner.schoolId);

  // Format numbers with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  // Format large numbers (K, M)
  const formatLargeNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  // Conference colors
  const getConferenceColor = (conference: string): string => {
    const colors: Record<string, string> = {
      'SEC': 'bg-blue-600 text-white',
      'Big Ten': 'bg-indigo-600 text-white',
      'ACC': 'bg-orange-600 text-white',
      'Big 12': 'bg-red-600 text-white',
      'Pac-12': 'bg-purple-600 text-white',
      'American': 'bg-cyan-600 text-white',
    };
    return colors[conference] || 'bg-gray-600 text-white';
  };

  // Tier badge styling
  const getTierBadge = () => {
    if (partner.tier === PlayflyPartnerTier.MAX) {
      return (
        <div
          className="flex items-center gap-1 text-white px-3 py-1 rounded-full text-xs font-bold"
          style={{ backgroundColor: schoolConfig?.primaryColor || '#1770C0' }}
        >
          <Award className="w-3 h-3" />
          <span>PLAYFLY MAX</span>
        </div>
      );
    }
    return (
      <div className="bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-bold">
        STANDARD
      </div>
    );
  };

  // Get actual top athletes for this school from leaderboard data
  const allTopPerformers = getTopPerformers(50); // Get more to ensure we have enough per school

  // Normalize school name for matching (remove "University" and other suffixes)
  const normalizeSchoolName = (name: string) => {
    return name.replace(/ University| State University/gi, '').trim();
  };

  const normalizedPartnerSchool = normalizeSchoolName(partner.schoolName);

  const schoolTopAthletes = allTopPerformers
    .filter(athlete => {
      const normalizedAthleteSchool = normalizeSchoolName(athlete.school);
      return normalizedAthleteSchool === normalizedPartnerSchool ||
             athlete.school.includes(normalizedPartnerSchool) ||
             normalizedPartnerSchool.includes(normalizedAthleteSchool);
    })
    .slice(0, 3)
    .map(athlete => ({
      name: athlete.athleteName,
      sport: athlete.sport,
      likes: athlete.totalLikes,
      comments: athlete.totalComments,
    }));

  // Sport breakdown (mocked - in production would calculate from real data)
  const sportBreakdown = [
    { sport: 'Football', athletes: Math.floor(partner.athletesTracked * 0.35), posts: Math.floor(partner.totalPosts * 0.45) },
    { sport: 'Basketball', athletes: Math.floor(partner.athletesTracked * 0.25), posts: Math.floor(partner.totalPosts * 0.28) },
    { sport: 'Other Sports', athletes: Math.floor(partner.athletesTracked * 0.40), posts: Math.floor(partner.totalPosts * 0.27) },
  ];

  const maxSportAthletes = Math.max(...sportBreakdown.map(s => s.athletes));

  return (
    <div
      className="bg-white border-t-4 border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      style={{ borderTopColor: schoolConfig?.primaryColor || '#1770C0' }}
    >
      {/* Header Section */}
      <div
        className="p-6 border-b border-gray-200"
        style={{
          background: schoolConfig
            ? `linear-gradient(135deg, ${schoolConfig.primaryColor}15 0%, ${schoolConfig.secondaryColor}15 100%)`
            : 'linear-gradient(to-br, rgb(249, 250, 251) 0%, rgb(243, 244, 246) 100%)'
        }}
      >
        {/* School Name & Badges */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3
              className="text-2xl font-bold tracking-wide mb-1"
              style={{ color: schoolConfig?.primaryColor || '#091831' }}
            >
              {partner.schoolName.toUpperCase()}
            </h3>
            <p className="text-gray-600 text-sm">{partner.mascot}</p>
          </div>
          <div className="text-right">
            <div
              className="w-16 h-16 rounded-xl bg-white border-2 flex items-center justify-center mb-2 p-2"
              style={{ borderColor: schoolConfig?.primaryColor || '#1770C0' }}
            >
              {schoolConfig?.logoUrl ? (
                <img
                  src={schoolConfig.logoUrl}
                  alt={partner.schoolName}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span
                  className="text-xs font-bold"
                  style={{ color: schoolConfig?.primaryColor || '#1770C0' }}
                >
                  {partner.schoolName.substring(0, 3).toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${getConferenceColor(partner.conference)}`}>
            {partner.conference}
          </div>
          {getTierBadge()}
          <div className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs">
            <Calendar className="w-3 h-3" />
            <span>Since {format(partner.partnershipStartDate, 'MMM yyyy')}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Section A: Social Media Performance */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5" style={{ color: schoolConfig?.primaryColor || '#1770C0' }} />
            <h4
              className="text-sm font-bold uppercase tracking-wide"
              style={{ color: schoolConfig?.primaryColor || '#091831' }}
            >
              Social Media Performance
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div
              className="rounded-lg p-3 border"
              style={{
                backgroundColor: schoolConfig ? `${schoolConfig.primaryColor}15` : 'rgba(23, 112, 192, 0.1)',
                borderColor: schoolConfig?.primaryColor || '#1770C0'
              }}
            >
              <div className="text-2xl font-bold" style={{ color: schoolConfig?.primaryColor || '#1770C0' }}>
                {formatNumber(partner.athletesTracked)}
              </div>
              <div className="text-xs text-gray-600">Athletes Tracked</div>
            </div>
            <div
              className="rounded-lg p-3 border"
              style={{
                backgroundColor: schoolConfig ? `${schoolConfig.primaryColor}15` : 'rgba(23, 112, 192, 0.1)',
                borderColor: schoolConfig?.primaryColor || '#1770C0'
              }}
            >
              <div className="text-2xl font-bold" style={{ color: schoolConfig?.primaryColor || '#1770C0' }}>
                {formatNumber(partner.totalPosts)}
              </div>
              <div className="text-xs text-gray-600">Total Posts</div>
            </div>
            <div
              className="rounded-lg p-3 border"
              style={{
                backgroundColor: schoolConfig ? `${schoolConfig.primaryColor}15` : 'rgba(23, 112, 192, 0.1)',
                borderColor: schoolConfig?.primaryColor || '#1770C0'
              }}
            >
              <div className="text-2xl font-bold" style={{ color: schoolConfig?.primaryColor || '#1770C0' }}>
                {formatLargeNumber(partner.totalLikes)}
              </div>
              <div className="text-xs text-gray-600">Total Likes</div>
            </div>
            <div
              className="rounded-lg p-3 border"
              style={{
                backgroundColor: schoolConfig ? `${schoolConfig.primaryColor}15` : 'rgba(23, 112, 192, 0.1)',
                borderColor: schoolConfig?.primaryColor || '#1770C0'
              }}
            >
              <div className="text-2xl font-bold" style={{ color: schoolConfig?.primaryColor || '#1770C0' }}>
                {formatLargeNumber(partner.totalComments)}
              </div>
              <div className="text-xs text-gray-600">Total Comments</div>
            </div>
            <div
              className="rounded-lg p-3 border"
              style={{
                backgroundColor: schoolConfig ? `${schoolConfig.primaryColor}15` : 'rgba(23, 112, 192, 0.1)',
                borderColor: schoolConfig?.primaryColor || '#1770C0'
              }}
            >
              <div className="text-2xl font-bold" style={{ color: schoolConfig?.primaryColor || '#1770C0' }}>
                {(partner.averageEngagementRate * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-600">Avg Engagement</div>
            </div>
            <div
              className="rounded-lg p-3 border"
              style={{
                backgroundColor: schoolConfig ? `${schoolConfig.primaryColor}15` : 'rgba(23, 112, 192, 0.1)',
                borderColor: schoolConfig?.primaryColor || '#1770C0'
              }}
            >
              <div className="text-2xl font-bold" style={{ color: schoolConfig?.primaryColor || '#1770C0' }}>
                {formatLargeNumber(partner.instagramFollowers + partner.tiktokFollowers)}
              </div>
              <div className="text-xs text-gray-600">Follower Base</div>
            </div>
          </div>
        </div>

        {/* Expandable Content */}
        {isExpanded && (
          <>
            {/* Section B: Top Performing Athletes */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-5 h-5 text-amber-600" />
                <h4 className="text-sm font-bold text-black uppercase tracking-wide">
                  Top Performing Athletes
                </h4>
              </div>
              <div className="space-y-2">
                {schoolTopAthletes.map((athlete, index) => (
                  <div key={index} className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-3 border border-amber-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900 text-sm">{athlete.name}</div>
                        <div className="text-xs text-gray-600">{athlete.sport}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-blue-900">{formatLargeNumber(athlete.likes)} likes</div>
                        <div className="text-xs text-gray-600">{formatLargeNumber(athlete.comments)} comments</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section C: Active Brand Partnerships */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-5 h-5 text-green-600" />
                <h4 className="text-sm font-bold text-black uppercase tracking-wide">
                  Active Brand Partnerships
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {partner.activeBrands.slice(0, 5).map((brand, index) => (
                  <div key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {brand}
                  </div>
                ))}
                {partner.activeBrands.length > 5 && (
                  <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                    +{partner.activeBrands.length - 5} more partners
                  </div>
                )}
              </div>
              <div className="mt-2 text-xs text-gray-600">
                {Math.max(0, 8 - partner.activeBrands.length)} additional partnership opportunities available
              </div>
            </div>

            {/* Section D: Sport Breakdown */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-purple-600" />
                <h4 className="text-sm font-bold text-black uppercase tracking-wide">
                  Sport Breakdown
                </h4>
              </div>
              <div className="space-y-3">
                {sportBreakdown.map((sport, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-gray-700">{sport.sport}</span>
                      <span className="text-gray-600">
                        {sport.athletes} athletes • {sport.posts} posts
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                        style={{ width: `${(sport.athletes / maxSportAthletes) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-semibold text-gray-700"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              <span>Show Less</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span>Show More Details</span>
            </>
          )}
        </button>

        {/* View Details Button */}
        <button
          className="w-full mt-3 flex items-center justify-center gap-2 py-3 px-4 hover:opacity-90 text-white rounded-lg transition-all text-sm font-bold"
          style={{ backgroundColor: schoolConfig?.primaryColor || '#1770C0' }}
        >
          <ExternalLink className="w-4 h-4" />
          <span>View Full Report</span>
        </button>
      </div>
    </div>
  );
}
