import React, { useState } from 'react';
import { useHotels } from '../context/HotelContext';
import type { AgencySettings } from '../types/hotel';
import {
  Building,
  Save,
  RotateCcw,
  ShieldAlert,
  Database,
  Info
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, resetDemo } = useHotels();

  const [formData, setFormData] = useState<AgencySettings>(settings);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updateSettings(formData);
      setIsSaving(false);
    }, 300);
  };

  const handleResetConfirm = async () => {
    await resetDemo();
    setFormData({
      agencyName: 'Treeva Elite Luxury Travel & Stays',
      contactEmail: 'support@treevaelite.com',
      supportPhone: '+91 98765 43210',
      currency: 'INR',
      currencySymbol: '₹',
      address: 'Level 8, Elite Skyline Towers, Cyber City, Gurugram, India',
      taxRegistrationNumber: '07AABCU9603R1ZX',
    });
    setIsResetConfirmOpen(false);
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Admin Settings & Configuration
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Configure agency metadata, default currency, contact channels, and manage demo data state.
        </p>
      </div>

      {/* Demo Notice Banner */}
      <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200/80 flex items-start gap-3">
        <Info className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 leading-relaxed">
          <strong className="text-brand-900 block font-semibold mb-0.5">
            Client Presentation Demo Mode Notice:
          </strong>
          All configuration and hotel inventory changes are persisted in this browser's LocalStorage and IndexedDB. In a live production deployment, these configurations sync with your cloud backend database.
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <Building className="w-5 h-5 text-brand-600" />
          <h3 className="text-sm font-bold text-slate-900">Agency Information</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Agency Name
            </label>
            <input
              type="text"
              name="agencyName"
              value={formData.agencyName}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Agency Contact Email
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Support Phone Number
            </label>
            <input
              type="text"
              name="supportPhone"
              value={formData.supportPhone}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Operating Currency
            </label>
            <div className="relative">
              <input
                type="text"
                name="currency"
                value="Indian Rupee (INR - ₹)"
                readOnly
                disabled
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-500 bg-slate-100 font-semibold cursor-not-allowed"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Currency is locked to INR (₹) for this demo presentation.</p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20 transition"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>

      {/* Demo Reset Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <Database className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900">Demo Data Management</h3>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-slate-800">
              Reset Demo to Original Sample State
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Restore the initial 6 sample hotels across Goa, Jaipur, Kerala, Dubai, Patna, and Purnea.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold transition flex-shrink-0"
          >
            <RotateCcw className="w-4 h-4 text-amber-600" />
            <span>Reset to Sample Data</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Reset All Demo Data?</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              This will restore the original sample hotel properties, default pricing, and reset all custom edits.
            </p>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetConfirm}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-md shadow-amber-600/20"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
