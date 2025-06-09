
import { Link } from "react-router-dom";
import { Database, Wrench, Brain, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const apps = [
    {
      id: "data-marketplace",
      title: "Data Marketplace",
      description: "Evaluates the accuracy and relevance of retrieved content for various use cases and domains",
      icon: Database,
      gradient: "from-blue-500 to-blue-700",
      link: "/data-marketplace"
    },
    {
      id: "ai-workbench",
      title: "AI Workbench",
      description: "Evaluates the accuracy and relevance of retrieved content for AI model training and optimization",
      icon: Brain,
      gradient: "from-purple-500 to-purple-700",
      link: "#"
    },
    {
      id: "infra-hub",
      title: "Infra Hub",
      description: "Evaluates the accuracy and relevance of retrieved content for infrastructure management",
      icon: Wrench,
      gradient: "from-cyan-500 to-cyan-700",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">CentificAI</h1>
                <p className="text-sm text-slate-600">Data Foundry</p>
              </div>
            </div>
            <div className="text-slate-400">|</div>
            <p className="text-slate-600">My Apps Hub</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
              <span className="ml-2 bg-purple-600 text-white text-xs rounded-full px-2 py-1">3</span>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                VS
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Vasudevan</p>
                <p className="text-xs text-slate-600">Org Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Apps Dashboard</h1>
          <p className="text-lg text-slate-600">Access and manage your data science and AI applications</p>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app) => (
            <Link 
              key={app.id} 
              to={app.link}
              className="group block"
            >
              <div className={`relative bg-gradient-to-br ${app.gradient} rounded-2xl p-8 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl`}>
                <div className="absolute top-6 right-6">
                  <app.icon className="w-16 h-16 text-white/80" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">{app.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed mb-6">
                    {app.description}
                  </p>
                  
                  <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Launch Application</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-900">24</p>
                <p className="text-sm text-slate-600">Active Projects</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-900">1,247</p>
                <p className="text-sm text-slate-600">Datasets Processed</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-900">98.5%</p>
                <p className="text-sm text-slate-600">System Uptime</p>
              </div>
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
