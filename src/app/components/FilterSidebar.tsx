import { Slider } from '@/app/components/ui/slider';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Star } from 'lucide-react';
import { PropertyType } from '@/app/types/hotel';

export interface Filters {
  priceRange: [number, number];
  starRating: number[];
  amenities: string[];
  propertyTypes: PropertyType[];
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const handlePriceChange = (value: number[]) => {
    onFilterChange({
      ...filters,
      priceRange: [value[0], value[1]],
    });
  };

  const handleStarToggle = (stars: number) => {
    const newStars = filters.starRating.includes(stars)
      ? filters.starRating.filter((s) => s !== stars)
      : [...filters.starRating, stars];
    onFilterChange({ ...filters, starRating: newStars });
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    onFilterChange({ ...filters, amenities: newAmenities });
  };

  const handlePropertyTypeToggle = (propertyType: PropertyType) => {
    const newPropertyTypes = filters.propertyTypes.includes(propertyType)
      ? filters.propertyTypes.filter((pt) => pt !== propertyType)
      : [...filters.propertyTypes, propertyType];
    onFilterChange({ ...filters, propertyTypes: newPropertyTypes });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-base md:text-lg">Price Range (KSh)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              min={0}
              max={40000}
              step={1000}
              value={[filters.priceRange[0], filters.priceRange[1]]}
              onValueChange={handlePriceChange}
            />
            <div className="flex justify-between text-xs md:text-sm text-gray-600">
              <span>KSh {filters.priceRange[0].toLocaleString()}</span>
              <span>KSh {filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-base md:text-lg">Star Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center space-x-2">
              <Checkbox
                id={`star-${stars}`}
                checked={filters.starRating.includes(stars)}
                onCheckedChange={() => handleStarToggle(stars)}
              />
              <Label
                htmlFor={`star-${stars}`}
                className="flex items-center gap-1 cursor-pointer text-sm"
              >
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="size-3 fill-yellow-400 text-yellow-400" />
                ))}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-base md:text-lg">Amenities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {['wifi', 'parking', 'restaurant', 'breakfast', 'pool', 'gym'].map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={() => handleAmenityToggle(amenity)}
              />
              <Label htmlFor={amenity} className="capitalize cursor-pointer text-sm">
                {amenity}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-base md:text-lg">Property Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {['bnb', 'self-stay', 'hotel'].map((propertyType) => (
            <div key={propertyType} className="flex items-center space-x-2">
              <Checkbox
                id={propertyType}
                checked={filters.propertyTypes.includes(propertyType as PropertyType)}
                onCheckedChange={() => handlePropertyTypeToggle(propertyType as PropertyType)}
              />
              <Label htmlFor={propertyType} className="capitalize cursor-pointer text-sm">
                {propertyType === 'bnb' ? 'BnB' : propertyType === 'self-stay' ? 'Self-Stay House' : 'Hotel'}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}