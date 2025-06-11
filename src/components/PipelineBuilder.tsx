
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Save, 
  Play, 
  Trash2, 
  FileText, 
  Camera, 
  Heart, 
  Mic, 
  FileType, 
  AlertTriangle,
  ArrowDown,
  GripVertical
} from 'lucide-react';
import { availableAIServices, AIServiceTemplate } from '@/data/aiServicesData';

interface PipelineService {
  id: string;
  serviceId: string;
  name: string;
  order: number;
  config: any;
}

interface PipelineBuilderProps {
  open: boolean;
  onClose: () => void;
  onSave: (pipeline: any) => void;
}

const iconMap = {
  FileText,
  Camera,
  Heart,
  Mic,
  FileType,
  AlertTriangle
};

export const PipelineBuilder = ({ open, onClose, onSave }: PipelineBuilderProps) => {
  const [pipelineName, setPipelineName] = useState('');
  const [pipelineDescription, setPipelineDescription] = useState('');
  const [selectedServices, setSelectedServices] = useState<PipelineService[]>([]);
  const [draggedService, setDraggedService] = useState<AIServiceTemplate | null>(null);
  const [activeTab, setActiveTab] = useState('services');

  const categories = ['NLP', 'Computer Vision', 'Audio', 'ML'];

  const handleDragStart = (service: AIServiceTemplate) => {
    setDraggedService(service);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (draggedService) {
      const newService: PipelineService = {
        id: `${draggedService.id}-${Date.now()}`,
        serviceId: draggedService.id,
        name: draggedService.name,
        order: selectedServices.length,
        config: {}
      };
      setSelectedServices(prev => [...prev, newService]);
      setDraggedService(null);
    }
  }, [draggedService, selectedServices.length]);

  const removeService = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(s => s.id !== serviceId));
  };

  const moveService = (serviceId: string, direction: 'up' | 'down') => {
    setSelectedServices(prev => {
      const services = [...prev];
      const index = services.findIndex(s => s.id === serviceId);
      
      if (direction === 'up' && index > 0) {
        [services[index], services[index - 1]] = [services[index - 1], services[index]];
      } else if (direction === 'down' && index < services.length - 1) {
        [services[index], services[index + 1]] = [services[index + 1], services[index]];
      }
      
      return services.map((service, idx) => ({ ...service, order: idx }));
    });
  };

  const handleSave = () => {
    const pipeline = {
      id: `pipeline-${Date.now()}`,
      name: pipelineName,
      description: pipelineDescription,
      services: selectedServices,
      createdAt: new Date().toISOString(),
      status: 'draft'
    };
    onSave(pipeline);
    onClose();
    // Reset form
    setPipelineName('');
    setPipelineDescription('');
    setSelectedServices([]);
  };

  const ServiceCard = ({ service }: { service: AIServiceTemplate }) => {
    const IconComponent = iconMap[service.icon as keyof typeof iconMap] || FileText;
    
    return (
      <Card 
        className="cursor-grab hover:shadow-md transition-shadow border-2 border-dashed border-gray-200 hover:border-purple-300"
        draggable
        onDragStart={() => handleDragStart(service)}
      >
        <CardContent className="p-3">
          <div className="flex items-start space-x-2">
            <IconComponent className="w-5 h-5 text-purple-600 mt-1" />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{service.name}</h4>
              <p className="text-xs text-slate-600 line-clamp-2">{service.description}</p>
              <Badge variant="secondary" className="mt-1 text-xs">
                {service.category}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const PipelineServiceItem = ({ service, index }: { service: PipelineService; index: number }) => {
    const template = availableAIServices.find(s => s.id === service.serviceId);
    const IconComponent = iconMap[template?.icon as keyof typeof iconMap] || FileText;

    return (
      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-medium">
            {index + 1}
          </span>
          <IconComponent className="w-5 h-5 text-purple-600" />
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium text-sm">{service.name}</h4>
          <p className="text-xs text-slate-600">{template?.description}</p>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => moveService(service.id, 'up')}
            disabled={index === 0}
            className="w-8 h-8 p-0"
          >
            <GripVertical className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeService(service.id)}
            className="w-8 h-8 p-0 text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
        
        {index < selectedServices.length - 1 && (
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-16">
            <ArrowDown className="w-4 h-4 text-gray-400" />
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Create New Pipeline</DialogTitle>
        </DialogHeader>
        
        <div className="flex h-full space-x-6">
          {/* Left Panel - Available Services */}
          <div className="w-1/3 flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Available AI Services</h3>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                {categories.map(category => (
                  <TabsTrigger key={category} value={category.toLowerCase().replace(' ', '-')} className="text-xs">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {categories.map(category => (
                <TabsContent 
                  key={category} 
                  value={category.toLowerCase().replace(' ', '-')} 
                  className="flex-1"
                >
                  <ScrollArea className="h-96">
                    <div className="space-y-2">
                      {availableAIServices
                        .filter(service => service.category === category)
                        .map(service => (
                          <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Right Panel - Pipeline Builder */}
          <div className="w-2/3 flex flex-col">
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="pipeline-name">Pipeline Name</Label>
                <Input
                  id="pipeline-name"
                  value={pipelineName}
                  onChange={(e) => setPipelineName(e.target.value)}
                  placeholder="Enter pipeline name"
                />
              </div>
              <div>
                <Label htmlFor="pipeline-description">Description</Label>
                <Textarea
                  id="pipeline-description"
                  value={pipelineDescription}
                  onChange={(e) => setPipelineDescription(e.target.value)}
                  placeholder="Describe your pipeline"
                  rows={2}
                />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">Pipeline Flow</h3>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 min-h-96 bg-gray-50"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {selectedServices.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <Plus className="w-12 h-12 mb-2" />
                    <p>Drag AI services here to build your pipeline</p>
                  </div>
                ) : (
                  <ScrollArea className="h-full">
                    <div className="space-y-4 relative">
                      {selectedServices.map((service, index) => (
                        <div key={service.id} className="relative">
                          <PipelineServiceItem service={service} index={index} />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={!pipelineName || selectedServices.length === 0}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Pipeline
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
