import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LayoutDashboard, 
  Users, 
  GitBranch, 
  Settings, 
  Menu, 
  X, 
  Download,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

const InfraHub = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [period, setPeriod] = useState('monthly');
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/infra-hub' },
    { id: 'hil-tasks', label: 'HIL Tasks', icon: Users, path: '/infra-hub/hil-tasks' },
    { id: 'pipeline-template', label: 'Pipeline Template', icon: GitBranch, path: '/infra-hub/pipelines' },
    { id: 'ai-services', label: 'AI Services', icon: Settings, path: '/infra-hub/ai-services' },
  ];

  const isActive = (path: string) => {
    if (path === '/infra-hub') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleExport = () => {
    // Export functionality would be implemented here
    console.log('Exporting data...');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className={cn(
        "bg-white border-r border-slate-200 transition-all duration-300 flex flex-col",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/')}
                  className="mb-2 text-purple-600 hover:text-purple-700"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Main
                </Button>
                <h2 className="text-lg font-semibold text-slate-900">Infra Hub</h2>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={isActive(item.path) ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  !sidebarOpen && "justify-center px-2"
                )}
                onClick={() => navigate(item.path)}
              >
                <item.icon className={cn("w-4 h-4", sidebarOpen && "mr-2")} />
                {sidebarOpen && item.label}
              </Button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-end space-x-4">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </header>

        {/* Content Region */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default InfraHub;
