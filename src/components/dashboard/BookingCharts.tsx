import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const BookingCharts: React.FC = () => {
  const [timeRange] = useState('Last 7 Days');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(6);

  // Data points matching screenshot dates (20 Jun - 26 Jun)
  const chartPoints = [
    { date: '20 Jun', bookings: 18, revenue: 42000 },
    { date: '21 Jun', bookings: 29, revenue: 64000 },
    { date: '22 Jun', bookings: 24, revenue: 58000 },
    { date: '23 Jun', bookings: 36, revenue: 89000 },
    { date: '24 Jun', bookings: 42, revenue: 95000 },
    { date: '25 Jun', bookings: 51, revenue: 114000 },
    { date: '26 Jun', bookings: 58, revenue: 128000 },
  ];

  // SVG coordinates calculation for 7 points
  // Width: 600, Height: 200, padding: 30
  const svgWidth = 600;
  const svgHeight = 180;
  const paddingX = 40;
  const paddingY = 25;

  const maxBookings = 80;
  const getY = (val: number) => {
    return svgHeight - paddingY - (val / maxBookings) * (svgHeight - paddingY * 2);
  };
  const getX = (idx: number) => {
    return paddingX + (idx / (chartPoints.length - 1)) * (svgWidth - paddingX * 2);
  };

  const pointsPath = chartPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.bookings)}`)
    .join(' ');

  const areaPath = `${pointsPath} L ${getX(chartPoints.length - 1)} ${svgHeight - paddingY} L ${getX(0)} ${svgHeight - paddingY} Z`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Booking Overview Line Chart (2 Cols) */}
      <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Booking Overview
              </h3>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-600"></span>
                  Total Bookings
                </span>
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
                  Revenue (₹)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
            <span>{timeRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* SVG Interactive Line Chart */}
        <div className="relative w-full overflow-hidden pt-2">
          {/* Tooltip matching screenshot */}
          {hoveredIndex !== null && (
            <div
              className="absolute z-20 bg-slate-950/95 text-white p-2.5 rounded-xl shadow-xl text-xs pointer-events-none transition-all duration-150 border border-slate-700/80"
              style={{
                left: `${(getX(hoveredIndex) / svgWidth) * 100}%`,
                top: `${getY(chartPoints[hoveredIndex].bookings) - 20}px`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <div className="text-[11px] font-bold text-brand-300">
                {chartPoints[hoveredIndex].date}
              </div>
              <div className="font-semibold mt-0.5">
                Bookings: <span className="text-white">{chartPoints[hoveredIndex].bookings}</span>
              </div>
              <div className="text-slate-300">
                Revenue: <span className="text-teal-300 font-semibold">₹ {chartPoints[hoveredIndex].revenue.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}

          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-48 select-none"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal lines */}
            {[0, 20, 40, 60, 80].map((tick) => (
              <g key={tick}>
                <line
                  x1={paddingX}
                  y1={getY(tick)}
                  x2={svgWidth - paddingX}
                  y2={getY(tick)}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 10}
                  y={getY(tick) + 3}
                  fontSize="10"
                  fill="#94a3b8"
                  textAnchor="end"
                >
                  {tick}
                </text>
              </g>
            ))}

            {/* Area Fill */}
            <path d={areaPath} fill="url(#chartGradient)" />

            {/* Main Polyline */}
            <path
              d={pointsPath}
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* X-axis labels and interaction points */}
            {chartPoints.map((point, idx) => (
              <g key={idx}>
                <text
                  x={getX(idx)}
                  y={svgHeight - 6}
                  fontSize="10"
                  fill="#64748b"
                  textAnchor="middle"
                  fontWeight="500"
                >
                  {point.date}
                </text>

                <circle
                  cx={getX(idx)}
                  cy={getY(point.bookings)}
                  r={hoveredIndex === idx ? 6 : 4}
                  fill={hoveredIndex === idx ? '#1d4ed8' : '#2563eb'}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => setHoveredIndex(idx)}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Booking Status Donut Chart matching screenshot */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">Booking Status</h3>
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            Live Health
          </span>
        </div>

        {/* Donut graphic */}
        <div className="relative flex items-center justify-center my-3">
          <svg className="w-36 h-36 transform -rotate-90">
            {/* Background ring */}
            <circle
              cx="72"
              cy="72"
              r="54"
              stroke="#f1f5f9"
              strokeWidth="14"
              fill="transparent"
            />
            {/* Confirmed 75% -> stroke-dasharray (circumference ~ 339.3) */}
            <circle
              cx="72"
              cy="72"
              r="54"
              stroke="#10b981"
              strokeWidth="14"
              strokeDasharray="254 340"
              strokeDashoffset="0"
              fill="transparent"
            />
            {/* Pending 13% */}
            <circle
              cx="72"
              cy="72"
              r="54"
              stroke="#f59e0b"
              strokeWidth="14"
              strokeDasharray="44 340"
              strokeDashoffset="-254"
              fill="transparent"
            />
            {/* Cancelled 7% */}
            <circle
              cx="72"
              cy="72"
              r="54"
              stroke="#ef4444"
              strokeWidth="14"
              strokeDasharray="24 340"
              strokeDashoffset="-298"
              fill="transparent"
            />
            {/* Completed 5% */}
            <circle
              cx="72"
              cy="72"
              r="54"
              stroke="#3b82f6"
              strokeWidth="14"
              strokeDasharray="18 340"
              strokeDashoffset="-322"
              fill="transparent"
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-extrabold text-slate-900">248</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
              Total Bookings
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50">
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Confirmed
            </span>
            <span className="font-bold text-slate-900">186 <span className="text-[10px] text-slate-400 font-normal">75%</span></span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50">
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Pending
            </span>
            <span className="font-bold text-slate-900">32 <span className="text-[10px] text-slate-400 font-normal">13%</span></span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50">
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              Cancelled
            </span>
            <span className="font-bold text-slate-900">18 <span className="text-[10px] text-slate-400 font-normal">7%</span></span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50">
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Completed
            </span>
            <span className="font-bold text-slate-900">12 <span className="text-[10px] text-slate-400 font-normal">5%</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};
