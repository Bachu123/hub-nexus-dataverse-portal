import { useState } from 'react';
import { Link } from 'react-router-dom';
import { systemArchitecturePages } from '@/constants/architecture';
import { Button } from '@/components/ui/button';

const Architecture = () => {
  const [index, setIndex] = useState(0);
  const total = systemArchitecturePages.length;
  const page = systemArchitecturePages[index];

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(total - 1, i + 1));

  return (
    <div className="p-6 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <Link
            to="/self-service-request"
            className="text-purple-600 hover:underline"
          >
            Back to Request
          </Link>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={prev} disabled={index === 0}>
              Prev
            </Button>
            <span className="text-sm text-slate-600">
              Page {index + 1} of {total}
            </span>
            <Button variant="outline" size="sm" onClick={next} disabled={index === total - 1}>
              Next
            </Button>
          </div>
        </div>
        <iframe
          title={page.title}
          srcDoc={page.html}
          className="w-full h-[80vh] border rounded"
        />
      </div>
    </div>
  );
};

export default Architecture;
