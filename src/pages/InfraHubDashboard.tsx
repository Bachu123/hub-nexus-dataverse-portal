
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  Monitor, 
  Users, 
  FolderOpen, 
  Brain,
  Database,
  GitBranch,
  ArrowRight
} from 'lucide-react';

const InfraHubDashboard = () => {
  const [isLiveMode, setIsLiveMode] = useState(true);

  const workspaceData = {
    name: "WKS_Azure_01",
    status: "Running",
    cloud: "Azure",
    environment: "03",
    users: "05",
    totalProjects: "05"
  };

  const aiServicesData = [
    {
      type: "Models",
      count: 12,
      projects: 2,
      pipelines: 1,
      icon: Brain,
      color: "text-purple-600"
    },
    {
      type: "Data",
      count: 15,
      projects: 4,
      pipelines: 1,
      icon: Database,
      color: "text-blue-600"
    },
    {
      type: "Algo",
      count: 15,
      projects: 0,
      pipelines: 0,
      icon: GitBranch,
      color: "text-green-600"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'running':
        return 'bg-green-500 text-white';
      case 'stopped':
        return 'bg-red-500 text-white';
      case 'error':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Workspace Summary Card */}
      <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">
                Workspace Name: {workspaceData.name}
              </h1>
              <Badge className={getStatusColor(workspaceData.status)}>
                <CheckCircle className="w-3 h-3 mr-1" />
                {workspaceData.status}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-white font-medium">Microsoft Azure</span>
            </div>

            <div className="flex space-x-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Monitor className="w-5 h-5" />
                  <span className="text-2xl font-bold">{workspaceData.environment}</span>
                </div>
                <p className="text-white/80 text-sm">Environment</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Users className="w-5 h-5" />
                  <span className="text-2xl font-bold">{workspaceData.users}</span>
                </div>
                <p className="text-white/80 text-sm">Users</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <FolderOpen className="w-5 h-5" />
                  <span className="text-2xl font-bold">{workspaceData.totalProjects}</span>
                </div>
                <p className="text-white/80 text-sm">Total Projects</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mode Toggle */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className={!isLiveMode ? "font-medium" : "text-gray-500"}>Static</span>
          <Switch
            checked={isLiveMode}
            onCheckedChange={setIsLiveMode}
          />
          <span className={isLiveMode ? "font-medium" : "text-gray-500"}>Live</span>
        </div>
      </div>

      {/* Tabbed Insight Panels */}
      <Tabs defaultValue="ai-services" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai-services">AI Services</TabsTrigger>
          <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-services" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiServicesData.map((service, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <service.icon className={`w-6 h-6 ${service.color}`} />
                    <h3 className="text-lg font-semibold">{service.type}</h3>
                    <Badge variant="secondary">{service.count}</Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                    View All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{service.projects.toString().padStart(2, '0')}</div>
                    <p className="text-sm text-slate-500">Projects</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{service.pipelines.toString().padStart(2, '0')}</div>
                    <p className="text-sm text-slate-500">{service.type === 'Models' ? 'Pipeline' : 'AI Services'}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{service.pipelines.toString().padStart(2, '0')}</div>
                    <p className="text-sm text-slate-500">Pipeline</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pipelines" className="space-y-6">
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Pipeline Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">24</div>
                  <p className="text-sm text-slate-600">Total Executions</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">92%</div>
                  <p className="text-sm text-slate-600">Success Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">1.2s</div>
                  <p className="text-sm text-slate-600">Avg Latency</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">15</div>
                  <p className="text-sm text-slate-600">Active Pipelines</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InfraHubDashboard;
