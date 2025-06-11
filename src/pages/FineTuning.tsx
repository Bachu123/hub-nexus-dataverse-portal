
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Database, Play, Settings } from 'lucide-react';
import { datasets } from '@/constants/datasets';
import { getModelById } from '@/constants/models';

import { UseAsServiceModal } from '@/components/UseAsServiceModal';

const FineTuning = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const navigate = useNavigate();
  const [selectedDataset, setSelectedDataset] = useState('');
  const [objective, setObjective] = useState('');
  const [hyperparameters, setHyperparameters] = useState({
    learningRate: '0.001',
    batchSize: '32',
    epochs: '10'
  });
  const [computePlatform, setComputePlatform] = useState('');
  const [selectedAspects, setSelectedAspects] = useState<string[]>([]);
  const [perspective, setPerspective] = useState('');
  const [biasDoc, setBiasDoc] = useState<File | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);

  const model = modelId ? getModelById(modelId) : null;
  const availableDatasets = Object.values(datasets);
  const evaluationAspects = [
    'Performance',
    'Robustness',
    'Fairness',
    'Efficiency',
    'Safety',
    'Interpretability'
  ];
  const gpuOptions = [
    'AWS A100',
    'Azure V100',
    'GCP T4',
    'On-Premise'
  ];

  const handleStartTraining = () => {
    if (!selectedDataset || !objective || !computePlatform) return;
    
    setIsTraining(true);
    console.log('Starting fine-tuning...', {
      model: model?.name,
      dataset: selectedDataset,
      objective,
      hyperparameters,
      computePlatform,
      aspects: selectedAspects,
      perspective,
      biasDoc
    });
    
    // Simulate training process
    setTimeout(() => {
      setIsTraining(false);
      setShowServiceModal(true);
    }, 3000);
  };

  if (!model) {
    return <div>Model not found</div>;
  }

  return (
    <>
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(`/models/${modelId}`)}
              className="text-purple-600 hover:text-purple-700"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Model
            </Button>
            <div className="text-slate-400">|</div>
            <h1 className="text-xl font-semibold text-slate-900">Fine-tune {model.name}</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dataset Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Select Dataset
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Link 
                    to="/data-marketplace" 
                    className="text-purple-600 hover:text-purple-700 text-sm"
                  >
                    Browse Data Marketplace →
                  </Link>
                </div>
                
                <div>
                  <Label>Available Datasets</Label>
                  <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a dataset" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDatasets.map((dataset) => (
                        <SelectItem key={dataset.id} value={dataset.id}>
                          {dataset.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedDataset && (
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium mb-2">{datasets[selectedDataset].name}</h4>
                    <p className="text-sm text-slate-600 mb-2">{datasets[selectedDataset].description}</p>
                    <div className="flex flex-wrap gap-1">
                      {datasets[selectedDataset].tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Training Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Training Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="objective">Training Objective</Label>
                  <Textarea
                    id="objective"
                    placeholder="Describe what you want to achieve with this fine-tuning..."
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="learning-rate">Learning Rate</Label>
                    <Input
                      id="learning-rate"
                      value={hyperparameters.learningRate}
                      onChange={(e) => setHyperparameters(prev => ({
                        ...prev,
                        learningRate: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="batch-size">Batch Size</Label>
                    <Input
                      id="batch-size"
                      value={hyperparameters.batchSize}
                      onChange={(e) => setHyperparameters(prev => ({
                        ...prev,
                        batchSize: e.target.value
                      }))}
                    />
                  </div>
                </div>

                <div>
                  <Label>GPU Platform *</Label>
                  <Select value={computePlatform} onValueChange={setComputePlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select GPU" />
                    </SelectTrigger>
                    <SelectContent>
                      {gpuOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Evaluation Aspects</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {evaluationAspects.map((aspect) => (
                      <div key={aspect} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={aspect}
                          checked={selectedAspects.includes(aspect)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAspects([...selectedAspects, aspect]);
                            } else {
                              setSelectedAspects(selectedAspects.filter(a => a !== aspect));
                            }
                          }}
                        />
                        <Label htmlFor={aspect} className="text-sm">
                          {aspect}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="perspective">Perspective</Label>
                  <Input
                    id="perspective"
                    value={perspective}
                    onChange={(e) => setPerspective(e.target.value)}
                    placeholder="e.g. ethics, bias check"
                  />
                </div>

                <div>
                  <Label htmlFor="bias-doc">Upload Guidelines</Label>
                  <Input
                    id="bias-doc"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setBiasDoc(e.target.files?.[0] || null)}
                  />
                  {biasDoc && (
                    <p className="text-sm text-slate-600 mt-1">Selected: {biasDoc.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="epochs">Epochs</Label>
                  <Input
                    id="epochs"
                    value={hyperparameters.epochs}
                    onChange={(e) => setHyperparameters(prev => ({
                      ...prev,
                      epochs: e.target.value
                    }))}
                  />
                </div>

                <Button
                  onClick={handleStartTraining}
                  disabled={!selectedDataset || !objective || !computePlatform || isTraining}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isTraining ? (
                    <>
                      <Play className="w-4 h-4 mr-2 animate-spin" />
                      Training in Progress...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Fine-Tuning
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <UseAsServiceModal
      open={showServiceModal}
      onClose={() => {
        setShowServiceModal(false);
        navigate(`/models/${modelId}`);
      }}
      modelName={model?.name || ''}
      onCreateService={(serviceData) => {
        if ((window as any).addAIService) {
          (window as any).addAIService(serviceData);
        }
      }}
    />
    </>
  );
};

export default FineTuning;
