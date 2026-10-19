import React from 'react';
import { ChevronDown } from 'lucide-react';

export const MonthlyRevenueChart: React.FC = () => {
  const weeks = [
    { label: 'Week 1', heightPercent: 42, amount: '₹ 65,000' },
    { label: 'Week 2', heightPercent: 68, amount: '₹ 1,12,000' },
    { label: 'Week 3', heightPercent: 82, amount: '₹ 1,48,000' },
    { label: 'Week 4', heightPercent: 95, amount: '₹ 1,85,000' },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">Monthly Revenue</h3>
          <p className="text-xs text-slate-500">Weekly earnings breakdown</p>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
          <span>June 2026</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="relative pt-4 pb-2">
        {/* Y Axis Guide lines */}
        <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pointer-events-none text-[10px] text-slate-400">
          <div className="border-b border-slate-100 flex justify-between">
            <span>₹ 2L</span>
          </div>
          <div className="border-b border-slate-100 flex justify-between">
            <span>₹ 1.5L</span>
          </div>
          <div className="border-b border-slate-100 flex justify-between">
            <span>₹ 1L</span>
          </div>
          <div className="border-b border-slate-100 flex justify-between">
            <span>₹ 50K</span>
          </div>
          <div className="border-b border-slate-100 flex justify-between">
            <span>₹ 0</span>
          </div>
        </div>

        {/* Bars */}
        <div className="relative z-10 grid grid-cols-4 gap-4 h-40 pl-10 pr-2 items-end">
          {weeks.map((week, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
              {/* Tooltip on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-slate-900 text-white font-bold py-0.5 px-2 rounded pointer-events-none whitespace-nowrap mb-1">
                {week.amount}
              </div>

              {/* Bar element */}
              <div className="w-full max-w-[42px] bg-brand-100 group-hover:bg-brand-200 rounded-xl overflow-hidden flex flex-col justify-end transition-all">
                <div
                  className="w-full bg-brand-500 group-hover:bg-brand-600 rounded-xl transition-all duration-500"
                  style={{ height: `${week.heightPercent}%` }}
                />
              </div>

              {/* Label */}
              <span className="text-[11px] font-semibold text-slate-600">
                {week.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
