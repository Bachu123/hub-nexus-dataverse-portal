
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ModelDataSheetTab = ({ model }) => {
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);
  const { toast } = useToast();

  const endpointCode = `# Example API usage for ${model.name}
import requests
import json

# Configure your API key
API_KEY = "your-api-key-here"
ENDPOINT = "https://api.dataworkbench.com/models/${model.id}/infer"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

data = {
    "prompt": "Your input text here",
    "max_tokens": 100,
    "temperature": 0.7
}

response = requests.post(ENDPOINT, headers=headers, json=data)
result = response.json()
print(result)`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(endpointCode);
      setCopiedEndpoint(true);
      toast({
        title: "Copied!",
        description: "Endpoint code copied to clipboard",
      });
      setTimeout(() => setCopiedEndpoint(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="endpoint">End Point</TabsTrigger>
          <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Model Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Model Architecture</h3>
                  <p className="text-muted-foreground">Transformer-based neural network</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Parameters</h3>
                  <p className="text-muted-foreground">7 billion parameters</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Training Data</h3>
                  <p className="text-muted-foreground">Large-scale internet text corpus</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">License</h3>
                  <p className="text-muted-foreground">Custom commercial license</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="font-medium">Accuracy</span>
                  <span className="text-2xl font-bold">94.2%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="font-medium">Latency (p95)</span>
                  <span className="text-2xl font-bold">120ms</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="font-medium">Throughput</span>
                  <span className="text-2xl font-bold">1.2k tokens/s</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Benchmark Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">GLUE Benchmark</h3>
                  <p className="text-muted-foreground">Score: 87.3/100</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">SuperGLUE</h3>
                  <p className="text-muted-foreground">Score: 82.1/100</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">HellaSwag</h3>
                  <p className="text-muted-foreground">Score: 78.9/100</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Computational Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Minimum GPU Memory</h3>
                  <p className="text-muted-foreground">16GB VRAM</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Recommended GPU</h3>
                  <p className="text-muted-foreground">NVIDIA A100 or equivalent</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">CPU Requirements</h3>
                  <p className="text-muted-foreground">8+ cores, 32GB RAM</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Storage</h3>
                  <p className="text-muted-foreground">50GB available space</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions">
          <Card>
            <CardHeader>
              <CardTitle>Usage Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Best Use Cases</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Conversational AI applications</li>
                    <li>Content generation and summarization</li>
                    <li>Code completion and generation</li>
                    <li>Question answering systems</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Optimization Tips</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Use batch processing for better throughput</li>
                    <li>Implement caching for repeated queries</li>
                    <li>Fine-tune for domain-specific tasks</li>
                    <li>Monitor GPU utilization for cost optimization</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoint">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoint</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Code Example</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyToClipboard}
                    >
                      {copiedEndpoint ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedEndpoint ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{endpointCode}</code>
                  </pre>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Authentication</h3>
                  <p className="text-muted-foreground">Bearer token authentication required. Get your API key from the dashboard.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Rate Limits</h3>
                  <p className="text-muted-foreground">1000 requests per minute for standard plan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="artifacts">
          <Card>
            <CardHeader>
              <CardTitle>Model Artifacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Model Weights</h3>
                    <p className="text-muted-foreground text-sm">PyTorch checkpoint file</p>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Tokenizer</h3>
                    <p className="text-muted-foreground text-sm">SentencePiece tokenizer</p>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Configuration</h3>
                    <p className="text-muted-foreground text-sm">Model configuration JSON</p>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
