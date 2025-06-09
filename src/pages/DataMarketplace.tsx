
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Search, Filter, Database, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const DataMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const industries = [
    {
      id: "ethical",
      name: "Ethical",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      datasets: 500,
      projects: 780,
      updated: "Sep 2024"
    },
    {
      id: "finance",
      name: "Finance",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      datasets: 450,
      projects: 620,
      updated: "Sep 2024"
    },
    {
      id: "healthcare",
      name: "Healthcare",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      datasets: 320,
      projects: 890,
      updated: "Sep 2024"
    },
    {
      id: "marketing",
      name: "Marketing",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      datasets: 275,
      projects: 445,
      updated: "Sep 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center text-purple-600 hover:text-purple-700">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </Link>
            <div className="text-slate-400">|</div>
            <h1 className="text-xl font-semibold text-slate-900">Data Hub</h1>
          </div>
          
          <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
            View All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Industry Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Industry</h2>
            <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry) => (
              <Link 
                key={industry.id}
                to={`/dataset/hav-df`}
                className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={industry.image} 
                    alt={industry.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{industry.name}</h3>
                    <p className="text-white/80 text-sm">Updated: {industry.updated}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <div className="flex items-center">
                      <Database className="w-4 h-4 mr-1 text-purple-600" />
                      <span className="font-medium text-purple-600">{industry.datasets}</span>
                      <span className="ml-1">Datasets</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-slate-400" />
                      <span className="font-medium">{industry.projects}</span>
                      <span className="ml-1">Projects</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-purple-600 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              Collection
              <Filter className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              Industry
              <Filter className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              Usage
              <Filter className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              Nature
              <Filter className="w-4 h-4 ml-2" />
            </Button>
            
            <div className="flex-1 max-w-md ml-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  placeholder="Search datasets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 placeholder:text-white/60 text-white"
                />
              </div>
            </div>
            
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Datasets Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Database className="w-6 h-6 text-slate-400" />
              <h2 className="text-xl font-semibold text-slate-900">Datasets (587)</h2>
            </div>
            <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["Centific", "HR", "Marketing", "Compliances", "Innovations", "Realtime", "Historical"].map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer">
                {tag}
                <button className="ml-2 hover:text-slate-900">×</button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
              Clear All
            </Button>
          </div>

          {/* Sample Dataset Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              to="/dataset/hav-df"
              className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-purple-500 to-blue-600">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white mb-1">HAV DF</h3>
                  <p className="text-white/80 text-sm">Ethical Dataset</p>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-sm text-slate-600 mb-3">Customer data analysis and insights</p>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center">
                    <Database className="w-4 h-4 mr-1 text-purple-600" />
                    <span className="font-medium">SQL</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">1000 Records</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataMarketplace;
