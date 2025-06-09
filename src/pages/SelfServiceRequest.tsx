import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Search, Database, FileText, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { datasets } from "@/data/datasets";

const SelfServiceRequest = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUseCase, setSelectedUseCase] = useState("Computer Vision");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [activeTab, setActiveTab] = useState("general");

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
      alert("Please fill in task name and select a file");
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
    
    alert("Task created successfully! It will appear in the HIL dashboard.");
  };

  const annotationTasks = [
    {
      id: "234",
      taskName: "3_2_10_output-csvextract-file_24-Oct-2024_12-37-3.csv",
      workspace: "Wks_Azure_01",
      project: "UPS",
      sentForReview: 14,
      afterReview: 8,
      reviewPending: 8,
      date: "2022-04-22 10:34:23",
      status: "In Progress",
      output: "---"
    },
    {
      id: "345", 
      taskName: "3_2_10_output-csvextract-file_25-Oct-2024_12-37-3.csv",
      workspace: "Wks_Azure_01",
      project: "UPS",
      sentForReview: 11,
      afterReview: 11,
      reviewPending: 0,
      date: "2022-04-22 10:34:23",
      status: "Completed",
      output: "View"
    }
  ];

  const dataFields = [
    {
      fieldName: "Customer ID",
      dataType: "String", 
      description: "Unique identifier for each customer",
      exampleValues: "C12345, C67890",
      constraints: "Non-null, Unique"
    },
    {
      fieldName: "Gender",
      dataType: "Categorical",
      description: "Gender of the customer", 
      exampleValues: "Male, Female",
      constraints: "Non-null, [Male, Female]"
    },
    {
      fieldName: "Age",
      dataType: "Integer",
      description: "Age of the customer",
      exampleValues: "25, 45", 
      constraints: ">= 18"
    },
    {
      fieldName: "Monthly Charges",
      dataType: "Float",
      description: "Monthly subscription charges",
      exampleValues: "29.99, 99.99",
      constraints: "Non-null, >= 0"
    },
    {
      fieldName: "Contract Type", 
      dataType: "Categorical",
      description: "Type of subscription contract",
      exampleValues: "Month-to-Month, Annual",
      constraints: "Non-null, Fixed values"
    },
    {
      fieldName: "Churn",
      dataType: "Boolean",
      description: "Indicates if the customer has churned",
      exampleValues: "True, False",
      constraints: "Non-null"
    },
    {
      fieldName: "Tenure",
      dataType: "Integer", 
      description: "Number of months the customer has been with the company",
      exampleValues: "1, 24",
      constraints: "Non-null, >= 0"
    }
  ];

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
        {/* Data Creation Form */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Create HIL Task</h2>
          
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
              <h3 className="text-lg font-medium text-slate-900 mb-4">Use Case</h3>
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
              <h3 className="text-lg font-medium text-slate-900 mb-4">Select Template</h3>
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

        {/* Dataset Files Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <button className="text-purple-600 hover:text-purple-700">▼</button>
                <span className="font-medium">234</span>
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-blue-600 font-medium">payment_details</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <span>Test</span>
                <Badge variant="secondary">SQL</Badge>
                <span>1000</span>
                <div className="flex items-center">
                  <FileText className="w-4 h-4 text-purple-600 mr-1" />
                  <span className="text-purple-600">Overall Report</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs for Dataset Details */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-slate-600">
                  <span>Created Date: 02 Jan 2025 10:30 AM</span>
                  <span className="ml-8">Last Updated Date: 02 Jan 2025 10:30 AM</span>
                </div>
                <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                  <FileText className="w-4 h-4 mr-2" />
                  View General Report
                </Button>
              </div>
              
              <TabsList className="grid grid-cols-5 w-fit">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="data-processing">Data Processing</TabsTrigger>
                <TabsTrigger value="human-in-loop">Human In Loop</TabsTrigger>
                <TabsTrigger value="data-dictionary">Data Dictionary</TabsTrigger>
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="general" className="p-6">
              <div className="text-slate-600">
                <p>General information and overview of the dataset will be displayed here.</p>
              </div>
            </TabsContent>

            <TabsContent value="data-processing" className="p-6">
              <div className="text-slate-600">
                <p>Data processing information and pipeline details will be shown here.</p>
              </div>
            </TabsContent>

            <TabsContent value="human-in-loop" className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-slate-900">HIL Tasks for this File</h3>
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input placeholder="Search" className="pl-10" />
                  </div>
                </div>

                {/* Show HIL tasks related to this file */}
                <div className="space-y-4">
                  {dataset.hilTasks
                    .filter(task => task.fileId === "234")
                    .map((task) => (
                      <div key={task.id} className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-slate-900">{task.taskName}</h4>
                            <p className="text-sm text-slate-600">{task.taskType} • {task.assignedTo || "Unassigned"}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {task.status === "completed" ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : task.status === "in-progress" ? (
                              <Clock className="w-5 h-5 text-blue-500" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-orange-500" />
                            )}
                            <Badge className={
                              task.status === "completed" ? "bg-green-100 text-green-800" :
                              task.status === "in-progress" ? "bg-blue-100 text-blue-800" :
                              "bg-orange-100 text-orange-800"
                            }>
                              {task.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-purple-600 hover:bg-purple-600">
                        <TableHead className="text-white">ID</TableHead>
                        <TableHead className="text-white">Task Name</TableHead>
                        <TableHead className="text-white">Workspace</TableHead>
                        <TableHead className="text-white">Project</TableHead>
                        <TableHead className="text-white">Sent For Review</TableHead>
                        <TableHead className="text-white">After Review</TableHead>
                        <TableHead className="text-white">Review Pending</TableHead>
                        <TableHead className="text-white">Date</TableHead>
                        <TableHead className="text-white">Status</TableHead>
                        <TableHead className="text-white">Output</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {annotationTasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">{task.id}</TableCell>
                          <TableCell className="text-sm">{task.taskName}</TableCell>
                          <TableCell>{task.workspace}</TableCell>
                          <TableCell>{task.project}</TableCell>
                          <TableCell>{task.sentForReview}</TableCell>
                          <TableCell>{task.afterReview}</TableCell>
                          <TableCell>{task.reviewPending}</TableCell>
                          <TableCell className="text-sm">{task.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {task.status === "In Progress" ? (
                                <>
                                  <Clock className="w-4 h-4 text-orange-500 mr-2" />
                                  <span className="text-orange-700">{task.status}</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  <span className="text-green-700">{task.status}</span>
                                </>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {task.output === "View" ? (
                              <Button variant="link" className="text-purple-600 p-0">
                                {task.output}
                              </Button>
                            ) : (
                              <span className="text-slate-400">{task.output}</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="data-dictionary" className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Field Name</TableHead>
                      <TableHead>Data Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Example Values</TableHead>
                      <TableHead>Constraints</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataFields.map((field, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{field.fieldName}</TableCell>
                        <TableCell>{field.dataType}</TableCell>
                        <TableCell>{field.description}</TableCell>
                        <TableCell className="text-sm">{field.exampleValues}</TableCell>
                        <TableCell className="text-sm">{field.constraints}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="metadata" className="p-6">
              <div className="text-slate-600">
                <p>Metadata information about the dataset will be displayed here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Additional Files */}
        <div className="space-y-4">
          {[
            { id: "222", name: "f1100_xvid.avi", format: "AVI", volume: "200 MB" },
            { id: "235", name: "customer_transactions", format: "CSV", volume: "5000 Records" }
          ].map((file) => (
            <div key={`${file.id}-${file.name}`} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="text-purple-600 hover:text-purple-700">▼</button>
                  <span className="font-medium">{file.id}</span>
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-600 font-medium">{file.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-600">
                  <span>Test</span>
                  <Badge variant="secondary">{file.format}</Badge>
                  <span>{file.volume}</span>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 text-purple-600 mr-1" />
                    <span className="text-purple-600">Overall Report</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SelfServiceRequest;
