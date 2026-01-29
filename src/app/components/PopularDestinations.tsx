import { MapPin, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';

interface Destination {
  name: string;
  region: string;
  properties: number;
  image: string;
  trending?: boolean;
}

const destinations: Destination[] = [
  {
    name: 'Nairobi',
    region: 'Central Kenya',
    properties: 250,
    image: 'https://images.unsplash.com/photo-1735837836882-559fd3ab1a8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlyb2JpJTIwc2t5bGluZXxlbnwxfHx8fDE3Njg3NDQ0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    trending: true,
  },
  {
    name: 'Mombasa',
    region: 'Coastal Kenya',
    properties: 180,
    image: 'https://images.unsplash.com/photo-1535349838154-27b18aa98c2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb21iYXNhJTIwYmVhY2h8ZW58MXx8fHwxNzY4NzQ0NDE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    trending: true,
  },
  {
    name: 'Kisumu',
    region: 'Western Kenya',
    properties: 85,
    image: 'https://images.unsplash.com/photo-1752412275462-8d8877969d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXN1bXUlMjBsYWtlfGVufDF8fHx8MTc2ODc0NDQxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'Nakuru',
    region: 'Rift Valley',
    properties: 95,
    image: 'https://images.unsplash.com/photo-1663324883004-593451448aa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWt1cnUlMjBmbGFtaW5nb3N8ZW58MXx8fHwxNzY4NzQ0NDE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function PopularDestinations() {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Popular Destinations
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              Explore our most booked locations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {destinations.map((destination) => (
            <Card
              key={destination.name}
              className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 border-0"
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {destination.trending && (
                  <div className="absolute top-3 right-3 bg-[#0052A3] text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 animate-pulse">
                    <TrendingUp className="size-3" />
                    Trending
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-1">
                    {destination.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="size-3" />
                      <span>{destination.region}</span>
                    </div>
                    <span className="text-cyan-300">{destination.properties} properties</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}