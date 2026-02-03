import { DollarSign, Award, Users, BarChart3, Globe, Database, Brain, Target, Zap } from 'lucide-react';

export function ExecutiveSummary() {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
      {/* JABA Positioning Statement */}
      <div className="mb-8 pb-6 border-b border-white/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1770C0] to-blue-500 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-xl font-bold text-white">
            JABA powers real-time campaign management across your entire network — centralizing what's currently fragmented across 20 schools into one automated platform.
          </p>
        </div>
      </div>

      {/* Headline */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white tracking-wide mb-2">
          THE PLAYFLY OPPORTUNITY IN NUMBERS
        </h2>
        <div className="h-1 w-24 bg-[#1770C0]" />
      </div>

      {/* Three Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Network Reach & Scale */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border-t-4 border-[#1770C0]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#1770C0] flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Network Reach & Scale
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#3B9FD9]">5,277</span>
              <span className="text-sm text-gray-300">sponsored posts across YOUR network</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#3B9FD9]">20</span>
              <span className="text-sm text-gray-300">schools in Playfly network</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#3B9FD9]">177+</span>
              <span className="text-sm text-gray-300">teams generating content</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#3B9FD9]">24.9M</span>
              <span className="text-sm text-gray-300">total followers across your schools</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#3B9FD9]">152</span>
              <span className="text-sm text-gray-300">active brands in your network</span>
            </div>
          </div>
        </div>

        {/* Card 2: Revenue Potential */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border-t-4 border-[#1770C0]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#1770C0] flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Revenue Potential
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#3B9FD9]">2.5X</span>
              <span className="text-sm text-gray-300">higher revenue growth vs. industry avg</span>
            </div>

            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#3B9FD9]">+45%</span>
              <span className="text-sm text-gray-300">engagement lift with IP-driven content</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4 text-[#3B9FD9]" />
                <span className="text-sm font-semibold text-white">Multi-Platform Dominance</span>
              </div>
              <span className="text-xs text-gray-400">Instagram + TikTok coverage</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-[#3B9FD9]" />
                <span className="text-sm font-semibold text-white">Proven Brand Partners</span>
              </div>
              <span className="text-xs text-gray-400">Nike, Wegmans, Sheetz, H-E-B, Raising Cane's</span>
            </div>
          </div>
        </div>

        {/* Card 3: Why JABA Is The Only Choice */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border-t-4 border-[#1770C0]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#1770C0] flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Why JABA Is The Only Choice
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <Database className="w-4 h-4 text-[#3B9FD9]" />
                <span className="text-sm font-semibold text-white">252K+ Partnership Benchmarks</span>
              </div>
              <span className="text-xs text-gray-400">3 years of athlete-brand performance data you can't replicate in months</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <Brain className="w-4 h-4 text-[#3B9FD9]" />
                <span className="text-sm font-semibold text-white">Network-Wide AI Matching</span>
              </div>
              <span className="text-xs text-gray-400">Auto-optimizes athlete-brand pairings across 20 schools — would take years to build</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-[#3B9FD9]" />
                <span className="text-sm font-semibold text-white">Competitive Intelligence Engine</span>
              </div>
              <span className="text-xs text-gray-400">Real-time insights into what works in college NIL (data competitors don't have)</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-[#3B9FD9]" />
                <span className="text-sm font-semibold text-white">Automated Revenue Capture</span>
              </div>
              <span className="text-xs text-gray-400">AI surfaces 2,487+ hidden partnership opportunities your manual process would miss</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stat Bar - Revenue Focused */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#3B9FD9]">20</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Partner Schools</div>
            <div className="text-xs text-gray-500 mt-0.5">(10 Playfly + 10 Playfly Max)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#3B9FD9]">2,487+</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">NIL Opportunities</div>
            <div className="text-xs text-gray-500 mt-0.5">(ready to be activated)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#3B9FD9]">5,277</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Revenue-Generating Posts</div>
            <div className="text-xs text-gray-500 mt-0.5">(proven model)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#3B9FD9]">150+</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Active Brands</div>
            <div className="text-xs text-gray-500 mt-0.5">(network depth)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
