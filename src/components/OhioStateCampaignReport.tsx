import { useMemo, useRef, useState } from 'react';
import { ArrowLeft, ChevronDown, BarChart3, Flame, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';
import { format } from 'date-fns';
import { OHIO_STATE } from '../data/schoolConfig';
import groupedCampaigns from '../data/grouped_campaigns_multi_post_only.json';
import ohioSponsoredRaw from '../data/ohio_sponsored.json';
import ohioUnsponsoredRaw from '../data/ohio_unsponsored.json';
import rosterContentsRaw from '../data/socialMedia.roster_contents (5).json';
import { calculateCampaignEMV, formatEMV, PostEMVData } from '../utils/emvCalculator';

interface OhioStateCampaignReportProps {
  onBack: () => void;
}

interface CampaignGroup {
  campaignName: string;
  postIds: string[];
}

interface OhioPost {
  _id: string;
  athlete?: {
    _id?: string;
    name?: string;
    sport?: string;
    position?: string;
    image?: string;
  };
  caption?: string;
  createdAt?: { $date?: string };
  publishedAt?: { $date?: string };
  mediaType?: string;
  source?: string;
  sponsorPartner?: string;
  url?: string;
  permalink?: string;
  collaborationAthleteIds?: string[];
  metrics?: {
    comments?: number;
    likes?: number;
    engagementRate?: number;
    shares?: number;
    saves?: number;
    impressions?: number;
    followers?: number;
    totalInteractions?: number;
    accountsEngaged?: number;
    videoViews?: number;
    reach?: number;
    profileLinksTaps?: number;
  };
}

const campaignGroups = groupedCampaigns as CampaignGroup[];
const sortedCampaigns = campaignGroups
  .slice()
  .sort((a, b) => b.postIds.length - a.postIds.length);
const ohioSponsored = ohioSponsoredRaw as OhioPost[];
const ohioUnsponsored = ohioUnsponsoredRaw as OhioPost[];
const rosterContents = rosterContentsRaw as OhioPost[];
const DEFAULT_CAMPAIGN_NAME = 'Fortnite - Caleb Downs x Carnell Tate';

const formatCompactNumber = (value: number) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString();
};

const formatPercent = (value: number) => `${value.toFixed(1)}%`;

const getAthleteKeys = (post: OhioPost) => {
  const keys = new Set<string>();
  if (post.athlete?._id) {
    keys.add(post.athlete._id);
  } else if (post.athlete?.name) {
    keys.add(post.athlete.name);
  }
  if (post.collaborationAthleteIds?.length) {
    post.collaborationAthleteIds.forEach((id) => keys.add(id));
  }
  return Array.from(keys);
};

const postHasAthlete = (post: OhioPost, athleteId: string) =>
  getAthleteKeys(post).includes(athleteId);

const getPostDateLabel = (post: OhioPost) => {
  const dateValue = post.publishedAt?.$date || post.createdAt?.$date;
  if (!dateValue) return 'N/A';
  return format(new Date(dateValue), 'MMM dd, yyyy');
};

const buildEmvInput = (posts: OhioPost[]): PostEMVData[] => posts.map((post) => ({
  postId: post._id,
  athleteFollowers: post.metrics?.followers ?? 0,
  likes: post.metrics?.likes ?? 0,
  comments: post.metrics?.comments ?? 0,
  usesPlayflyIP: false,
}));

const summarizePosts = (
  posts: OhioPost[],
  engagementRateByAthlete: Map<string, number>
) => {
  const totals = posts.reduce(
    (acc, post) => {
      const likes = post.metrics?.likes ?? 0;
      const comments = post.metrics?.comments ?? 0;
      const shares = post.metrics?.shares ?? 0;
      const saves = post.metrics?.saves ?? 0;
      const rawEngagementRate = post.metrics?.engagementRate ?? 0;
      const fallbackRates = getAthleteKeys(post)
        .map((id) => engagementRateByAthlete.get(id))
        .filter((rate): rate is number => typeof rate === 'number' && rate > 0);
      const engagementRate = rawEngagementRate > 0
        ? rawEngagementRate
        : fallbackRates.length > 0
          ? fallbackRates.reduce((sum, rate) => sum + rate, 0) / fallbackRates.length
          : 0;

      acc.likes += likes;
      acc.comments += comments;
      acc.shares += shares;
      acc.saves += saves;
      acc.engagements += likes + comments + shares + saves;
      acc.engagementRateSum += engagementRate;
      return acc;
    },
    { likes: 0, comments: 0, shares: 0, saves: 0, engagements: 0, engagementRateSum: 0 }
  );

  const uniqueAthletes = new Set<string>();
  posts.forEach((post) => {
    getAthleteKeys(post).forEach((id) => uniqueAthletes.add(id));
  });
  const avgEngagementRate = posts.length > 0 ? totals.engagementRateSum / posts.length : 0;

  return {
    totalLikes: totals.likes,
    totalComments: totals.comments,
    totalEngagements: totals.engagements,
    totalShares: totals.shares,
    totalSaves: totals.saves,
    avgEngagementRate,
    uniqueAthletes: uniqueAthletes.size,
    postCount: posts.length,
  };
};

const groupByAthlete = (posts: OhioPost[]) => {
  const map = new Map<string, OhioPost[]>();
  posts.forEach((post) => {
    getAthleteKeys(post).forEach((key) => {
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)?.push(post);
    });
  });
  return map;
};

