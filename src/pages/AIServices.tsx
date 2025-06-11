import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Brain, 
  Upload, 
  Play, 
  Settings, 
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Code,
  FileText,
  Database
} from 'lucide-react';

interface AIService {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'deployed' | 'stopped' | 'deploying' | 'failed';
  version: string;
  endpoint?: string;
  lastTested?: string;
  creator: string;
  createdAt: string;
  inputSchema: any;
  outputSchema: any;
  metrics: {
    totalRuns: number;
    successRate: number;
    avgLatency: number;
  };
}

const mockAIServices: AIService[] = [
  {
    id: 'text-summarizer',
    name: 'Text Summarizer',
    description: 'AI service for summarizing long text content into concise summaries',
    category: 'NLP',
    status: 'deployed',
    version: '1.2.0',
    endpoint: 'https://api.example.com/summarize',
    lastTested: '2025-06-10T15:30:00Z',
    creator: 'john.doe',
    createdAt: '2025-06-01T10:00:00Z',
    inputSchema: { text: 'string', maxLength: 'number' },
    outputSchema: { summary: 'string', confidence: 'number' },
    metrics: {
      totalRuns: 1245,
      successRate: 98.5,
      avgLatency: 450
    }
  },
  {
    id: 'image-classifier',
    name: 'Image Classifier',
    description: 'Deep learning model for image classification and object detection',
    category: 'Computer Vision',
    status: 'deployed',
    version: '2.1.0',
    endpoint: 'https://api.example.com/classify',
    lastTested: '2025-06-11T09:15:00Z',
    creator: 'jane.smith',
    createdAt: '2025-05-28T14:20:00Z',
    inputSchema: { image: 'base64', confidence_threshold: 'number' },
    outputSchema: { classes: 'array', probabilities: 'array' },
    metrics: {
      totalRuns: 892,
      successRate: 96.2,
      avgLatency: 1200
    }
  },
  {
    id: 'sentiment-analyzer',
    name: 'Sentiment Analyzer',
    description: 'Analyze sentiment and emotion in text content',
    category: 'NLP',
    status: 'deploying',
    version: '1.0.0',
    creator: 'mike.wilson',
    createdAt: '2025-06-11T08:00:00Z',
    inputSchema: { text: 'string', language: 'string' },
    outputSchema: { sentiment: 'string', score: 'number', emotions: 'object' },
    metrics: {
      totalRuns: 0,
      successRate: 0,
      avgLatency: 0
    }
  },
  {
    id: 'voice-synthesis',
    name: 'Voice Synthesis',
    description: 'Convert text to natural-sounding speech',
    category: 'Audio',
    status: 'stopped',
    version: '1.1.0',
    creator: 'sarah.jones',
    createdAt: '2025-05-15T16:45:00Z',
    inputSchema: { text: 'string', voice: 'string', speed: 'number' },
    outputSchema: { audio_url: 'string', duration: 'number' },
    metrics: {
      totalRuns: 567,
      successRate: 94.8,
      avgLatency: 2100
    }
  }
];

