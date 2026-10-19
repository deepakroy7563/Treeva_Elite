import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Hotel, HotelFormData, AgencySettings } from '../types/hotel';
import {
  getStoredHotels,
  saveStoredHotels,
  getStoredSettings,
  saveStoredSettings,
  resetDemoToDefaults,
} from '../lib/storage';
import {
  saveImageToIndexedDB,
  getImageFromIndexedDB,
  deleteImageFromIndexedDB,
} from '../lib/imageStorage';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface HotelContextType {
  hotels: Hotel[];
  settings: AgencySettings;
  resolvedImages: Record<string, string>;
  isLoading: boolean;
  toasts: ToastMessage[];
  addHotel: (data: HotelFormData) => Promise<{ success: boolean; error?: string }>;
  updateHotel: (id: string, data: HotelFormData) => Promise<{ success: boolean; error?: string }>;
  deleteHotel: (id: string) => Promise<{ success: boolean }>;
  resetDemo: () => Promise<void>;
  updateSettings: (newSettings: AgencySettings) => void;
  showToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  resolveHotelImage: (hotel: Hotel) => Promise<string>;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hotels, setHotels] = useState<Hotel[]>(() => getStoredHotels());
  const [settings, setSettings] = useState<AgencySettings>(() => getStoredSettings());
  const [resolvedImages, setResolvedImages] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((title: string, description?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Helper to convert File to base64 DataURL
  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Resolve an individual hotel's image
  const resolveHotelImage = useCallback(async (hotel: Hotel): Promise<string> => {
    if (hotel.imageId) {
      const storedBlob = await getImageFromIndexedDB(hotel.imageId);
      if (storedBlob) return storedBlob;
    }
    return hotel.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80';
  }, []);

  // Hydrate image URLs for all hotels
  useEffect(() => {
    let isMounted = true;
    async function loadAllImages() {
      const newMap: Record<string, string> = {};
      for (const h of hotels) {
        if (h.imageId) {
          const loaded = await getImageFromIndexedDB(h.imageId);
          newMap[h.id] = loaded || h.imageUrl;
        } else {
          newMap[h.id] = h.imageUrl;
        }
      }
      if (isMounted) {
        setResolvedImages(newMap);
      }
    }
    loadAllImages();
    return () => {
      isMounted = false;
    };
  }, [hotels]);

  // Add hotel action
  const addHotel = async (data: HotelFormData): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      const newHotelId = `hotel-${Date.now()}`;
      let finalImageUrl = data.imageUrl;
      let imageId: string | undefined = undefined;

      if (data.imageFile) {
        const dataUrl = await fileToDataUrl(data.imageFile);
        imageId = `img-${newHotelId}`;
        await saveImageToIndexedDB(imageId, dataUrl);
        // Also keep a lightweight fallback or thumbnail URL
        finalImageUrl = dataUrl;
      }

      const newHotel: Hotel = {
        id: newHotelId,
        name: data.name.trim(),
        destination: data.destination.trim(),
        description: data.description.trim() || 'A premier luxury accommodation offering world-class services and memorable experiences.',
        price: Number(data.price),
        roomType: data.roomType,
        numberOfRooms: Number(data.numberOfRooms) || 20,
        amenities: data.amenities.length > 0 ? data.amenities : ['Free High-Speed WiFi', '24/7 Room Service', 'Swimming Pool'],
        status: data.status,
        imageUrl: finalImageUrl,
        imageId,
        rating: 4.8,
        totalBookings: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updated = [newHotel, ...hotels];
      setHotels(updated);
      saveStoredHotels(updated);

      setResolvedImages((prev) => ({
        ...prev,
        [newHotelId]: finalImageUrl,
      }));

      showToast(
        'Hotel Added Successfully',
        `"${newHotel.name}" has been registered in the system.`,
        'success'
      );
      return { success: true };
    } catch (err: any) {
      console.error('Error adding hotel:', err);
      showToast('Error Adding Hotel', err.message || 'An unexpected error occurred.', 'error');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Update hotel action
  const updateHotel = async (id: string, data: HotelFormData): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      const existing = hotels.find((h) => h.id === id);
      if (!existing) {
        return { success: false, error: 'Hotel not found' };
      }

      let finalImageUrl = data.imageUrl || existing.imageUrl;
      let imageId = existing.imageId;

      if (data.imageFile) {
        const dataUrl = await fileToDataUrl(data.imageFile);
        imageId = imageId || `img-${id}`;
        await saveImageToIndexedDB(imageId, dataUrl);
        finalImageUrl = dataUrl;
      }

      const updatedHotel: Hotel = {
        ...existing,
        name: data.name.trim(),
        destination: data.destination.trim(),
        description: data.description.trim(),
        price: Number(data.price),
        roomType: data.roomType,
        numberOfRooms: Number(data.numberOfRooms) || existing.numberOfRooms,
        amenities: data.amenities,
        status: data.status,
        imageUrl: finalImageUrl,
        imageId,
        updatedAt: new Date().toISOString(),
      };

      const updatedList = hotels.map((h) => (h.id === id ? updatedHotel : h));
      setHotels(updatedList);
      saveStoredHotels(updatedList);

      setResolvedImages((prev) => ({
        ...prev,
        [id]: finalImageUrl,
      }));

      showToast(
        'Hotel Updated Successfully',
        `Modifications to "${updatedHotel.name}" were saved.`,
        'success'
      );
      return { success: true };
    } catch (err: any) {
      console.error('Error updating hotel:', err);
      showToast('Error Updating Hotel', err.message || 'An unexpected error occurred.', 'error');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Delete hotel action
  const deleteHotel = async (id: string): Promise<{ success: boolean }> => {
    try {
      setIsLoading(true);
      const target = hotels.find((h) => h.id === id);
      const hotelName = target ? target.name : 'Hotel';

      if (target?.imageId) {
        await deleteImageFromIndexedDB(target.imageId);
      }

      const updatedList = hotels.filter((h) => h.id !== id);
      setHotels(updatedList);
      saveStoredHotels(updatedList);

      setResolvedImages((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });

      showToast(
        'Hotel Deleted',
        `"${hotelName}" has been removed from the directory.`,
        'info'
      );
      return { success: true };
    } catch (err) {
      console.error('Error deleting hotel:', err);
      showToast('Failed to Delete', 'Could not delete hotel record.', 'error');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // Reset demo
  const resetDemo = async () => {
    try {
      setIsLoading(true);
      const initial = await resetDemoToDefaults();
      setHotels(initial);
      setSettings(getStoredSettings());
      showToast(
        'Demo Reset Complete',
        'Sample hotels and configuration have been restored to initial state.',
        'success'
      );
    } catch (err) {
      showToast('Reset Failed', 'Failed to restore default sample records.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Update settings
  const updateSettings = (newSettings: AgencySettings) => {
    setSettings(newSettings);
    saveStoredSettings(newSettings);
    showToast('Settings Saved', 'Agency details and preferences updated successfully.', 'success');
  };

  return (
    <HotelContext.Provider
      value={{
        hotels,
        settings,
        resolvedImages,
        isLoading,
        toasts,
        addHotel,
        updateHotel,
        deleteHotel,
        resetDemo,
        updateSettings,
        showToast,
        removeToast,
        resolveHotelImage,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotels = (): HotelContextType => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotels must be used within a HotelProvider');
  }
  return context;
};
