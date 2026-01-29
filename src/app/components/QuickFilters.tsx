import { Badge } from '@/app/components/ui/badge';
import { X } from 'lucide-react';

interface QuickFiltersProps {
  selectedFilters: string[];
  onRemoveFilter: (filter: string) => void;
  onClearAll: () => void;
}

const quickFilterOptions = [
  { id: 'wifi', label: 'Free WiFi' },
  { id: 'parking', label: 'Free Parking' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'pool', label: 'Pool' },
  { id: 'gym', label: 'Gym' },
  { id: '5star', label: '5 Stars' },
  { id: '4star', label: '4 Stars' },
];

export function QuickFilters({ selectedFilters, onRemoveFilter, onClearAll }: QuickFiltersProps) {
  if (selectedFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-cyan-50 rounded-lg border border-cyan-100">
      <span className="text-sm text-gray-600 mr-1">Active filters:</span>
      {selectedFilters.map((filter) => {
        const filterLabel = quickFilterOptions.find(opt => opt.id === filter)?.label || filter;
        return (
          <Badge
            key={filter}
            variant="secondary"
            className="bg-[#0052A3] text-white hover:bg-[#003D7A] cursor-pointer transition-colors"
            onClick={() => onRemoveFilter(filter)}
          >
            {filterLabel}
            <X className="size-3 ml-1" />
          </Badge>
        );
      })}
      <button
        onClick={onClearAll}
        className="text-xs text-[#0052A3] hover:text-[#003D7A] underline ml-2"
      >
        Clear all
      </button>
    </div>
  );
}
