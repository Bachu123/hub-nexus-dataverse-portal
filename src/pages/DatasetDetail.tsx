
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Star, Users, GitBranch, Database, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { datasets, DatasetFile } from "@/constants/datasets";
import HILStatusBar from "@/components/HILStatusBar";
import FilePreviewDialog from "@/components/FilePreviewDialog";
import ExpandableFileRow from "@/components/ExpandableFileRow";

const DatasetDetail = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("data");
  const [previewFile, setPreviewFile] = useState<DatasetFile | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  const dataset = datasets[id || ""];

  if (!dataset) {
    return <div>Dataset not found</div>;
  }

  const filteredFiles = dataset.files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePreviewFile = (file: DatasetFile) => {
    setPreviewFile(file);
    setShowPreview(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/data-marketplace" className="flex items-center text-purple-600 hover:text-purple-700">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </Link>
            <div className="text-slate-400">|</div>
            <span className="text-slate-600">Data Hub</span>
            <div className="text-slate-400">›</div>
            <span className="text-slate-600">Self Service Request</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between text-white mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <h1 className="text-3xl font-bold">{dataset.name}</h1>
                <Badge className="bg-white/20 text-white border-white/30">
                  {dataset.tags[0]}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">JW</span>
                </div>
                <span className="text-white/90">{dataset.author}</span>
                <span className="text-white/60">•</span>
                <span className="text-white/90">Updated: {dataset.updated}</span>
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="flex items-center space-x-1 mb-1">
                  <GitBranch className="w-5 h-5" />
                  <span className="text-2xl font-bold">{dataset.pipelines}</span>
                </div>
                <p className="text-white/80 text-sm"># Pipelines</p>
              </div>

              <div className="text-center">
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(dataset.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/40'}`}
                    />
                  ))}
                  <span className="text-xl font-bold ml-2">{dataset.rating}</span>
                </div>
                <p className="text-white/80 text-sm">Rating ({dataset.ratingCount} users)</p>
              </div>

              <div className="text-center">
                <div className="flex items-center space-x-1 mb-1">
                  <Users className="w-5 h-5" />
                  <span className="text-2xl font-bold">{dataset.projects.toString().padStart(2, '0')}</span>
                </div>
                <p className="text-white/80 text-sm"># Projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* HIL Status Bar */}
        <HILStatusBar hilTasks={dataset.hilTasks} />

        {/* About Section */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">About</h2>
          <p className="text-slate-600 leading-relaxed">{dataset.description}</p>
        </div>

        {/* Use Cases */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-slate-900 mb-4">What have you used this dataset for?</h3>
          <div className="flex flex-wrap gap-2">
            {dataset.useCases.map((useCase) => (
              <Badge key={useCase} variant="secondary" className="bg-slate-100 text-slate-700">
                {useCase}
              </Badge>
            ))}
          </div>
        </div>

        {/* Update Frequency */}
        <div className="mb-8">
          <div className="flex items-center space-x-2">
            <span className="text-slate-600">Expected update frequency:</span>
            <span className="text-purple-600 font-medium">{dataset.updateFrequency}</span>
            <div className="w-4 h-4 bg-slate-300 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">i</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="data" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>Data</span>
            </TabsTrigger>
            <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
            <TabsTrigger value="feedback">User feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="data" className="space-y-6">
            {/* Self Service Request Button */}
            <div className="flex items-center justify-between">
              <Link to="/self-service-request">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Self Service Request
                  <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center ml-2">
                    <span className="text-xs">i</span>
                  </div>
                </Button>
              </Link>
              
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Files Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-purple-600 hover:bg-purple-600">
                    <TableHead className="text-white">
                      <input type="checkbox" className="rounded" />
                    </TableHead>
                    <TableHead className="text-white">ID</TableHead>
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Description</TableHead>
                    <TableHead className="text-white">Format</TableHead>
                    <TableHead className="text-white">Volume</TableHead>
                    <TableHead className="text-white">Usability Score</TableHead>
                    <TableHead className="text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFiles.map((file) => (
                    <ExpandableFileRow
                      key={file.id}
                      datasetId={dataset.id}
                      file={file}
                      hilTasks={dataset.hilTasks}
                      onPreview={handlePreviewFile}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="artifacts">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 text-center">
              <p className="text-slate-500">No artifacts available for this dataset.</p>
            </div>
          </TabsContent>

          <TabsContent value="feedback">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 text-center">
              <p className="text-slate-500">No user feedback available yet.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* File Preview Dialog */}
      <FilePreviewDialog 
        file={previewFile}
        open={showPreview}
        onOpenChange={setShowPreview}
      />
    </div>
  );
};

export default DatasetDetail;
