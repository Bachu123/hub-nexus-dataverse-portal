
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, GitBranch, Activity } from 'lucide-react';
import { getModelById } from '@/data/mockModels';
import { ModelObjectiveTab } from '@/components/ModelObjectiveTab';
import { ModelDataSheetTab } from '@/components/ModelDataSheetTab';

const ModelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showNewTrainingDrawer, setShowNewTrainingDrawer] = useState(false);
  const [selectedTrainingRuns, setSelectedTrainingRuns] = useState([]);

  useEffect(() => {
    const modelData = getModelById(id);
    if (modelData) {
      setModel(modelData);
      setSelectedVersion(modelData.version);
    }
  }, [id]);

  if (!model) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Model not found</p>
          <Button onClick={() => navigate('/model-catalog')}>
            Back to Catalog
          </Button>
        </div>
      </div>
    );
  }

  const handleVersionChange = (version) => {
    setSelectedVersion(version);
    // In a real app, this would trigger an API call to load the version-specific data
  };

  const handleCompareReports = () => {
    if (selectedTrainingRuns.length >= 2) {
      setShowCompareModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/model-catalog')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back | Model Details
          </Button>

          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{model.name}</h1>
                <select 
                  value={selectedVersion}
                  onChange={(e) => handleVersionChange(e.target.value)}
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  {model.availableVersions.map(version => (
                    <option key={version} value={version}>v{version}</option>
                  ))}
                </select>
              </div>
              <p className="text-muted-foreground text-lg mb-4">{model.description}</p>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projects</CardTitle>
                <GitBranch className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{model.stats.projects}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pipelines</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{model.stats.pipelines}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Deployments</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{model.stats.activeDeployments}</div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mb-6">
            <Button 
              onClick={handleCompareReports}
              disabled={selectedTrainingRuns.length < 2}
              variant="outline"
            >
              Compare Reports ({selectedTrainingRuns.length})
            </Button>
            <Button onClick={() => setShowNewTrainingDrawer(true)}>
              + New Training
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="objective" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="objective">Objective</TabsTrigger>
            <TabsTrigger value="datasheet">Data Sheet</TabsTrigger>
          </TabsList>

          <TabsContent value="objective">
            <ModelObjectiveTab model={model} />
          </TabsContent>

          <TabsContent value="datasheet">
            <ModelDataSheetTab model={model} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ModelDetail;
