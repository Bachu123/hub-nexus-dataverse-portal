
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Copy, Share2, Download } from 'lucide-react';
import { ModelObjectiveTab } from '@/components/ModelObjectiveTab';
import { ModelTrainingTab } from '@/components/ModelTrainingTab';
import { ModelDataSheetTab } from '@/components/ModelDataSheetTab';
import { ModelAIOpsTab } from '@/components/ModelAIOpsTab';
import { getModelById, mockModels } from '@/constants/models';
import { UseAsServiceModal } from '@/components/UseAsServiceModal';

const ModelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [model, setModel] = useState(null);
  const [activeTab, setActiveTab] = useState('objective');
  const [showUseAsServiceModal, setShowUseAsServiceModal] = useState(false);
  const [selectedTrainingRuns, setSelectedTrainingRuns] = useState<string[]>([]);

  const handleCreateAIService = (serviceData: any) => {
    // Add to AI Services via global function
    if ((window as any).addAIService) {
      (window as any).addAIService(serviceData);
    }
    console.log('AI Service created from fine-tuned model:', serviceData);
  };

  const handleNewTraining = () => {
    console.log('Opening new training dialog...');
    // This would typically open a modal or navigate to a training setup page
  };

  useEffect(() => {
    if (id) {
      const foundModel = getModelById(id);
      if (foundModel) {
        setModel(foundModel);
      } else {
        setModel(mockModels[0]);
      }
    }
  }, [id]);

  if (!model) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={model.imageUrl} alt={model.name} />
              <AvatarFallback>{model.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">{model.name}</h1>
              <p className="text-sm text-slate-600">{model.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline">Version {model.version}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Model
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Model
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Model
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="objective">Objective</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
                <TabsTrigger value="datasheet">Data Sheet</TabsTrigger>
                <TabsTrigger value="aiops">AIOps</TabsTrigger>
              </TabsList>

              <TabsContent value="objective" className="mt-6">
                <ModelObjectiveTab model={model} />
              </TabsContent>

              <TabsContent value="training" className="mt-6">
                <ModelTrainingTab 
                  model={model} 
                  selectedTrainingRuns={selectedTrainingRuns}
                  onTrainingRunsChange={setSelectedTrainingRuns}
                  onNewTraining={handleNewTraining}
                  onFineTuningComplete={() => setShowUseAsServiceModal(true)}
                />
              </TabsContent>

              <TabsContent value="datasheet" className="mt-6">
                <ModelDataSheetTab model={model} />
              </TabsContent>

              <TabsContent value="aiops" className="mt-6">
                <ModelAIOpsTab model={model} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Model Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold">Collections</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {model.collections?.map((collection, index) => (
                        <Badge key={index}>{collection}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Industries</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {model.industries?.map((industry, index) => (
                        <Badge key={index}>{industry}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Available Versions</h3>
                    <ScrollArea className="h-32">
                      <div className="flex flex-col space-y-1 mt-1">
                        {model.availableVersions?.map((version, index) => (
                          <Badge variant="secondary" key={index}>{version}</Badge>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Use as AI Service Modal */}
      <UseAsServiceModal
        open={showUseAsServiceModal}
        onClose={() => setShowUseAsServiceModal(false)}
        modelName={model?.name || ''}
        onCreateService={handleCreateAIService}
      />
    </div>
  );
};

export default ModelDetail;
