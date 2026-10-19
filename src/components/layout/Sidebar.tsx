import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Building2,
  Image as ImageIcon,
  Settings,
  LogOut,
  Headphones,
  Compass,
  X,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenAddModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Hotels', path: '/hotels', icon: Building2 },
    { name: 'Hotel Images', path: '/hotel-images', icon: ImageIcon },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#091326] text-slate-300 flex flex-col border-r border-slate-800/80 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Logo Header */}
        <div className="p-6 pb-4 border-b border-slate-800/60 flex items-center justify-between">
          <div className="flex flex-col items-center w-full text-center">
            {/* Elegant Lotus / Crown Luxury Emblem */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-blue-500 to-indigo-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 mb-2">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <h1 className="tracking-[0.25em] text-lg font-bold text-white uppercase font-sans">
              Treeva
            </h1>
            <span className="text-[10px] tracking-[0.35em] text-brand-300 font-semibold uppercase -mt-0.5">
              Elite
            </span>
            <p className="text-[9px] tracking-wider text-slate-400 uppercase mt-1">
              Hotel Booking Made Easy
            </p>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all text-left mt-2"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>

        {/* Explore Book Travel Scenic Banner & Support (Matches Screenshot) */}
        <div className="p-3 m-3 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0d1c3a] border border-slate-800 relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-300 tracking-wider uppercase">
              <Compass className="w-3.5 h-3.5 text-brand-400" />
              <span>Explore • Book • Travel</span>
            </div>
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <Headphones className="w-3.5 h-3.5 text-brand-400" />
                <span>Need Help?</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 truncate">
                support@treevaelite.com
              </p>
              <p className="text-[11px] text-slate-400 font-mono">
                +91 98765 43210
              </p>
            </div>
          </div>
        </div>

        {/* Demo Indicator Footer */}
        <div className="px-4 py-2.5 bg-[#060d1b] border-t border-slate-800/80 text-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
            Treeva Elite Admin Demo v1.0
          </span>
        </div>
      </aside>
    </>
  );
};
