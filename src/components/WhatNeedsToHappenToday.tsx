import { Calendar, Zap, TrendingUp } from 'lucide-react';

export function WhatNeedsToHappenToday() {
  return (
    <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 backdrop-blur-lg border border-red-500/30 rounded-2xl p-8 mb-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">WHAT NEEDS TO HAPPEN TODAY</h2>
            <p className="text-gray-300 text-sm">90-day action plan • 85+ partnerships activated</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white/10 rounded-xl p-5 border border-red-400/30">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-6 h-6 text-red-400" />
            <h3 className="text-lg font-bold text-white">Week 1-2: Nike Team Page Blitz</h3>
            <span className="ml-auto px-3 py-1 bg-[#1770C0]/20 text-[#3B9FD9] text-sm font-bold rounded">+30 deals</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Activate Nike team page sponsorships across 20 schools (currently dark).
            Guaranteed placement = guaranteed revenue.
          </p>
          <div className="text-xs text-gray-400">
            <span className="text-red-400 font-semibold">Without JABA:</span> 6 months manual coordination.
            <span className="text-[#3B9FD9] font-semibold"> With JABA:</span> 2 weeks, fully automated.
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-5 border border-red-400/30">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-red-400" />
            <h3 className="text-lg font-bold text-white">Week 3-4: Undervalued Athletes Program</h3>
            <span className="ml-auto px-3 py-1 bg-[#1770C0]/20 text-[#3B9FD9] text-sm font-bold rounded">+25 deals</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Get sponsorships for 15 high-engagement athletes currently unsponsored.
            (Auburn Volleyball, Baylor Gymnastics, Penn State Football, etc.)
          </p>
          <div className="text-xs text-gray-400">
            JABA identifies them automatically and matches to brands in real-time.
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-5 border border-red-400/30">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-6 h-6 text-red-400" />
            <h3 className="text-lg font-bold text-white">Week 5-12: Raising Cane's Big Ten Expansion</h3>
            <span className="ml-auto px-3 py-1 bg-[#1770C0]/20 text-[#3B9FD9] text-sm font-bold rounded">+30 deals</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Raising Cane's dominates SEC. Expand to Big Ten schools (untapped market).
            Same brand, new territory, huge upside.
          </p>
          <div className="text-xs text-gray-400">
            JABA handles multi-school coordination across conferences automatically.
          </div>
        </div>
      </div>

      <div className="mt-6 p-6 bg-white/10 rounded-xl border border-[#3B9FD9]/30">
        <div className="text-center">
          <div className="text-4xl font-bold text-[#3B9FD9] mb-2">85+ Partnerships</div>
          <div className="text-sm text-gray-300">Total 90-day activation if executed NOW</div>
          <div className="text-xs text-amber-400 mt-2">Every week you wait = 5+ lost opportunities</div>
        </div>
      </div>
    </div>
  );
}
