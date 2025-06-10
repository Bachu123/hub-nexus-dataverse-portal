
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, X } from 'lucide-react';

const filterOptions = {
  collections: ['Foundation Models', 'Custom Models', 'Open Source', 'Enterprise'],
  industries: ['Healthcare', 'Finance', 'Technology', 'Retail', 'Manufacturing'],
  deploymentOptions: ['Cloud', 'On-Premise', 'Hybrid', 'Edge'],
  inferenceTasks: ['Text Generation', 'Image Recognition', 'Speech-to-Text', 'Translation'],
  fineTuningTasks: ['Classification', 'Sentiment Analysis', 'Named Entity Recognition', 'Summarization']
};

interface ModelFiltersProps {
  filters: {
    collections: string[];
    industries: string[];
    deploymentOptions: string[];
    inferenceTasks: string[];
    fineTuningTasks: string[];
  };
  onFiltersChange: (filters: any) => void;
}

export const ModelFilters = ({ filters, onFiltersChange }: ModelFiltersProps) => {
  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    const newFilters = { ...filters };
    if (checked) {
      newFilters[category] = [...newFilters[category], value];
    } else {
      newFilters[category] = newFilters[category].filter(item => item !== value);
    }
    onFiltersChange(newFilters);
  };

  const removeFilter = (category: string, value: string) => {
    const newFilters = { ...filters };
    newFilters[category] = newFilters[category].filter(item => item !== value);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {} as any);
    onFiltersChange(clearedFilters);
  };

  const getTotalActiveFilters = () => {
    return Object.values(filters).flat().length;
  };

  const FilterDropdown = ({ category, label }: { category: string; label: string }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between">
          {label}
          {filters[category].length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {filters[category].length}
            </Badge>
          )}
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-2">
          {filterOptions[category].map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`${category}-${option}`}
                checked={filters[category].includes(option)}
                onCheckedChange={(checked) => handleFilterChange(category, option, !!checked)}
              />
              <label
                htmlFor={`${category}-${option}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="mb-6">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        <FilterDropdown category="collections" label="Collections" />
        <FilterDropdown category="industries" label="Industries" />
        <FilterDropdown category="deploymentOptions" label="Deployment" />
        <FilterDropdown category="inferenceTasks" label="Inference Tasks" />
        <FilterDropdown category="fineTuningTasks" label="Fine-Tuning Tasks" />
        
        {getTotalActiveFilters() > 0 && (
          <Button variant="ghost" onClick={clearAllFilters} className="text-destructive">
            Clear All ({getTotalActiveFilters()})
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {getTotalActiveFilters() > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([category, values]) =>
            values.map((value: string) => (
              <Badge key={`${category}-${value}`} variant="secondary" className="pr-1">
                {value}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  onClick={() => removeFilter(category, value)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))
          )}
        </div>
      )}
    </div>
  );
};
