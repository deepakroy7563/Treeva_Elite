import type { HotelFormData } from '../types/hotel';

export interface HotelFormErrors {
  name?: string;
  destination?: string;
  price?: string;
  roomType?: string;
  numberOfRooms?: string;
  imageUrl?: string;
  imageFile?: string;
  general?: string;
}

export function validateHotelForm(data: HotelFormData): { isValid: boolean; errors: HotelFormErrors } {
  const errors: HotelFormErrors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = 'Hotel name is required';
  } else if (data.name.trim().length < 3) {
    errors.name = 'Hotel name must be at least 3 characters';
  }

  if (!data.destination || !data.destination.trim()) {
    errors.destination = 'Destination / city is required';
  }

  const numericPrice = typeof data.price === 'string' ? parseFloat(data.price) : data.price;
  if (data.price === '' || isNaN(numericPrice) || numericPrice <= 0) {
    errors.price = 'Please provide a valid starting price greater than 0';
  }

  if (!data.roomType) {
    errors.roomType = 'Room type is required';
  }

  const numericRooms = typeof data.numberOfRooms === 'string' ? parseInt(data.numberOfRooms, 10) : data.numberOfRooms;
  if (data.numberOfRooms && (isNaN(numericRooms) || numericRooms < 1)) {
    errors.numberOfRooms = 'Rooms must be at least 1';
  }

  if (!data.imageUrl && !data.imageFile) {
    errors.imageUrl = 'Hotel image is required. Please upload or select an image.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type.toLowerCase())) {
    return {
      isValid: false,
      error: 'Invalid file format. Please upload JPG, JPEG, PNG, or WebP.',
    };
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      isValid: false,
      error: `File is too large (${sizeMb} MB). Maximum allowed size is 5 MB.`,
    };
  }

  return { isValid: true };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
