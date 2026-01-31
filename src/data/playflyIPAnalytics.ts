/**
 * Playfly IP Performance Analytics
 *
 * This file contains intellectual property performance metrics,
 * sport-by-sport breakdowns, and top athlete analytics.
 */

// ============================================
// INTERFACES & TYPES
// ============================================

export interface IPPerformance {
  logoContentEngagementLift: number;
  brandedPostPerformanceLift: number;
  collaborationContentLift: number;
  ninetyDayRollingLift: number;
  aggregateLikesFromBrandedContent: number;
  estimatedBrandValue: number;
  engagementRateComparison: {
    organic: number;
    branded: number;
    difference: number;
  };
}

export interface TopAthleteData {
  athleteName: string;
  sport: string;
  school: string;
  totalLikes: number;
  totalComments: number;
  followerCount: number;
  engagementRate: number;
  topPostEngagement: number;
}

export interface SportBreakdown {
  sportName: string;
  athleteCount: number;
  postCount: number;
  engagementRate: number;
  topPerformer: TopAthleteData;
}

// ============================================
// IP PERFORMANCE METRICS
// ============================================

export function getIPPerformanceMetrics(): IPPerformance {
  return {
    logoContentEngagementLift: 45, // +45% engagement for logo content
    brandedPostPerformanceLift: 38, // +38% performance for branded posts
    collaborationContentLift: 52, // +52% lift for collaboration content
    ninetyDayRollingLift: 28, // +28% rolling 90-day lift
    aggregateLikesFromBrandedContent: 18500000, // Total likes from branded content
    estimatedBrandValue: 12400000, // Estimated brand value from IP content
    engagementRateComparison: {
      organic: 0.32, // 32% organic engagement rate
      branded: 0.46, // 46% branded content engagement rate
      difference: 0.14, // +14 percentage points
    },
  };
}

// ============================================
// SPORT-BY-SPORT BREAKDOWN
// ============================================

export function getSportBreakdown(): SportBreakdown[] {
  return [
    {
      sportName: 'Football',
      athleteCount: 2850,
      postCount: 68500,
      engagementRate: 0.48,
      topPerformer: {
        athleteName: 'Drew Allar',
        sport: 'Football',
        school: 'Penn State',
        totalLikes: 3200000,
        totalComments: 89000,
        followerCount: 285000,
        engagementRate: 0.52,
        topPostEngagement: 185000,
      },
    },
    {
      sportName: 'Men\'s Basketball',
      athleteCount: 1820,
      postCount: 45200,
      engagementRate: 0.42,
      topPerformer: {
        athleteName: 'Jordan Williams',
        sport: 'Men\'s Basketball',
        school: 'Auburn',
        totalLikes: 2100000,
        totalComments: 62000,
        followerCount: 195000,
        engagementRate: 0.48,
        topPostEngagement: 142000,
      },
    },
    {
      sportName: 'Women\'s Basketball',
      athleteCount: 1650,
      postCount: 38900,
      engagementRate: 0.39,
      topPerformer: {
        athleteName: 'Sarah Thompson',
        sport: 'Women\'s Basketball',
        school: 'Baylor',
        totalLikes: 1850000,
        totalComments: 54000,
        followerCount: 178000,
        engagementRate: 0.45,
        topPostEngagement: 128000,
      },
    },
    {
      sportName: 'Baseball',
      athleteCount: 1420,
      postCount: 32100,
      engagementRate: 0.35,
      topPerformer: {
        athleteName: 'Jake Martinez',
        sport: 'Baseball',
        school: 'LSU',
        totalLikes: 1200000,
        totalComments: 38000,
        followerCount: 142000,
        engagementRate: 0.41,
        topPostEngagement: 95000,
      },
    },
    {
      sportName: 'Volleyball',
      athleteCount: 1280,
      postCount: 28400,
      engagementRate: 0.37,
      topPerformer: {
        athleteName: 'Emily Rodriguez',
        sport: 'Volleyball',
        school: 'Penn State',
        totalLikes: 1450000,
        totalComments: 42000,
        followerCount: 165000,
        engagementRate: 0.43,
        topPostEngagement: 108000,
      },
    },
    {
      sportName: 'Soccer',
      athleteCount: 1150,
      postCount: 24800,
      engagementRate: 0.34,
      topPerformer: {
        athleteName: 'Maria Santos',
        sport: 'Soccer',
        school: 'Virginia',
        totalLikes: 980000,
        totalComments: 32000,
        followerCount: 128000,
        engagementRate: 0.39,
        topPostEngagement: 78000,
      },
    },
    {
      sportName: 'Track & Field',
      athleteCount: 1580,
      postCount: 21500,
      engagementRate: 0.31,
      topPerformer: {
        athleteName: 'Marcus Johnson',
        sport: 'Track & Field',
        school: 'LSU',
        totalLikes: 850000,
        totalComments: 28000,
        followerCount: 112000,
        engagementRate: 0.36,
        topPostEngagement: 68000,
      },
    },
    {
      sportName: 'Gymnastics',
      athleteCount: 920,
      postCount: 19200,
      engagementRate: 0.44,
      topPerformer: {
        athleteName: 'Olivia Chen',
        sport: 'Gymnastics',
        school: 'Auburn',
        totalLikes: 1680000,
        totalComments: 48000,
        followerCount: 192000,
        engagementRate: 0.49,
        topPostEngagement: 132000,
      },
    },
    {
      sportName: 'Softball',
      athleteCount: 1100,
      postCount: 18900,
      engagementRate: 0.36,
      topPerformer: {
        athleteName: 'Ashley Williams',
        sport: 'Softball',
        school: 'Baylor',
        totalLikes: 1120000,
        totalComments: 35000,
        followerCount: 138000,
        engagementRate: 0.42,
        topPostEngagement: 89000,
      },
    },
    {
      sportName: 'Swimming & Diving',
      athleteCount: 890,
      postCount: 15600,
      engagementRate: 0.33,
      topPerformer: {
        athleteName: 'Ryan Chen',
        sport: 'Swimming & Diving',
        school: 'Texas A&M',
        totalLikes: 720000,
        totalComments: 24000,
        followerCount: 98000,
        engagementRate: 0.38,
        topPostEngagement: 62000,
      },
    },
  ];
}

