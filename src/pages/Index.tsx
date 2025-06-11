
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, FileText, Wrench, Brain, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Data Workbench
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive platform for data discovery, self-service requests, and AI model management. 
            Streamline your data workflows and accelerate your AI initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => navigate("/data-marketplace")}>
            <CardHeader className="text-center">
              <Database className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <CardTitle className="text-xl">Data Marketplace</CardTitle>
              <CardDescription>
                Discover and access curated datasets for your projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Explore Data
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => navigate("/self-service-request")}>
            <CardHeader className="text-center">
              <FileText className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <CardTitle className="text-xl">Self-Service Request</CardTitle>
              <CardDescription>
                Submit data requests and track their progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Create Request
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => navigate("/model-catalog")}>
            <CardHeader className="text-center">
              <Brain className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <CardTitle className="text-xl">Model Catalog</CardTitle>
              <CardDescription>
                Browse, compare, and deploy AI models for your use cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Browse Models
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => navigate("/infra-hub")}>
            <CardHeader className="text-center">
              <Settings className="w-12 h-12 mx-auto text-orange-600 mb-4" />
              <CardTitle className="text-xl">Infra Hub</CardTitle>
              <CardDescription>
                Manage infrastructure, pipelines, and AI services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Access Hub
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Get Started Today
          </h2>
          <p className="text-gray-600 mb-6">
            Choose a module above to begin your data journey, or contact our team for personalized assistance.
          </p>
          <div className="space-x-4">
            <Button size="lg" onClick={() => navigate("/data-marketplace")}>
              Start Exploring
            </Button>
            <Button variant="outline" size="lg">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