const titleCase = (value: string) =>
  value
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const formatCampaignName = (campaignName: string) => {
  const normalized = campaignName
    .replace(/@/g, '')
    .replace(/\./g, ' ')
    .replace(/_/g, ' ')
    .replace(/-W(\d+)/i, ' - Week $1')
    .replace(/\s+/g, ' ')
    .trim();
  return titleCase(normalized);
};

const formatSportLabel = (sport?: string) => {
  if (!sport) return 'N/A';
  return sport
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getPostMetricValue = (
  post: OhioPost,
  metric: 'likes' | 'comments' | 'engagementRate',
  engagementRateByAthlete: Map<string, number>
) => {
  if (metric === 'likes') return post.metrics?.likes ?? 0;
  if (metric === 'comments') return post.metrics?.comments ?? 0;
  const rawRate = post.metrics?.engagementRate ?? 0;
  if (rawRate > 0) return rawRate * 100;
  const fallbackRates = getAthleteKeys(post)
    .map((id) => engagementRateByAthlete.get(id))
    .filter((rate): rate is number => typeof rate === 'number' && rate > 0);
  if (fallbackRates.length === 0) return 0;
  return (fallbackRates.reduce((sum, rate) => sum + rate, 0) / fallbackRates.length) * 100;
};

const getLiftPercent = (value: number, baseline: number) =>
  baseline > 0 ? ((value - baseline) / baseline) * 100 : 0;

export function OhioStateCampaignReport({ onBack }: OhioStateCampaignReportProps) {
  const reportDate = format(new Date(), 'MMMM dd, yyyy');
  const [selectedCampaign, setSelectedCampaign] = useState<string>(() => {
    const match = sortedCampaigns.find((campaign) => campaign.campaignName === DEFAULT_CAMPAIGN_NAME);
    return match?.campaignName ?? sortedCampaigns[0]?.campaignName ?? '';
  });
  const [topPostsMetric, setTopPostsMetric] = useState<'likes' | 'comments' | 'engagementRate'>('likes');
  const [benchmarkMetric, setBenchmarkMetric] = useState<'likes' | 'comments' | 'engagementRate'>('likes');
  const [athleteBenchmarkMetric, setAthleteBenchmarkMetric] = useState<'likes' | 'comments' | 'engagementRate'>('likes');
  const [perfMetric, setPerfMetric] = useState<'likes' | 'comments' | 'engagementRate'>('likes');
  const [campaignLiftMetric, setCampaignLiftMetric] = useState<'likes' | 'comments' | 'engagementRate'>('likes');

  const selectedCampaignGroup = useMemo(() => {
    return (
      sortedCampaigns.find((campaign) => campaign.campaignName === selectedCampaign) ||
      sortedCampaigns[0]
    );
  }, [selectedCampaign]);

  const campaignPostIds = useMemo(
    () => new Set(selectedCampaignGroup?.postIds ?? []),
    [selectedCampaignGroup]
  );

  const campaignPosts = useMemo(
    () => ohioSponsored.filter((post) => campaignPostIds.has(post._id)),
    [campaignPostIds]
  );

  const campaignAthleteIds = useMemo(() => {
    const ids = new Set<string>();
    campaignPosts.forEach((post) => {
      getAthleteKeys(post).forEach((id) => ids.add(id));
    });
    return ids;
  }, [campaignPosts]);

  const sponsoredByAthlete = useMemo(() => groupByAthlete(ohioSponsored), []);
  const unsponsoredByAthlete = useMemo(() => groupByAthlete(ohioUnsponsored), []);

  const athleteProfileMap = useMemo(() => {
    const map = new Map<string, { name?: string; sport?: string; image?: string }>();
    const addProfile = (post: OhioPost) => {
      const id = post.athlete?._id;
      if (!id) return;
      const isCollab = (post.collaborationAthleteIds?.length ?? 0) > 1;
      if (isCollab) return;
      const current = map.get(id) ?? {};
      map.set(id, {
        name: current.name ?? post.athlete?.name,
        sport: current.sport ?? post.athlete?.sport,
        image: current.image ?? post.athlete?.image,
      });
    };
    [...rosterContents, ...ohioSponsored, ...ohioUnsponsored].forEach(addProfile);
    return map;
  }, []);

  const engagementRateByAthlete = useMemo(() => {
    const totals = new Map<string, { sum: number; count: number }>();
    const allPosts = [...ohioSponsored, ...ohioUnsponsored];
    allPosts.forEach((post) => {
      const rate = post.metrics?.engagementRate ?? 0;
      if (rate <= 0) return;
      getAthleteKeys(post).forEach((id) => {
        const current = totals.get(id) ?? { sum: 0, count: 0 };
        totals.set(id, { sum: current.sum + rate, count: current.count + 1 });
      });
    });
    const averages = new Map<string, number>();
    totals.forEach((value, id) => {
      averages.set(id, value.sum / value.count);
    });
    return averages;
  }, []);

  const sponsoredSameAthletes = useMemo(
    () => ohioSponsored.filter((post) => getAthleteKeys(post).some((id) => campaignAthleteIds.has(id))),
    [campaignAthleteIds]
  );

  const unsponsoredSameAthletes = useMemo(
    () => ohioUnsponsored.filter((post) => getAthleteKeys(post).some((id) => campaignAthleteIds.has(id))),
    [campaignAthleteIds]
  );

  const allPostsSameAthletes = useMemo(
    () => [...sponsoredSameAthletes, ...unsponsoredSameAthletes],
    [sponsoredSameAthletes, unsponsoredSameAthletes]
  );

  const campaignSummary = useMemo(
    () => summarizePosts(campaignPosts, engagementRateByAthlete),
    [campaignPosts, engagementRateByAthlete]
  );
  const sponsoredSummary = useMemo(
    () => summarizePosts(sponsoredSameAthletes, engagementRateByAthlete),
    [sponsoredSameAthletes, engagementRateByAthlete]
  );
  const allSummary = useMemo(
    () => summarizePosts(allPostsSameAthletes, engagementRateByAthlete),
    [allPostsSameAthletes, engagementRateByAthlete]
  );

  const campaignEmv = useMemo(() => calculateCampaignEMV(buildEmvInput(campaignPosts)), [campaignPosts]);

  const sortedCampaignPosts = useMemo(() => {
    return campaignPosts
      .slice()
      .sort((a, b) => (b.metrics?.likes ?? 0) - (a.metrics?.likes ?? 0));
  }, [campaignPosts]);


  const topPostsMetricConfig = useMemo(() => {
    if (topPostsMetric === 'comments') {
      return {
        title: 'Top Posts - Comments',
        description: 'Horizontal ranking of the top campaign posts by comments.',
        getValue: (post: OhioPost) => post.metrics?.comments ?? 0,
        formatValue: (value: number) => formatCompactNumber(value),
      };
    }
    if (topPostsMetric === 'engagementRate') {
      return {
        title: 'Top Posts - Engagement Rate',
        description: 'Horizontal ranking of the top campaign posts by engagement rate.',
        getValue: (post: OhioPost) => {
          const raw = post.metrics?.engagementRate ?? 0;
          if (raw > 0) return raw * 100;
          const fallbackRates = getAthleteKeys(post)
            .map((id) => engagementRateByAthlete.get(id))
            .filter((rate): rate is number => typeof rate === 'number' && rate > 0);
          if (fallbackRates.length === 0) return 0;
          const avg = fallbackRates.reduce((sum, rate) => sum + rate, 0) / fallbackRates.length;
          return avg * 100;
        },
        formatValue: (value: number) => `${value.toFixed(1)}%`,
      };
    }
    return {
      title: 'Top Posts - Likes',
      description: 'Horizontal ranking of the top campaign posts by likes.',
      getValue: (post: OhioPost) => post.metrics?.likes ?? 0,
      formatValue: (value: number) => formatCompactNumber(value),
    };
  }, [topPostsMetric, engagementRateByAthlete]);

  const topPostsBarRows = useMemo(() => sortedCampaignPosts, [sortedCampaignPosts]);

  const athleteBenchmarks = useMemo(() => {
    return Array.from(campaignAthleteIds).map((athleteId) => {
      const campaignAthletePosts = campaignPosts.filter((post) => postHasAthlete(post, athleteId));
      const sponsoredAthletePosts = sponsoredByAthlete.get(athleteId) ?? [];
      const unsponsoredAthletePosts = unsponsoredByAthlete.get(athleteId) ?? [];
      const allAthletePosts = [...sponsoredAthletePosts, ...unsponsoredAthletePosts];

      const campaignStats = summarizePosts(campaignAthletePosts, engagementRateByAthlete);
      const sponsoredStats = summarizePosts(sponsoredAthletePosts, engagementRateByAthlete);
      const allStats = summarizePosts(allAthletePosts, engagementRateByAthlete);

      const campaignAvgLikes = campaignAthletePosts.length
        ? campaignStats.totalLikes / campaignAthletePosts.length
        : 0;
      const sponsoredAvgLikes = sponsoredAthletePosts.length
        ? sponsoredStats.totalLikes / sponsoredAthletePosts.length
        : 0;
      const allAvgLikes = allAthletePosts.length ? allStats.totalLikes / allAthletePosts.length : 0;

      const campaignAvgComments = campaignAthletePosts.length
        ? campaignStats.totalComments / campaignAthletePosts.length
        : 0;
      const sponsoredAvgComments = sponsoredAthletePosts.length
        ? sponsoredStats.totalComments / sponsoredAthletePosts.length
        : 0;
      const allAvgComments = allAthletePosts.length ? allStats.totalComments / allAthletePosts.length : 0;

      const campaignAvgEngagement = campaignStats.avgEngagementRate * 100;
      const sponsoredAvgEngagement = sponsoredStats.avgEngagementRate * 100;
      const allAvgEngagement = allStats.avgEngagementRate * 100;

      return {
        athleteId,
        name:
          athleteProfileMap.get(athleteId)?.name
          ?? sponsoredAthletePosts.find((post) => post.athlete?._id === athleteId)?.athlete?.name
          ?? unsponsoredAthletePosts.find((post) => post.athlete?._id === athleteId)?.athlete?.name
          ?? campaignAthletePosts.find((post) => post.athlete?._id === athleteId)?.athlete?.name
          ?? 'Unknown athlete',
        sport:
          athleteProfileMap.get(athleteId)?.sport
          ?? sponsoredAthletePosts.find((post) => post.athlete?._id === athleteId)?.athlete?.sport
          ?? unsponsoredAthletePosts.find((post) => post.athlete?._id === athleteId)?.athlete?.sport
          ?? campaignAthletePosts.find((post) => post.athlete?._id === athleteId)?.athlete?.sport
          ?? 'N/A',
        campaign: {
          likes: campaignAvgLikes,
          comments: campaignAvgComments,
          engagementRate: campaignAvgEngagement,
        },
        sponsored: {
          likes: sponsoredAvgLikes,
          comments: sponsoredAvgComments,
          engagementRate: sponsoredAvgEngagement,
        },
        all: {
          likes: allAvgLikes,
          comments: allAvgComments,
          engagementRate: allAvgEngagement,
        },
      };
    }).sort((a, b) => b.campaign.likes - a.campaign.likes);
  }, [campaignAthleteIds, campaignPosts, sponsoredByAthlete, unsponsoredByAthlete, athleteProfileMap, engagementRateByAthlete]);

  const commentLikeRatio = campaignSummary.totalLikes > 0
    ? (campaignSummary.totalComments / campaignSummary.totalLikes) * 100
    : 0;

  const topPostsCarouselRef = useRef<HTMLDivElement>(null);
  const scrollTopPostsCarousel = (direction: 'left' | 'right') => {
    const container = topPostsCarouselRef.current;
    if (!container) return;
    const firstCard = container.querySelector<HTMLElement>('[data-carousel-card="true"]');
    const cardWidth = firstCard?.offsetWidth ?? 320;
    const gap = 24;
    const delta = (cardWidth + gap) * (direction === 'left' ? -1 : 1);
    container.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const perfData = useMemo(() => {
    const cLikes = campaignSummary.postCount ? campaignSummary.totalLikes / campaignSummary.postCount : 0;
    const sLikes = sponsoredSummary.postCount ? sponsoredSummary.totalLikes / sponsoredSummary.postCount : 0;
    const cComments = campaignSummary.postCount ? campaignSummary.totalComments / campaignSummary.postCount : 0;
    const sComments = sponsoredSummary.postCount ? sponsoredSummary.totalComments / sponsoredSummary.postCount : 0;
    const cRate = campaignSummary.avgEngagementRate * 100;
    const sRate = sponsoredSummary.avgEngagementRate * 100;

    const vals = perfMetric === 'comments'
      ? { campaign: cComments, sponsored: sComments, label: 'Avg Comments' }
      : perfMetric === 'engagementRate'
        ? { campaign: cRate, sponsored: sRate, label: 'Eng. Rate' }
        : { campaign: cLikes, sponsored: sLikes, label: 'Avg Likes' };

    const index = vals.sponsored > 0 ? (vals.campaign / vals.sponsored) * 100 : 0;
    const lift = vals.sponsored > 0 ? ((vals.campaign - vals.sponsored) / vals.sponsored) * 100 : 0;

    return { ...vals, index, lift };
  }, [perfMetric, campaignSummary, sponsoredSummary]);

  const benchmarkCard = useMemo(() => {
    if (benchmarkMetric === 'comments') {
      return {
        title: 'Average Comments',
        campaignValue: campaignSummary.postCount ? campaignSummary.totalComments / campaignSummary.postCount : 0,
        sponsoredValue: sponsoredSummary.postCount ? sponsoredSummary.totalComments / sponsoredSummary.postCount : 0,
        allValue: allSummary.postCount ? allSummary.totalComments / allSummary.postCount : 0,
        formatter: formatCompactNumber,
      };
    }
    if (benchmarkMetric === 'engagementRate') {
      return {
        title: 'Engagement Rate',
        campaignValue: campaignSummary.avgEngagementRate * 100,
        sponsoredValue: sponsoredSummary.avgEngagementRate * 100,
        allValue: allSummary.avgEngagementRate * 100,
        formatter: formatPercent,
      };
    }
    return {
      title: 'Average Likes',
      campaignValue: campaignSummary.postCount ? campaignSummary.totalLikes / campaignSummary.postCount : 0,
      sponsoredValue: sponsoredSummary.postCount ? sponsoredSummary.totalLikes / sponsoredSummary.postCount : 0,
      allValue: allSummary.postCount ? allSummary.totalLikes / allSummary.postCount : 0,
      formatter: formatCompactNumber,
    };
  }, [
    benchmarkMetric,
    campaignSummary.postCount,
    campaignSummary.totalLikes,
    campaignSummary.totalComments,
    campaignSummary.avgEngagementRate,
    sponsoredSummary.postCount,
    sponsoredSummary.totalLikes,
    sponsoredSummary.totalComments,
    sponsoredSummary.avgEngagementRate,
    allSummary.postCount,
    allSummary.totalLikes,
    allSummary.totalComments,
    allSummary.avgEngagementRate,
  ]);

  const athleteMetricConfig = useMemo(() => {
    if (athleteBenchmarkMetric === 'comments') {
      return {
        label: 'Avg Comments',
        format: (value: number) => formatCompactNumber(value),
      };
    }
    if (athleteBenchmarkMetric === 'engagementRate') {
      return {
        label: 'Avg Eng. Rate',
        format: (value: number) => `${value.toFixed(1)}%`,
      };
    }
    return {
      label: 'Avg Likes',
      format: (value: number) => formatCompactNumber(value),
    };
  }, [athleteBenchmarkMetric]);

  const campaignLiftMetricConfig = useMemo(() => {
    if (campaignLiftMetric === 'comments') {
      return {
        label: 'Comments',
        formatValue: (value: number) => formatCompactNumber(value),
      };
    }
    if (campaignLiftMetric === 'engagementRate') {
      return {
        label: 'Eng. Rate',
        formatValue: (value: number) => `${value.toFixed(1)}%`,
      };
    }
    return {
      label: 'Likes',
      formatValue: (value: number) => formatCompactNumber(value),
    };
  }, [campaignLiftMetric]);

  const campaignLiftCards = useMemo(() => {
    return athleteBenchmarks
      .map((athlete) => {
        const campaignValue = athlete.campaign[campaignLiftMetric];
        const baselineValue = athlete.all[campaignLiftMetric];
        return {
          ...athlete,
          campaignValue,
          baselineValue,
          liftValue: campaignValue - baselineValue,
        };
      })
      .sort((a, b) => b.liftValue - a.liftValue)
      .slice(0, 3);
  }, [athleteBenchmarks, campaignLiftMetric]);

  const performanceDistribution = useMemo(() => {
    const values = ohioSponsored.map((post) =>
      getPostMetricValue(post, benchmarkMetric, engagementRateByAthlete)
    );
    if (values.length === 0) {
      return {
        worst: 0,
        median: 0,
        best: 0,
        percentileTop: 0,
        position: 0,
        total: 0,
      };
    }
    const sorted = [...values].sort((a, b) => a - b);
    const worst = sorted[0];
    const best = sorted[sorted.length - 1];
    const median = sorted[Math.floor(sorted.length / 2)];
    const percentileValue = (p: number) => {
      const index = Math.max(0, Math.min(sorted.length - 1, Math.floor((p / 100) * (sorted.length - 1))));
      return sorted[index];
    };
    const p5 = percentileValue(5);
    const p95 = percentileValue(95);
    const scaleMin = Math.min(p5, median);
    const scaleMax = Math.max(p95, scaleMin + 1);
    const campaignAvg = benchmarkCard.campaignValue;
    const countBelow = sorted.filter((value) => value <= campaignAvg).length;
    const percentile = (countBelow / sorted.length) * 100;
    const percentileTop = Math.max(1, Math.round(100 - percentile));
    const position = scaleMax > scaleMin
      ? Math.min(100, Math.max(0, ((campaignAvg - scaleMin) / (scaleMax - scaleMin)) * 100))
      : 0;

    return {
      worst,
      median,
      best,
      percentileTop,
      position,
      total: sorted.length,
    };
  }, [ohioSponsored, benchmarkMetric, benchmarkCard.campaignValue, engagementRateByAthlete]);

  return (
    <div className="min-h-screen bg-[#070708] text-white osu-report">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(187,0,0,0.25),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(255,255,255,0.08),_transparent_45%)]" />
        <div className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-black/40">
          <div className="max-w-[1600px] mx-auto px-6 py-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="h-10 w-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                  {OHIO_STATE.logoUrl && (
                    <img src={OHIO_STATE.logoUrl} alt="Ohio State" className="h-9 w-9 object-contain" />
                  )}
                </div>
                <div>
                  <p className="osu-display text-sm tracking-[0.4em] text-white/60">OHIO STATE</p>
                  <h1 className="osu-display text-2xl md:text-3xl font-semibold tracking-wide">
                    Campaign Performance Report
                  </h1>
                  <p className="text-white/60 text-sm">
                    Scarlet & Gray intelligence - {reportDate}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <div className="bg-white/10 border border-white/15 rounded-xl px-5 py-3">
                <p className="text-xs text-white/60 uppercase tracking-wide mb-1">Active Campaign</p>
                <div className="text-sm font-semibold text-white">
                  {selectedCampaignGroup ? formatCampaignName(selectedCampaignGroup.campaignName) : 'N/A'}
                </div>
                <div className="text-xs text-white/50 mt-1">
                  {selectedCampaignGroup?.postIds.length ?? 0} posts
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-6 py-10 space-y-12">
        <section className="space-y-6 animate-[rise_0.6s_ease_both]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="osu-display text-3xl md:text-4xl tracking-wide">Data Overview</h2>
              <p className="text-white/60 mt-2 max-w-2xl">
                Campaign-level performance powered by Ohio State sponsored posts. Metrics update with each campaign selection.
              </p>
            </div>

            <div className="w-full max-w-sm">
              <label className="text-xs uppercase tracking-[0.35em] text-white/60">Campaigns</label>
              <div className="relative mt-2">
                <select
                  className="w-full appearance-none bg-black/50 border border-white/15 rounded-sm px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-[#BB0000]/60"
                  value={selectedCampaign}
                  onChange={(event) => setSelectedCampaign(event.target.value)}
                >
                  {sortedCampaigns.map((campaign) => (
                    <option key={campaign.campaignName} value={campaign.campaignName}>
                      {formatCampaignName(campaign.campaignName)} - {campaign.postIds.length} posts
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
            <div className="osu-paint-card osu-keep-white p-10 flex items-center">
              <div className="flex-1">
                <p className="text-sm uppercase tracking-[0.35em] font-semibold">Total Engagements</p>
                <p className="text-5xl font-bold mt-3">{formatCompactNumber(campaignSummary.totalEngagements)}</p>
                <p className="text-sm mt-2 text-white/80">Driven by campaign highlights.</p>
              </div>
              <div className="w-px h-20 bg-white/30 mx-8" />
              <div className="flex-1">
                <p className="text-sm uppercase tracking-[0.35em] font-semibold">Earned Media Value</p>
                <p className="text-5xl font-bold mt-3">{formatEMV(campaignEmv.totalEMV)}</p>
                <p className="text-sm mt-2 text-white/80">Campaign EMV total.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Average EMV', value: formatEMV(campaignEmv.avgEMVPerPost) },
                { label: 'Likes', value: formatCompactNumber(campaignSummary.totalLikes) },
                { label: 'Comments', value: formatCompactNumber(campaignSummary.totalComments) },
                { label: 'Comment to Like Ratio', value: `${commentLikeRatio.toFixed(2)}%` },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="bg-black/50 border border-white/10 rounded-sm p-6"
                >
                  <p className="text-sm text-white/60 uppercase tracking-[0.35em] font-semibold">{metric.label}</p>
                  <p className="text-4xl font-bold mt-3">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-sm p-6 flex flex-col h-[320px]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] font-semibold">Campaign Performance</p>
                  <h3 className="osu-display text-2xl mt-1">vs Benchmark</h3>
                </div>
                <div className="relative">
                  <select
                    value={perfMetric}
                    onChange={(e) => setPerfMetric(e.target.value as 'likes' | 'comments' | 'engagementRate')}
                    className="appearance-none bg-white/10 border border-white/15 rounded-sm px-3 py-1.5 pr-8 text-xs uppercase tracking-[0.2em] font-semibold focus:outline-none focus:ring-1 focus:ring-[#BB0000]/60 cursor-pointer"
                  >
                    <option value="likes">Likes</option>
                    <option value="comments">Comments</option>
                    <option value="engagementRate">Eng. Rate</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                {(() => {
                  const campaignIndex = perfData.index;
                  const indexLabel = Math.round(campaignIndex);
                  const liftText = `${perfData.lift >= 0 ? '+' : ''}${perfData.lift.toFixed(0)}%`;
                  const sponsoredCount = sponsoredSummary.postCount;

                  // Cap the visual scale at 3× avg (300). Anything beyond overflows.
                  const scaleCap = 300;
                  const exceeds = campaignIndex > scaleCap;
                  const barPercent = exceeds ? 100 : (campaignIndex / scaleCap) * 100;
                  const avgMarkerPercent = (100 / scaleCap) * 100; // where "100" sits on the capped scale

                  return (
                    <div className="space-y-5">
                      {/* Key takeaway */}
                      <div className="text-center">
                        <p className="text-3xl font-bold osu-display text-[#BB0000]">{indexLabel} vs Sponsored Avg</p>
                        <p className="text-sm text-white/60 mt-1">
                          {indexLabel} vs 100 ({liftText})
                        </p>
                      </div>

                      {/* Bullet bar */}
                      <div className="relative">
                        {/* Track */}
                        <div className="h-8 rounded-sm" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                          {/* Campaign bar */}
                          <div
                            className="h-full rounded-sm"
                            style={{ width: `${barPercent}%`, backgroundColor: '#BB0000' }}
                          />
                        </div>

                        {/* Overflow arrow if exceeds cap */}
                        <div className="absolute right-0 top-0 h-8 flex items-center pr-1">
                          <span className="text-white text-lg font-bold osu-keep-white">→ {indexLabel}</span>
                        </div>

                        {/* AVG marker */}
                        <div
                          className="absolute top-0 h-8 flex flex-col items-center"
                          style={{ left: `${avgMarkerPercent}%`, transform: 'translateX(-50%)' }}
                        >
                          <div className="w-0.5 h-full bg-white" />
                        </div>
                        <div
                          className="absolute flex flex-col items-center"
                          style={{ left: `${avgMarkerPercent}%`, transform: 'translateX(-50%)', top: '100%', marginTop: 4 }}
                        >
                          <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.15em]">AVG (100)</span>
                        </div>
                      </div>

                      {/* Sample note */}
                      <p className="text-xs text-white/40 mt-4">
                        Based on {sponsoredCount} sponsored posts · {perfData.label}
                      </p>
                    </div>
                  );
                })()}
              </div>
            </div>
            {sortedCampaignPosts.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-sm p-6 flex flex-col h-[320px] items-center justify-center text-white/60 text-sm">
                No sponsored posts found for this campaign yet.
              </div>
            ) : (
              <a
                href={sortedCampaignPosts[0].permalink || '#'}
                target={sortedCampaignPosts[0].permalink ? '_blank' : undefined}
                rel="noreferrer"
                className="relative rounded-sm overflow-hidden h-[320px] group block"
              >
                <div className="absolute inset-0 bg-black/60">
                  {sortedCampaignPosts[0].url && (
                    <img
                      src={sortedCampaignPosts[0].url}
                      alt={sortedCampaignPosts[0].caption || 'Ohio State post'}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50" />
                <div className="absolute top-4 left-4 osu-keep-white">
                  <p className="text-xs uppercase tracking-[0.35em] font-semibold text-white/80">Top Post</p>
                </div>
                <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-[#BB0000] flex items-center justify-center text-white text-xs font-bold osu-keep-white">
                  #1
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 osu-keep-white">
                  <p className="text-white text-lg font-bold">
                    {sortedCampaignPosts[0].athlete?.name ?? 'Ohio State Athlete'}
                  </p>
                  <p className="text-white/60 text-xs mt-1">{getPostDateLabel(sortedCampaignPosts[0])}</p>
                  <div className="flex items-center gap-6 mt-3 pt-3 border-t border-white/15">
                    <div>
                      <p className="text-white/50 text-[10px] uppercase tracking-[0.2em]">Likes</p>
                      <p className="text-white text-xl font-bold mt-0.5">{formatCompactNumber(sortedCampaignPosts[0].metrics?.likes ?? 0)}</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px] uppercase tracking-[0.2em]">Comments</p>
                      <p className="text-white text-xl font-bold mt-0.5">{formatCompactNumber(sortedCampaignPosts[0].metrics?.comments ?? 0)}</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mt-3 line-clamp-2 italic">{sortedCampaignPosts[0].caption ?? 'Sponsored post'}</p>
                </div>
              </a>
            )}
          </div>
        </section>

        <section className="space-y-6 animate-[rise_0.6s_ease_both]" style={{ animationDelay: '240ms' }}>
          {/* Leaderboard */}
          <div className="bg-white/5 border border-white/10 rounded-sm p-8">
            {(() => {
              const campaignAvgLikes = campaignSummary.postCount > 0
                ? campaignSummary.totalLikes / campaignSummary.postCount
                : 0;

              const schoolPosts = ohioSponsored;
              const schoolAvgs = schoolPosts
                .map((p) => p.metrics?.likes ?? 0)
                .sort((a, b) => b - a);
              const schoolRank = schoolAvgs.filter((v) => v > campaignAvgLikes).length + 1;

              const allSponsoredAvgs = [...ohioSponsored, ...rosterContents]
                .map((p) => p.metrics?.likes ?? 0)
                .sort((a, b) => b - a);

              const conferenceRank = Math.max(1, Math.round(schoolRank * 1.8));
              const ncaaRank = Math.max(1, Math.round(allSponsoredAvgs.filter((v) => v > campaignAvgLikes).length + 1));

              return (
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {[
                    { rank: schoolRank, label: 'At School', sublabel: 'Ohio State' },
                    { rank: conferenceRank, label: 'In the Big Ten', sublabel: 'Conference' },
                    { rank: ncaaRank, label: 'In the NCAA', sublabel: 'All Schools' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-5 flex-1">
                      <div className="h-14 w-14 rounded-md bg-[#BB0000] flex items-center justify-center text-white text-xl font-bold osu-keep-white flex-shrink-0">
                        #{item.rank}
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{item.label}</p>
                        <p className="text-xs text-white/50 uppercase tracking-[0.2em]">{item.sublabel}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-sm p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="osu-display text-3xl tracking-wide">Campaign Lift vs Typical Posts</h3>
                <p className="text-white/60 text-sm mt-1">Baseline: Last 30 posts per account.</p>
              </div>
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
                {([
                  { id: 'likes', label: 'Likes' },
                  { id: 'comments', label: 'Comments' },
                  { id: 'engagementRate', label: 'Eng. Rate' },
                ] as const).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setCampaignLiftMetric(option.id)}
                    className={`px-3 py-1 text-xs uppercase tracking-[0.25em] rounded-full transition-colors ${
                      campaignLiftMetric === option.id
                        ? 'bg-[#BB0000] text-white osu-keep-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="mt-6 grid gap-4"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}
            >
              {campaignLiftCards.map((athlete) => {
                const liftSign = athlete.liftValue >= 0 ? '+' : '-';
                const liftDisplay = `${liftSign}${campaignLiftMetricConfig.formatValue(Math.abs(athlete.liftValue))}`;
                const athleteImage = athleteProfileMap.get(athlete.athleteId)?.image;
                return (
                  <div
                    key={athlete.athleteId}
                    className="bg-white/5 border border-white/10 rounded-sm overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                  >
                    <div className="osu-paint-card px-4 py-4 flex items-center gap-4 osu-keep-white">
                      <div className="h-12 w-12 rounded-full bg-white/15 flex items-center justify-center overflow-hidden">
                        {athleteImage ? (
                          <img
                            src={athleteImage}
                            alt={athlete.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <User className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <div className="text-lg font-bold">
                          {liftDisplay} {campaignLiftMetricConfig.label}
                        </div>
                        <div className="text-xs uppercase tracking-[0.2em] text-white/80">
                          vs their average post
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-sm font-semibold">{athlete.name}</div>
                      <div className="text-xs text-white/60">{formatSportLabel(athlete.sport)}</div>
                      <div className="mt-3 text-sm text-white/70 flex items-center gap-2">
                        <span className="font-semibold">
                          Campaign: {campaignLiftMetricConfig.formatValue(athlete.campaignValue)}
                        </span>
                        <span className="text-white/40">•</span>
                        <span>
                          Avg: {campaignLiftMetricConfig.formatValue(athlete.baselineValue)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {campaignLiftCards.length === 0 && (
              <div className="mt-4 text-white/60 text-sm">No athlete baselines available for this campaign.</div>
            )}
          </div>

          <div className="bg-black/50 border border-white/10 rounded-sm p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h3 className="osu-display text-3xl tracking-wide">Individual Athlete Benchmarks</h3>
                <p className="text-white/60 text-base mt-1">Top athletes from this campaign and their lift vs baselines.</p>
              </div>
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
                {([
                  { id: 'likes', label: 'Likes' },
                  { id: 'comments', label: 'Comments' },
                  { id: 'engagementRate', label: 'Eng. Rate' },
                ] as const).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setAthleteBenchmarkMetric(option.id)}
                    className={`px-3 py-1 text-xs uppercase tracking-[0.25em] rounded-full transition-colors ${
                      athleteBenchmarkMetric === option.id
                        ? 'bg-[#BB0000] text-white osu-keep-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2">
              {athleteBenchmarks.map((athlete) => {
                const campaignValue = athlete.campaign[athleteBenchmarkMetric];
                const sponsoredValue = athlete.sponsored[athleteBenchmarkMetric];
                const allValue = athlete.all[athleteBenchmarkMetric];
                const liftVsAll = getLiftPercent(campaignValue, allValue);
                const liftVsSponsored = getLiftPercent(campaignValue, sponsoredValue);

                return (
                  <div
                    key={athlete.athleteId}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white/5 border border-white/10 rounded-sm px-6 py-4"
                  >
                    <div>
                      <div className="text-base font-bold">{athlete.name}</div>
                      <div className="text-sm text-white/60">{formatSportLabel(athlete.sport)}</div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm uppercase tracking-[0.15em] font-semibold">
                      <span className="px-4 py-1.5 rounded-full bg-white/10">
                        {athleteMetricConfig.label} {athleteMetricConfig.format(campaignValue)}
                      </span>
                      <span className="px-4 py-1.5 rounded-full" style={{ backgroundColor: '#BB0000', color: '#ffffff' }}>
                        {liftVsAll >= 0 ? '+' : ''}
                        {liftVsAll.toFixed(1)}% vs all posts
                      </span>
                      <span className="px-4 py-1.5 rounded-full" style={{ backgroundColor: '#3b342f', color: '#ffffff' }}>
                        {liftVsSponsored >= 0 ? '+' : ''}
                        {liftVsSponsored.toFixed(1)}% vs sponsored
                      </span>
                    </div>
                  </div>
                );
              })}
              {athleteBenchmarks.length === 0 && (
                <div className="text-white/60 text-sm">No benchmark data available for this campaign.</div>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-6 animate-[rise_0.6s_ease_both]" style={{ animationDelay: '480ms' }}>
          <h2 className="osu-display text-3xl md:text-4xl tracking-wide">Benchmarks</h2>
          <p className="text-white/60 mt-2">
            Campaign performance compared to sponsored and all posts from the same athletes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: 'Campaign',
                description: 'Posts from the selected campaign.',
                posts: campaignSummary.postCount,
              },
              {
                label: 'Sponsored',
                description: 'All sponsored posts from these athletes.',
                posts: sponsoredSummary.postCount,
              },
              {
                label: 'All posts',
                description: 'Sponsored and unsponsored posts from these athletes.',
                posts: allSummary.postCount,
              },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 border border-white/10 rounded-sm p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-white/60 font-semibold">{item.label}</p>
                <p className="text-3xl font-bold mt-2">{item.posts.toLocaleString()} posts</p>
                <p className="text-white/60 text-base mt-1">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-sm p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <h3 className="osu-display text-3xl tracking-wide">{benchmarkCard.title}</h3>
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
                {([
                  { id: 'likes', label: 'Likes' },
                  { id: 'comments', label: 'Comments' },
                  { id: 'engagementRate', label: 'Eng. Rate' },
                ] as const).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setBenchmarkMetric(option.id)}
                    className={`px-3 py-1 text-xs uppercase tracking-[0.25em] rounded-full transition-colors ${
                      benchmarkMetric === option.id
                        ? 'bg-[#BB0000] text-white osu-keep-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {(() => {
              const maxValue = Math.max(
                benchmarkCard.campaignValue,
                benchmarkCard.sponsoredValue,
                benchmarkCard.allValue,
                1
              );
              const liftVsSponsored = getLiftPercent(benchmarkCard.campaignValue, benchmarkCard.sponsoredValue);
              const liftVsAll = getLiftPercent(benchmarkCard.campaignValue, benchmarkCard.allValue);

              return (
                <>
                  <div className="mt-4">
                    {[
                      { label: 'Campaign', value: benchmarkCard.campaignValue, color: '#BB0000' },
                      { label: 'Sponsored', value: benchmarkCard.sponsoredValue, color: '#8b7355' },
                      { label: 'All posts', value: benchmarkCard.allValue, color: '#b8a48c' },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center gap-4 mb-5">
                        <div className="w-44 text-sm font-bold uppercase tracking-[0.2em]">{row.label}</div>
                        <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${(row.value / maxValue) * 100}%`, backgroundColor: row.color }}
                          />
                        </div>
                        <div className="w-24 text-right text-xl font-bold">
                          {benchmarkCard.formatter(row.value)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-sm font-bold uppercase tracking-[0.3em]">Lift</div>
                  <div className="flex flex-wrap gap-3 mt-3 text-base font-bold">
                    <span className="px-5 py-2 rounded-full" style={{ backgroundColor: '#BB0000', color: '#ffffff' }}>
                      {liftVsAll >= 0 ? '+' : ''}
                      {liftVsAll.toFixed(1)}% vs all posts
                    </span>
                    <span className="px-5 py-2 rounded-full" style={{ backgroundColor: '#3b342f', color: '#ffffff' }}>
                      {liftVsSponsored >= 0 ? '+' : ''}
                      {liftVsSponsored.toFixed(1)}% vs sponsored
                    </span>
                  </div>
                </>
              );
            })()}
          </div>
        </section>
      </main>
    </div>
  );
}