// ============================================
// TOP PERFORMERS
// ============================================

export function getTopPerformers(limit: number = 10): TopAthleteData[] {
  const allPerformers: TopAthleteData[] = [
    {
      athleteName: 'Drew Allar',
      sport: 'Football',
      school: 'Penn State',
      totalLikes: 3200000,
      totalComments: 89000,
      followerCount: 285000,
      engagementRate: 0.52,
      topPostEngagement: 185000,
    },
    {
      athleteName: 'Jordan Williams',
      sport: 'Men\'s Basketball',
      school: 'Auburn',
      totalLikes: 2100000,
      totalComments: 62000,
      followerCount: 195000,
      engagementRate: 0.48,
      topPostEngagement: 142000,
    },
    {
      athleteName: 'Sarah Thompson',
      sport: 'Women\'s Basketball',
      school: 'Baylor',
      totalLikes: 1850000,
      totalComments: 54000,
      followerCount: 178000,
      engagementRate: 0.45,
      topPostEngagement: 128000,
    },
    {
      athleteName: 'Olivia Chen',
      sport: 'Gymnastics',
      school: 'Auburn',
      totalLikes: 1680000,
      totalComments: 48000,
      followerCount: 192000,
      engagementRate: 0.49,
      topPostEngagement: 132000,
    },
    {
      athleteName: 'Nicholas Singleton',
      sport: 'Football',
      school: 'Penn State',
      totalLikes: 2850000,
      totalComments: 78000,
      followerCount: 245000,
      engagementRate: 0.51,
      topPostEngagement: 168000,
    },
    {
      athleteName: 'Emily Rodriguez',
      sport: 'Volleyball',
      school: 'Penn State',
      totalLikes: 1450000,
      totalComments: 42000,
      followerCount: 165000,
      engagementRate: 0.43,
      topPostEngagement: 108000,
    },
    {
      athleteName: 'Jake Martinez',
      sport: 'Baseball',
      school: 'LSU',
      totalLikes: 1200000,
      totalComments: 38000,
      followerCount: 142000,
      engagementRate: 0.41,
      topPostEngagement: 95000,
    },
    {
      athleteName: 'Ashley Williams',
      sport: 'Softball',
      school: 'Baylor',
      totalLikes: 1120000,
      totalComments: 35000,
      followerCount: 138000,
      engagementRate: 0.42,
      topPostEngagement: 89000,
    },
    {
      athleteName: 'Maria Santos',
      sport: 'Soccer',
      school: 'Virginia',
      totalLikes: 980000,
      totalComments: 32000,
      followerCount: 128000,
      engagementRate: 0.39,
      topPostEngagement: 78000,
    },
    {
      athleteName: 'Marcus Johnson',
      sport: 'Track & Field',
      school: 'LSU',
      totalLikes: 850000,
      totalComments: 28000,
      followerCount: 112000,
      engagementRate: 0.36,
      topPostEngagement: 68000,
    },
    {
      athleteName: 'Ryan Chen',
      sport: 'Swimming & Diving',
      school: 'Texas A&M',
      totalLikes: 720000,
      totalComments: 24000,
      followerCount: 98000,
      engagementRate: 0.38,
      topPostEngagement: 62000,
    },
    {
      athleteName: 'Taylor Brown',
      sport: 'Football',
      school: 'LSU',
      totalLikes: 2650000,
      totalComments: 72000,
      followerCount: 228000,
      engagementRate: 0.50,
      topPostEngagement: 158000,
    },
    {
      athleteName: 'Jessica Lee',
      sport: 'Gymnastics',
      school: 'Baylor',
      totalLikes: 1580000,
      totalComments: 45000,
      followerCount: 182000,
      engagementRate: 0.47,
      topPostEngagement: 125000,
    },
    {
      athleteName: 'Kevin Zhang',
      sport: 'Men\'s Basketball',
      school: 'Texas A&M',
      totalLikes: 1920000,
      totalComments: 58000,
      followerCount: 188000,
      engagementRate: 0.46,
      topPostEngagement: 136000,
    },
    {
      athleteName: 'Sophia Martinez',
      sport: 'Women\'s Basketball',
      school: 'LSU',
      totalLikes: 1780000,
      totalComments: 52000,
      followerCount: 172000,
      engagementRate: 0.44,
      topPostEngagement: 122000,
    },
    {
      athleteName: 'Zevi Eckhaus',
      sport: 'Football',
      school: 'Washington State',
      totalLikes: 1650000,
      totalComments: 48000,
      followerCount: 158000,
      engagementRate: 0.43,
      topPostEngagement: 118000,
    },
    {
      athleteName: 'Wayshawn Parker',
      sport: 'Football',
      school: 'Washington State',
      totalLikes: 1420000,
      totalComments: 41000,
      followerCount: 142000,
      engagementRate: 0.41,
      topPostEngagement: 102000,
    },
    {
      athleteName: 'Eleonora Villa',
      sport: 'Women\'s Basketball',
      school: 'Washington State',
      totalLikes: 980000,
      totalComments: 31000,
      followerCount: 115000,
      engagementRate: 0.38,
      topPostEngagement: 82000,
    },
    {
      athleteName: 'Frank Harris',
      sport: 'Football',
      school: 'UTSA',
      totalLikes: 1180000,
      totalComments: 35000,
      followerCount: 128000,
      engagementRate: 0.40,
      topPostEngagement: 92000,
    },
    {
      athleteName: 'Zakhari Franklin',
      sport: 'Football',
      school: 'UTSA',
      totalLikes: 960000,
      totalComments: 29000,
      followerCount: 108000,
      engagementRate: 0.38,
      topPostEngagement: 78000,
    },
    {
      athleteName: 'Jordyn Jenkins',
      sport: 'Women\'s Basketball',
      school: 'UTSA',
      totalLikes: 720000,
      totalComments: 24000,
      followerCount: 92000,
      engagementRate: 0.36,
      topPostEngagement: 65000,
    },
  ];

  return allPerformers
    .sort((a, b) => b.totalLikes - a.totalLikes)
    .slice(0, limit);
}

