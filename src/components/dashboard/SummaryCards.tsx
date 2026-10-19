import React from 'react';
import { useHotels } from '../../context/HotelContext';
import { Building2, Layers, IndianRupee, Image as ImageIcon, BedDouble, ChevronRight, TrendingUp } from 'lucide-react';
import { formatINR } from '../../lib/validation';

export const SummaryCards: React.FC = () => {
  const { hotels } = useHotels();

  const totalHotels = hotels.length;
  const uniqueRoomTypes = new Set(hotels.map((h) => h.roomType)).size;
  const averagePrice =
    totalHotels > 0
      ? Math.round(hotels.reduce((sum, h) => sum + h.price, 0) / totalHotels)
      : 0;
  const totalImages = hotels.filter((h) => h.imageUrl || h.imageId).length;
  const totalRooms = hotels.reduce((sum, h) => sum + (h.numberOfRooms || 24), 0);

  const cards = [
    {
      title: 'Total Hotels',
      value: totalHotels.toString(),
      subtext: '↑ 12% vs last month',
      icon: Building2,
      color: 'bg-blue-50 text-brand-600',
    },
    {
      title: 'Total Room Types',
      value: uniqueRoomTypes.toString(),
      subtext: 'Active variations',
      icon: Layers,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Avg. Starting Price',
      value: formatINR(averagePrice),
      subtext: 'Dynamic live rate',
      icon: IndianRupee,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Hotel Images',
      value: totalImages.toString(),
      subtext: 'High-res photography',
      icon: ImageIcon,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Total Room Capacity',
      value: totalRooms.toString(),
      subtext: 'Across properties',
      icon: BedDouble,
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-11 h-11 rounded-2xl ${card.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                {card.title}
              </span>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                {card.value}
              </div>
              <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 mt-1.5">
                <TrendingUp className="w-3 h-3" />
                <span>{card.subtext}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
