import React, { useState } from 'react';
import { useHotels } from '../context/HotelContext';
import { useModals } from '../context/ModalContext';
import { formatINR } from '../lib/validation';
import {
  Edit,
  Eye,
  MapPin,
  Plus,
  Search,
  Camera
} from 'lucide-react';

export const HotelImagesPage: React.FC = () => {
  const { hotels, resolvedImages } = useHotels();
  const { openAddHotel, openEditHotel, openDetailsModal } = useModals();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredHotels = hotels.filter((hotel) => {
    const term = searchTerm.toLowerCase();
    return (
      hotel.name.toLowerCase().includes(term) ||
      hotel.destination.toLowerCase().includes(term)
    );
  });

  const fallbackImage =
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Hotel Visual Assets & Photography
            </h2>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full border border-purple-200">
              Media Hub
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Browse high-resolution hotel imagery, view full property photography, and replace asset media.
          </p>
        </div>

        <button
          onClick={openAddHotel}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Property Photo</span>
        </button>
      </div>

      {/* Filter and stats row */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search photos by property or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
          />
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-600">
          <div>
            <span className="text-slate-400">Total Visuals: </span>
            <strong className="text-slate-900">{hotels.length} Media Files</strong>
          </div>
          <div className="h-4 w-px bg-slate-200" />
          <div>
            <span className="text-slate-400">Storage Engine: </span>
            <strong className="text-emerald-600 font-semibold">IndexedDB + Cloud</strong>
          </div>
        </div>
      </div>

      {/* Gallery Cards Grid */}
      {filteredHotels.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-sm">
          <Camera className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-900">No hotel images found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchTerm
              ? 'No property photos match your search terms.'
              : 'Add your first hotel property with high-resolution photography to populate the gallery.'}
          </p>
          <button
            onClick={openAddHotel}
            className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700 transition"
          >
            Add Hotel With Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => {
            const currentImg = resolvedImages[hotel.id] || hotel.imageUrl || fallbackImage;

            return (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300"
              >
                {/* Photo frame */}
                <div className="relative h-56 overflow-hidden bg-slate-900 cursor-pointer" onClick={() => openDetailsModal(hotel)}>
                  <img
                    src={currentImg}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Destination badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 text-[11px] font-semibold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    <MapPin className="w-3 h-3 text-brand-300" />
                    <span>{hotel.destination}</span>
                  </div>

                  {/* Price overlay */}
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[10px] text-slate-300 block">Starting from</span>
                    <span className="text-lg font-extrabold text-white">
                      {formatINR(hotel.price)}
                    </span>
                    <span className="text-[10px] text-slate-300"> / night</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      onClick={() => openDetailsModal(hotel)}
                      className="font-bold text-slate-900 text-sm hover:text-brand-600 cursor-pointer transition line-clamp-1"
                    >
                      {hotel.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {hotel.roomType} • {hotel.numberOfRooms || 24} Rooms available
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => openDetailsModal(hotel)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>

                    <button
                      onClick={() => openEditHotel(hotel)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold border border-brand-200 transition"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Image</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
