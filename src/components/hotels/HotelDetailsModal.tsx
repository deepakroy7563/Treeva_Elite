import React from 'react';
import type { Hotel } from '../../types/hotel';
import { useHotels } from '../../context/HotelContext';
import { StatusBadge } from '../ui/Badge';
import { X, MapPin, Star, Check } from 'lucide-react';

interface HotelDetailsModalProps {
  isOpen: boolean;
  hotel: Hotel | null;
  onClose: () => void;
  onEdit: (hotel: Hotel) => void;
}

export const HotelDetailsModal: React.FC<HotelDetailsModalProps> = ({
  isOpen,
  hotel,
  onClose,
  onEdit,
}) => {
  const { resolvedImages } = useHotels();

  if (!isOpen || !hotel) return null;

  const displayImage = resolvedImages[hotel.id] || hotel.imageUrl;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Cover Photo */}
        <div className="relative h-64 w-full bg-slate-900">
          <img
            src={displayImage}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/90 hover:text-white p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <StatusBadge status={hotel.status} />
                <span className="flex items-center gap-1 text-xs text-amber-300 font-semibold bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {hotel.rating || 4.8}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                {hotel.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-brand-300" />
                {hotel.destination}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-300 block">Starting from</span>
              <span className="text-2xl font-extrabold text-white">
                ₹{hotel.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-300 block">/ night</span>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Key Specs Bar */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <div>
              <span className="text-xs text-slate-500 block">Room Type</span>
              <span className="text-sm font-semibold text-slate-800">{hotel.roomType}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Total Rooms</span>
              <span className="text-sm font-semibold text-slate-800">{hotel.numberOfRooms || 24} Rooms</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Demo Bookings</span>
              <span className="text-sm font-semibold text-slate-800">{hotel.totalBookings || 12} Reserved</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Property Overview
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {hotel.description}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Hotel Amenities & Services
            </h4>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities && hotel.amenities.length > 0 ? (
                hotel.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700"
                  >
                    <Check className="w-3 h-3 text-emerald-600" />
                    {amenity}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400">Standard luxury amenities</span>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/70">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onEdit(hotel);
            }}
            className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-md shadow-brand-600/20 transition"
          >
            Edit Hotel
          </button>
        </div>
      </div>
    </div>
  );
};
