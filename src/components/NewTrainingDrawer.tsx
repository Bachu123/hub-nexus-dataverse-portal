
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { datasets } from '@/data/datasets';

interface NewTrainingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (trainingConfig: any) => void;
}

export const NewTrainingDrawer = ({ isOpen, onClose, onSubmit }: NewTrainingDrawerProps) => {
  const [computePlatform, setComputePlatform] = useState('');
  const [nodes, setNodes] = useState('');
  const [selectedAspects, setSelectedAspects] = useState<string[]>([]);
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>([]);
  const [objective, setObjective] = useState('');
  const { toast } = useToast();

  const evaluationAspects = [
    'Core Performance',
    'Robustness',
    'Fairness',
    'Efficiency',
    'Safety',
    'Interpretability'
  ];

  const handleAspectChange = (aspect: string, checked: boolean) => {
    if (checked) {
      setSelectedAspects([...selectedAspects, aspect]);
    } else {
      setSelectedAspects(selectedAspects.filter(a => a !== aspect));
    }
  };

  const handleDatasetChange = (datasetId: string, checked: boolean) => {
    if (checked) {
      setSelectedDatasets([...selectedDatasets, datasetId]);
    } else {
      setSelectedDatasets(selectedDatasets.filter(id => id !== datasetId));
    }
  };

  const handleSubmit = () => {
    if (!computePlatform || !nodes || selectedAspects.length === 0 || !objective) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const trainingConfig = {
      computePlatform,
      nodes: parseInt(nodes),
      aspects: selectedAspects,
      datasets: selectedDatasets,
      objective
    };

    onSubmit(trainingConfig);
    toast({
      title: "Training Started",
      description: "Your training run has been initiated successfully"
    });
    onClose();
    
    // Reset form
    setComputePlatform('');
    setNodes('');
    setSelectedAspects([]);
    setSelectedDatasets([]);
    setObjective('');
  };

  // Convert datasets object to array
  const datasetArray = Object.values(datasets);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>New Training Run</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Training Objective */}
          <div className="space-y-2">
            <Label htmlFor="objective">Training Objective *</Label>
            <Input
              id="objective"
              placeholder="Describe what you want to achieve with this training..."
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
            />
          </div>

          {/* Compute Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Compute Configuration</h3>
            
            <div className="space-y-2">
              <Label htmlFor="platform">Compute Platform *</Label>
              <Select value={computePlatform} onValueChange={setComputePlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select compute platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aws-gpu">AWS GPU (A100)</SelectItem>
                  <SelectItem value="azure-gpu">Azure GPU (V100)</SelectItem>
                  <SelectItem value="gcp-gpu">GCP GPU (T4)</SelectItem>
                  <SelectItem value="on-premise">On-Premise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nodes">Number of Nodes *</Label>
              <Select value={nodes} onValueChange={setNodes}>
                <SelectTrigger>
                  <SelectValue placeholder="Select number of nodes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Node</SelectItem>
                  <SelectItem value="2">2 Nodes</SelectItem>
                  <SelectItem value="4">4 Nodes</SelectItem>
                  <SelectItem value="8">8 Nodes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Evaluation Aspects */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Evaluation Aspects *</h3>
            <div className="grid grid-cols-2 gap-3">
              {evaluationAspects.map((aspect) => (
                <div key={aspect} className="flex items-center space-x-2">
                  <Checkbox
                    id={aspect}
                    checked={selectedAspects.includes(aspect)}
                    onCheckedChange={(checked) => handleAspectChange(aspect, !!checked)}
                  />
                  <Label htmlFor={aspect} className="text-sm">
                    {aspect}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Dataset Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Training Datasets</h3>
            <p className="text-sm text-muted-foreground">
              Select datasets from the Data Marketplace to use for training
            </p>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {datasetArray.slice(0, 6).map((dataset) => (
                <Card key={dataset.id} className="p-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={dataset.id}
                      checked={selectedDatasets.includes(dataset.id)}
                      onCheckedChange={(checked) => handleDatasetChange(dataset.id, !!checked)}
                    />
                    <div className="flex-1 min-w-0">
                      <Label htmlFor={dataset.id} className="font-medium">
                        {dataset.name}
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {dataset.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {dataset.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button onClick={handleSubmit} className="flex-1">
              Start Training
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
