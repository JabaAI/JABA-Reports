import { Zap, Eye, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export function BiggestShock() {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">BIGGEST SHOCKS</h2>
            <p className="text-gray-400 text-sm">Three discoveries that prove JABA analyzed your data</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* SHOCK #1: Gymnastics Undervalued */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-xl p-6 border-l-4 border-purple-500"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Eye className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded">SHOCK #1</span>
                <h3 className="text-xl font-bold text-white">Your Gymnastics Teams Are Criminally Undervalued</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-400">9.83%</div>
                  <div className="text-xs text-gray-400">Gymnastics Engagement</div>
                  <div className="text-xs text-gray-500 mt-1">vs 1.87% Football</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-400">44%</div>
                  <div className="text-xs text-gray-400">Women's Gym Avg</div>
                  <div className="text-xs text-gray-500 mt-1">vs 48% Football</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-2xl font-bold text-amber-400">5X</div>
                  <div className="text-xs text-gray-400">Engagement Advantage</div>
                  <div className="text-xs text-gray-500 mt-1">vs football teams</div>
                </div>
              </div>

              <div className="bg-purple-500/10 rounded-lg p-4 mb-3">
                <h4 className="text-sm font-bold text-white mb-2">Real Example:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Auburn Gymnastics (Olivia Chen)</span>
                    <span className="text-purple-400 font-bold">1.68M likes, 49% engagement</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Current Sponsors</span>
                    <span className="text-red-400 font-bold">Only 2 (massively undermonetized)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Partnership Opportunities</span>
                    <span className="text-[#3B9FD9] font-bold">15+ brands waiting to activate</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1770C0]/20 rounded-lg p-4 border border-[#1770C0]/30">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[#3B9FD9]" />
                  <span className="text-sm font-bold text-[#3B9FD9]">JABA Recommendation:</span>
                </div>
                <p className="text-sm text-gray-300">
                  Package gymnastics WITH football for premium brands.
                  <span className="text-white font-semibold"> Nike, Lululemon, and beauty brands prioritize gymnastics content over football</span>
                  because engagement rates are 5X higher. Massive untapped partnership opportunities exist.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SHOCK #2: Team Pages Dark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-red-600/10 to-orange-600/10 rounded-xl p-6 border-l-4 border-red-500"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs font-bold rounded">SHOCK #2</span>
                <h3 className="text-xl font-bold text-white">Your Team Pages Are Dark Real Estate</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-2xl font-bold text-red-400">2/10</div>
                  <div className="text-xs text-gray-400">Schools With ZERO</div>
                  <div className="text-xs text-gray-500 mt-1">team page sponsors</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-2xl font-bold text-red-400">2-5M</div>
                  <div className="text-xs text-gray-400">Annual Impressions</div>
                  <div className="text-xs text-gray-500 mt-1">per team page</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-2xl font-bold text-amber-400">100%</div>
                  <div className="text-xs text-gray-400">Untapped Inventory</div>
                  <div className="text-xs text-gray-500 mt-1">if activated</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-2xl font-bold text-[#3B9FD9]">24hrs</div>
                  <div className="text-xs text-gray-400">To Activate</div>
                  <div className="text-xs text-gray-500 mt-1">with JABA</div>
                </div>
              </div>

              <div className="bg-red-500/10 rounded-lg p-4 mb-3">
                <h4 className="text-sm font-bold text-white mb-2">What You're Missing:</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Each team page gets <span className="text-white font-semibold">2-5M impressions/year</span></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Guaranteed placement = <span className="text-white font-semibold">premium partnership opportunity per page</span></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Only 8 schools monetized (Nebraska, Alabama, LSU, Penn State, Texas A&M, Auburn, Tennessee, USC)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><span className="text-amber-400 font-bold">28 schools</span> = completely dark inventory</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1770C0]/20 rounded-lg p-4 border border-[#1770C0]/30">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-[#3B9FD9]" />
                  <span className="text-sm font-bold text-[#3B9FD9]">Quick Win (30 days):</span>
                </div>
                <p className="text-sm text-gray-300">
                  Activate Nike across 10 team pages instantly.
                  <span className="text-white font-semibold"> JABA handles logo placement, tracking, and reporting automatically.</span>
                  Without JABA: 6 months of manual coordination across 10 athletic departments.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SHOCK #3: Specific Athletes Leaving Money */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-[#1770C0]/10 to-blue-600/10 rounded-xl p-6 border-l-4 border-[#1770C0]"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#1770C0]/20 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-6 h-6 text-[#3B9FD9]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-[#1770C0]/20 text-[#3B9FD9] text-xs font-bold rounded">SHOCK #3</span>
                <h3 className="text-xl font-bold text-white">These High-Performing Athletes Have Zero Sponsors</h3>
              </div>

              <div className="space-y-3 mb-4">
                {/* Athlete 1 */}
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-lg font-bold text-white">Auburn Women's Volleyball Star</div>
                      <div className="text-xs text-gray-400">Name withheld for privacy</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-400">0</div>
                      <div className="text-xs text-gray-400">Current Sponsors</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <div className="text-sm font-bold text-[#3B9FD9]">67.5K</div>
                      <div className="text-xs text-gray-400">Followers</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#3B9FD9]">4.1%</div>
                      <div className="text-xs text-gray-400">Engagement</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#3B9FD9]">34%</div>
                      <div className="text-xs text-gray-400">Above Network Avg</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-[#1770C0]/10 rounded p-2">
                    <span className="text-xs text-gray-300">Partnership status:</span>
                    <span className="text-sm font-bold text-amber-400">10+ brands would match</span>
                  </div>
                </div>

                {/* Athlete 2 */}
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-lg font-bold text-white">Baylor Gymnastics Athlete</div>
                      <div className="text-xs text-gray-400">Name withheld for privacy</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-400">0</div>
                      <div className="text-xs text-gray-400">Current Sponsors</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <div className="text-sm font-bold text-[#3B9FD9]">92K</div>
                      <div className="text-xs text-gray-400">Followers</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#3B9FD9]">4.5%</div>
                      <div className="text-xs text-gray-400">Engagement</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#3B9FD9]">47%</div>
                      <div className="text-xs text-gray-400">Above Network Avg</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-[#1770C0]/10 rounded p-2">
                    <span className="text-xs text-gray-300">Partnership status:</span>
                    <span className="text-sm font-bold text-amber-400">15+ brands would match</span>
                  </div>
                </div>

                {/* Athlete 3 */}
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-lg font-bold text-white">Penn State Football Star (Drew Allar)</div>
                      <div className="text-xs text-gray-400">Public figure</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-400">Low</div>
                      <div className="text-xs text-gray-400">Underutilized</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <div className="text-sm font-bold text-[#3B9FD9]">285K</div>
                      <div className="text-xs text-gray-400">Followers</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#3B9FD9]">5.2%</div>
                      <div className="text-xs text-gray-400">Engagement</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#3B9FD9]">3.2M</div>
                      <div className="text-xs text-gray-400">Total Likes</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-[#1770C0]/10 rounded p-2">
                    <span className="text-xs text-gray-300">Premium tier athlete:</span>
                    <span className="text-sm font-bold text-amber-400">20+ brand opportunities</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1770C0]/20 rounded-lg p-4 border border-[#1770C0]/30">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[#3B9FD9]" />
                  <span className="text-sm font-bold text-[#3B9FD9]">JABA Solves This:</span>
                </div>
                <p className="text-sm text-gray-300">
                  These 3 athletes alone represent <span className="text-amber-400 font-bold">45+ untapped brand partnerships</span>.
                  <span className="text-white font-semibold"> JABA automatically identifies high-value, unsponsored athletes and matches them to brands in real-time.</span>
                  Your current manual process misses these opportunities daily.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer CTA */}
      <div className="mt-6 p-6 bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-xl border border-amber-500/30">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-amber-400" />
          <div>
            <h3 className="text-lg font-bold text-white mb-1">These aren't hypotheticals.</h3>
            <p className="text-sm text-gray-300">
              These are <span className="text-white font-semibold">real athletes in your network right now</span>, with measurable engagement,
              generating content daily, but <span className="text-amber-400 font-semibold">zero sponsorship revenue</span>.
              JABA found them in 30 seconds. How long would it take your team?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
