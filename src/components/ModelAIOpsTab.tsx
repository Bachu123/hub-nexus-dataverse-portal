
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ModelAIOpsTabProps {
  model: any;
}

export const ModelAIOpsTab = ({ model }: ModelAIOpsTabProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const metricsData = [
    { name: 'Throughput (tokens/s)', current: 1200, target: 1500 },
    { name: 'Latency (ms)', current: 120, target: 100 },
    { name: 'Epoch ETA (hrs)', current: 4.5, target: 4.0 }
  ];

  const costData = [
    { name: 'All Token', current: 2500, budget: 3000 },
    { name: 'All Hour', current: 180, budget: 200 },
    { name: 'Total Cost ($)', current: 450, budget: 500 }
  ];

  const computeHistory = [
    {
      id: 1,
      platform: 'AWS GPU',
      nodes: 4,
      startTime: '2024-01-15T10:00:00Z',
      endTime: '2024-01-15T14:30:00Z',
      cost: 125.50,
      status: 'completed'
    },
    {
      id: 2,
      platform: 'Azure GPU',
      nodes: 2,
      startTime: '2024-01-16T09:00:00Z',
      endTime: null,
      cost: 89.20,
      status: 'running'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Compute</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847 hrs</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 TB</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,247</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Aspect Counts */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluation Aspects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-muted-foreground">Core Performance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-muted-foreground">Robustness</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">6</div>
              <div className="text-sm text-muted-foreground">Fairness</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">4</div>
              <div className="text-sm text-muted-foreground">Efficiency</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Metrics Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metricsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="current" fill="#3b82f6" name="Current" />
                <Bar dataKey="target" fill="#10b981" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="current" fill="#f59e0b" name="Current" />
                <Bar dataKey="budget" fill="#6b7280" name="Budget" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Compute History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Compute History</CardTitle>
          <div className="flex space-x-2">
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="aws">AWS GPU</SelectItem>
                <SelectItem value="azure">Azure GPU</SelectItem>
                <SelectItem value="gcp">GCP GPU</SelectItem>
              </SelectContent>
            </Select>
            <Button>+ Compute</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Platform</th>
                  <th className="text-left p-2">Nodes</th>
                  <th className="text-left p-2">Start Time</th>
                  <th className="text-left p-2">End Time</th>
                  <th className="text-left p-2">Cost</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {computeHistory.map((entry) => (
                  <tr key={entry.id} className="border-b">
                    <td className="p-2">{entry.platform}</td>
                    <td className="p-2">{entry.nodes}</td>
                    <td className="p-2">{new Date(entry.startTime).toLocaleString()}</td>
                    <td className="p-2">
                      {entry.endTime ? new Date(entry.endTime).toLocaleString() : 'Running...'}
                    </td>
                    <td className="p-2">${entry.cost}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        entry.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
