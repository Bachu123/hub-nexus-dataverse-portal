
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Users, Settings, MoreHorizontal, UserPlus } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'archived';
  members: number;
  createdAt: string;
  owner: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
}

const ProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Customer Analytics Platform',
      description: 'Advanced analytics platform for customer insights',
      status: 'active',
      members: 8,
      createdAt: '2024-01-15',
      owner: 'John Doe'
    },
    {
      id: '2',
      name: 'ML Model Training Pipeline',
      description: 'Automated pipeline for training and deploying ML models',
      status: 'active',
      members: 5,
      createdAt: '2024-01-10',
      owner: 'Jane Smith'
    }
  ]);

  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [newProject, setNewProject] = useState({
    name: '',
    description: ''
  });
  const [newUser, setNewUser] = useState({
    email: '',
    role: 'member'
  });

  const handleCreateProject = () => {
    if (!newProject.name) return;
    
    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      status: 'active',
      members: 1,
      createdAt: new Date().toISOString().split('T')[0],
      owner: 'Current User'
    };
    
    setProjects(prev => [...prev, project]);
    setNewProject({ name: '', description: '' });
    setShowCreateProject(false);
  };

  const handleAddUser = () => {
    if (!newUser.email) return;
    
    console.log('Adding user to project:', { 
      projectId: selectedProject, 
      user: newUser 
    });
    
    setNewUser({ email: '', role: 'member' });
    setShowAddUser(false);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      inactive: 'secondary',
      archived: 'outline'
    };
    return <Badge variant={variants[status] as any}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Project Management</h1>
          <p className="text-slate-600">Manage your projects and team members</p>
        </div>
        <Button onClick={() => setShowCreateProject(true)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">{project.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {
                      setSelectedProject(project.id);
                      setShowAddUser(true);
                    }}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add User
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {getStatusBadge(project.status)}
                  <div className="flex items-center text-sm text-slate-600">
                    <Users className="w-4 h-4 mr-1" />
                    {project.members} members
                  </div>
                </div>
                <div className="text-sm text-slate-600">
                  <div>Owner: {project.owner}</div>
                  <div>Created: {new Date(project.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Project Modal */}
      <Dialog open={showCreateProject} onOpenChange={setShowCreateProject}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={newProject.name}
                onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter project name"
              />
            </div>
            <div>
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                value={newProject.description}
                onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter project description"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowCreateProject(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject} className="bg-purple-600 hover:bg-purple-700">
                Create Project
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add User Modal */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add User to Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="user-email">Email Address</Label>
              <Input
                id="user-email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                placeholder="user@example.com"
              />
            </div>
            <div>
              <Label htmlFor="user-role">Role</Label>
              <select
                id="user-role"
                className="w-full p-2 border border-slate-300 rounded-md"
                value={newUser.role}
                onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowAddUser(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser} className="bg-purple-600 hover:bg-purple-700">
                Add User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManagement;
