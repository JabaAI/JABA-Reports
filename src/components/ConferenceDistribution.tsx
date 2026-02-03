import { MapPin, Trophy, Info } from 'lucide-react';
import { CONFERENCE_DISTRIBUTION } from '../data/playflyNetworkData';

export function ConferenceDistribution() {
  // Conference colors
  const conferenceColors: Record<string, string> = {
    'SEC': 'from-blue-500 to-blue-700',
    'Big Ten': 'from-indigo-500 to-indigo-700',
    'ACC': 'from-orange-500 to-orange-700',
    'Big 12': 'from-red-500 to-red-700',
    'Pac-12': 'from-[#1770C0] to-purple-700',
  };

  // Geographic diversity data
  const geographicRegions = [
    { region: 'Northeast', schools: ['Penn State', 'Virginia'], count: 2 },
    { region: 'South', schools: ['Auburn', 'LSU', 'Texas A&M', 'Baylor', 'UTSA'], count: 5 },
    { region: 'West', schools: ['Washington State'], count: 1 },
  ];

  // Sport diversity data
  const sportDiversity = [
    { sport: 'Football', percentage: 45, isHighest: true },
    { sport: 'Basketball', percentage: 28 },
    { sport: 'Volleyball', percentage: 12 },
    { sport: 'Baseball', percentage: 8 },
    { sport: 'Other', percentage: 7 },
  ];

  const maxSportPercentage = Math.max(...sportDiversity.map(s => s.percentage));

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black tracking-wide mb-2">
          CONFERENCE DISTRIBUTION (Showing Reach)
        </h2>
        <div className="h-1 w-24 bg-blue-600" />
      </div>

      {/* Conference Bars */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-black mb-4">Network by Conference</h3>
        <div className="space-y-4">
          {CONFERENCE_DISTRIBUTION.map((conf, index) => (
            <div key={index} className="group relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-bold text-gray-900">{conf.conferenceName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">{conf.schoolCount} schools</span>
                  <span className="text-sm font-bold text-gray-900">{conf.percentageOfNetwork}%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-8 bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${conferenceColors[conf.conferenceName] || 'from-gray-500 to-gray-700'} transition-all duration-500 flex items-center justify-end pr-3`}
                  style={{ width: `${conf.percentageOfNetwork}%` }}
                >
                  <span className="text-white text-xs font-bold">{conf.percentageOfNetwork}%</span>
                </div>

                {/* Tooltip on Hover */}
                <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
                  {conf.totalAthletesInConference.toLocaleString()} athletes • {(conf.aggregateEngagementRate * 100).toFixed(1)}% avg engagement
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-4 border-transparent border-t-gray-900" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Geographic Diversity */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Geographic Diversity
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {geographicRegions.map((region, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br rounded-xl p-6 border-2 ${
                region.count >= 4
                  ? 'from-blue-50 to-blue-100 border-blue-300'
                  : 'from-gray-50 to-gray-100 border-gray-300'
              }`}
            >
              <div className="text-sm font-semibold text-gray-700 uppercase mb-2">
                {region.region}
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-3">
                {region.count}
              </div>
              <div className="space-y-1">
                {region.schools.map((school, idx) => (
                  <div key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                    <div className="w-1 h-1 bg-blue-600 rounded-full" />
                    <span>{school}</span>
                  </div>
                ))}
              </div>
              {region.count >= 4 && (
                <div className="mt-3 pt-3 border-t border-blue-200 text-xs font-semibold text-blue-900">
                  Largest Regional Presence
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sport Diversity */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-purple-600" />
          Sport Diversity
        </h3>
        <div className="space-y-3">
          {sportDiversity.map((sport, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm ${sport.isHighest ? 'font-bold text-black' : 'font-semibold text-gray-700'}`}>
                  {sport.sport}
                  {sport.isHighest && (
                    <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">
                      HIGHEST
                    </span>
                  )}
                </span>
                <span className={`text-sm ${sport.isHighest ? 'font-bold text-black' : 'text-gray-600'}`}>
                  {sport.percentage}%
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    sport.isHighest
                      ? 'bg-gradient-to-r from-[#1770C0] to-purple-700'
                      : 'bg-gradient-to-r from-gray-400 to-gray-500'
                  }`}
                  style={{ width: `${(sport.percentage / maxSportPercentage) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Note */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-bold text-amber-900 mb-2">Strategic Advantages</div>
            <div className="text-sm text-gray-700 space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                <span>Reduces risk through diversification</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                <span>Appeals to brands seeking multi-conference reach</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                <span>Seasonal content consistency year-round</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
