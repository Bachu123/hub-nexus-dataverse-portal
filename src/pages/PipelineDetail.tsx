import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, 
  Play, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Download,
  RefreshCw,
  MessageSquare,
  FileText,
  X,
  Copy,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockPipelines, mockLogs, AIService, Pipeline } from '@/data/pipelineData';

const PipelineDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pipeline, setPipeline] = useState<Pipeline | null>(null);
  const [selectedService, setSelectedService] = useState<AIService | null>(null);
  const [activeTab, setActiveTab] = useState('pipeline');
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'comments' | 'logs'>('logs');
  const [selectedLogService, setSelectedLogService] = useState('all');
  const [logType, setLogType] = useState<'verbose' | 'console'>('verbose');
  const [logs, setLogs] = useState<Array<{ timestamp: string; message: string; level: string }>>([]);
  const [expandedExecution, setExpandedExecution] = useState<string | null>(null);

  useEffect(() => {
    if (id && mockPipelines[id]) {
      setPipeline(mockPipelines[id]);
      setLogs(mockLogs[id] || []);
    }
  }, [id]);

  // Simulate real-time log streaming
  useEffect(() => {
    if (logType === 'verbose' && id) {
      const interval = setInterval(() => {
        const newLog = {
          timestamp: new Date().toISOString(),
          message: `Real-time log entry: ${Math.random().toString(36).substring(7)}`,
          level: ['info', 'warn', 'error'][Math.floor(Math.random() * 3)]
        };
        setLogs(prev => [...prev.slice(-499), newLog]); // Keep max 500 logs
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [logType, id]);

  if (!pipeline) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-slate-600">Pipeline not found</div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'running': return <Clock className="w-4 h-4 text-blue-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const config = {
      success: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      running: 'bg-blue-100 text-blue-800',
      pending: 'bg-gray-100 text-gray-800'
    };
    return config[status] || config.pending;
  };

  const renderPipelineGraph = () => (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex flex-col space-y-4">
        {pipeline.aiServices.map((service, index) => (
          <div key={service.id} className="flex flex-col items-center">
            <div
              className={cn(
                "border-2 rounded-lg p-4 w-48 cursor-pointer transition-all hover:shadow-md",
                selectedService?.id === service.id ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white",
                service.status === 'success' && "border-l-4 border-l-green-500",
                service.status === 'failed' && "border-l-4 border-l-red-500",
                service.status === 'running' && "border-l-4 border-l-blue-500"
              )}
              onClick={() => setSelectedService(service)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{service.name}</span>
                {getStatusIcon(service.status)}
              </div>
              <Badge className={getStatusBadge(service.status)}>
                {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
              </Badge>
            </div>
            {index < pipeline.aiServices.length - 1 && (
              <div className="w-px h-8 bg-gray-300 my-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderServiceDetailPanel = () => {
    if (!selectedService) return null;

    return (
      <Card className={cn("w-96", selectedService.status === 'failed' && "border-t-4 border-t-red-500")}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">{selectedService.name}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setSelectedService(null)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Executed By</span>
              <span>{selectedService.executedBy}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Start Date & Time</span>
              <span>{selectedService.startTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">End Date & Time</span>
              <span>{selectedService.endTime || '—'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Status</span>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusBadge(selectedService.status)}>
                  {selectedService.status.charAt(0).toUpperCase() + selectedService.status.slice(1)}
                </Badge>
                {selectedService.status === 'running' && <Clock className="w-3 h-3 animate-spin" />}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {selectedService.errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center space-x-2 text-red-800 text-sm font-medium mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>Error Message</span>
              </div>
              <p className="text-red-700 text-sm">{selectedService.errorMessage}</p>
            </div>
          )}
          
          <Tabs defaultValue="kpis" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="kpis">KPIs</TabsTrigger>
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="output">Output</TabsTrigger>
              <TabsTrigger value="hil">HIL</TabsTrigger>
            </TabsList>
            
            <TabsContent value="kpis" className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Execution Time</span>
                  <span>{selectedService.executionTime}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Processed Records</span>
                  <span>{selectedService.processedRecords}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Latency</span>
                  <span>{selectedService.latency}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Memory Peak</span>
                  <span>{selectedService.memoryPeak}</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="input">
              <div className="bg-slate-50 p-3 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Input JSON</span>
                  <Button variant="outline" size="sm">
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <pre className="text-xs text-slate-800 font-mono">
                  {JSON.stringify(selectedService.input, null, 2)}
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="output">
              <div className="bg-slate-50 p-3 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Output JSON</span>
                  <Button variant="outline" size="sm">
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <pre className="text-xs text-slate-800 font-mono">
                  {JSON.stringify(selectedService.output, null, 2)}
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="hil">
              <div className="text-sm text-slate-600">
                HIL functionality coming soon...
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/infra-hub/pipelines')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pipelines
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{pipeline.name}</h1>
            <p className="text-slate-600">{pipeline.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-slate-600">
            <span className="font-medium">{pipeline.aiServices.length}</span> AI Services
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(pipeline.lastExecutionStatus)}
            <span className="text-sm">{pipeline.lastExecutionTime}</span>
          </div>
          <Button variant="outline" onClick={() => setShowDrawer(!showDrawer)}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Comments & Logs
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex space-x-6">
        {/* Left Panel - Pipeline Graph */}
        <div className="flex-1">
          {renderPipelineGraph()}
        </div>

        {/* Right Panel - Service Details */}
        {selectedService && renderServiceDetailPanel()}
      </div>

      {/* Insight Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="ai-services">AI Services</TabsTrigger>
          <TabsTrigger value="metrics">Metrics View</TabsTrigger>
          <TabsTrigger value="execution">Execution Details</TabsTrigger>
          <TabsTrigger value="test-hil">Test / HIL</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{pipeline.availableFiles}</div>
                <p className="text-sm text-slate-600">Available Files</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">{pipeline.processedFiles}</div>
                <p className="text-sm text-slate-600">Processed Files</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">{pipeline.remainingFiles}</div>
                <p className="text-sm text-slate-600">Remaining Files</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-services">
          <div className="grid grid-cols-2 gap-4">
            {pipeline.aiServices.map((service) => (
              <Card key={service.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{service.name}</h3>
                    {getStatusIcon(service.status)}
                  </div>
                  <div className="text-sm text-slate-600">
                    <div>Latency: {service.latency}ms</div>
                    <div>Records: {service.processedRecords}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="text-center py-8 text-slate-600">
            Metrics charts coming soon...
          </div>
        </TabsContent>

        <TabsContent value="execution">
          <Card>
            <CardHeader>
              <CardTitle>Execution History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Executed By</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pipeline.executions.map((execution) => (
                    <React.Fragment key={execution.id}>
                      <TableRow 
                        className="cursor-pointer hover:bg-slate-50"
                        onClick={() => setExpandedExecution(
                          expandedExecution === execution.id ? null : execution.id
                        )}
                      >
                        <TableCell>{execution.type}</TableCell>
                        <TableCell>{execution.executedBy}</TableCell>
                        <TableCell>{execution.startDate}</TableCell>
                        <TableCell>{execution.endDate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(execution.status)}>
                            {execution.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {expandedExecution === execution.id ? 
                              <ChevronDown className="w-4 h-4" /> : 
                              <ChevronRight className="w-4 h-4" />
                            }
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedExecution === execution.id && (
                        <TableRow>
                          <TableCell colSpan={6}>
                            <div className="p-4 bg-slate-50 rounded-md">
                              <h4 className="font-medium mb-2">Processed Records ({execution.records.length})</h4>
                              {execution.records.length > 0 ? (
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>ID</TableHead>
                                      <TableHead>Input</TableHead>
                                      <TableHead>Output</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {execution.records.map((record) => (
                                      <TableRow key={record.id}>
                                        <TableCell>{record.id}</TableCell>
                                        <TableCell>
                                          <Button variant="link" size="sm">JSON Link</Button>
                                        </TableCell>
                                        <TableCell>
                                          <Button variant="link" size="sm">JSON Link</Button>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              ) : (
                                <p className="text-slate-600">No records processed</p>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test-hil">
          <div className="text-center py-8 text-slate-600">
            Test / HIL functionality coming soon...
          </div>
        </TabsContent>
      </Tabs>

      {/* Comments & Logs Drawer */}
      {showDrawer && (
        <div className="fixed bottom-0 left-0 right-0 h-96 bg-white border-t border-slate-200 z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <Tabs value={drawerTab} onValueChange={(value) => setDrawerTab(value as 'comments' | 'logs')}>
              <TabsList>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="ghost" size="sm" onClick={() => setShowDrawer(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="p-4 h-80">
            {drawerTab === 'comments' ? (
              <div className="text-center py-8 text-slate-600">
                Comments functionality coming soon...
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <label className="text-sm font-medium">Select Type</label>
                      <select 
                        className="ml-2 px-2 py-1 border rounded"
                        value={selectedLogService}
                        onChange={(e) => setSelectedLogService(e.target.value)}
                      >
                        <option value="all">All Services</option>
                        {pipeline.aiServices.map((service) => (
                          <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium">Select Logs Type</label>
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="verbose"
                            checked={logType === 'verbose'}
                            onChange={(e) => setLogType(e.target.value as 'verbose' | 'console')}
                            className="mr-1"
                          />
                          Verbose
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="console"
                            checked={logType === 'console'}
                            onChange={(e) => setLogType(e.target.value as 'verbose' | 'console')}
                            className="mr-1"
                          />
                          Console
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                    {logType === 'console' && (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download File
                      </Button>
                    )}
                  </div>
                </div>
                
                <ScrollArea className="flex-1 bg-black text-green-400 p-3 rounded-md font-mono text-sm">
                  {logs.slice(-25).map((log, index) => (
                    <div key={index} className="mb-1">
                      <span className="text-gray-500">[{log.timestamp}]</span>
                      <span className={cn(
                        "ml-2",
                        log.level === 'error' && "text-red-400",
                        log.level === 'warn' && "text-yellow-400",
                        log.level === 'info' && "text-green-400"
                      )}>
                        {log.message}
                      </span>
                    </div>
                  ))}
                  {logType === 'verbose' && (
                    <div className="text-gray-500 text-xs mt-2">
                      • Real-time streaming active • Max 500 lines in view
                    </div>
                  )}
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PipelineDetail;
