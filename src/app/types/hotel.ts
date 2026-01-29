export type PropertyType = 'bnb' | 'self-stay' | 'hotel';
export type RoomCategory = 'studio' | '1-bedroom' | '2-bedroom' | '3-bedroom' | '4-bedroom' | '5-bedroom' | '6plus-bedroom' | 'single-room' | 'double-room';
export type BedType = '1-bed' | '2-beds';
export type StayDuration = 'half-day' | '1-day' | '2-7-days' | '1-2-weeks';
export type OccupancyRange = '1-person' | '2-people' | '3-4-people' | '5-6-people' | 'group-7plus';

export interface Hotel {
  id: string;
  name: string;
  location: string; // Kenyan locations only
  price: number; // In Kenyan Shillings (KES)
  rating: number;
  stars: number;
  image: string;
  amenities: string[];
  description: string;
  featured?: boolean;
  propertyType: PropertyType;
  rooms: Room[];
}

export interface Room {
  id: string;
  type: string;
  roomCategory: RoomCategory;
  bedType?: BedType; // Only for hotel double rooms
  price: number; // In Kenyan Shillings (KES)
  capacity: number;
  available: number;
  amenities: string[];
}