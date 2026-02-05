import { useMemo, useState } from 'react';
import { ArrowLeft, ChevronDown, BarChart3, Flame } from 'lucide-react';
import { format } from 'date-fns';
import { OHIO_STATE } from '../data/schoolConfig';
import groupedCampaigns from '../data/grouped_campaigns_multi_post_only.json';
import ohioSponsoredRaw from '../data/ohio_sponsored.json';
import ohioUnsponsoredRaw from '../data/ohio_unsponsored.json';
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

const formatCompactNumber = (value: number) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString();
};

const formatPercent = (value: number) => `${value.toFixed(1)}%`;

const getAthleteKey = (post: OhioPost) => post.athlete?._id || post.athlete?.name || 'unknown';

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

const summarizePosts = (posts: OhioPost[]) => {
  const totals = posts.reduce(
    (acc, post) => {
      const likes = post.metrics?.likes ?? 0;
      const comments = post.metrics?.comments ?? 0;
      const shares = post.metrics?.shares ?? 0;
      const saves = post.metrics?.saves ?? 0;
      const engagementRate = post.metrics?.engagementRate ?? 0;

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

  const uniqueAthletes = new Set(posts.map(getAthleteKey));
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
    const key = getAthleteKey(post);
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)?.push(post);
  });
  return map;
};

const formatCampaignName = (campaignName: string) =>
  campaignName.replace(/_/g, ' ').replace(/-W(\d+)/, ' - W$1');

const getLiftPercent = (value: number, baseline: number) =>
  baseline > 0 ? ((value - baseline) / baseline) * 100 : 0;

