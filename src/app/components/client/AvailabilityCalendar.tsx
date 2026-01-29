import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Mock data for booked/available dates
const initialBookedDates = [7, 14, 21, 28];
const partiallyBookedDates = [6, 13, 20, 27];

export function AvailabilityCalendar() {
  const [currentMonth, setCurrentMonth] = useState('May 2024');
  const [blockedDates, setBlockedDates] = useState<number[]>([]);
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const [isBlockingMode, setIsBlockingMode] = useState(false);

  // Generate calendar days (simplified - May 2024 starts on Wednesday)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDay = 3; // Wednesday

  const getDayStatus = (day: number) => {
    if (blockedDates.includes(day)) return 'blocked';
    if (initialBookedDates.includes(day)) return 'booked';
    if (partiallyBookedDates.includes(day)) return 'partial';
    return 'available';
  };

  const toggleDateSelection = (day: number) => {
    if (!isBlockingMode) return;
    
    const status = getDayStatus(day);
    if (status === 'booked' || status === 'partial') {
      return; // Can't block already booked dates
    }
    
    setSelectedDates(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const confirmBlockDates = () => {
    setBlockedDates(prev => [...prev, ...selectedDates]);
    setSelectedDates([]);
    setIsBlockingMode(false);
  };

  const cancelBlockMode = () => {
    setSelectedDates([]);
    setIsBlockingMode(false);
  };

  const removeBlockedDate = (day: number) => {
    setBlockedDates(prev => prev.filter(d => d !== day));
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">Availability Calendar</CardTitle>
        </div>
        <div className="flex items-center justify-between mt-3">
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft className="size-4" />
          </button>
          <span className="text-sm font-semibold">{currentMonth}</span>
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          
          {/* Actual days */}
          {daysInMonth.map((day) => {
            const status = getDayStatus(day);
            const isSelected = selectedDates.includes(day);
            
            return (
              <button
                key={day}
                onClick={() => toggleDateSelection(day)}
                disabled={!isBlockingMode}
                className={`
                  aspect-square rounded-lg text-xs font-medium transition-all relative
                  ${isBlockingMode && (status === 'available' || status === 'blocked') ? 'cursor-pointer' : ''}
                  ${!isBlockingMode ? 'cursor-default' : ''}
                  ${isSelected ? 'ring-2 ring-[#00A8E8] ring-offset-1' : ''}
                  ${status === 'blocked' ? 'bg-gray-400 text-white' : ''}
                  ${status === 'booked' ? 'bg-[#0052A3] text-white' : ''}
                  ${status === 'partial' ? 'bg-yellow-100 text-gray-900' : ''}
                  ${status === 'available' ? 'bg-gray-50 text-gray-700 hover:bg-gray-100' : ''}
                `}
              >
                {day}
                {status === 'blocked' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeBlockedDate(day);
                    }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                  >
                    <X className="size-2" />
                  </button>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-yellow-100" />
            <span className="text-gray-600">Partially Booked</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-[#0052A3]" />
            <span className="text-gray-600">Fully Booked</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-gray-400" />
            <span className="text-gray-600">Blocked by You</span>
          </div>
        </div>

        {/* Blocked Dates List */}
        {blockedDates.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs font-semibold text-gray-700 mb-2">Blocked Dates:</p>
            <div className="flex flex-wrap gap-1">
              {blockedDates.map(day => (
                <span key={day} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-xs rounded">
                  May {day}
                  <button
                    onClick={() => removeBlockedDate(day)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!isBlockingMode ? (
          <Button 
            onClick={() => setIsBlockingMode(true)}
            className="w-full mt-4 bg-[#00A8E8] hover:bg-[#0086ba] text-white"
          >
            + Block Dates
          </Button>
        ) : (
          <div className="mt-4 space-y-2">
            <p className="text-xs text-gray-600 text-center">
              {selectedDates.length > 0 
                ? `${selectedDates.length} date(s) selected` 
                : 'Click on available dates to block them'}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={confirmBlockDates}
                disabled={selectedDates.length === 0}
                className="bg-[#0052A3] hover:bg-[#003d7a] disabled:opacity-50"
              >
                Confirm Block
              </Button>
              <Button 
                onClick={cancelBlockMode}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}