// ============================================
// ANALYTICS HELPER FUNCTIONS
// ============================================

export function getTotalNetworkEngagement(): number {
  const sportBreakdown = getSportBreakdown();
  return sportBreakdown.reduce((sum, sport) => sum + sport.postCount * sport.engagementRate, 0);
}

export function getAverageEngagementByCategory(category: 'organic' | 'branded'): number {
  const metrics = getIPPerformanceMetrics();
  return category === 'organic'
    ? metrics.engagementRateComparison.organic
    : metrics.engagementRateComparison.branded;
}

export function getBrandedContentValue(): number {
  return getIPPerformanceMetrics().estimatedBrandValue;
}

export function getTopSportsByEngagement(limit: number = 5): SportBreakdown[] {
  return getSportBreakdown()
    .sort((a, b) => b.engagementRate - a.engagementRate)
    .slice(0, limit);
}

export function getTotalAthletesByAllSports(): number {
  return getSportBreakdown().reduce((sum, sport) => sum + sport.athleteCount, 0);
}

export function getTotalPostsByAllSports(): number {
  return getSportBreakdown().reduce((sum, sport) => sum + sport.postCount, 0);
}

export function getIPLiftSummary(): {
  avgLift: number;
  maxLift: number;
  minLift: number;
  categories: string[];
} {
  const metrics = getIPPerformanceMetrics();
  const lifts = [
    metrics.logoContentEngagementLift,
    metrics.brandedPostPerformanceLift,
    metrics.collaborationContentLift,
    metrics.ninetyDayRollingLift,
  ];

  return {
    avgLift: lifts.reduce((sum, lift) => sum + lift, 0) / lifts.length,
    maxLift: Math.max(...lifts),
    minLift: Math.min(...lifts),
    categories: ['Logo Content', 'Branded Posts', 'Collaborations', '90-Day Rolling'],
  };
}
