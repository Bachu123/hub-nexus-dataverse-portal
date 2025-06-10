
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Star, Search } from 'lucide-react';
import { ModelFilters } from '@/components/ModelFilters';
import { mockModels } from '@/data/mockModels';

const ModelCatalog = () => {
  const navigate = useNavigate();
  const [models, setModels] = useState(mockModels);
  const [filteredModels, setFilteredModels] = useState(mockModels);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    collections: [],
    industries: [],
    deploymentOptions: [],
    inferenceTasks: [],
    fineTuningTasks: []
  });

  useEffect(() => {
    // Filter models based on search and filters
    let filtered = models;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(model => 
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply other filters
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter(model => 
          values.some(value => model[key]?.includes(value))
        );
      }
    });

    setFilteredModels(filtered);
  }, [searchTerm, filters, models]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Model Catalog</h1>
          <p className="text-muted-foreground">
            Discover, explore, and compare AI models in our comprehensive catalog
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <ModelFilters filters={filters} onFiltersChange={handleFilterChange} />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredModels.length} of {models.length} models
          </p>
        </div>

        {/* Model Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredModels.map((model) => (
            <Card 
              key={model.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => navigate(`/models/${model.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                  <img 
                    src={model.imageUrl || "/placeholder.svg"} 
                    alt={model.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <CardTitle className="text-lg">{model.name}</CardTitle>
                <CardDescription className="text-sm">{model.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {model.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(model.rating)}
                    <span className="text-sm text-muted-foreground ml-2">
                      ({model.rating})
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {model.collections?.slice(0, 2).map((collection) => (
                    <Badge key={collection} variant="secondary" className="text-xs">
                      {collection}
                    </Badge>
                  ))}
                  {model.collections?.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{model.collections.length - 2}
                    </Badge>
                  )}
                </div>
                <Button className="w-full" size="sm">
                  Get Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredModels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No models found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setFilters({
                  collections: [],
                  industries: [],
                  deploymentOptions: [],
                  inferenceTasks: [],
                  fineTuningTasks: []
                });
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelCatalog;
