/**
 * EMV (Earned Media Value) Calculator
 *
 * EMV Formula:
 * EMV = (Impressions × $20 CPM / 1000) + (Likes × $0.50) + (Comments × $1.50)
 *
 * Where Impressions = Athlete Followers × Reach Rate
 *
 * Reach Rates by Follower Count:
 * - 500K+ followers: 15% reach rate
 * - 100K-500K followers: 22% reach rate
 * - 50K-100K followers: 28% reach rate
 * - 10K-50K followers: 35% reach rate
 * - <10K followers: 45% reach rate
 */

export interface PostEMVData {
  postId: string;
  athleteFollowers: number; // CRITICAL: Required for reach calculation
  likes: number;
  comments: number;
  usesPlayflyIP: boolean;
  ipType?: 'Logo' | 'Collaboration' | 'Mention';
  brandName?: string;
}

export interface EMVBreakdown {
  impressions: number;
  cpmValue: number;
  likesValue: number;
  commentsValue: number;
  totalEMV: number;
  avgEMVPerPost: number;
}

/**
 * Get reach rate based on athlete follower count
 */
export function getReachRate(followers: number): number {
  if (followers >= 500000) return 0.15; // 15%
  if (followers >= 100000) return 0.22; // 22%
  if (followers >= 50000) return 0.28;  // 28%
  if (followers >= 10000) return 0.35;  // 35%
  return 0.45; // 45%
}

/**
 * Calculate EMV for a single post
 */
export function calculatePostEMV(post: {
  athleteFollowers: number;
  likes: number;
  comments: number;
}): number {
  // Step 1: Determine reach rate based on follower count
  const reachRate = getReachRate(post.athleteFollowers);

  // Step 2: Calculate impressions
  const impressions = post.athleteFollowers * reachRate;

  // Step 3: Calculate EMV components
  const cpmValue = (impressions * 20) / 1000; // $20 CPM
  const likesValue = post.likes * 0.50;
  const commentsValue = post.comments * 1.50;

  // Step 4: Total EMV
  const totalEMV = cpmValue + likesValue + commentsValue;

  return totalEMV;
}

/**
 * Calculate EMV with detailed breakdown
 */
export function calculatePostEMVWithBreakdown(post: {
  athleteFollowers: number;
  likes: number;
  comments: number;
}): {
  impressions: number;
  cpmValue: number;
  likesValue: number;
  commentsValue: number;
  totalEMV: number;
  reachRate: number;
} {
  const reachRate = getReachRate(post.athleteFollowers);
  const impressions = post.athleteFollowers * reachRate;
  const cpmValue = (impressions * 20) / 1000;
  const likesValue = post.likes * 0.50;
  const commentsValue = post.comments * 1.50;
  const totalEMV = cpmValue + likesValue + commentsValue;

  return {
    impressions,
    cpmValue,
    likesValue,
    commentsValue,
    totalEMV,
    reachRate
  };
}

/**
 * Calculate total EMV for a campaign (multiple posts)
 */
export function calculateCampaignEMV(posts: PostEMVData[]): EMVBreakdown {
  if (posts.length === 0) {
    return {
      impressions: 0,
      cpmValue: 0,
      likesValue: 0,
      commentsValue: 0,
      totalEMV: 0,
      avgEMVPerPost: 0
    };
  }

  let totalImpressions = 0;
  let totalCpmValue = 0;
  let totalLikesValue = 0;
  let totalCommentsValue = 0;
  let totalEMV = 0;

  posts.forEach(post => {
    const breakdown = calculatePostEMVWithBreakdown(post);
    totalImpressions += breakdown.impressions;
    totalCpmValue += breakdown.cpmValue;
    totalLikesValue += breakdown.likesValue;
    totalCommentsValue += breakdown.commentsValue;
    totalEMV += breakdown.totalEMV;
  });

  return {
    impressions: totalImpressions,
    cpmValue: totalCpmValue,
    likesValue: totalLikesValue,
    commentsValue: totalCommentsValue,
    totalEMV,
    avgEMVPerPost: totalEMV / posts.length
  };
}

/**
 * Calculate average EMV per post
 */
export function calculateAverageEMV(posts: PostEMVData[]): number {
  if (posts.length === 0) return 0;
  const breakdown = calculateCampaignEMV(posts);
  return breakdown.avgEMVPerPost;
}

/**
 * Compare EMV between two groups of posts (e.g., with IP vs without IP)
 */
export function compareEMV(
  groupA: PostEMVData[],
  groupB: PostEMVData[]
): {
  groupA: EMVBreakdown;
  groupB: EMVBreakdown;
  liftPercent: number;
} {
  const emvA = calculateCampaignEMV(groupA);
  const emvB = calculateCampaignEMV(groupB);

  const liftPercent = emvA.avgEMVPerPost > 0
    ? Math.round(((emvB.avgEMVPerPost - emvA.avgEMVPerPost) / emvA.avgEMVPerPost) * 100)
    : 0;

  return {
    groupA: emvA,
    groupB: emvB,
    liftPercent
  };
}

/**
 * Format EMV as currency string
 */
export function formatEMV(emv: number): string {
  if (emv >= 1000000) {
    return `$${(emv / 1000000).toFixed(1)}M`;
  }
  if (emv >= 1000) {
    return `$${(emv / 1000).toFixed(1)}K`;
  }
  return `$${emv.toFixed(0)}`;
}

/**
 * EXAMPLE CALCULATION (for documentation/testing)
 */
export function exampleCalculation(): void {
  const examplePost = {
    athleteFollowers: 150000,
    likes: 2500,
    comments: 350
  };

  const breakdown = calculatePostEMVWithBreakdown(examplePost);

  console.log('Example EMV Calculation:');
  console.log('------------------------');
  console.log(`Athlete Followers: ${examplePost.athleteFollowers.toLocaleString()}`);
  console.log(`Reach Rate: ${(breakdown.reachRate * 100).toFixed(0)}% (100K-500K range)`);
  console.log(`Impressions: ${breakdown.impressions.toLocaleString()}`);
  console.log('');
  console.log('EMV Breakdown:');
  console.log(`  CPM Value ($20 CPM): $${breakdown.cpmValue.toLocaleString()}`);
  console.log(`  Likes Value (${examplePost.likes} × $0.50): $${breakdown.likesValue.toLocaleString()}`);
  console.log(`  Comments Value (${examplePost.comments} × $1.50): $${breakdown.commentsValue.toLocaleString()}`);
  console.log('');
  console.log(`Total EMV: $${breakdown.totalEMV.toLocaleString()}`);
  console.log('');
  console.log('For 100 posts like this:');
  console.log(`Total Campaign EMV: $${(breakdown.totalEMV * 100).toLocaleString()}`);
}