export function OhioStateCampaignReport({ onBack }: OhioStateCampaignReportProps) {
  const reportDate = format(new Date(), 'MMMM dd, yyyy');
  const [selectedCampaign, setSelectedCampaign] = useState<string>(
    sortedCampaigns[0]?.campaignName ?? ''
  );

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

  const campaignAthleteIds = useMemo(
    () => new Set(campaignPosts.map(getAthleteKey)),
    [campaignPosts]
  );

  const sponsoredByAthlete = useMemo(() => groupByAthlete(ohioSponsored), []);
  const unsponsoredByAthlete = useMemo(() => groupByAthlete(ohioUnsponsored), []);

  const sponsoredSameAthletes = useMemo(
    () => ohioSponsored.filter((post) => campaignAthleteIds.has(getAthleteKey(post))),
    [campaignAthleteIds]
  );

  const unsponsoredSameAthletes = useMemo(
    () => ohioUnsponsored.filter((post) => campaignAthleteIds.has(getAthleteKey(post))),
    [campaignAthleteIds]
  );

  const allPostsSameAthletes = useMemo(
    () => [...sponsoredSameAthletes, ...unsponsoredSameAthletes],
    [sponsoredSameAthletes, unsponsoredSameAthletes]
  );

  const campaignSummary = useMemo(() => summarizePosts(campaignPosts), [campaignPosts]);
  const sponsoredSummary = useMemo(() => summarizePosts(sponsoredSameAthletes), [sponsoredSameAthletes]);
  const allSummary = useMemo(() => summarizePosts(allPostsSameAthletes), [allPostsSameAthletes]);

  const campaignEmv = useMemo(() => calculateCampaignEMV(buildEmvInput(campaignPosts)), [campaignPosts]);

  const topPosts = useMemo(() => {
    return campaignPosts
      .slice()
      .sort((a, b) => (b.metrics?.likes ?? 0) - (a.metrics?.likes ?? 0))
      .slice(0, 4);
  }, [campaignPosts]);

  const athleteBenchmarks = useMemo(() => {
    return Array.from(campaignAthleteIds).map((athleteId) => {
      const campaignAthletePosts = campaignPosts.filter((post) => getAthleteKey(post) === athleteId);
      const sponsoredAthletePosts = sponsoredByAthlete.get(athleteId) ?? [];
      const unsponsoredAthletePosts = unsponsoredByAthlete.get(athleteId) ?? [];
      const allAthletePosts = [...sponsoredAthletePosts, ...unsponsoredAthletePosts];

      const campaignStats = summarizePosts(campaignAthletePosts);
      const sponsoredStats = summarizePosts(sponsoredAthletePosts);
      const allStats = summarizePosts(allAthletePosts);

      const campaignAvgLikes = campaignAthletePosts.length
        ? campaignStats.totalLikes / campaignAthletePosts.length
        : 0;
      const sponsoredAvgLikes = sponsoredAthletePosts.length
        ? sponsoredStats.totalLikes / sponsoredAthletePosts.length
        : 0;
      const allAvgLikes = allAthletePosts.length ? allStats.totalLikes / allAthletePosts.length : 0;

      return {
        athleteId,
        name: campaignAthletePosts[0]?.athlete?.name ?? 'Unknown athlete',
        sport: campaignAthletePosts[0]?.athlete?.sport ?? 'N/A',
        campaignAvgLikes,
        liftVsSponsored: getLiftPercent(campaignAvgLikes, sponsoredAvgLikes),
        liftVsAll: getLiftPercent(campaignAvgLikes, allAvgLikes),
      };
    })
      .sort((a, b) => b.campaignAvgLikes - a.campaignAvgLikes)
      .slice(0, 5);
  }, [campaignAthleteIds, campaignPosts, sponsoredByAthlete, unsponsoredByAthlete]);

  const commentLikeRatio = campaignSummary.totalLikes > 0
    ? (campaignSummary.totalComments / campaignSummary.totalLikes) * 100
    : 0;

  const engagementMix = useMemo(() => {
    const likes = campaignSummary.totalLikes;
    const comments = campaignSummary.totalComments;
    const total = likes + comments;
    return {
      likes,
      comments,
      total,
      likesPct: total > 0 ? (likes / total) * 100 : 0,
      commentsPct: total > 0 ? (comments / total) * 100 : 0,
    };
  }, [campaignSummary.totalLikes, campaignSummary.totalComments]);

  const donutRadius = 52;
  const donutCircumference = 2 * Math.PI * donutRadius;
  const donutSegments = [
    { label: 'Likes', value: engagementMix.likes, pct: engagementMix.likesPct, color: '#BB0000' },
    { label: 'Comments', value: engagementMix.comments, pct: engagementMix.commentsPct, color: '#F2B9B9' },
  ];
  let donutOffset = 0;

  const benchmarkCards = [
    {
      title: 'Average Likes',
      campaignValue: campaignSummary.postCount ? campaignSummary.totalLikes / campaignSummary.postCount : 0,
      sponsoredValue: sponsoredSummary.postCount ? sponsoredSummary.totalLikes / sponsoredSummary.postCount : 0,
      allValue: allSummary.postCount ? allSummary.totalLikes / allSummary.postCount : 0,
      formatter: formatCompactNumber,
    },
    {
      title: 'Engagement Rate',
      campaignValue: campaignSummary.avgEngagementRate * 100,
      sponsoredValue: sponsoredSummary.avgEngagementRate * 100,
      allValue: allSummary.avgEngagementRate * 100,
      formatter: formatPercent,
    },
  ];

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
                  className="w-full appearance-none bg-black/50 border border-white/15 rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-[#BB0000]/60"
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: 'Athletes', value: campaignSummary.uniqueAthletes.toLocaleString() },
              { label: '# of Posts', value: campaignSummary.postCount.toLocaleString() },
              { label: 'EMV', value: formatEMV(campaignEmv.totalEMV) },
              { label: 'Average EMV', value: formatEMV(campaignEmv.avgEMVPerPost) },
            ].map((metric) => (
              <div
                key={metric.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
              >
                <p className="text-xs text-white/60 uppercase tracking-[0.35em]">{metric.label}</p>
                <p className="text-3xl font-semibold mt-3">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: 'Total Engagements', value: formatCompactNumber(campaignSummary.totalEngagements) },
              { label: 'Likes', value: formatCompactNumber(campaignSummary.totalLikes) },
              { label: 'Comments', value: formatCompactNumber(campaignSummary.totalComments) },
              { label: 'Comment to Like Ratio', value: `${commentLikeRatio.toFixed(2)}%` },
            ].map((metric) => (
              <div
                key={metric.label}
                className="bg-black/50 border border-white/10 rounded-2xl p-6"
              >
                <p className="text-xs text-white/60 uppercase tracking-[0.35em]">{metric.label}</p>
                <p className="text-2xl font-semibold mt-3">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Engagement Mix</p>
                <h3 className="osu-display text-2xl mt-2">Likes vs Comments</h3>
                <p className="text-white/60 text-sm mt-1">Breakdown of campaign engagement sources.</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 140 140" className="w-full h-full">
                    <circle
                      cx="70"
                      cy="70"
                      r={donutRadius}
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="14"
                    />
                    {donutSegments.map((segment) => {
                      const segmentLength = (segment.pct / 100) * donutCircumference;
                      const strokeDasharray = `${segmentLength} ${donutCircumference - segmentLength}`;
                      const strokeDashoffset = -donutOffset;
                      donutOffset += segmentLength;
                      return (
                        <circle
                          key={segment.label}
                          cx="70"
                          cy="70"
                          r={donutRadius}
                          fill="none"
                          stroke={segment.color}
                          strokeWidth="14"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          transform="rotate(-90 70 70)"
                        />
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="text-xl font-semibold">{formatCompactNumber(engagementMix.total)}</div>
                    <div className="text-xs uppercase tracking-[0.3em] text-white/60">Total</div>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  {donutSegments.map((segment) => (
                    <div key={segment.label} className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: segment.color }}
                      />
                      <div className="flex-1">
                        <div className="text-white/80 text-xs uppercase tracking-[0.2em]">{segment.label}</div>
                        <div className="text-white font-semibold">
                          {formatCompactNumber(segment.value)} • {segment.pct.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-black/50 border border-white/10 rounded-2xl p-6">
              <h3 className="osu-display text-2xl mb-2">Top Posts - Likes</h3>
              <p className="text-white/60 text-sm">
                Horizontal ranking of the top campaign posts by likes.
              </p>
              <div className="mt-6 space-y-4">
                {topPosts.length === 0 && (
                  <div className="text-white/60 text-sm">No posts available for this campaign.</div>
                )}
                {topPosts.map((post, index) => {
                  const maxLikes = Math.max(...topPosts.map((item) => item.metrics?.likes ?? 0), 1);
                  const likes = post.metrics?.likes ?? 0;
                  return (
                    <div key={post._id} className="space-y-2">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/60">
                        <span>
                          #{index + 1} {post.athlete?.name ?? 'Ohio State Athlete'}
                        </span>
                        <span>{formatCompactNumber(likes)}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-[#BB0000]"
                          style={{ width: `${(likes / maxLikes) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6 animate-[rise_0.6s_ease_both]" style={{ animationDelay: '120ms' }}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="osu-display text-3xl md:text-4xl tracking-wide">Top Posts</h2>
              <p className="text-white/60 mt-2">Highest-performing campaign posts ranked by likes.</p>
            </div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/60">
              <Flame className="w-4 h-4 text-[#BB0000]" />
              Top by Likes
            </div>
          </div>

          {topPosts.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-white/60">
              No sponsored posts found for this campaign yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {topPosts.map((post, index) => (
                <a
                  key={post._id}
                  href={post.permalink || '#'}
                  target={post.permalink ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#BB0000]/60 transition-colors"
                >
                  <div className="relative aspect-[4/5] bg-black/60">
                    {post.url && (
                      <img
                        src={post.url}
                        alt={post.caption || 'Ohio State post'}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                        {post.source ?? 'SOCIAL'}
                      </span>
                      <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-full">
                        {post.mediaType ?? 'POST'}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-[#BB0000] flex items-center justify-center text-white font-bold">
                      #{index + 1}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-lg font-semibold line-clamp-2">
                        {post.athlete?.name ?? 'Ohio State Athlete'}
                      </p>
                      <p className="text-white/70 text-sm">{getPostDateLabel(post)}</p>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-sm text-white/70 line-clamp-2">{post.caption ?? 'Sponsored post'}</p>
                    <div className="flex items-center justify-between text-xs text-white/70">
                      <span>Likes</span>
                      <span className="text-white font-semibold">{formatCompactNumber(post.metrics?.likes ?? 0)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/70">
                      <span>Comments</span>
                      <span className="text-white font-semibold">{formatCompactNumber(post.metrics?.comments ?? 0)}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-6 animate-[rise_0.6s_ease_both]" style={{ animationDelay: '240ms' }}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="osu-display text-3xl md:text-4xl tracking-wide">Benchmarks</h2>
              <p className="text-white/60 mt-2">
                Campaign performance compared to sponsored and all posts from the same athletes.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/60">
              <BarChart3 className="w-4 h-4 text-[#BB0000]" />
              Benchmarking View
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {benchmarkCards.map((card) => {
              const maxValue = Math.max(card.campaignValue, card.sponsoredValue, card.allValue, 1);
              const liftVsSponsored = getLiftPercent(card.campaignValue, card.sponsoredValue);
              const liftVsAll = getLiftPercent(card.campaignValue, card.allValue);

              return (
                <div key={card.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="osu-display text-xl tracking-wide mb-4">{card.title}</h3>
                  {[
                    { label: 'Campaign', value: card.campaignValue, tone: 'bg-[#BB0000]' },
                    { label: 'Sponsored', value: card.sponsoredValue, tone: 'bg-white/30' },
                    { label: 'All posts', value: card.allValue, tone: 'bg-white/15' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-4 mb-3">
                      <div className="w-40 text-xs text-white/70">{row.label}</div>
                      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full ${row.tone}`}
                          style={{ width: `${(row.value / maxValue) * 100}%` }}
                        />
                      </div>
                      <div className="w-16 text-right text-sm font-semibold">
                        {card.formatter(row.value)}
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 text-xs text-white/70 uppercase tracking-[0.28em]">Lift</div>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm">
                    <span className="px-3 py-1 rounded-full bg-[#BB0000]/20 text-[#FFB3B3]">
                      {liftVsAll >= 0 ? '+' : ''}
                      {liftVsAll.toFixed(1)}% vs all posts
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white/70">
                      {liftVsSponsored >= 0 ? '+' : ''}
                      {liftVsSponsored.toFixed(1)}% vs sponsored
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-black/50 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="osu-display text-xl tracking-wide">Individual Athlete Benchmarks</h3>
                <p className="text-white/60 text-sm">Top athletes from this campaign and their lift vs baselines.</p>
              </div>
            </div>
            <div className="space-y-3">
              {athleteBenchmarks.map((athlete) => (
                <div
                  key={athlete.athleteId}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                >
                  <div>
                    <div className="text-sm font-semibold text-white">{athlete.name}</div>
                    <div className="text-xs text-white/60">{athlete.sport}</div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-white/70">
                    <span className="px-3 py-1 rounded-full bg-white/10">
                      Avg Likes {formatCompactNumber(athlete.campaignAvgLikes)}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#BB0000]/20 text-[#FFB3B3]">
                      {athlete.liftVsAll >= 0 ? '+' : ''}
                      {athlete.liftVsAll.toFixed(1)}% vs all posts
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10">
                      {athlete.liftVsSponsored >= 0 ? '+' : ''}
                      {athlete.liftVsSponsored.toFixed(1)}% vs sponsored
                    </span>
                  </div>
                </div>
              ))}
              {athleteBenchmarks.length === 0 && (
                <div className="text-white/60 text-sm">No benchmark data available for this campaign.</div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
