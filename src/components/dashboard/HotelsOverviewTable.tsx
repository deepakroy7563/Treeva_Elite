import React from 'react';
import { useHotels } from '../../context/HotelContext';
import { useModals } from '../../context/ModalContext';
import { StatusBadge } from '../ui/Badge';
import { formatINR } from '../../lib/validation';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  MapPin,
  Building,
  ArrowRight,
  BedDouble
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HotelsOverviewTable: React.FC = () => {
  const { hotels, resolvedImages } = useHotels();
  const { openAddHotel, openEditHotel, openDeleteModal, openDetailsModal, globalSearch } = useModals();
  const navigate = useNavigate();

  // Filter based on global search if user typed in header
  const filteredHotels = hotels.filter((hotel) => {
    if (!globalSearch) return true;
    const term = globalSearch.toLowerCase();
    return (
      hotel.name.toLowerCase().includes(term) ||
      hotel.destination.toLowerCase().includes(term) ||
      hotel.roomType.toLowerCase().includes(term)
    );
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Table Header Section */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Hotels Overview
            </h3>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-200">
              Demo Directory
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Active properties, real-time rates in INR, room allocations, and photography.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button
            onClick={() => navigate('/hotels')}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-brand-50 transition"
          >
            <span>View All ({hotels.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={openAddHotel}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Hotel</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-5">Property & Location</th>
              <th className="py-3 px-4">Room Type</th>
              <th className="py-3 px-4">Total Rooms</th>
              <th className="py-3 px-4">Starting Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredHotels.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  <Building className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <p className="text-sm font-semibold text-slate-600">No hotels found</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {globalSearch ? 'No properties matched your search term.' : 'Click "Add New Hotel" to register your first property.'}
                  </p>
                  <button
                    onClick={openAddHotel}
                    className="mt-4 px-4 py-2 bg-brand-600 text-white text-xs font-semibold rounded-xl hover:bg-brand-700 transition"
                  >
                    Add Hotel Now
                  </button>
                </td>
              </tr>
            ) : (
              filteredHotels.map((hotel) => {
                const imageUrl = resolvedImages[hotel.id] || hotel.imageUrl;
                return (
                  <tr
                    key={hotel.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Hotel Image & Name */}
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-14 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                          <img
                            src={imageUrl}
                            alt={hotel.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4
                            onClick={() => openDetailsModal(hotel)}
                            className="font-bold text-slate-900 truncate max-w-xs hover:text-brand-600 cursor-pointer transition-colors"
                          >
                            {hotel.name}
                          </h4>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                            <MapPin className="w-3 h-3 text-brand-500 flex-shrink-0" />
                            {hotel.destination}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Room Type */}
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800">
                        {hotel.roomType}
                      </span>
                    </td>

                    {/* Total Rooms */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <BedDouble className="w-3.5 h-3.5 text-slate-400" />
                        <span>{hotel.numberOfRooms || 24} Rooms</span>
                      </div>
                    </td>

                    {/* Starting Price */}
                    <td className="py-3 px-4">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">
                          {formatINR(hotel.price)}
                        </span>
                        <span className="text-[10px] text-slate-400 block -mt-0.5">
                          per night
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <StatusBadge status={hotel.status} />
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openDetailsModal(hotel)}
                          className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditHotel(hotel)}
                          className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                          title="Edit Hotel & Rates"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(hotel)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Hotel"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
