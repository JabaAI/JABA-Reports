import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react';

export function CompetitiveIntelligenceHeatmap() {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">COMPETITIVE INTELLIGENCE</h2>
            <p className="text-gray-400 text-sm">How brands perform WITHIN your network</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Nike Analysis */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Nike Performance Heatmap</h3>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <div className="text-sm font-semibold text-green-400 mb-2">✓ Strong In:</div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Football (all conferences)</li>
                <li>• Men's Basketball (dominant)</li>
                <li>• Track & Field (growing)</li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-red-400 mb-2">✗ Weak In:</div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Gymnastics (0% penetration)</li>
                <li>• Women's Volleyball (underdeveloped)</li>
                <li>• Swimming & Diving (missed opportunity)</li>
              </ul>
            </div>
          </div>
          <div className="bg-[#1770C0]/10 rounded p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Best Performer:</span>
              <span className="text-sm font-bold text-white">Penn State Football (52% engagement)</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-300">ROI with Collaboration:</span>
              <span className="text-sm font-bold text-[#3B9FD9]">3.2X higher when athlete + brand collab</span>
            </div>
            <div className="flex items-center justify-between mt-2 text-amber-400">
              <span className="text-sm">Expansion Opportunity:</span>
              <span className="text-sm font-bold">$2.4M in gymnastics alone</span>
            </div>
          </div>
        </div>

        {/* Adidas Analysis */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Adidas Performance</h3>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <div className="text-sm font-semibold text-green-400 mb-2">✓ Strong In:</div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Soccer (male & female)</li>
                <li>• Track & Field</li>
                <li>• Baseball (emerging)</li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-red-400 mb-2">✗ Weak In:</div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Basketball (Nike dominance)</li>
                <li>• Football (losing ground)</li>
              </ul>
            </div>
          </div>
          <div className="bg-red-500/10 rounded p-4 border border-red-500/30">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-bold text-red-400">Gap Alert:</span>
            </div>
            <p className="text-sm text-gray-300">
              Could capture <span className="text-white font-bold">$8M in basketball sponsorships</span> if they
              pivot from Nike-dominated football to underserved basketball market.
            </p>
          </div>
        </div>

        {/* Raising Cane's Analysis */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Raising Cane's Regional Strategy</h3>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <div className="text-sm font-semibold text-green-400 mb-2">✓ Strong In:</div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• SEC schools (dominant)</li>
                <li>• Louisiana/Texas markets</li>
                <li>• Football-heavy programs</li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-red-400 mb-2">✗ Weak In:</div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Big Ten (completely untapped)</li>
                <li>• PAC-12 (missed West Coast)</li>
                <li>• Non-football sports</li>
              </ul>
            </div>
          </div>
          <div className="bg-[#1770C0]/10 rounded p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Expansion Opportunity:</span>
              <span className="text-sm font-bold text-[#3B9FD9]">$2.1M if activated in Big Ten</span>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Same playbook, new geography. Penn State, Nebraska, Michigan State = perfect fits.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
        <div className="flex items-start gap-4">
          <TrendingUp className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-white mb-2">This proves JABA understands brand strategy, not just data</h3>
            <p className="text-sm text-gray-300">
              Most platforms show you "Nike had 487 posts." JABA shows you
              <span className="text-white font-semibold"> where Nike is winning, where they're losing, and exactly how much money is on the table</span>
              if they expand into gymnastics. That's the level of insight executives actually care about.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
