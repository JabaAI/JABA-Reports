import { Trophy, TrendingUp, Target, CheckCircle2 } from 'lucide-react';

export function PartnershipTimeline() {
  const timelineEvents = [
    {
      year: '2021',
      phase: 'Foundation Built',
      events: [
        {
          date: 'July 2021',
          school: 'Penn State',
          significance: 'Flagship partner - Big Ten presence established',
          icon: Trophy,
          color: 'blue',
        },
        {
          date: 'Sept 2021',
          school: 'LSU',
          significance: 'SEC presence established - Southern market entry',
          icon: Target,
          color: 'purple',
        },
      ],
    },
    {
      year: '2022',
      phase: 'Expansion Phase',
      events: [
        {
          date: 'Jan 2022',
          school: 'Baylor',
          significance: 'Big 12 presence - Texas market expansion',
          icon: TrendingUp,
          color: 'green',
        },
        {
          date: 'Jan 2022',
          school: 'Virginia',
          significance: 'ACC presence - Mid-Atlantic foothold',
          icon: Target,
          color: 'orange',
        },
        {
          date: 'March 2022',
          school: 'UTSA',
          significance: 'AAC growth strategy - Emerging program',
          icon: Target,
          color: 'cyan',
        },
        {
          date: 'June 2022',
          school: 'Texas A&M',
          significance: 'SEC reinforcement - Major market addition',
          icon: Trophy,
          color: 'red',
        },
        {
          date: 'July 2022',
          school: 'Auburn',
          significance: 'SEC dominance - Third SEC partner',
          icon: Trophy,
          color: 'blue',
        },
        {
          date: 'Aug 2022',
          school: 'Washington State',
          significance: 'Pac-12 foothold - West Coast expansion',
          icon: Target,
          color: 'purple',
        },
      ],
    },
    {
      year: '2023-2024',
      phase: 'Tier Diversification',
      events: [
        {
          date: '2023-2024',
          school: '32 Additional Partners',
          significance: 'Standard tier expansion across multiple conferences',
          icon: TrendingUp,
          color: 'emerald',
        },
      ],
    },
    {
      year: '2025-2026',
      phase: 'Growth & Scale',
      events: [
        {
          date: 'Current',
          school: '40+ Total Partners',
          significance: 'Network-wide across all tiers',
          icon: CheckCircle2,
          color: 'green',
        },
        {
          date: 'Active',
          school: 'Conference Partnerships',
          significance: 'Big Ten, Pac-12, Big East - exclusive access',
          icon: Trophy,
          color: 'indigo',
        },
        {
          date: '2026',
          school: 'Pipeline: 12-15 schools in talks',
          significance: 'Active acquisition discussions',
          icon: Target,
          color: 'amber',
        },
        {
          date: 'Target',
          school: '20+ more schools in next 12 months',
          significance: 'Aggressive growth plan',
          icon: TrendingUp,
          color: 'rose',
        },
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-300',
        text: 'text-blue-900',
        dot: 'bg-blue-600',
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-300',
        text: 'text-purple-900',
        dot: 'bg-[#1770C0]',
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-300',
        text: 'text-green-900',
        dot: 'bg-green-600',
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-300',
        text: 'text-orange-900',
        dot: 'bg-orange-600',
      },
      cyan: {
        bg: 'bg-cyan-50',
        border: 'border-cyan-300',
        text: 'text-cyan-900',
        dot: 'bg-[#0D5A9F]',
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-300',
        text: 'text-red-900',
        dot: 'bg-red-600',
      },
      emerald: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-300',
        text: 'text-emerald-900',
        dot: 'bg-emerald-600',
      },
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-300',
        text: 'text-indigo-900',
        dot: 'bg-indigo-600',
      },
      amber: {
        bg: 'bg-amber-50',
        border: 'border-amber-300',
        text: 'text-amber-900',
        dot: 'bg-amber-600',
      },
      rose: {
        bg: 'bg-rose-50',
        border: 'border-rose-300',
        text: 'text-rose-900',
        dot: 'bg-rose-600',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black tracking-wide mb-2">
          PLAYFLY MAX PARTNER ONBOARDING TIMELINE
        </h2>
        <div className="h-1 w-24 bg-blue-600" />
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-purple-300 to-green-300" />

        {/* Timeline Events */}
        <div className="space-y-8">
          {timelineEvents.map((period, periodIdx) => (
            <div key={periodIdx} className="relative">
              {/* Year Badge */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg z-10">
                  <span className="text-white font-bold text-lg">{period.year}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black">{period.phase}</h3>
                </div>
              </div>

              {/* Events */}
              <div className="ml-20 space-y-3">
                {period.events.map((event, eventIdx) => {
                  const colors = getColorClasses(event.color);
                  const Icon = event.icon;

                  return (
                    <div key={eventIdx} className="relative">
                      {/* Connection Line to Main Timeline */}
                      <div className="absolute -left-12 top-4 w-12 h-0.5 bg-gray-300" />

                      {/* Event Card */}
                      <div className={`${colors.bg} border-2 ${colors.border} rounded-lg p-4 hover:shadow-md transition-all duration-300`}>
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className={`w-8 h-8 rounded-lg ${colors.dot} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <div>
                                <div className="text-xs text-gray-600 mb-1">{event.date}</div>
                                <h4 className={`text-lg font-bold ${colors.text}`}>{event.school}</h4>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700">{event.significance}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retention Metrics */}
      <div className="mt-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-bold text-black">RETENTION METRICS</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* MAX Tier Retention */}
          <div className="bg-white rounded-lg p-6 border border-green-300">
            <div className="text-sm text-gray-600 mb-2">MAX Tier Retention</div>
            <div className="flex items-baseline gap-2 mb-3">
              <div className="text-5xl font-bold text-green-900">100%</div>
              <div className="text-sm text-gray-600">(8 of 8 active)</div>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '100%' }} />
            </div>
            <div className="mt-3 text-xs text-green-700 font-semibold">
              All MAX partners remain active since joining
            </div>
          </div>

          {/* Standard Tier Retention */}
          <div className="bg-white rounded-lg p-6 border border-green-300">
            <div className="text-sm text-gray-600 mb-2">Standard Tier Retention</div>
            <div className="flex items-baseline gap-2 mb-3">
              <div className="text-5xl font-bold text-green-900">94%</div>
              <div className="text-sm text-gray-600">(30 of 32 active)</div>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: '94%' }} />
            </div>
            <div className="mt-3 text-xs text-blue-700 font-semibold">
              Industry-leading retention rate
            </div>
          </div>
        </div>
      </div>

      {/* Growth Arrow */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <TrendingUp className="w-8 h-8" />
          <div className="text-2xl font-bold">Positive Momentum</div>
        </div>
        <div className="text-blue-100">
          From 2 schools in 2021 to 40+ in 2026 • 20x growth in 5 years • On track for 75+ schools by 2027
        </div>
      </div>
    </div>
  );
}
