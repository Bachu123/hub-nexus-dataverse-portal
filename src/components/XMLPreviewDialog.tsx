import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface XMLPreviewDialogProps {
  xml: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const XMLPreviewDialog = ({ xml, open, onOpenChange }: XMLPreviewDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-purple-600" />
          <span>Preview XML</span>
        </DialogTitle>
      </DialogHeader>
      <div className="flex-1 overflow-auto">
        <pre className="whitespace-pre-wrap text-sm font-mono">{xml}</pre>
      </div>
      <div className="flex justify-end pt-4">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Close
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

export default XMLPreviewDialog;
