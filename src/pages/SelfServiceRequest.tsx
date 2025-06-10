
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Plus, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { datasets } from "@/data/datasets";
import XMLEditor from "@/components/XMLEditor";
import { useToast } from "@/components/ui/use-toast";

const SelfServiceRequest = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUseCase, setSelectedUseCase] = useState("Computer Vision");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [showXMLEditor, setShowXMLEditor] = useState(false);
  const { toast } = useToast();

  const dataset = datasets["hav-df"];

  const useCases = [
    "Computer Vision",
    "Natural Language Processing", 
    "Audio/Speech Processing",
    "Conversational AI",
    "Ranking & Scoring",
    "Structured Data Parsing",
    "Time Series Analysis",
    "Videos"
  ];

  const templates = [
    {
      id: "image-captioning",
      title: "Image Captioning",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },
    {
      id: "image-classification", 
      title: "Image Classification",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    {
      id: "ocr",
      title: "Optical Character Recognition", 
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      id: "object-detection",
      title: "Object Detection with Bounding Boxes",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
    },
    {
      id: "semantic-segmentation",
      title: "Semantic Segmentation with Masks", 
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
    },
    {
      id: "keypoint-labeling",
      title: "Keypoint Labeling",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
    }
  ];

  const handleSubmitTask = () => {
    if (!taskName || !selectedFile) {
      toast({
        title: "Missing Information",
        description: "Please fill in task name and select a file",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would create a new HIL task
    console.log("Creating new HIL task:", {
      taskName,
      description,
      fileId: selectedFile,
      useCase: selectedUseCase,
      template: selectedTemplate
    });
    
    // Reset form
    setTaskName("");
    setDescription("");
    setSelectedFile("");
    
    toast({
      title: "Task Created",
      description: "Task created successfully! It will appear in the HIL dashboard.",
    });
  };

  const handleXMLSubmit = (xmlContent: string) => {
    console.log("Submitting XML HIL task:", xmlContent);
    
    toast({
      title: "XML Task Created",
      description: "Your custom XML HIL task has been created successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link to="/dataset/hav-df" className="flex items-center text-purple-600 hover:text-purple-700">
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
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Create HIL Task</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard Form Method */}
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors">
              <div className="text-center">
                <Plus className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Standard Form</h3>
                <p className="text-slate-600 mb-4">Use our guided form to create a HIL task with predefined templates and use cases.</p>
                <p className="text-sm text-slate-500">Recommended for most users</p>
              </div>
            </div>

            {/* XML Import Method */}
            <div className="border-2 border-dashed border-purple-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
              <div className="text-center">
                <FileCode className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Import XML</h3>
                <p className="text-slate-600 mb-4">Advanced users can import a custom XML configuration for complete control over HIL task settings.</p>
                <Button 
                  onClick={() => setShowXMLEditor(true)}
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <FileCode className="w-4 h-4 mr-2" />
                  Import XML
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Standard HIL Task Creation Form */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-slate-200">
          <h3 className="text-lg font-medium text-slate-900 mb-6">Standard Task Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Task Name</label>
              <Input
                placeholder="Enter Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Target File</label>
              <select
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={selectedFile}
                onChange={(e) => setSelectedFile(e.target.value)}
              >
                <option value="">Select a file...</option>
                {dataset.files.map((file) => (
                  <option key={file.id} value={file.id}>
                    {file.name} ({file.format})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <Textarea
              placeholder="Enter task description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Use Case Selection */}
            <div>
              <h4 className="text-lg font-medium text-slate-900 mb-4">Use Case</h4>
              <div className="space-y-2">
                {useCases.map((useCase) => (
                  <button
                    key={useCase}
                    onClick={() => setSelectedUseCase(useCase)}
                    className={`w-full p-3 text-left rounded-lg border transition-colors ${
                      selectedUseCase === useCase
                        ? 'bg-purple-50 border-purple-600 text-purple-900'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {useCase}
                  </button>
                ))}
              </div>
            </div>

            {/* Template Selection */}
            <div>
              <h4 className="text-lg font-medium text-slate-900 mb-4">Select Template</h4>
              <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`group relative overflow-hidden rounded-lg border-2 transition-all ${
                      selectedTemplate === template.id
                        ? 'border-purple-600 ring-2 ring-purple-600/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={template.image}
                        alt={template.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-sm font-medium leading-tight">{template.title}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleSubmitTask}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create HIL Task
            </Button>
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-medium text-slate-900 mb-4">How it works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-slate-900 mb-3">Standard Form</h4>
              <div className="space-y-3 text-slate-600">
                <p>1. <strong>Select a target file</strong> from the dataset that you want to create a HIL task for.</p>
                <p>2. <strong>Choose your use case</strong> from the available options to match your annotation needs.</p>
                <p>3. <strong>Pick a template</strong> that best fits your data annotation requirements.</p>
                <p>4. <strong>Provide task details</strong> including name and description for clear task identification.</p>
                <p>5. <strong>Submit the task</strong> and it will be added to the HIL pipeline for processing.</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-slate-900 mb-3">XML Import</h4>
              <div className="space-y-3 text-slate-600">
                <p>1. <strong>Click Import XML</strong> to open the advanced XML editor.</p>
                <p>2. <strong>Paste or upload</strong> your custom XML configuration file.</p>
                <p>3. <strong>Use auto-complete</strong> to help with valid element and attribute names.</p>
                <p>4. <strong>Validate your XML</strong> against the HIL task schema before submission.</p>
                <p>5. <strong>Submit directly</strong> for complete control over task configuration.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> Created HIL tasks will be visible in the dataset's file details under the "Human In Loop" tab. 
              You can track their progress and manage annotations from there.
            </p>
          </div>
        </div>

        {/* XML Editor Modal */}
        <XMLEditor
          isOpen={showXMLEditor}
          onClose={() => setShowXMLEditor(false)}
          onSubmit={handleXMLSubmit}
        />
      </main>
    </div>
  );
};

export default SelfServiceRequest;
