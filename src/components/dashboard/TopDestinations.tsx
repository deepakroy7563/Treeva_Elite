import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TopDestinations: React.FC = () => {
  const navigate = useNavigate();

  const destinations = [
    {
      name: 'Goa',
      bookings: '36 Bookings',
      price: '₹ 8,500+',
      rating: 4.8,
      imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Jaipur',
      bookings: '24 Bookings',
      price: '₹ 6,200+',
      rating: 4.6,
      imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Kerala',
      bookings: '20 Bookings',
      price: '₹ 9,800+',
      rating: 4.7,
      imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Dubai',
      bookings: '18 Bookings',
      price: '₹ 18,500+',
      rating: 4.9,
      imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">Top Destinations</h3>
          <p className="text-xs text-slate-500">Most sought-after luxury stays by travelers</p>
        </div>
        <button
          onClick={() => navigate('/hotels')}
          className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 transition"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {destinations.map((dest, idx) => (
          <div
            key={idx}
            onClick={() => navigate('/hotels')}
            className="group cursor-pointer rounded-xl overflow-hidden border border-slate-200/70 hover:border-brand-300 hover:shadow-md transition-all duration-200"
          >
            <div className="relative h-28 overflow-hidden bg-slate-100">
              <img
                src={dest.imageUrl}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3 bg-white">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs sm:text-sm">{dest.name}</span>
                <span className="flex items-center gap-0.5 text-[11px] font-bold text-amber-500">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {dest.rating}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">{dest.bookings}</p>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">From</span>
                <span className="text-xs font-bold text-brand-600">{dest.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
