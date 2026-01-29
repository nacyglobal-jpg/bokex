import { Button } from '@/app/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';

export type SortOption = 'price-low' | 'price-high' | 'rating' | 'name';

interface SortSelectorProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions = [
  { value: 'price-low' as SortOption, label: 'Price: Low to High' },
  { value: 'price-high' as SortOption, label: 'Price: High to Low' },
  { value: 'rating' as SortOption, label: 'Highest Rated' },
  { value: 'name' as SortOption, label: 'Name: A to Z' },
];

export function SortSelector({ currentSort, onSortChange }: SortSelectorProps) {
  const currentLabel = sortOptions.find(opt => opt.value === currentSort)?.label || 'Sort By';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-sm">
          <ArrowUpDown className="size-4 mr-2" />
          {currentLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={currentSort === option.value ? 'bg-cyan-50' : ''}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
