
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Eye } from "lucide-react";
import { DatasetFile } from "@/data/datasets";

interface FilePreviewDialogProps {
  file: DatasetFile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FilePreviewDialog = ({ file, open, onOpenChange }: FilePreviewDialogProps) => {
  if (!file) return null;

  const renderPreviewData = () => {
    if (!file.previewData || file.previewData.length === 0) {
      return (
        <div className="text-center py-8 text-slate-500">
          <FileText className="w-12 h-12 mx-auto mb-2 text-slate-300" />
          <p>No preview data available for this file format</p>
        </div>
      );
    }

    const headers = Object.keys(file.previewData[0]);
    
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header} className="font-medium">
                  {header.replace(/_/g, ' ').toUpperCase()}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {file.previewData.slice(0, 5).map((row, index) => (
              <TableRow key={index}>
                {headers.map((header) => (
                  <TableCell key={header} className="font-mono text-sm">
                    {String(row[header])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {file.previewData.length > 5 && (
          <div className="text-center py-2 text-sm text-slate-500">
            Showing 5 of {file.previewData.length} records
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>{file.name}</span>
            <Badge variant="secondary">{file.format}</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-6">
          {/* File Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-slate-900 mb-2">File Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Format:</span>
                  <Badge variant="secondary">{file.format}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Volume:</span>
                  <span className="font-medium">{file.volume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Description:</span>
                  <span className="font-medium">{file.description}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Usability Score</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Score</span>
                  <span className="font-bold text-lg">{file.usabilityScore}/100</span>
                </div>
                <Progress value={file.usabilityScore} className="h-3" />
              </div>
            </div>
          </div>
          
          {/* Data Quality Metrics */}
          <div>
            <h3 className="font-medium text-slate-900 mb-3">Data Quality Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(file.dataQuality).map(([metric, score]) => (
                <div key={metric} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize text-slate-600">{metric}:</span>
                    <span className="font-medium">{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Preview Data */}
          <div>
            <h3 className="font-medium text-slate-900 mb-3">Data Preview</h3>
            {renderPreviewData()}
          </div>
          
          {/* Actions */}
          <div className="flex justify-between pt-4 border-t">
            <div className="space-x-2">
              {file.reportUrl && (
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Full Report
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download File
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilePreviewDialog;
