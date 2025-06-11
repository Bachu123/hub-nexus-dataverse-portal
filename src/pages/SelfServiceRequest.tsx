import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronLeft, Plus, FileCode, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { datasets } from "@/constants/datasets";
import { templates } from "@/constants/templates";
import { useCases } from "@/constants/useCases";
import XMLEditor from "@/components/XMLEditor";
import XMLPreviewDialog from "@/components/XMLPreviewDialog";
import { useToast } from "@/components/ui/use-toast";

const SelfServiceRequest = () => {
  const [searchParams] = useSearchParams();
  const datasetId = searchParams.get("dataset") || "hav-df";
  const defaultFile = searchParams.get("fileId") || "";

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUseCase, setSelectedUseCase] = useState("Computer Vision");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedFile, setSelectedFile] = useState(defaultFile);
  const [showXMLEditor, setShowXMLEditor] = useState(false);
  const [xmlData, setXmlData] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const dataset = datasets[datasetId];
  const selectedFileInfo = dataset.files.find((f) => f.id === selectedFile);


  const handleSubmitTask = () => {
    if (!taskName || !selectedFile) {
      toast({
        title: "Missing Information",

        description: "Please fill in task name. No target file selected.",
        variant: "destructive"

      });
      return;
    }

    // In a real app, this would create a new HIL task
    console.log("Creating new HIL task:", {
      taskName,
      description,
      fileId: selectedFile,
      datasetId,
      useCase: selectedUseCase,
      template: selectedTemplate,
    });

    setTaskName("");
    setDescription("");
    toast({
      title: "Task Created",
      description:
        "Task created successfully! It will appear in the HIL dashboard.",
    });
  };

  const handleXMLSubmit = (xmlContent: string) => {
    setXmlData(xmlContent);
    console.log("Submitting XML HIL task:", xmlContent);

    toast({
      title: "XML Task Created",
      description:
        "Your custom XML HIL task has been created successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">

            <Link to={`/dataset/${datasetId}`} className="flex items-center text-purple-600 hover:text-purple-700">
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

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Method Selection */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Create HIL Task</h2>
            <div className="space-x-2">
              <Button
                onClick={() => setShowXMLEditor(true)}
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
                disabled={!!xmlData}
              >

                <FileCode className="w-4 h-4 mr-2" /> Import XML

              </Button>
              <Button
                onClick={() => setShowPreview(true)}
                variant="outline"
                disabled={!xmlData}
              >


                <Eye className="w-4 h-4 mr-2" /> Preview XML

              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard Form Method */}
            <div
              className={`border-2 border-dashed border-slate-200 rounded-lg p-6 transition-colors ${
                xmlData ? 'opacity-50 pointer-events-none' : 'hover:border-slate-300'
              }`}
            >
              <div className="text-center">
                <Plus className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  Standard Form
                </h3>
                <p className="text-slate-600 mb-4">
                  Use our guided form to create a HIL task with predefined
                  templates and use cases.
                </p>
                <p className="text-sm text-slate-500">Recommended for most users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Standard HIL Task Creation Form */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-slate-200">
          <h3 className="text-lg font-medium text-slate-900 mb-6">
            Standard Task Configuration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Task Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Task Name
              </label>
              <Input
                placeholder="Enter Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                disabled={!!xmlData}
              />
            </div>

            {/* Target File (read-only: selected on dataset page) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Target File</label>
              <div className="p-2 border border-slate-300 rounded-md bg-slate-50">
                {selectedFileInfo
                  ? `${selectedFileInfo.name} (${selectedFileInfo.format})`
                  : "No file selected"}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>

          <Textarea
            placeholder="Enter task description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[80px]"
            disabled={!!xmlData}
          />

          </div>

          {/* Use Case & Template */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Use Case */}
            <div>
              <h4 className="text-lg font-medium text-slate-900 mb-4">
                Use Case
              </h4>
              <div className="space-y-2">
                {useCases.map((useCase) => (
                  <button
                    key={useCase}
                    onClick={() => setSelectedUseCase(useCase)}
                    className={`w-full p-3 text-left rounded-lg border transition-colors ${
                      selectedUseCase === useCase
                        ? "bg-purple-50 border-purple-600 text-purple-900"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                    disabled={!!xmlData}
                  >
                    {useCase}
                  </button>
                ))}
              </div>
            </div>

            {/* Template */}
            <div>
              <h4 className="text-lg font-medium text-slate-900 mb-4">
                Select Template
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`group relative overflow-hidden rounded-lg border-2 transition-all ${
                      selectedTemplate === template.id
                        ? "border-purple-600 ring-2 ring-purple-600/20"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    disabled={!!xmlData}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={template.image}
                        alt={template.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <p className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium leading-tight">
                        {template.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-6">
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleSubmitTask}
              disabled={!!xmlData}
            >
              <Plus className="w-4 h-4 mr-2" /> Create HIL Task
            </Button>
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-medium text-slate-900 mb-4">
            How it works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Standard Form Info */}
            <div>
              <h4 className="font-medium text-slate-900 mb-3">Standard Form</h4>
              <div className="space-y-3 text-slate-600">
                <p>1. The target file you selected in the dataset page will be used automatically.</p>
                <p>2. <strong>Choose your use case</strong> from the available options to match your annotation needs.</p>
                <p>3. <strong>Pick a template</strong> that best fits your data annotation requirements.</p>
                <p>4. <strong>Provide task details</strong> including name and description for clear task identification.</p>
                <p>5. <strong>Submit the task</strong> and it will be added to the HIL pipeline for processing.</p>
              </div>
            </div>

            {/* XML Import Info */}
            <div>
              <h4 className="font-medium text-slate-900 mb-3">XML Import</h4>
              <div className="space-y-3 text-slate-600">
                <p>
                  1. <strong>Click Import XML</strong> to open the advanced XML
                  editor.
                </p>
                <p>
                  2. <strong>Paste or upload</strong> your custom XML
                  configuration file.
                </p>
                <p>
                  3. <strong>Use auto-complete</strong> to help with valid
                  element and attribute names.
                </p>
                <p>
                  4. <strong>Validate your XML</strong> against the HIL task
                  schema before submission.
                </p>
                <p>
                  5. <strong>Submit directly</strong> for complete control over
                  task configuration.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> Created HIL tasks will be visible in the
              dataset&apos;s file details under the &quot;Human In Loop&quot;
              tab. You can track their progress and manage annotations from
              there.
            </p>
          </div>
        </div>

        {/* XML Editor & Preview Modals */}
        <XMLEditor
          isOpen={showXMLEditor}
          onClose={() => setShowXMLEditor(false)}
          onSubmit={handleXMLSubmit}
        />

        <XMLPreviewDialog
          xml={xmlData || ""}
          open={showPreview}
          onOpenChange={setShowPreview}
        />
      </main>
    </div>
  );
};

export default SelfServiceRequest;