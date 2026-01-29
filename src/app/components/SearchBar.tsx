import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Clock, Minus, Plus } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { Calendar as CalendarComponent } from '@/app/components/ui/calendar';
import { format } from 'date-fns';

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
}

export interface SearchParams {
  location: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  days: number;
  guests: number;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [days, setDays] = useState(1);
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    onSearch({ location, checkIn, checkOut, days, guests });
  };

  const incrementDays = () => {
    if (days < 365) {
      setDays(days + 1);
    }
  };

  const decrementDays = () => {
    if (days > 1) {
      setDays(days - 1);
    }
  };

  const incrementGuests = () => {
    if (guests < 20) {
      setGuests(guests + 1);
    }
  };

  const decrementGuests = () => {
    if (guests > 1) {
      setGuests(guests - 1);
    }
  };

  const handleDaysChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 1 && num <= 365) {
      setDays(num);
    }
  };

  const handleGuestsChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 1 && num <= 20) {
      setGuests(num);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        <div className="relative">
          <label className="text-xs md:text-sm text-gray-600 mb-1 block">Location in Kenya</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input
              placeholder="e.g. Nairobi, Mombasa"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="text-xs md:text-sm text-gray-600 mb-1 block">Check-in</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left text-sm">
                <Calendar className="mr-2 size-4 flex-shrink-0" />
                <span className="truncate">{checkIn ? format(checkIn, 'MMM dd') : 'Select date'}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="text-xs md:text-sm text-gray-600 mb-1 block">Check-out</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left text-sm">
                <Calendar className="mr-2 size-4 flex-shrink-0" />
                <span className="truncate">{checkOut ? format(checkOut, 'MMM dd') : 'Select date'}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                disabled={(date) => checkIn ? date < checkIn : false}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="text-xs md:text-sm text-gray-600 mb-1 block">Stay Duration</label>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={decrementDays}
              disabled={days === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <Minus className="size-3.5 text-gray-600" />
            </button>
            <div className="flex-1 relative">
              <div className="flex items-center justify-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
                <Clock className="size-4 text-gray-400 mr-2" />
                <input
                  type="number"
                  value={days}
                  onChange={(e) => handleDaysChange(e.target.value)}
                  min="1"
                  max="365"
                  className="w-12 text-center font-semibold text-gray-900 focus:outline-none"
                />
                <span className="text-sm text-gray-600 ml-1">{days === 1 ? 'day' : 'days'}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={incrementDays}
              disabled={days === 365}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <Plus className="size-3.5 text-gray-600" />
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs md:text-sm text-gray-600 mb-1 block">Occupancy</label>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={decrementGuests}
              disabled={guests === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <Minus className="size-3.5 text-gray-600" />
            </button>
            <div className="flex-1 relative">
              <div className="flex items-center justify-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
                <Users className="size-4 text-gray-400 mr-2" />
                <input
                  type="number"
                  value={guests}
                  onChange={(e) => handleGuestsChange(e.target.value)}
                  min="1"
                  max="20"
                  className="w-8 text-center font-semibold text-gray-900 focus:outline-none"
                />
                <span className="text-sm text-gray-600 ml-1">{guests === 1 ? 'guest' : 'guests'}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={incrementGuests}
              disabled={guests === 20}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <Plus className="size-3.5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button onClick={handleSearch} className="w-full md:w-auto px-6 md:px-8 bg-[#0052A3] hover:bg-[#003D7A] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Search className="mr-2 size-4" />
          Search Stays
        </Button>
      </div>
    </div>
  );
}