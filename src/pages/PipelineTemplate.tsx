import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  MoreHorizontal, 
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { pipelineTemplates } from '@/constants/pipelines';
import ArchitectureModal from '@/components/ArchitectureModal';
import { pipelineArchitectures } from '@/constants/pipelineArchitectures';
import { PipelineBuilder } from '@/components/PipelineBuilder';

const PipelineTemplate = () => {
  const navigate = useNavigate();
  const [showPipelineBuilder, setShowPipelineBuilder] = useState(false);
  const [archPages, setArchPages] = useState<Array<{ id: string; title: string; html: string }> | null>(null);
  const [showArch, setShowArch] = useState(false);
  
  // Load templates from constants
  const pipelines = Object.values(pipelineTemplates).map(pipeline => ({
    id: pipeline.id,
    name: pipeline.name,
    description: pipeline.description,
    status: 'approved' as const,
    version: 'v2.1',
    lastExecution: pipeline.lastExecutionTime,
    executionStatus: pipeline.lastExecutionStatus
  }));
  const allPipelines = pipelines;
  
  const statusCounts = {
    approved: allPipelines.filter(p => p.status === 'approved').length,
    submitted: allPipelines.filter(p => p.status === 'submitted').length,
    rejected: allPipelines.filter(p => p.status === 'rejected').length,
    success: allPipelines.filter(p => p.executionStatus === 'success').length,
    failed: allPipelines.filter(p => p.executionStatus === 'failed').length,
    initiated: 8
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      submitted: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      rejected: { color: "bg-red-100 text-red-800", icon: AlertCircle },
      success: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      failed: { color: "bg-red-100 text-red-800", icon: AlertCircle },
      initiated: { color: "bg-blue-100 text-blue-800", icon: Clock }
    };

    const config = statusConfig[status] || { color: "bg-gray-100 text-gray-800", icon: Clock };
    const IconComponent = config.icon;

    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleViewResult = (pipelineId: string) => {
    navigate(`/infra-hub/pipelines/${pipelineId}`);
  };

  const handleEdit = (pipelineId: string) => {
    console.log(`Edit pipeline ${pipelineId}`);
  };

  const handleDelete = (pipelineId: string) => {
    console.log(`Delete pipeline ${pipelineId}`);
  };

  const handleViewArchitecture = (pipelineId: string) => {
    const pages = pipelineArchitectures[pipelineId];
    if (pages) {
      setArchPages(pages);
      setShowArch(true);
    }
  };

  const handleCreatePipeline = (pipelineData: any) => {
    console.log('New pipeline created:', pipelineData);
    // Here you would typically save to backend
    // For now, just log and show success
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Pipeline Templates</h1>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => setShowPipelineBuilder(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Status Header */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Request Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{statusCounts.approved}</div>
                <p className="text-sm text-slate-600">Approved</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{statusCounts.submitted}</div>
                <p className="text-sm text-slate-600">Submitted</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
                <p className="text-sm text-slate-600">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Execution Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{statusCounts.success}</div>
                <p className="text-sm text-slate-600">Success</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{statusCounts.failed}</div>
                <p className="text-sm text-slate-600">Failed</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{statusCounts.initiated}</div>
                <p className="text-sm text-slate-600">Initiated</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Last Execution</TableHead>
                <TableHead>Execution Status</TableHead>
                <TableHead className="w-12">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allPipelines.map((pipeline) => (
                <TableRow 
                  key={pipeline.id}
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => handleViewResult(pipeline.id)}
                >
                  <TableCell className="font-medium">{pipeline.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{pipeline.description}</TableCell>
                  <TableCell>{getStatusBadge(pipeline.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{pipeline.version}</Badge>
                  </TableCell>
                  <TableCell>{pipeline.lastExecution}</TableCell>
                  <TableCell>{getStatusBadge(pipeline.executionStatus)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleViewResult(pipeline.id);
                        }}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Result
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleViewArchitecture(pipeline.id);
                        }}>
                          <Eye className="w-4 h-4 mr-2" />
                          Architecture
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(pipeline.id);
                        }}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(pipeline.id);
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pipeline Builder Modal */}
      <PipelineBuilder
        open={showPipelineBuilder}
        onClose={() => setShowPipelineBuilder(false)}
        onSave={handleCreatePipeline}
      />
      {archPages && (
        <ArchitectureModal pages={archPages} open={showArch} onOpenChange={setShowArch} />
      )}
    </div>
  );
};

export default PipelineTemplate;
