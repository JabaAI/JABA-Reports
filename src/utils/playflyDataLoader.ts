/**
 * Data loader for Playfly IP Report
 * Extracts real data from PlayFlyFull_roster_teams.json
 */

interface PlayflySchoolData {
  schoolName: string;
  metrics: {
    thirtyDays: {
      contentCount: number;
      sponsoredContentCount: number;
      unsponsoredCount: number;
      logoContentCount: number;
      avgEngagementRateWithLogo: number;
      avgEngagementRateWithoutLogo: number;
      likes: number;
      comments: number;
      followers: number;
    };
  };
}

interface BrandCountData {
  _id: string;
  uniqueBrands: number;
}

interface AthleteCountData {
  _id: string;
  sponsoredAthletes: number;
}

interface BrandsUsingIPData {
  _id: string;
  uniqueBrands: number;
}

interface CollaborationPostsData {
  _id: string;
  isOrganizationCollaboration: number;
}

interface BrandIPUsageData {
  _id: string;
  uniqueBrands: {
    name: string;
    postsWithSchoolCollaboration: number;
    postsWithSchoolLogo: number;
    postsWithoutEither: number;
    postsWithBoth: number;
  }[];
}

interface CollaborationEngagementData {
  schools: {
    schoolName: string;
    sport: string;
    logoContentCount: number;
    avgLikesWithLogo: number;
    avgCommentsWithLogo: number;
    avgLikesWithoutLogo: number;
    avgCommentsWithoutLogo: number;
    avgEngagementRateWithLogo: number;
    avgEngagementRateWithoutLogo: number;
    engagementRateLogoLift: number;
    organizationCollaborationContentCount: number;
    avgEngagementRateWithOrganizationCollaboration: number;
    avgEngagementRateWithoutOrganizationCollaboration: number;
    engagementRateOrganizationCollaborationLift: number;
    avgLikesWithOrganizationCollaboration: number;
    avgLikesWithoutOrganizationCollaboration: number;
    likesOrganizationCollaborationLift: number;
    avgCommentsWithOrganizationCollaboration: number;
    avgCommentsWithoutOrganizationCollaboration: number;
    commentsOrganizationCollaborationLift: number;
  }[];
}

export interface SchoolPerformance {
  schoolId: string;
  schoolName: string;
  isPlayflyMax: boolean;
  totalSponsoredPosts: number;
  uniqueBrandCount: number;
  sponsoredAthletesCount: number;
  totalEngagement: number;
  postsWithoutIP: number;
  engagementWithoutIP: number;
  postsWithIP: number;
  engagementWithIP: number;
  engagementLiftPercent: number;
  logoPostCount: number;
  logoEngagement: number;
  logoLift: number;
  collaborationPostCount: number;
  collaborationEngagement: number;
  collaborationLift: number;
  mentionPostCount: number;
  mentionEngagement: number;
  mentionLift: number;
  brandsUsingIP: number;
}

// Official Playfly Schools (27 total)
const OFFICIAL_PLAYFLY_SCHOOLS = [
  'Auburn University',
  'Baylor University',
  'Louisiana State University',
  'Texas A&M University',
  'University of Central Florida',
  'Florida Atlantic University',
  'Washington State University',
  'University of Nebraska',
  'Michigan State University',
  'Appalachian State University',
  'Oakland University',
  'Eastern Carolina University',
  'Troy University',
  'Penn State University',
  'University of Virginia',
  'University of Maryland',
  'Villanova University',
  'Virginia Tech',
  'Butler University',
  'George Mason',
  'Old Dominion University',
  'Oral Roberts University',
  'University of Denver',
  'San Jose State University',
  'University of Texas at San Antonio',
  'Brigham Young University',
  'University of Cincinnati'
];

// Playfly Max Schools (6 - Premium tier)
const PLAYFLY_MAX_SCHOOLS = [
  'Auburn University',
  'Louisiana State University',
  'Texas A&M University',
  'Penn State University',
  'Michigan State University',
  'University of Maryland'
];

