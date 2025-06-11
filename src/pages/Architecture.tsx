import { useState } from 'react';
import { Link } from 'react-router-dom';
import { systemArchitecturePages } from '@/constants/architecture';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Architecture = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = systemArchitecturePages.length;
  const currentPage = systemArchitecturePages[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => Math.min(totalPages - 1, prevIndex + 1));
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-slate-50 flex flex-col">
      <div className="max-w-7xl w-full mx-auto flex-grow flex flex-col space-y-4">
        <header className="flex items-center justify-between bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
          <Link
            to="/infra-hub/pipelines"
            className="text-sm font-medium text-purple-600 hover:text-purple-800 hover:underline"
          >
            &larr; Back to Pipelines
          </Link>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Prev</span>
            </Button>
            <div className="text-sm font-medium text-slate-600 tabular-nums">
              <span>{currentPage.title}</span>
              <span className="text-slate-400 mx-2">|</span>
              <span>
                {currentIndex + 1} / {totalPages}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              disabled={currentIndex === totalPages - 1}
              className="flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <main className="flex-grow">
          <iframe
            title={currentPage.title}
            srcDoc={currentPage.html}
            className="w-full h-full border border-slate-200 rounded-lg shadow-sm bg-white"
            style={{ minHeight: '75vh' }}
          />
        </main>
      </div>
    </div>
  );
};

export default Architecture;
