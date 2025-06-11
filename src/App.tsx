
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import DataMarketplace from "./pages/DataMarketplace";
import DatasetDetail from "./pages/DatasetDetail";
import SelfServiceRequest from "./pages/SelfServiceRequest";
import ModelCatalog from "./pages/ModelCatalog";
import ModelDetail from "./pages/ModelDetail";
import FineTuning from "./pages/FineTuning";
import InfraHub from "./pages/InfraHub";
import InfraHubDashboard from "./pages/InfraHubDashboard";
import HILTasks from "./pages/HILTasks";
import PipelineTemplate from "./pages/PipelineTemplate";
import PipelineDetail from "./pages/PipelineDetail";
import AIServices from "./pages/AIServices";
import ProjectManagement from "./pages/ProjectManagement";
import NotFound from "./pages/NotFound";
import Architecture from "./pages/Architecture";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/data-marketplace" element={<DataMarketplace />} />
          <Route path="/dataset/:id" element={<DatasetDetail />} />
          <Route path="/self-service-request" element={<SelfServiceRequest />} />
          <Route path="/model-catalog" element={<ModelCatalog />} />
          <Route path="/models/:id" element={<ModelDetail />} />
          <Route path="/infra-hub" element={<InfraHub />}>
            <Route index element={<InfraHubDashboard />} />
            <Route path="hil-tasks" element={<HILTasks />} />
            <Route path="pipelines" element={<PipelineTemplate />} />
            <Route path="pipelines/:id" element={<PipelineDetail />} />
            <Route path="ai-services" element={<AIServices />} />
          </Route>
          <Route path="/architecture" element={<Architecture />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Link
          to="/architecture"
          className="fixed bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700"
        >
          View Architecture
        </Link>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
