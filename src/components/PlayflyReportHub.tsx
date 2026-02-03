import { useState } from 'react';
import { Briefcase, Network, ArrowLeft, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { PlayflyNetworkReport } from './PlayflyNetworkReport';
import BrandPartnershipDashboard from './BrandPartnershipDashboard';

type View = 'hub' | 'network-report' | 'brand-partnerships';

interface PlayflyReportHubProps {
  onBack: () => void;
}

export function PlayflyReportHub({ onBack }: PlayflyReportHubProps) {
  const [activeView, setActiveView] = useState<View>('hub');

  // Network Report view
  if (activeView === 'network-report') {
    return <PlayflyNetworkReport onBack={() => setActiveView('hub')} />;
  }

  // Brand Partnerships view
  if (activeView === 'brand-partnerships') {
    return (
      <div>
        <button
          onClick={() => setActiveView('hub')}
          className="fixed top-6 left-6 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all border border-white/20 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Playfly Reports
        </button>
        <BrandPartnershipDashboard />
      </div>
    );
  }

  // Hub view - Clean minimal design
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1770C0]/10 via-blue-500/10 to-purple-500/10 opacity-30" />

      {/* Back button */}
      <button
        onClick={onBack}
        className="fixed top-6 left-6 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all border border-white/20 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header - Clean and Simple */}
      <div className="pt-20 pb-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
            <img
              src="/playfly-logo.jpg"
              alt="Playfly Sports"
              className="h-12 w-12 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
            Playfly Sports Intelligence
          </h1>

          <p className="text-lg text-gray-300">
            Unlocking revenue opportunities across <span className="text-white font-semibold">20 partner schools</span>
          </p>
        </div>
      </div>

      {/* Cards - Clean Three Column Layout */}
      <div className="max-w-7xl mx-auto px-6 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1: Dashboard */}
          <motion.button
            onClick={() => window.open('https://jaba-app-1007845235832.us-central1.run.app/playfly', '_blank')}
            className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:border-[#3B9FD9]/50 transition-all duration-300 text-left w-full overflow-hidden"
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Header Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{ backgroundImage: "url('/header BG- V4-WithoutBalls_less.jpg')" }}
            />

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-[#1770C0] to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-3">
                Playfly Dashboard
              </h2>

              {/* One-line description */}
              <p className="text-gray-300 text-base mb-6">
                Real-time campaign management and athlete oversight
              </p>

              {/* View button */}
              <div className="flex items-center gap-2 text-[#3B9FD9] text-sm font-semibold">
                <span>View Dashboard</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.button>

          {/* Card 2: Report */}
          <motion.button
            onClick={() => setActiveView('network-report')}
            className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:border-blue-400/50 transition-all duration-300 text-left w-full"
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-[#1770C0] rounded-xl flex items-center justify-center mb-4">
                <Network className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-3">
                Strategic Opportunities Report
              </h2>

              {/* One-line description */}
              <p className="text-gray-300 text-base mb-6">
                Uncover revenue opportunities across your network
              </p>

              {/* View button */}
              <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold">
                <span>View Report</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.button>

          {/* Card 3: Brand Partnerships */}
          <motion.button
            onClick={() => setActiveView('brand-partnerships')}
            className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:border-purple-400/50 transition-all duration-300 text-left w-full"
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-[#1770C0] rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-3">
                Brand Partnerships
              </h2>

              {/* One-line description */}
              <p className="text-gray-300 text-base mb-6">
                Analyze brand performance and partnership gaps
              </p>

              {/* View button */}
              <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold">
                <span>View Analysis</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.button>

        </div>

        {/* Stats Bar at Bottom */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#3B9FD9] mb-2">20</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Partner Schools</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#3B9FD9] mb-2">2,487+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">NIL Opportunities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#3B9FD9] mb-2">5,277</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Revenue-Generating Posts</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#3B9FD9] mb-2">150+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Active Brands</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
