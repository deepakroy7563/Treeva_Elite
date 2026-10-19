export type RoomType = 'Deluxe Room' | 'Superior Room' | 'Suite' | 'Standard Room' | 'Family Room' | 'Executive Suite' | 'Presidential Villa';

export type AvailabilityStatus = 'Available' | 'Limited Rooms' | 'Booked Out' | 'Under Renovation';

export interface Hotel {
  id: string;
  name: string;
  destination: string; // City / State / Country
  description: string;
  price: number; // Starting price in INR
  roomType: RoomType;
  numberOfRooms: number;
  amenities: string[];
  status: AvailabilityStatus;
  imageUrl: string; // URL or IndexedDB image reference
  imageId?: string; // ID if stored in IndexedDB
  rating?: number;
  totalBookings?: number;
  createdAt: string;
  updatedAt: string;
}

export interface HotelFormData {
  name: string;
  destination: string;
  description: string;
  price: string | number;
  roomType: RoomType;
  numberOfRooms: string | number;
  amenities: string[];
  status: AvailabilityStatus;
  imageUrl: string;
  imageFile?: File | null;
}

export interface AgencySettings {
  agencyName: string;
  contactEmail: string;
  supportPhone: string;
  currency: string;
  currencySymbol: string;
  address: string;
  taxRegistrationNumber: string;
}
