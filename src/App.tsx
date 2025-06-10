
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DataMarketplace from "./pages/DataMarketplace";
import DatasetDetail from "./pages/DatasetDetail";
import SelfServiceRequest from "./pages/SelfServiceRequest";
import ModelCatalog from "./pages/ModelCatalog";
import ModelDetail from "./pages/ModelDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
