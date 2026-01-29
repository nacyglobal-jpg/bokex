import { Star, MapPin, Wifi, Coffee, UtensilsCrossed, Car } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Hotel } from '@/app/types/hotel';

interface HotelCardProps {
  hotel: Hotel;
  onBook: (hotel: Hotel) => void;
}

const amenityIcons = {
  wifi: Wifi,
  restaurant: UtensilsCrossed,
  parking: Car,
  breakfast: Coffee,
};

export function HotelCard({ hotel, onBook }: HotelCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-0 shadow-lg">
      <div className="relative h-44 md:h-48 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {hotel.featured && (
          <Badge className="absolute top-3 right-3 bg-[#0052A3] hover:bg-[#003D7A] shadow-lg">
            Featured
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-3 md:p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base md:text-lg mb-1 truncate">{hotel.name}</h3>
            <div className="flex items-center text-xs md:text-sm text-gray-600 mb-2">
              <MapPin className="size-3 mr-1 flex-shrink-0" />
              <span className="truncate">{hotel.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-gradient-to-br from-[#0052A3] to-[#003D7A] text-white px-2 py-1 rounded-lg shadow-md ml-2 flex-shrink-0">
            <Star className="size-3 fill-current" />
            <span className="text-xs md:text-sm font-semibold">{hotel.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: hotel.stars }).map((_, i) => (
            <Star key={i} className="size-3 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 4).map((amenity) => {
            const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
            return Icon ? (
              <div
                key={amenity}
                className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
              >
                <Icon className="size-3 flex-shrink-0" />
                <span className="capitalize">{amenity}</span>
              </div>
            ) : null;
          })}
        </div>

        <div className="mt-3 md:mt-4 flex items-end justify-between">
          <p className="text-xs text-gray-500">Starting from</p>
          <p className="text-xl md:text-2xl font-bold text-[#0052A3]">
            KSh {hotel.price.toLocaleString()}
            <span className="text-xs md:text-sm text-gray-500">/night</span>
          </p>
        </div>

        <Button 
          onClick={() => onBook(hotel)} 
          size="sm" 
          className="bg-gradient-to-r from-[#0052A3] to-[#003D7A] hover:from-[#003D7A] hover:to-[#002855] text-white flex-shrink-0 shadow-md hover:shadow-lg transition-all duration-300"
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
}