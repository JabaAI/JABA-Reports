/**
 * JABA Real Data Loader Service
 *
 * Loads and processes real data from JABA's PlayFly datasets
 * Sources:
 * - PlayFlyFull_roster_teams.json (481 team records with 90-day metrics)
 * - PlayflyFull_team_contents.json (5,333 real posts)
 * - organizations_roster_ip_*.json (48MB IP impact data)
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface JABARosterMetrics {
  marketability: number;
  influencePower: number;
  audienceConnection: number;
  followersGrowthRate: number;
  followers: number;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  reach: number;
  saves: number;
  interactions: number;
  impressions: number;
  engagementRate: number;
  videoViews: number;
  contentCount: number;
  sponsoredContentCount: number;
  unsponsoredCount: number;
  followersGrowth: number;
  logoContentCount: number;
  avgEngagementRateWithLogo: number;
  avgEngagementRateWithoutLogo: number;
  engagementRateLogoLift: number;
  avgLikesWithLogo: number;
  avgLikesWithoutLogo: number;
  likesLogoLift: number;
  avgCommentsWithLogo: number;
  avgCommentsWithoutLogo: number;
  commentsLogoLift: number;
}

export interface JABARosterTeam {
  _id: { $oid: string } | string;
  profileIds: Array<{ $oid: string }>;
  profilePicture: string;
  organizationId: string;
  conferenceId: string;
  conferenceName: string;
  schoolName: string;
  leagueId: string | null;
  sport: string;
  metrics: {
    sevenDays: JABARosterMetrics;
    thirtyDays: JABARosterMetrics;
    ninetyDays: JABARosterMetrics;
  };
}

export interface JABAPost {
  _id: string;
  caption: string;
  createdAt: { $date: string };
  hasOrganizationLogo: boolean;
  isSponsored: boolean;
  likeAndViewCountsDisabled: boolean;
  mediaType: 'PHOTO' | 'VIDEO' | 'CAROUSEL' | 'REEL';
  metrics: {
    comments: number;
    likes: number;
    engagementRate: number;
    shares: number;
    saves: number;
    impressions: number;
    followers: number;
    totalInteractions: number;
    accountsEngaged: number;
    videoViews: number;
    reach: number;
    profileLinksTaps: number;
  };
  permalink: string;
  publishedAt: { $date: string };
  source: 'INSTAGRAM' | 'TIKTOK';
  sponsorPartner: string;
  team: {
    profileId: string;
    name: string;
    school: {
      _id: string;
      name: string;
    };
    conference: {
      _id: string;
      name: string;
    };
    league: {
      _id: string;
      name: string;
    };
  };
  updatedAt: { $date: string };
  url: string;
}

// ============================================
// DATA LOADING (Simulated - in prod would fetch from API)
// ============================================

// Since we can't dynamically import 148MB+ of JSON in the browser,
// we'll create a data service that simulates loading from JABA
// In production, this would be an API call to your backend

export function loadJABARosterTeams(): JABARosterTeam[] {
  // In production, this would fetch from /api/jaba/roster-teams
  // For now, returning empty array - will be populated by backend
  return [];
}

export function loadJABAPosts(): JABAPost[] {
  // In production, this would fetch from /api/jaba/posts
  // For now, returning empty array - will be populated by backend
  return [];
}

// ============================================
// EMV CALCULATION
// ============================================

export function calculateEMV(likes: number, comments: number, impressions?: number): number {
  // Simple formula: (Likes × $0.02) + (Comments × $0.10)
  // Advanced formula if impressions available: (Impressions × $20 CPM / 1000) + (Likes × $0.50) + (Comments × $1.50)

  if (impressions && impressions > 0) {
    return (impressions * 20 / 1000) + (likes * 0.50) + (comments * 1.50);
  }

  return (likes * 0.02) + (comments * 0.10);
}

export function calculate90DayEMV(metrics: JABARosterMetrics): number {
  return calculateEMV(metrics.likes, metrics.comments, metrics.impressions);
}

// ============================================
// ATHLETE TIER CLASSIFICATION
// ============================================

export enum AthleteTier {
  TIER_1_TOP_GUN = 'TIER_1_TOP_GUN',
  TIER_2_RISING_STAR = 'TIER_2_RISING_STAR',
  TIER_3_EMERGING = 'TIER_3_EMERGING',
  TIER_4_GROWTH = 'TIER_4_GROWTH',
}

export interface TierInfo {
  tier: AthleteTier;
  name: string;
  description: string;
  priceRangeMin: number;
  priceRangeMax: number;
  criteria: string;
}

export function classifyAthleteTier(engagementRate: number, followers: number): AthleteTier {
  if (engagementRate >= 0.04 && followers >= 50000) {
    return AthleteTier.TIER_1_TOP_GUN;
  } else if (engagementRate >= 0.02 && engagementRate < 0.04 && followers >= 10000 && followers < 50000) {
    return AthleteTier.TIER_2_RISING_STAR;
  } else if (engagementRate >= 0.01 && engagementRate < 0.02 && followers >= 5000 && followers < 10000) {
    return AthleteTier.TIER_3_EMERGING;
  } else {
    return AthleteTier.TIER_4_GROWTH;
  }
}

export function getTierInfo(tier: AthleteTier): TierInfo {
  const tierMap: Record<AthleteTier, TierInfo> = {
    [AthleteTier.TIER_1_TOP_GUN]: {
      tier: AthleteTier.TIER_1_TOP_GUN,
      name: 'Top Gun',
      description: 'Elite athletes with proven influence and massive reach',
      priceRangeMin: 2500,
      priceRangeMax: 15000,
      criteria: 'Engagement ≥4%, Followers ≥50K',
    },
    [AthleteTier.TIER_2_RISING_STAR]: {
      tier: AthleteTier.TIER_2_RISING_STAR,
      name: 'Rising Star',
      description: 'High-potential athletes with strong engagement',
      priceRangeMin: 800,
      priceRangeMax: 2500,
      criteria: 'Engagement 2-4%, Followers 10K-50K',
    },
    [AthleteTier.TIER_3_EMERGING]: {
      tier: AthleteTier.TIER_3_EMERGING,
      name: 'Emerging',
      description: 'Developing athletes with growing followings',
      priceRangeMin: 250,
      priceRangeMax: 800,
      criteria: 'Engagement 1-2%, Followers 5K-10K',
    },
    [AthleteTier.TIER_4_GROWTH]: {
      tier: AthleteTier.TIER_4_GROWTH,
      name: 'Growth',
      description: 'Early-stage athletes building their brand',
      priceRangeMin: 50,
      priceRangeMax: 250,
      criteria: 'Engagement <1% OR Followers <5K',
    },
  };

  return tierMap[tier];
}

export function calculatePricePerPost(engagementRate: number, followers: number): number {
  // Base Price Per Post = engagement_rate × followers × $0.015 CPE
  return engagementRate * followers * 0.015;
}

// ============================================
// MONEY LEFT ON TABLE CALCULATIONS
// ============================================

export interface MoneyLeftAnalysis {
  unsponsoredHighPerformers: number;
  averageEMVPerAthlete: number;
  ninetyDayRevenueGap: number;
  percentUnsponsored: number;
  engagementRateComparison: {
    sponsored: number;
    unsponsored: number;
    difference: number;
  };
}

export function calculateMoneyLeftOnTable(teams: JABARosterTeam[]): MoneyLeftAnalysis {
  const highEngagementThreshold = 0.03; // 3% engagement rate

  let unsponsoredHighPerformers = 0;
  let totalEMV = 0;
  let totalUnsponsoredEMV = 0;
  let sponsoredEngagement = 0;
  let unsponsoredEngagement = 0;
  let sponsoredCount = 0;
  let unsponsoredCount = 0;

  teams.forEach(team => {
    const metrics = team.metrics.ninetyDays;
    const engagementRate = metrics.engagementRate;
    const isHighPerformer = engagementRate >= highEngagementThreshold;
    const hasNoSponsorships = metrics.sponsoredContentCount === 0;

    if (isHighPerformer && hasNoSponsorships) {
      unsponsoredHighPerformers++;
      const emv = calculate90DayEMV(metrics);
      totalUnsponsoredEMV += emv;
    }

    totalEMV += calculate90DayEMV(metrics);

    if (metrics.sponsoredContentCount > 0) {
      sponsoredEngagement += engagementRate;
      sponsoredCount++;
    } else {
      unsponsoredEngagement += engagementRate;
      unsponsoredCount++;
    }
  });

  const avgSponsoredEngagement = sponsoredCount > 0 ? sponsoredEngagement / sponsoredCount : 0;
  const avgUnsponsoredEngagement = unsponsoredCount > 0 ? unsponsoredEngagement / unsponsoredCount : 0;

  // Revenue gap calculation:
  // For each high-performer with no sponsorships, calculate potential revenue
  // if 12% of their posts were sponsored at market rate
  const revenueGap = teams
    .filter(t => t.metrics.ninetyDays.engagementRate >= highEngagementThreshold && t.metrics.ninetyDays.sponsoredContentCount === 0)
    .reduce((sum, team) => {
      const metrics = team.metrics.ninetyDays;
      const potentialSponsoredPosts = metrics.contentCount * 0.12;
      const pricePerPost = calculatePricePerPost(metrics.engagementRate, metrics.followers);
      return sum + (potentialSponsoredPosts * pricePerPost);
    }, 0);

  return {
    unsponsoredHighPerformers,
    averageEMVPerAthlete: teams.length > 0 ? totalEMV / teams.length : 0,
    ninetyDayRevenueGap: revenueGap,
    percentUnsponsored: teams.length > 0 ? (unsponsoredCount / teams.length) * 100 : 0,
    engagementRateComparison: {
      sponsored: avgSponsoredEngagement,
      unsponsored: avgUnsponsoredEngagement,
      difference: avgSponsoredEngagement - avgUnsponsoredEngagement,
    },
  };
}

// ============================================
// ATHLETE TIER BREAKDOWN
// ============================================

export interface TierBreakdown {
  tier: AthleteTier;
  tierInfo: TierInfo;
  count: number;
  sampleAthletes: Array<{
    schoolName: string;
    sport: string;
    followers: number;
    engagementRate: number;
    emv: number;
  }>;
  avgEngagementRate: number;
  avgFollowers: number;
  totalEMV: number;
}

export function calculateTierBreakdown(teams: JABARosterTeam[]): TierBreakdown[] {
  const tierMap = new Map<AthleteTier, {
    count: number;
    athletes: Array<{
      team: JABARosterTeam;
      emv: number;
    }>;
    totalEngagement: number;
    totalFollowers: number;
    totalEMV: number;
  }>();

  // Initialize tiers
  Object.values(AthleteTier).forEach(tier => {
    tierMap.set(tier, {
      count: 0,
      athletes: [],
      totalEngagement: 0,
      totalFollowers: 0,
      totalEMV: 0,
    });
  });

  // Classify each team into a tier
  teams.forEach(team => {
    const metrics = team.metrics.ninetyDays;
    const tier = classifyAthleteTier(metrics.engagementRate, metrics.followers);
    const emv = calculate90DayEMV(metrics);

    const tierData = tierMap.get(tier)!;
    tierData.count++;
    tierData.athletes.push({ team, emv });
    tierData.totalEngagement += metrics.engagementRate;
    tierData.totalFollowers += metrics.followers;
    tierData.totalEMV += emv;
  });

  // Build breakdown for each tier
  const breakdown: TierBreakdown[] = [];

  Object.values(AthleteTier).forEach(tier => {
    const tierData = tierMap.get(tier)!;
    const tierInfo = getTierInfo(tier);

    // Get top 3 athletes by EMV
    const topAthletes = tierData.athletes
      .sort((a, b) => b.emv - a.emv)
      .slice(0, 3)
      .map(({ team, emv }) => ({
        schoolName: team.schoolName,
        sport: team.sport,
        followers: team.metrics.ninetyDays.followers,
        engagementRate: team.metrics.ninetyDays.engagementRate,
        emv,
      }));

    breakdown.push({
      tier,
      tierInfo,
      count: tierData.count,
      sampleAthletes: topAthletes,
      avgEngagementRate: tierData.count > 0 ? tierData.totalEngagement / tierData.count : 0,
      avgFollowers: tierData.count > 0 ? tierData.totalFollowers / tierData.count : 0,
      totalEMV: tierData.totalEMV,
    });
  });

  return breakdown;
}

// ============================================
// RISK ANALYSIS
// ============================================

export interface RiskAnalysis {
  atRiskAthletes: number;
  monthlyHemorrhage: number;
  competitorExposure: number;
  engagementDeclinePercent: number;
  atRiskDetails: Array<{
    schoolName: string;
    sport: string;
    daysWithoutDeal: number;
    engagementTrend: 'declining' | 'flat' | 'growing';
    potentialLoss: number;
  }>;
}

export function calculateRiskAnalysis(teams: JABARosterTeam[]): RiskAnalysis {
  let atRiskAthletes = 0;
  let totalMonthlyLoss = 0;
  let competitorExposure = 0;
  let decliningCount = 0;

  const atRiskDetails: RiskAnalysis['atRiskDetails'] = [];

  teams.forEach(team => {
    const ninetyDay = team.metrics.ninetyDays;
    const thirtyDay = team.metrics.thirtyDays;
    const sevenDay = team.metrics.sevenDays;

    // Check if declining engagement
    const isDeclining = sevenDay.engagementRate < thirtyDay.engagementRate &&
                         thirtyDay.engagementRate < ninetyDay.engagementRate;

    // At risk = zero deals + declining engagement
    const hasNoDeals = ninetyDay.sponsoredContentCount === 0;
    const isHighValue = ninetyDay.engagementRate >= 0.02 || ninetyDay.followers >= 10000;

    if (hasNoDeals && (isDeclining || isHighValue)) {
      atRiskAthletes++;

      const emv = calculate90DayEMV(ninetyDay);
      const monthlyLoss = emv / 3; // 90 days = 3 months
      totalMonthlyLoss += monthlyLoss;

      if (isHighValue) {
        competitorExposure++;
      }

      if (isDeclining) {
        decliningCount++;
      }

      atRiskDetails.push({
        schoolName: team.schoolName,
        sport: team.sport,
        daysWithoutDeal: 90, // Simplified - would need historical data
        engagementTrend: isDeclining ? 'declining' : 'flat',
        potentialLoss: monthlyLoss * 12, // Annual
      });
    }
  });

  return {
    atRiskAthletes,
    monthlyHemorrhage: totalMonthlyLoss,
    competitorExposure,
    engagementDeclinePercent: teams.length > 0 ? (decliningCount / teams.length) * 100 : 0,
    atRiskDetails: atRiskDetails.sort((a, b) => b.potentialLoss - a.potentialLoss).slice(0, 20),
  };
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  } else {
    return `$${value.toFixed(0)}`;
  }
}

export function formatNumber(value: number): string {
  return value.toLocaleString();
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}