const AIServices = () => {
  const [services, setServices] = useState<AIService[]>(mockAIServices);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [testingService, setTestingService] = useState<string | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [testDialogOpen, setTestDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<AIService | null>(null);
  const [testInput, setTestInput] = useState('');
  const [testResult, setTestResult] = useState<any>(null);

  const categories = ['all', 'NLP', 'Computer Vision', 'Audio', 'ML'];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'bg-green-500';
      case 'deploying': return 'bg-yellow-500';
      case 'stopped': return 'bg-gray-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed': return <CheckCircle className="w-4 h-4" />;
      case 'deploying': return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'stopped': return <Clock className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleDeploy = (serviceId: string) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId 
        ? { ...service, status: 'deploying' as const }
        : service
    ));
    
    // Simulate deployment
    setTimeout(() => {
      setServices(prev => prev.map(service => 
        service.id === serviceId 
          ? { ...service, status: 'deployed' as const, endpoint: `https://api.example.com/${serviceId}` }
          : service
      ));
    }, 3000);
  };

  const handleTest = (service: AIService) => {
    if (service.status !== 'deployed') {
      alert('Service must be deployed before testing');
      return;
    }
    setSelectedService(service);
    setTestDialogOpen(true);
    setTestInput('');
    setTestResult(null);
  };

  const runTest = () => {
    setTestingService(selectedService?.id || null);
    
    // Simulate API call
    setTimeout(() => {
      setTestResult({
        success: true,
        output: {
          result: "Test completed successfully",
          confidence: 0.95,
          processingTime: "245ms"
        },
        timestamp: new Date().toISOString()
      });
      setTestingService(null);
    }, 2000);
  };

  const handleAddFineTunedService = (serviceData: any) => {
    setServices(prev => [...prev, serviceData]);
  };

  // Make this function available globally for other components to use
  React.useEffect(() => {
    (window as any).addAIService = handleAddFineTunedService;
    return () => {
      delete (window as any).addAIService;
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Services</h1>
          <p className="text-slate-600">Manage and test your AI services</p>
        </div>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload AI Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New AI Service</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Service Name</Label>
                  <Input id="name" placeholder="Enter service name" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nlp">NLP</SelectItem>
                      <SelectItem value="cv">Computer Vision</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="ml">ML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your AI service" />
              </div>
              <div>
                <Label htmlFor="file">Service Package</Label>
                <Input id="file" type="file" accept=".zip,.tar.gz" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setUploadDialogOpen(false)}>
                  Upload & Deploy
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <Label>Filter by Category:</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    {service.category}
                  </Badge>
                </div>
                <Badge className={`${getStatusColor(service.status)} text-white`}>
                  {getStatusIcon(service.status)}
                  <span className="ml-1 capitalize">{service.status}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">{service.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Version:</span>
                  <span>{service.version}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Creator:</span>
                  <span>{service.creator}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Total Runs:</span>
                  <span>{service.metrics.totalRuns.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Success Rate:</span>
                  <span>{service.metrics.successRate}%</span>
                </div>
              </div>

              <div className="flex space-x-2">
                {service.status === 'deployed' ? (
                  <Button 
                    size="sm" 
                    onClick={() => handleTest(service)}
                    className="flex-1"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Test
                  </Button>
                ) : service.status === 'stopped' ? (
                  <Button 
                    size="sm" 
                    onClick={() => handleDeploy(service.id)}
                    className="flex-1"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Deploy
                  </Button>
                ) : (
                  <Button size="sm" disabled className="flex-1">
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    {service.status === 'deploying' ? 'Deploying...' : 'Failed'}
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Test Dialog */}
      <Dialog open={testDialogOpen} onOpenChange={setTestDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Test AI Service: {selectedService?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Input Schema</Label>
                <div className="bg-slate-50 p-3 rounded-md">
                  <pre className="text-sm">
                    {JSON.stringify(selectedService?.inputSchema, null, 2)}
                  </pre>
                </div>
              </div>
              <div>
                <Label htmlFor="testInput">Test Input (JSON)</Label>
                <Textarea
                  id="testInput"
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  placeholder='{"text": "Your input here..."}'
                  rows={8}
                  className="font-mono"
                />
              </div>
              <Button 
                onClick={runTest} 
                disabled={testingService === selectedService?.id}
                className="w-full"
              >
                {testingService === selectedService?.id ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Test
                  </>
                )}
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Output Schema</Label>
                <div className="bg-slate-50 p-3 rounded-md">
                  <pre className="text-sm">
                    {JSON.stringify(selectedService?.outputSchema, null, 2)}
                  </pre>
                </div>
              </div>
              <div>
                <Label>Test Result</Label>
                <div className="bg-slate-50 p-3 rounded-md min-h-[200px]">
                  {testResult ? (
                    <pre className="text-sm">
                      {JSON.stringify(testResult, null, 2)}
                    </pre>
                  ) : (
                    <p className="text-slate-500 text-sm">Run a test to see results here</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIServices;
