import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Building2, Image as ImageIcon, Search } from 'lucide-react';
import { useModals } from '../../context/ModalContext';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const { openAddHotel } = useModals();

  const actions = [
    {
      title: 'Add Hotel',
      description: 'Register property & upload photos',
      icon: PlusCircle,
      onClick: openAddHotel,
      color: 'bg-brand-50 text-brand-700 hover:bg-brand-100/80 border-brand-200/80',
      primary: true,
    },
    {
      title: 'Manage Hotels',
      description: 'View list, edit rates & status',
      icon: Building2,
      onClick: () => navigate('/hotels'),
      color: 'bg-slate-50 text-slate-800 hover:bg-slate-100 border-slate-200/80',
      primary: false,
    },
    {
      title: 'View Hotel Images',
      description: 'Browse gallery & photos',
      icon: ImageIcon,
      onClick: () => navigate('/hotel-images'),
      color: 'bg-slate-50 text-slate-800 hover:bg-slate-100 border-slate-200/80',
      primary: false,
    },
    {
      title: 'Search Directory',
      description: 'Filter by city or room type',
      icon: Search,
      onClick: () => navigate('/hotels'),
      color: 'bg-slate-50 text-slate-800 hover:bg-slate-100 border-slate-200/80',
      primary: false,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">Quick Actions</h3>
        <span className="text-[11px] font-medium text-slate-400">Shortcuts</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <button
              key={idx}
              onClick={act.onClick}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 group ${
                act.primary
                  ? 'bg-brand-600 text-white border-brand-600 hover:bg-brand-700 shadow-sm shadow-brand-600/20'
                  : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200/70 text-slate-800'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${
                  act.primary
                    ? 'bg-white/20 text-white'
                    : 'bg-white text-brand-600 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span
                  className={`block text-xs font-bold leading-snug truncate ${
                    act.primary ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {act.title}
                </span>
                <span
                  className={`block text-[10px] truncate mt-0.5 ${
                    act.primary ? 'text-blue-100' : 'text-slate-500'
                  }`}
                >
                  {act.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
