
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Building2 } from 'lucide-react';

interface Workspace {
  id: string;
  name: string;
  type: 'personal' | 'team' | 'organization';
}

export const WorkspaceSelector = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace>({
    id: '1',
    name: 'Personal Workspace',
    type: 'personal'
  });

  const workspaces: Workspace[] = [
    { id: '1', name: 'Personal Workspace', type: 'personal' },
    { id: '2', name: 'Data Science Team', type: 'team' },
    { id: '3', name: 'AI Research Lab', type: 'organization' },
    { id: '4', name: 'Product Analytics', type: 'team' }
  ];

  const getWorkspaceIcon = (type: string) => {
    return <Building2 className="w-4 h-4" />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-[200px] justify-between">
          <div className="flex items-center">
            {getWorkspaceIcon(selectedWorkspace.type)}
            <span className="ml-2 truncate">{selectedWorkspace.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Switch Workspace</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onClick={() => setSelectedWorkspace(workspace)}
            className={selectedWorkspace.id === workspace.id ? 'bg-slate-100' : ''}
          >
            <div className="flex items-center">
              {getWorkspaceIcon(workspace.type)}
              <span className="ml-2">{workspace.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
