import React from 'react';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { HeroBanner } from '../components/dashboard/HeroBanner';
import { BookingCharts } from '../components/dashboard/BookingCharts';
import { HotelsOverviewTable } from '../components/dashboard/HotelsOverviewTable';
import { TopDestinations } from '../components/dashboard/TopDestinations';
import { QuickActions } from '../components/dashboard/QuickActions';
import { RecentCustomers } from '../components/dashboard/RecentCustomers';
import { MonthlyRevenueChart } from '../components/dashboard/MonthlyRevenueChart';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* 1. Welcome Panoramic Banner */}
      <HeroBanner />

      {/* 2. Key Dynamic Hotel Metrics Summary Cards */}
      <SummaryCards />

      {/* 3. Main Dashboard Workspace (Grid with analytics and right rail) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Main Operations: Charts, Hotels Table, Destinations) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Overview & Status Charts */}
          <BookingCharts />

          {/* Hotels Overview Section */}
          <HotelsOverviewTable />

          {/* Top Travel Destinations */}
          <TopDestinations />
        </div>

        {/* Right Column (Quick Actions, Revenue, Recent Customers, Support) */}
        <div className="space-y-6">
          {/* Quick Actions Shortcuts */}
          <QuickActions />

          {/* Monthly Revenue Chart */}
          <MonthlyRevenueChart />

          {/* Recent Customers & Support Desk */}
          <RecentCustomers />
        </div>
      </div>

      {/* 4. Bottom Growth Banner (matching screenshot bottom banner) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100 flex-shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Grow Your Business with Treeva Elite
            </h4>
            <p className="text-xs text-slate-500">
              More bookings <span className="text-slate-300 mx-1.5">|</span> Better commission <span className="text-slate-300 mx-1.5">|</span> Happy luxury travelers
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/hotels')}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 transition flex-shrink-0"
        >
          <span>Manage Hotel Properties</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
