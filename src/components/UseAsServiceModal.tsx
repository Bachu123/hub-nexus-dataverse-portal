
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Upload } from 'lucide-react';

interface UseAsServiceModalProps {
  open: boolean;
  onClose: () => void;
  modelName: string;
  onCreateService: (serviceData: any) => void;
}

export const UseAsServiceModal = ({ open, onClose, modelName, onCreateService }: UseAsServiceModalProps) => {
  const [serviceName, setServiceName] = useState(`${modelName} Service`);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [created, setCreated] = useState(false);

  const handleCreate = async () => {
    setIsCreating(true);
    
    // Simulate service creation
    setTimeout(() => {
      const serviceData = {
        id: `ft-${modelName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        name: serviceName,
        description,
        category,
        status: 'deployed',
        version: '1.0.0',
        endpoint: endpoint || `https://api.example.com/${serviceName.toLowerCase().replace(/\s+/g, '-')}`,
        creator: 'current-user',
        createdAt: new Date().toISOString(),
        isFineTuned: true,
        baseModel: modelName,
        inputSchema: { text: 'string', max_tokens: 'number' },
        outputSchema: { result: 'string', confidence: 'number' },
        metrics: {
          totalRuns: 0,
          successRate: 100,
          avgLatency: 0
        }
      };
      
      onCreateService(serviceData);
      setIsCreating(false);
      setCreated(true);
      
      setTimeout(() => {
        setCreated(false);
        onClose();
        // Reset form
        setServiceName(`${modelName} Service`);
        setDescription('');
        setCategory('');
        setEndpoint('');
      }, 2000);
    }, 3000);
  };

  if (created) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Service Created!</h3>
            <p className="text-slate-600">
              Your fine-tuned model has been deployed as an AI service and is ready to use.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Use Fine-Tuned Model as AI Service</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
            <Badge variant="secondary">Fine-Tuned Model</Badge>
            <span className="font-medium">{modelName}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="service-name">Service Name</Label>
              <Input
                id="service-name"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="Enter service name"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NLP">NLP</SelectItem>
                  <SelectItem value="Computer Vision">Computer Vision</SelectItem>
                  <SelectItem value="Audio">Audio</SelectItem>
                  <SelectItem value="ML">ML</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this AI service does"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="endpoint">Custom Endpoint (Optional)</Label>
            <Input
              id="endpoint"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="https://api.example.com/your-service"
            />
            <p className="text-sm text-slate-600 mt-1">
              Leave empty to auto-generate an endpoint
            </p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Deployment Configuration</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Service will be deployed with automatic scaling</li>
              <li>• Health checks and monitoring included</li>
              <li>• API authentication via organization tokens</li>
              <li>• Usage metrics and logging enabled</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose} disabled={isCreating}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreate}
              disabled={!serviceName || !category || !description || isCreating}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isCreating ? (
                <>
                  <Upload className="w-4 h-4 mr-2 animate-spin" />
                  Creating Service...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Create AI Service
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
