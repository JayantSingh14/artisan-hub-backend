import { useSearchParams } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Category } from '@/types';

interface ProductFiltersProps {
  categories: Category[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || 'all';
  const currentSort = searchParams.get('sort') || 'default';

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all') {
      params.delete('category');
    } else {
      params.set('category', value);
    }
    setSearchParams(params);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'default') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    setSearchParams(params);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* Category Filter */}
      <div className="flex-1">
        <label className="text-sm font-medium text-muted-foreground mb-2 block">
          Category
        </label>
        <Select value={currentCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name.toLowerCase()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort */}
      <div className="flex-1">
        <label className="text-sm font-medium text-muted-foreground mb-2 block">
          Sort By
        </label>
        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
