import React, { useState, useEffect, useRef } from 'react';
import type { Hotel, HotelFormData } from '../../types/hotel';
import { useHotels } from '../../context/HotelContext';
import { validateHotelForm, validateImageFile } from '../../lib/validation';
import type { HotelFormErrors } from '../../lib/validation';
import { ROOM_TYPES, AVAILABILITY_STATUSES, AVAILABLE_AMENITIES, PRESET_HOTEL_IMAGES } from '../../lib/demoData';
import { X, Upload, Trash2, Check, RefreshCw, AlertCircle } from 'lucide-react';

interface AddEditHotelModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotelToEdit?: Hotel | null;
}

export const AddEditHotelModal: React.FC<AddEditHotelModalProps> = ({
  isOpen,
  onClose,
  hotelToEdit,
}) => {
  const { addHotel, updateHotel, resolvedImages } = useHotels();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<HotelFormData>({
    name: '',
    destination: '',
    description: '',
    price: '',
    roomType: 'Deluxe Room',
    numberOfRooms: '24',
    amenities: ['Free High-Speed WiFi', 'Infinity Swimming Pool', 'Free Gourmet Breakfast'],
    status: 'Available',
    imageUrl: '',
    imageFile: null,
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [errors, setErrors] = useState<HotelFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'presets'>('upload');

  // Populate data when editing an existing hotel
  useEffect(() => {
    if (hotelToEdit) {
      const currentResolvedImage = resolvedImages[hotelToEdit.id] || hotelToEdit.imageUrl;
      setFormData({
        name: hotelToEdit.name,
        destination: hotelToEdit.destination,
        description: hotelToEdit.description,
        price: hotelToEdit.price.toString(),
        roomType: hotelToEdit.roomType,
        numberOfRooms: hotelToEdit.numberOfRooms.toString(),
        amenities: hotelToEdit.amenities || [],
        status: hotelToEdit.status,
        imageUrl: hotelToEdit.imageUrl,
        imageFile: null,
      });
      setImagePreview(currentResolvedImage);
    } else {
      // Default clean state for Add Hotel
      setFormData({
        name: '',
        destination: '',
        description: '',
        price: '',
        roomType: 'Deluxe Room',
        numberOfRooms: '24',
        amenities: ['Free High-Speed WiFi', 'Infinity Swimming Pool', 'Free Gourmet Breakfast'],
        status: 'Available',
        imageUrl: PRESET_HOTEL_IMAGES[0].url,
        imageFile: null,
      });
      setImagePreview(PRESET_HOTEL_IMAGES[0].url);
    }
    setErrors({});
  }, [hotelToEdit, isOpen, resolvedImages]);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof HotelFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      const updated = exists
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: updated };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setErrors((prev) => ({ ...prev, imageFile: validation.error }));
      return;
    }

    setErrors((prev) => ({ ...prev, imageFile: undefined, imageUrl: undefined }));
    setFormData((prev) => ({ ...prev, imageFile: file }));

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, imageUrl: '', imageFile: null }));
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelectPreset = (url: string) => {
    setFormData((prev) => ({ ...prev, imageUrl: url, imageFile: null }));
    setImagePreview(url);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setErrors((prev) => ({ ...prev, imageUrl: undefined, imageFile: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateHotelForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (hotelToEdit) {
        const res = await updateHotel(hotelToEdit.id, formData);
        if (res.success) {
          onClose();
        }
      } else {
        const res = await addHotel(formData);
        if (res.success) {
          onClose();
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {hotelToEdit ? 'Edit Hotel Details' : 'Add New Luxury Hotel'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {hotelToEdit
                ? 'Update pricing, room types, and amenities for this property.'
                : 'Register a new property with pricing, room types, and photography.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* General error notice if any */}
          {errors.general && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}

          {/* Hotel Name & Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Hotel Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. The Grand Palace Resort & Spa"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition ${
                  errors.name ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-200'
                }`}
              />
              {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Destination / City <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="e.g. Goa, India"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition ${
                  errors.destination ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-200'
                }`}
              />
              {errors.destination && (
                <p className="text-xs text-rose-600 mt-1">{errors.destination}</p>
              )}
            </div>
          </div>

          {/* Pricing, Room Type & Rooms Count */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Starting Price (₹ INR) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-medium text-sm">₹</span>
                <input
                  type="number"
                  name="price"
                  min="1"
                  step="1"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="8500"
                  className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition ${
                    errors.price ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.price && <p className="text-xs text-rose-600 mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Room Type <span className="text-rose-500">*</span>
              </label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {ROOM_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Total Rooms
              </label>
              <input
                type="number"
                name="numberOfRooms"
                min="1"
                value={formData.numberOfRooms}
                onChange={handleInputChange}
                placeholder="24"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Availability Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Availability Status
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {AVAILABILITY_STATUSES.map((status) => {
                const isSelected = formData.status === status;
                return (
                  <button
                    type="button"
                    key={status}
                    onClick={() => setFormData((prev) => ({ ...prev, status }))}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50 text-brand-700 font-semibold shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Hotel Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Highlight luxury amenities, views, location advantages, and dining experiences..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Hotel Image Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Hotel Photography <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    activeTab === 'upload'
                      ? 'bg-brand-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('presets')}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    activeTab === 'presets'
                      ? 'bg-brand-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Choose Preset
                </button>
              </div>
            </div>

            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div className="space-y-3">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition hover:border-brand-500 hover:bg-brand-50/30 ${
                    errors.imageFile || errors.imageUrl
                      ? 'border-rose-300 bg-rose-50/20'
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Upload className="w-8 h-8 mx-auto text-brand-600 mb-2" />
                  <p className="text-sm font-semibold text-slate-800">
                    Click to browse or drop hotel photo here
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Supports JPG, JPEG, PNG, WebP (Max 5 MB)
                  </p>
                </div>
                {errors.imageFile && (
                  <p className="text-xs text-rose-600">{errors.imageFile}</p>
                )}
                {errors.imageUrl && (
                  <p className="text-xs text-rose-600">{errors.imageUrl}</p>
                )}
              </div>
            )}

            {/* Presets Tab */}
            {activeTab === 'presets' && (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {PRESET_HOTEL_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(preset.url)}
                    className={`relative rounded-xl overflow-hidden aspect-video border-2 transition group ${
                      imagePreview === preset.url
                        ? 'border-brand-600 ring-2 ring-brand-300'
                        : 'border-transparent hover:opacity-90'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-full h-full object-cover"
                    />
                    {imagePreview === preset.url && (
                      <div className="absolute inset-0 bg-brand-600/30 flex items-center justify-center">
                        <Check className="w-5 h-5 text-white drop-shadow" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Image Preview & Controls */}
            {imagePreview && (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 max-h-48 flex items-center justify-center">
                <img
                  src={imagePreview}
                  alt="Hotel Preview"
                  className="w-full h-48 object-cover opacity-90"
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="text-xs text-white/90 font-medium">Selected Image</span>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-white/10"
                    title="Remove Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Amenities Multi-select */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Featured Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_AMENITIES.map((amenity) => {
                const isSelected = formData.amenities.includes(amenity);
                return (
                  <button
                    type="button"
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    {amenity}
                  </button>
                );
              })}
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/70">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-md shadow-brand-600/20 transition flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>{hotelToEdit ? 'Save Changes' : 'Register Hotel'}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
