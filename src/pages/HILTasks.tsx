
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, CheckCircle, Download } from 'lucide-react';

const HILTasks = () => {
  const tasks = [
    {
      id: "432",
      taskName: "Customer Data Review",
      sentForReview: "2024-06-15 09:30",
      receivedAfterReview: "2024-06-15 14:20",
      reviewPending: "4h 50m",
      dateTime: "2024-06-15 14:20",
      status: "completed",
      output: "customer_data_reviewed.json"
    },
    {
      id: "345",
      taskName: "Policy Compliance Check",
      sentForReview: "2024-06-15 08:15",
      receivedAfterReview: "-",
      reviewPending: "8h 30m",
      dateTime: "2024-06-15 08:15",
      status: "in-progress",
      output: null
    },
    {
      id: "556",
      taskName: "Data Quality Assessment",
      sentForReview: "2024-06-14 16:45",
      receivedAfterReview: "2024-06-15 10:30",
      reviewPending: "17h 45m",
      dateTime: "2024-06-15 10:30",
      status: "completed",
      output: "quality_report.pdf"
    },
    {
      id: "111",
      taskName: "Model Validation",
      sentForReview: "2024-06-15 11:00",
      receivedAfterReview: "-",
      reviewPending: "5h 45m",
      dateTime: "2024-06-15 11:00",
      status: "in-progress",
      output: null
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800">Review In Progress</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleDownloadOutput = (filename: string) => {
    // In a real application, this would trigger the download
    console.log(`Downloading ${filename}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">HIL Tasks</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-slate-600">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-slate-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-2xl font-bold">4</p>
              <p className="text-sm text-slate-600">Total Tasks</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-2xl font-bold">6.5h</p>
              <p className="text-sm text-slate-600">Avg Review Time</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Table */}
      <Card>
        <CardHeader>
          <CardTitle>Human-in-the-Loop Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Task Name</TableHead>
                <TableHead>Sent for Review</TableHead>
                <TableHead>Received After Review</TableHead>
                <TableHead>Review Pending</TableHead>
                <TableHead>Date/Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Output</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell>{task.sentForReview}</TableCell>
                  <TableCell>{task.receivedAfterReview}</TableCell>
                  <TableCell>{task.reviewPending}</TableCell>
                  <TableCell>{task.dateTime}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(task.status)}
                      {getStatusBadge(task.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {task.output ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadOutput(task.output)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        {task.output}
                      </Button>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default HILTasks;
