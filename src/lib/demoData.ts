import type { Hotel, AgencySettings } from '../types/hotel';

export const INITIAL_SAMPLE_HOTELS: Hotel[] = [
  {
    id: 'hotel-001',
    name: 'The Grand Palace Resort & Spa',
    destination: 'Goa, India',
    description: 'An idyllic beachfront 5-star haven situated on white sands with panoramic Arabian Sea views, private beach cabanas, multi-cuisine dining, and signature Ayurvedic therapies.',
    price: 8500,
    roomType: 'Deluxe Room',
    numberOfRooms: 48,
    amenities: ['Free High-Speed WiFi', 'Infinity Swimming Pool', 'Luxury Spa', 'Beachfront Cabana', 'Free Gourmet Breakfast', 'Airport Shuttle', 'Fitness Center'],
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    totalBookings: 36,
    createdAt: '2026-06-01T10:00:00.000Z',
    updatedAt: '2026-06-20T14:30:00.000Z',
  },
  {
    id: 'hotel-002',
    name: 'Heritage Haveli & Royal Courtyard',
    destination: 'Jaipur, Rajasthan',
    description: 'A restored 18th-century royal mansion offering opulent heritage architecture, hand-painted fresco ceilings, private courtyards, traditional folk performances, and regal hospitality.',
    price: 6200,
    roomType: 'Superior Room',
    numberOfRooms: 32,
    amenities: ['Free High-Speed WiFi', 'Swimming Pool', 'Heritage Courtyard', 'Regal Dining Experience', 'Free Breakfast', '24/7 Concierge'],
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    totalBookings: 24,
    createdAt: '2026-06-05T11:15:00.000Z',
    updatedAt: '2026-06-22T09:45:00.000Z',
  },
  {
    id: 'hotel-003',
    name: 'Kumarakom Serene Backwaters Resort',
    destination: 'Kerala, India',
    description: 'Surrounded by tranquil lotus ponds and coconut groves along Vembanad Lake, featuring private plunge pool villas, authentic Ayurvedic wellness treatments, and private houseboat cruises.',
    price: 9800,
    roomType: 'Suite',
    numberOfRooms: 26,
    amenities: ['Free High-Speed WiFi', 'Private Plunge Pools', 'Ayurvedic Wellness Spa', 'Houseboat Cruise', 'Lakefront Dining', 'Yoga Pavilion'],
    status: 'Limited Rooms',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    totalBookings: 20,
    createdAt: '2026-06-10T08:20:00.000Z',
    updatedAt: '2026-06-24T16:10:00.000Z',
  },
  {
    id: 'hotel-004',
    name: 'The Palm Horizon Skyline Suites',
    destination: 'Dubai, UAE',
    description: 'Ultra-luxurious coastal suites commanding breathtaking skyline panoramas, Michelin-inspired dining, sky infinity pool, private beach access, and personalized butler services.',
    price: 18500,
    roomType: 'Presidential Villa',
    numberOfRooms: 18,
    amenities: ['Free High-Speed WiFi', 'Rooftop Infinity Pool', 'Private Beach', 'Butler Service', 'Michelin-star Dining', 'Helipad Access', 'Valet Parking'],
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    totalBookings: 18,
    createdAt: '2026-06-12T13:45:00.000Z',
    updatedAt: '2026-06-25T11:00:00.000Z',
  },
  {
    id: 'hotel-005',
    name: 'The Grand Patna Executive Hotel',
    destination: 'Patna, Bihar',
    description: 'Premier downtown business hotel featuring contemporary executive suites, state-of-the-art conference facilities, fine dining restaurants, and close proximity to airport and central business hubs.',
    price: 12500,
    roomType: 'Deluxe Room',
    numberOfRooms: 40,
    amenities: ['Free High-Speed WiFi', 'Executive Lounge', 'Business Conference Rooms', 'Airport Shuttle', 'Fine Dining', 'Fitness Center'],
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    totalBookings: 32,
    createdAt: '2026-06-14T09:00:00.000Z',
    updatedAt: '2026-06-26T08:30:00.000Z',
  },
  {
    id: 'hotel-006',
    name: 'Mayfair Purnea Valley Retreat',
    destination: 'Purnea, Bihar',
    description: 'Sprawling scenic resort with lush botanical lawns, boutique suites, tranquil water fountains, family recreation zone, and artisanal gourmet regional specialties.',
    price: 8800,
    roomType: 'Superior Room',
    numberOfRooms: 28,
    amenities: ['Free High-Speed WiFi', 'Botanical Gardens', 'Family Recreation Zone', 'Swimming Pool', 'Multi-Cuisine Restaurant'],
    status: 'Limited Rooms',
    imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
    rating: 4.4,
    totalBookings: 15,
    createdAt: '2026-06-15T15:00:00.000Z',
    updatedAt: '2026-06-25T17:20:00.000Z',
  }
];

export const INITIAL_AGENCY_SETTINGS: AgencySettings = {
  agencyName: 'Treeva Elite Luxury Travel & Stays',
  contactEmail: 'support@treevaelite.com',
  supportPhone: '+91 98765 43210',
  currency: 'INR',
  currencySymbol: '₹',
  address: 'Level 8, Elite Skyline Towers, Cyber City, Gurugram, India',
  taxRegistrationNumber: '07AABCU9603R1ZX',
};

export const DEMO_USER = {
  email: 'admin@treevaelite.demo',
  password: 'Admin@123',
  name: 'Amresh Kumar',
  role: 'Travel Agent / Administrator',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
};

// Preset photo gallery options for fast testing during client demo
export const PRESET_HOTEL_IMAGES = [
  {
    name: 'Luxury Coastal Resort',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    tag: 'Beach / Resort'
  },
  {
    name: 'Royal Heritage Haveli',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    tag: 'Heritage / Palace'
  },
  {
    name: 'Kerala Backwater Retreat',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    tag: 'Nature / Wellness'
  },
  {
    name: 'Skyline City Villa',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    tag: 'Luxury Modern'
  },
  {
    name: 'Grand City Hotel',
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    tag: 'Executive Business'
  },
  {
    name: 'Boutique Garden Villa',
    url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
    tag: 'Villa & Suites'
  }
];

export const AVAILABLE_AMENITIES = [
  'Free High-Speed WiFi',
  'Infinity Swimming Pool',
  'Luxury Spa',
  'Beachfront Cabana',
  'Free Gourmet Breakfast',
  'Airport Shuttle',
  'Fitness Center & Gym',
  'Rooftop Lounge & Bar',
  '24/7 Room Service',
  'Private Plunge Pool',
  'Conference Facilities',
  'Valet Parking'
];

export const ROOM_TYPES = [
  'Deluxe Room',
  'Superior Room',
  'Suite',
  'Standard Room',
  'Family Room',
  'Executive Suite',
  'Presidential Villa'
] as const;

export const AVAILABILITY_STATUSES = [
  'Available',
  'Limited Rooms',
  'Booked Out',
  'Under Renovation'
] as const;
