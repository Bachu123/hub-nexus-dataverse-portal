import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, ChevronRight, Download, Play } from 'lucide-react';

interface TrainingRun {
  id: string;
  number: number;
  objective: string;
  status: 'completed' | 'running' | 'failed';
  runBy: string;
  startTime: string;
  endTime?: string;
  logs: {
    console: string;
    verbose: string;
  };
}

interface ModelTrainingTabProps {
  model: any;
  selectedTrainingRuns: string[];
  onTrainingRunsChange: (runs: string[]) => void;
  onNewTraining: () => void;
  onFineTuningComplete?: () => void;
}

export const ModelTrainingTab = ({ 
  model, 
  selectedTrainingRuns, 
  onTrainingRunsChange, 
  onNewTraining, 
  onFineTuningComplete 
}: ModelTrainingTabProps) => {
  const navigate = useNavigate();
  const [expandedRuns, setExpandedRuns] = useState<string[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingComplete, setTrainingComplete] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);

  const mockTrainingRuns: TrainingRun[] = [
    {
      id: 'run-1',
      number: 1,
      objective: 'Fine-tune for sentiment analysis with improved accuracy',
      status: 'completed',
      runBy: 'john.doe@company.com',
      startTime: '2024-01-15T10:00:00Z',
      endTime: '2024-01-15T14:30:00Z',
      logs: {
        console: 'https://logs.example.com/run-1/console',
        verbose: 'https://logs.example.com/run-1/verbose'
      }
    },
    {
      id: 'run-2',
      number: 2,
      objective: 'Optimize for lower latency while maintaining performance',
      status: 'running',
      runBy: 'jane.smith@company.com',
      startTime: '2024-01-16T09:00:00Z',
      logs: {
        console: 'https://logs.example.com/run-2/console',
        verbose: 'https://logs.example.com/run-2/verbose'
      }
    }
  ];

  const toggleRunExpansion = (runId: string) => {
    setExpandedRuns(prev => 
      prev.includes(runId) 
        ? prev.filter(id => id !== runId)
        : [...prev, runId]
    );
  };

  const handleRunSelection = (runId: string, checked: boolean) => {
    if (checked) {
      onTrainingRunsChange([...selectedTrainingRuns, runId]);
    } else {
      onTrainingRunsChange(selectedTrainingRuns.filter(id => id !== runId));
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'default',
      running: 'secondary',
      failed: 'destructive'
    };
    return <Badge variant={variants[status] as any}>{status}</Badge>;
  };

  const handleFineTuningComplete = () => {
    setIsTraining(false);
    setTrainingComplete(true);
    if (onFineTuningComplete) {
      onFineTuningComplete();
    }
  };

  const startTraining = () => {
    setIsTraining(true);
    setTrainingComplete(false);
    setTrainingProgress(0);
    
    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          handleFineTuningComplete();
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Training Runs</CardTitle>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={() => navigate(`/models/${model.id}/fine-tune`)}
          >
            Fine-tune Model
          </Button>
          <Button onClick={onNewTraining}>
            + New Training
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTrainingRuns.map((run) => (
            <div key={run.id} className="border rounded-lg">
              <div className="p-4 flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedTrainingRuns.includes(run.id)}
                  onChange={(e) => handleRunSelection(run.id, e.target.checked)}
                  className="rounded"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleRunExpansion(run.id)}
                  className="p-0"
                >
                  {expandedRuns.includes(run.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">#{run.number}</span>
                    <span className="text-sm text-muted-foreground truncate">
                      {run.objective}
                    </span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Console
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Verbose
                      </Button>
                    </div>
                    {getStatusBadge(run.status)}
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-1" />
                      Reports
                    </Button>
                  </div>
                </div>
              </div>
              
              {expandedRuns.includes(run.id) && (
                <div className="border-t p-4 bg-muted/30">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Full Objective</h4>
                      <p className="text-sm text-muted-foreground">{run.objective}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Run by:</span> {run.runBy}
                      </div>
                      <div>
                        <span className="font-medium">Started:</span> {new Date(run.startTime).toLocaleString()}
                      </div>
                      {run.endTime && (
                        <div>
                          <span className="font-medium">Ended:</span> {new Date(run.endTime).toLocaleString()}
                        </div>
                      )}
                    </div>
                    <Tabs defaultValue="core" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="core">Core Performance</TabsTrigger>
                        <TabsTrigger value="robustness">Robustness</TabsTrigger>
                        <TabsTrigger value="fairness">Fairness</TabsTrigger>
                        <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
                      </TabsList>
                      <TabsContent value="core" className="mt-4">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center p-2 border rounded">
                            <div className="font-semibold">Accuracy</div>
                            <div className="text-lg font-bold text-green-600">94.2%</div>
                          </div>
                          <div className="text-center p-2 border rounded">
                            <div className="font-semibold">F1 Score</div>
                            <div className="text-lg font-bold text-green-600">0.91</div>
                          </div>
                          <div className="text-center p-2 border rounded">
                            <div className="font-semibold">Precision</div>
                            <div className="text-lg font-bold text-green-600">0.93</div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="robustness" className="mt-4">
                        <div className="text-sm text-muted-foreground">
                          Robustness metrics and analysis will be displayed here.
                        </div>
                      </TabsContent>
                      <TabsContent value="fairness" className="mt-4">
                        <div className="text-sm text-muted-foreground">
                          Fairness evaluation results will be displayed here.
                        </div>
                      </TabsContent>
                      <TabsContent value="efficiency" className="mt-4">
                        <div className="text-sm text-muted-foreground">
                          Efficiency metrics and resource usage will be displayed here.
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
