
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';

interface CompareReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRuns: string[];
}

export const CompareReportsModal = ({ isOpen, onClose, selectedRuns }: CompareReportsModalProps) => {
  const mockRunData = {
    'run-1': {
      name: 'Training Run #1',
      accuracy: 94.2,
      f1Score: 0.91,
      precision: 0.93,
      recall: 0.89,
      latency: 120
    },
    'run-2': {
      name: 'Training Run #2',
      accuracy: 92.8,
      f1Score: 0.88,
      precision: 0.91,
      recall: 0.85,
      latency: 115
    }
  };

  const metrics = ['accuracy', 'f1Score', 'precision', 'recall', 'latency'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Compare Training Reports
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {selectedRuns.length < 2 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Select at least 2 training runs to compare</p>
            </div>
          ) : (
            <>
              {/* Comparison Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Metric</th>
                          {selectedRuns.map(runId => (
                            <th key={runId} className="text-left p-2">
                              {mockRunData[runId]?.name || `Run ${runId}`}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {metrics.map(metric => (
                          <tr key={metric} className="border-b">
                            <td className="p-2 font-medium capitalize">
                              {metric.replace(/([A-Z])/g, ' $1').trim()}
                            </td>
                            {selectedRuns.map(runId => {
                              const value = mockRunData[runId]?.[metric];
                              return (
                                <td key={runId} className="p-2">
                                  {typeof value === 'number' ? 
                                    (value < 1 ? value.toFixed(3) : value.toFixed(1)) : 
                                    'N/A'
                                  }
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Side-by-side detailed views */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedRuns.slice(0, 2).map(runId => (
                  <Card key={runId}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {mockRunData[runId]?.name || `Run ${runId}`}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-muted rounded">
                            <div className="text-sm text-muted-foreground">Accuracy</div>
                            <div className="text-xl font-bold">
                              {mockRunData[runId]?.accuracy}%
                            </div>
                          </div>
                          <div className="text-center p-3 bg-muted rounded">
                            <div className="text-sm text-muted-foreground">F1 Score</div>
                            <div className="text-xl font-bold">
                              {mockRunData[runId]?.f1Score}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-muted rounded">
                            <div className="text-sm text-muted-foreground">Precision</div>
                            <div className="text-xl font-bold">
                              {mockRunData[runId]?.precision}
                            </div>
                          </div>
                          <div className="text-center p-3 bg-muted rounded">
                            <div className="text-sm text-muted-foreground">Latency</div>
                            <div className="text-xl font-bold">
                              {mockRunData[runId]?.latency}ms
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