// Name mapping for schools that have different names in the data
const SCHOOL_NAME_MAPPING: Record<string, string> = {
  'Maryland': 'University of Maryland',
  'Michigan State': 'Michigan State University',
  'Texas A&M': 'Texas A&M University',
  'Nebraska': 'University of Nebraska',
  'Baylor': 'Baylor University',
  'Virginia': 'University of Virginia',
  'Washington State': 'Washington State University',
  'University of Texas at San Antonio (UTSA)': 'University of Texas at San Antonio',
  'Brigham Young University(BYU)': 'Brigham Young University'
};

function normalizeSchoolName(name: string): string {
  return SCHOOL_NAME_MAPPING[name] || name;
}

function createSchoolId(schoolName: string): string {
  return schoolName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function isPlayflyMax(schoolName: string): boolean {
  const normalized = normalizeSchoolName(schoolName);
  return PLAYFLY_MAX_SCHOOLS.includes(normalized);
}

export async function loadPlayflySchoolData(): Promise<SchoolPerformance[]> {
  try {
    // Load all JSON files from public folder
    const [teamsResponse, brandsResponse, athletesResponse, brandsUsingIPResponse, collaborationResponse, brandIPUsageResponse, collabsEngagementResponse] = await Promise.all([
      fetch('/data/PlayFlyFull_roster_teams.json'),
      fetch('/data/unique_brands_per_school.json'),
      fetch('/data/sponsored_athletes_per_school.json'),
      fetch('/data/unique_brands_using_ip_per_school.json'),
      fetch('/data/school_collaboration_posts_per_school.json'),
      fetch('/data/ip_use_by_brands_per_school.json'),
      fetch('/data/collabs_engagement_per_school.json')
    ]);

    if (!teamsResponse.ok || !brandsResponse.ok || !athletesResponse.ok || !brandsUsingIPResponse.ok || !collaborationResponse.ok || !brandIPUsageResponse.ok || !collabsEngagementResponse.ok) {
      throw new Error('HTTP error loading data files');
    }

    const [data, brandsData, athletesData, brandsUsingIPData, collaborationData, brandIPUsageData, collabsEngagementData] = await Promise.all([
      teamsResponse.json() as Promise<PlayflySchoolData[]>,
      brandsResponse.json() as Promise<BrandCountData[]>,
      athletesResponse.json() as Promise<AthleteCountData[]>,
      brandsUsingIPResponse.json() as Promise<BrandsUsingIPData[]>,
      collaborationResponse.json() as Promise<CollaborationPostsData[]>,
      brandIPUsageResponse.json() as Promise<BrandIPUsageData[]>,
      collabsEngagementResponse.json() as Promise<CollaborationEngagementData>
    ]);

    // Create lookup maps for brands and athletes
    const brandCountMap = new Map<string, number>();
    brandsData.forEach(item => {
      const normalized = normalizeSchoolName(item._id);
      brandCountMap.set(normalized, item.uniqueBrands);
    });

    const athleteCountMap = new Map<string, number>();
    athletesData.forEach(item => {
      const normalized = normalizeSchoolName(item._id);
      athleteCountMap.set(normalized, item.sponsoredAthletes);
    });

    const brandsUsingIPMap = new Map<string, number>();
    brandsUsingIPData.forEach(item => {
      const normalized = normalizeSchoolName(item._id);
      brandsUsingIPMap.set(normalized, item.uniqueBrands);
    });

    const collaborationPostsMap = new Map<string, number>();
    collaborationData.forEach(item => {
      const normalized = normalizeSchoolName(item._id);
      collaborationPostsMap.set(normalized, item.isOrganizationCollaboration);
    });

    // Process brand IP usage data to get school-level aggregates
    const brandIPAggregatesMap = new Map<string, {
      totalSponsoredPosts: number;
      logoOnlyPosts: number;
      collaborationOnlyPosts: number;
      postsWithBoth: number;
      postsWithoutIP: number;
      totalLogoPosts: number;
      totalCollaborationPosts: number;
    }>();

    brandIPUsageData.forEach(schoolData => {
      const normalized = normalizeSchoolName(schoolData._id);

      let totalLogo = 0;
      let totalCollab = 0;
      let totalBoth = 0;
      let totalWithout = 0;

      schoolData.uniqueBrands.forEach(brand => {
        totalLogo += brand.postsWithSchoolLogo;
        totalCollab += brand.postsWithSchoolCollaboration;
        totalBoth += brand.postsWithBoth;
        totalWithout += brand.postsWithoutEither;
      });

      // Total posts with logo IP (including posts with both)
      const totalLogoPosts = totalLogo + totalBoth;
      // Total posts with collaboration IP (including posts with both)
      const totalCollaborationPosts = totalCollab + totalBoth;
      // Total sponsored posts
      const totalSponsored = totalLogo + totalCollab + totalBoth + totalWithout;

      brandIPAggregatesMap.set(normalized, {
        totalSponsoredPosts: totalSponsored,
        logoOnlyPosts: totalLogo,
        collaborationOnlyPosts: totalCollab,
        postsWithBoth: totalBoth,
        postsWithoutIP: totalWithout,
        totalLogoPosts,
        totalCollaborationPosts
      });
    });

    // Process logo and collaboration engagement data to get school-level aggregates
    const logoEngagementMap = new Map<string, {
      totalLogoPosts: number;
      totalLogoEngagement: number;
      totalNonLogoEngagement: number;
      avgLogoEngagementRate: number;
      avgNonLogoEngagementRate: number;
      logoLiftPercent: number;
    }>();

    const collabEngagementMap = new Map<string, {
      totalCollabPosts: number;
      totalCollabEngagement: number;
      totalNonCollabEngagement: number;
      totalNonCollabPosts: number;
      avgCollabEngagementRate: number;
      avgNonCollabEngagementRate: number;
      collabLiftPercent: number;
    }>();

    // Group engagement data by school and aggregate across sports
    const engagementBySchool = new Map<string, typeof collabsEngagementData.schools>();
    collabsEngagementData.schools.forEach(sport => {
      const normalized = normalizeSchoolName(sport.schoolName);
      if (OFFICIAL_PLAYFLY_SCHOOLS.includes(normalized)) {
        if (!engagementBySchool.has(normalized)) {
          engagementBySchool.set(normalized, []);
        }
        engagementBySchool.get(normalized)!.push(sport);
      }
    });

    // Aggregate logo engagement metrics for each school
    engagementBySchool.forEach((sports, schoolName) => {
      let totalLogoPosts = 0;
      let totalLogoLikes = 0;
      let totalLogoComments = 0;
      let totalNonLogoPosts = 0;
      let totalNonLogoLikes = 0;
      let totalNonLogoComments = 0;

      sports.forEach(sport => {
        const logoPosts = sport.logoContentCount;
        totalLogoPosts += logoPosts;

        if (logoPosts > 0) {
          totalLogoLikes += sport.avgLikesWithLogo * logoPosts;
          totalLogoComments += sport.avgCommentsWithLogo * logoPosts;
        }

        // Calculate non-logo engagement (avgLikesWithoutLogo represents posts without logo)
        // We'll estimate the number of non-logo posts from the engagement data
        if (sport.avgLikesWithoutLogo > 0 || sport.avgCommentsWithoutLogo > 0) {
          // Estimate based on presence - each sport contributes equally
          const estimatedNonLogoPosts = 1;
          totalNonLogoPosts += estimatedNonLogoPosts;
          totalNonLogoLikes += sport.avgLikesWithoutLogo * estimatedNonLogoPosts;
          totalNonLogoComments += sport.avgCommentsWithoutLogo * estimatedNonLogoPosts;
        }
      });

      const totalLogoEngagement = totalLogoLikes + totalLogoComments;
      const totalNonLogoEngagement = totalNonLogoLikes + totalNonLogoComments;
      const avgLogoEngagement = totalLogoPosts > 0 ? totalLogoEngagement / totalLogoPosts : 0;
      const avgNonLogoEngagement = totalNonLogoPosts > 0 ? totalNonLogoEngagement / totalNonLogoPosts : 0;

      // Calculate lift
      const logoLiftPercent = avgNonLogoEngagement > 0
        ? Math.round(((avgLogoEngagement - avgNonLogoEngagement) / avgNonLogoEngagement) * 100)
        : 0;

      logoEngagementMap.set(schoolName, {
        totalLogoPosts,
        totalLogoEngagement: Math.round(totalLogoEngagement),
        totalNonLogoEngagement: Math.round(totalNonLogoEngagement),
        avgLogoEngagementRate: 0, // Not used for now
        avgNonLogoEngagementRate: 0, // Not used for now
        logoLiftPercent
      });
    });

    // Aggregate collaboration metrics for each school
    engagementBySchool.forEach((sports, schoolName) => {
      let totalCollabPosts = 0;
      let weightedCollabEngagementSum = 0;
      let totalCollabLikes = 0;
      let totalCollabComments = 0;
      let totalNonCollabPosts = 0;
      let weightedNonCollabEngagementSum = 0;

      sports.forEach(sport => {
        const collabPosts = sport.organizationCollaborationContentCount;
        totalCollabPosts += collabPosts;

        if (collabPosts > 0) {
          // Weight engagement rate by number of posts
          weightedCollabEngagementSum += sport.avgEngagementRateWithOrganizationCollaboration * collabPosts;
          totalCollabLikes += sport.avgLikesWithOrganizationCollaboration * collabPosts;
          totalCollabComments += sport.avgCommentsWithOrganizationCollaboration * collabPosts;
        }

        // Calculate non-collaboration post counts (total posts minus collab posts)
        // We need this to calculate the weighted average for non-collab engagement
        // For now, we'll use a simple count based on the engagement data provided
        if (sport.avgEngagementRateWithoutOrganizationCollaboration > 0) {
          // Estimate non-collab posts - we don't have exact count, so we'll weight by presence
          const estimatedNonCollabPosts = 1; // Each sport contributes equally
          totalNonCollabPosts += estimatedNonCollabPosts;
          weightedNonCollabEngagementSum += sport.avgEngagementRateWithoutOrganizationCollaboration * estimatedNonCollabPosts;
        }
      });

      const avgCollabEngagementRate = totalCollabPosts > 0 ? weightedCollabEngagementSum / totalCollabPosts : 0;
      const avgNonCollabEngagementRate = totalNonCollabPosts > 0 ? weightedNonCollabEngagementSum / totalNonCollabPosts : 0;
      const totalCollabEngagement = totalCollabLikes + totalCollabComments;

      // Calculate lift
      const collabLiftPercent = avgNonCollabEngagementRate > 0
        ? Math.round(((avgCollabEngagementRate - avgNonCollabEngagementRate) / avgNonCollabEngagementRate) * 100)
        : 0;

      collabEngagementMap.set(schoolName, {
        totalCollabPosts: Math.round(totalCollabPosts), // Round to avoid fractional posts
        totalCollabEngagement: Math.round(totalCollabEngagement),
        totalNonCollabEngagement: 0, // Not needed for output
        totalNonCollabPosts,
        avgCollabEngagementRate,
        avgNonCollabEngagementRate,
        collabLiftPercent
      });
    });

    // Group by school and aggregate metrics
    const schoolMap = new Map<string, PlayflySchoolData[]>();

    data.forEach(entry => {
      const normalizedName = normalizeSchoolName(entry.schoolName);
      // Only include official Playfly schools
      if (OFFICIAL_PLAYFLY_SCHOOLS.includes(normalizedName)) {
        if (!schoolMap.has(normalizedName)) {
          schoolMap.set(normalizedName, []);
        }
        schoolMap.get(normalizedName)!.push(entry);
      }
    });

    // Transform to SchoolPerformance format
    const schools: SchoolPerformance[] = [];

    // First, process schools that have brand IP data (primary source)
    brandIPAggregatesMap.forEach((brandData, schoolName) => {
      // Only include official Playfly schools
      if (!OFFICIAL_PLAYFLY_SCHOOLS.includes(schoolName)) {
        return;
      }

      // Get logo engagement data from collabs_engagement_per_school
      const logoEngagementData = logoEngagementMap.get(schoolName);
      const logoEngagement = logoEngagementData?.totalLogoEngagement || 0;
      const nonLogoEngagement = logoEngagementData?.totalNonLogoEngagement || 0;

      // Get collaboration engagement data
      const collabEngagement = collabEngagementMap.get(schoolName);
      const collaborationEngagement = collabEngagement?.totalCollabEngagement || 0;
      const collaborationLift = collabEngagement?.collabLiftPercent || 0;

      // Use collabs_engagement_per_school for post counts to align with engagement calculations
      const postsWithLogo = logoEngagementData?.totalLogoPosts || 0;
      const totalCollaborationPosts = collabEngagement?.totalCollabPosts || 0;

      // Use brand IP data only for totals and without-IP counts
      const totalSponsoredPosts = brandData.totalSponsoredPosts;
      const postsWithoutLogo = brandData.postsWithoutIP;

      // Calculate total engagement (logo + collab, avoiding double counting posts with both)
      // For now, we'll sum them as the engagement file doesn't separate "both" category
      const totalEngagement = logoEngagement + collaborationEngagement;

      // Calculate lifts for logo IP
      const logoLift = logoEngagementData?.logoLiftPercent || 0;
      const engagementLift = logoLift; // Use the pre-calculated lift from the data

      // Get actual brand and athlete counts from data
      const actualBrandCount = brandCountMap.get(schoolName) || 0;
      const actualAthleteCount = athleteCountMap.get(schoolName) || 0;
      const actualBrandsUsingIP = brandsUsingIPMap.get(schoolName) || 0;

      schools.push({
        schoolId: createSchoolId(schoolName),
        schoolName,
        isPlayflyMax: isPlayflyMax(schoolName),
        totalSponsoredPosts,
        uniqueBrandCount: actualBrandCount,
        sponsoredAthletesCount: actualAthleteCount,
        totalEngagement,
        postsWithoutIP: postsWithoutLogo,
        engagementWithoutIP: Math.round(nonLogoEngagement),
        postsWithIP: postsWithLogo,
        engagementWithIP: Math.round(logoEngagement),
        engagementLiftPercent: engagementLift,
        logoPostCount: postsWithLogo,
        logoEngagement: Math.round(logoEngagement),
        logoLift,
        collaborationPostCount: totalCollaborationPosts,
        collaborationEngagement,
        collaborationLift,
        mentionPostCount: 0, // Not available in current data
        mentionEngagement: 0,
        mentionLift: 0,
        brandsUsingIP: actualBrandsUsingIP
      });
    });

    // Sort by total sponsored posts descending
    const sortedSchools = schools.sort((a, b) => b.totalSponsoredPosts - a.totalSponsoredPosts);
    return sortedSchools;

  } catch (error) {
    console.error('Error loading Playfly data:', error);
    return [];
  }
}

export interface BrandPerformance {
  brandName: string;
  postsWithIP: number;
  engagementWithIP: number;
  ipTypesUsed: ('Logo' | 'Collaboration')[];
  avgEngagementPerPost: number;
}

export async function loadTopBrandPartners(): Promise<BrandPerformance[]> {
  try {
    const [brandIPUsageResponse, collabsEngagementResponse] = await Promise.all([
      fetch('/data/ip_use_by_brands_per_school.json'),
      fetch('/data/collabs_engagement_per_school.json')
    ]);

    if (!brandIPUsageResponse.ok || !collabsEngagementResponse.ok) {
      throw new Error('HTTP error loading brand data files');
    }

    const [brandIPUsageData, collabsEngagementData] = await Promise.all([
      brandIPUsageResponse.json() as Promise<BrandIPUsageData[]>,
      collabsEngagementResponse.json() as Promise<CollaborationEngagementData>
    ]);

    // Calculate network-wide average engagement per post with IP
    const schoolEngagementMap = new Map<string, { avgLogoEngagement: number; avgCollabEngagement: number }>();

    const engagementBySchool = new Map<string, typeof collabsEngagementData.schools>();
    collabsEngagementData.schools.forEach(sport => {
      const normalized = normalizeSchoolName(sport.schoolName);
      if (!engagementBySchool.has(normalized)) {
        engagementBySchool.set(normalized, []);
      }
      engagementBySchool.get(normalized)!.push(sport);
    });

    engagementBySchool.forEach((sports, schoolName) => {
      let totalLogoEngagement = 0;
      let totalLogoPosts = 0;
      let totalCollabEngagement = 0;
      let totalCollabPosts = 0;

      sports.forEach(sport => {
        if (sport.logoContentCount > 0) {
          totalLogoEngagement += (sport.avgLikesWithLogo + sport.avgCommentsWithLogo) * sport.logoContentCount;
          totalLogoPosts += sport.logoContentCount;
        }
        if (sport.organizationCollaborationContentCount > 0) {
          totalCollabEngagement += (sport.avgLikesWithOrganizationCollaboration + sport.avgCommentsWithOrganizationCollaboration) * sport.organizationCollaborationContentCount;
          totalCollabPosts += sport.organizationCollaborationContentCount;
        }
      });

      schoolEngagementMap.set(schoolName, {
        avgLogoEngagement: totalLogoPosts > 0 ? totalLogoEngagement / totalLogoPosts : 0,
        avgCollabEngagement: totalCollabPosts > 0 ? totalCollabEngagement / totalCollabPosts : 0
      });
    });

    // Aggregate brand data across all schools
    const brandMap = new Map<string, {
      totalLogoPosts: number;
      totalCollabPosts: number;
      totalBothPosts: number;
      estimatedLogoEngagement: number;
      estimatedCollabEngagement: number;
    }>();

    brandIPUsageData.forEach(schoolData => {
      const normalized = normalizeSchoolName(schoolData._id);
      const schoolEngagement = schoolEngagementMap.get(normalized);

      if (!schoolEngagement) return;

      schoolData.uniqueBrands.forEach(brand => {
        const brandKey = brand.name.toUpperCase();

        if (!brandMap.has(brandKey)) {
          brandMap.set(brandKey, {
            totalLogoPosts: 0,
            totalCollabPosts: 0,
            totalBothPosts: 0,
            estimatedLogoEngagement: 0,
            estimatedCollabEngagement: 0
          });
        }

        const brandData = brandMap.get(brandKey)!;
        brandData.totalLogoPosts += brand.postsWithSchoolLogo;
        brandData.totalCollabPosts += brand.postsWithSchoolCollaboration;
        brandData.totalBothPosts += brand.postsWithBoth;

        // Estimate engagement using school-level averages
        brandData.estimatedLogoEngagement += (brand.postsWithSchoolLogo + brand.postsWithBoth) * schoolEngagement.avgLogoEngagement;
        brandData.estimatedCollabEngagement += (brand.postsWithSchoolCollaboration + brand.postsWithBoth) * schoolEngagement.avgCollabEngagement;
      });
    });

    // Convert to array and calculate metrics
    const brands: BrandPerformance[] = [];
    brandMap.forEach((data, brandName) => {
      const totalPostsWithIP = data.totalLogoPosts + data.totalCollabPosts + data.totalBothPosts;

      // Only include brands with posts using IP
      if (totalPostsWithIP === 0) return;

      const totalEngagement = data.estimatedLogoEngagement + data.estimatedCollabEngagement;
      const ipTypesUsed: ('Logo' | 'Collaboration')[] = [];

      if (data.totalLogoPosts > 0 || data.totalBothPosts > 0) ipTypesUsed.push('Logo');
      if (data.totalCollabPosts > 0 || data.totalBothPosts > 0) ipTypesUsed.push('Collaboration');

      brands.push({
        brandName: formatBrandName(brandName),
        postsWithIP: totalPostsWithIP,
        engagementWithIP: Math.round(totalEngagement),
        ipTypesUsed,
        avgEngagementPerPost: Math.round(totalEngagement / totalPostsWithIP)
      });
    });

    // Sort by total engagement and return top 10
    return brands
      .sort((a, b) => b.engagementWithIP - a.engagementWithIP)
      .slice(0, 10);

  } catch (error) {
    console.error('Error loading brand data:', error);
    return [];
  }
}

function formatBrandName(name: string): string {
  // Convert from uppercase to title case and clean up
  return name
    .split(/(?=[A-Z0-9])/)
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ')
    .trim();
}
