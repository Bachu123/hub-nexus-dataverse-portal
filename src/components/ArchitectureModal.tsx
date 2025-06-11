import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export interface ArchitecturePage {
  id: string;
  title: string;
  html: string;
}

interface Props {
  pages: ArchitecturePage[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ArchitectureModal = ({ pages, open, onOpenChange }: Props) => {
  const [index, setIndex] = useState(0);
  const total = pages.length;

  const current = pages[index];

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(total - 1, i + 1));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-full">
        <DialogHeader className="mb-2">
          <DialogTitle>{current.title}</DialogTitle>
        </DialogHeader>
        <div className="mb-2 flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={goPrev} disabled={index === 0}>
            Prev
          </Button>
          <span className="text-sm text-slate-600">
            Page {index + 1} of {total}
          </span>
          <Button variant="outline" size="sm" onClick={goNext} disabled={index === total - 1}>
            Next
          </Button>
        </div>
        <iframe title={current.title} srcDoc={current.html} className="w-full h-[600px] border rounded" />
      </DialogContent>
    </Dialog>
  );
};

export default ArchitectureModal;
