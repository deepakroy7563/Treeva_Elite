import React from 'react';
import { Plane, ShieldCheck, Headphones, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Main Panoramic Travel Banner */}
      <div className="lg:col-span-2 relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0c2340] via-[#103b68] to-[#0d2a4d] min-h-[220px] p-6 sm:p-8 flex flex-col justify-between text-white shadow-sm border border-slate-800/40">
        {/* Background Travel Destination Imagery with soft blend */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-lg">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-300 bg-brand-900/60 px-3 py-1 rounded-full border border-brand-500/30 inline-block mb-3">
            Elite Luxury Hospitality Network
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold serif-heading text-white tracking-tight leading-tight">
            Travel More <br />
            <span className="italic font-normal text-amber-200">Create Better Memories</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 font-medium">
            Treeva Elite — Your Trusted Luxury Travel Partner & Hotel Booking Engine
          </p>
        </div>

        {/* Feature badges at bottom */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 sm:gap-4 mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
            <Plane className="w-3.5 h-3.5 text-brand-300" />
            <span>Hotels Across India & Global</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Best Price Guaranteed</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
            <Headphones className="w-3.5 h-3.5 text-amber-300" />
            <span>24/7 Dedicated Concierge</span>
          </div>
        </div>
      </div>

      {/* Right Side Deal Card matching screenshot */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c2548] to-[#07172e] p-6 flex flex-col justify-between text-white shadow-sm border border-slate-800/40 min-h-[220px]">
        {/* Tropical Beach Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45 pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-400/30 inline-block mb-2">
            Limited Time Agency Promotion
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Exclusive Hotel Deals
          </h3>
          <p className="text-xs text-slate-200 mt-1">
            Save up to 40% on luxury villas & suites this season.
          </p>
        </div>

        <div className="relative z-10 mt-6">
          <button
            onClick={() => navigate('/hotels')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold shadow-md transition group"
          >
            <span>View Offers</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
