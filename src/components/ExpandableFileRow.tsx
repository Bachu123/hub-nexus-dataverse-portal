
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, FileText, Clock, CheckCircle, AlertCircle, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DatasetFile, HILTask } from "@/constants/datasets";

interface ExpandableFileRowProps {
  datasetId: string;
  file: DatasetFile;
  hilTasks: HILTask[];
  onPreview: (file: DatasetFile) => void;
}

const ExpandableFileRow = ({ datasetId, file, hilTasks, onPreview }: ExpandableFileRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const fileHilTasks = hilTasks.filter(task => task.fileId === file.id);

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

  return (
    <>
      <tr className="border-b hover:bg-slate-50">
        <td className="p-4">
          <input type="checkbox" className="rounded" />
        </td>
        <td className="p-4">
          <div className="flex items-center">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-purple-600 hover:text-purple-700 mr-2"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {file.id}
          </div>
        </td>
        <td className="p-4">
          <div className="flex items-center">
            <FileText className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-blue-600 font-medium">{file.name}</span>
          </div>
        </td>
        <td className="p-4 text-slate-600">{file.description}</td>
        <td className="p-4">
          <Badge variant="secondary">{file.format}</Badge>
        </td>
        <td className="p-4 text-slate-600">{file.volume}</td>
        <td className="p-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{file.usabilityScore}/100</span>
            <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                style={{ width: `${file.usabilityScore}%` }}
              />
            </div>
          </div>
        </td>
        <td className="p-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPreview(file)}
            >
              <FileText className="w-4 h-4 mr-1" />
              Preview
            </Button>
            {file.reportUrl && (
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-1" />
                Report
              </Button>
            )}
            <Link
              to={`/self-service-request?dataset=${datasetId}&fileId=${file.id}`}
              className="inline-flex"
            >
              <Button variant="outline" size="sm" className="ml-1">
                Request
              </Button>
            </Link>
          </div>
        </td>
      </tr>

      {isExpanded && (
        <tr>
          <td colSpan={8} className="p-0">
            <div className="bg-slate-50 border-t border-slate-200">
              <div className="p-6">
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
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-5 w-fit">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="data-processing">Data Processing</TabsTrigger>
                    <TabsTrigger value="human-in-loop">Human In Loop</TabsTrigger>
                    <TabsTrigger value="data-dictionary">Data Dictionary</TabsTrigger>
                    <TabsTrigger value="metadata">Metadata</TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="mt-4">
                    <div className="text-slate-600">
                      <p>General information and overview of the file will be displayed here.</p>
                      <p className="mt-2">Format: {file.format} | Volume: {file.volume} | Usability Score: {file.usabilityScore}/100</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="data-processing" className="mt-4">
                    <div className="text-slate-600">
                      <p>Data processing information and pipeline details for this file will be shown here.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="human-in-loop" className="mt-4">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium text-slate-900">HIL Tasks for this File</h4>
                        <div className="relative max-w-md">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <Input placeholder="Search" className="pl-10" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        {fileHilTasks.map((task) => (
                          <div key={task.id} className="p-4 border border-slate-200 rounded-lg bg-white">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-medium text-slate-900">{task.taskName}</h5>
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

                  <TabsContent value="data-dictionary" className="mt-4">
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

                  <TabsContent value="metadata" className="mt-4">
                    <div className="text-slate-600">
                      <p>Metadata information about the file will be displayed here.</p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <span className="font-medium">File Size:</span> {file.volume}
                        </div>
                        <div>
                          <span className="font-medium">Created:</span> 02 Jan 2025 10:30 AM
                        </div>
                        <div>
                          <span className="font-medium">Last Modified:</span> 02 Jan 2025 10:30 AM
                        </div>
                        <div>
                          <span className="font-medium">Format:</span> {file.format}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default ExpandableFileRow;
