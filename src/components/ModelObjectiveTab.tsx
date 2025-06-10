
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ModelObjectiveTab = ({ model }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Objective</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          <p className="text-foreground leading-relaxed">
            {model.objective}
          </p>
          
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Key Capabilities</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {model.inferenceTasks?.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Fine-tuning Support</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {model.fineTuningTasks?.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Deployment Options</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {model.deploymentOptions?.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
