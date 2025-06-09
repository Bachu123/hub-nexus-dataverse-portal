
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { HILTask } from "@/data/datasets";

interface HILStatusBarProps {
  hilTasks: HILTask[];
}

const HILStatusBar = ({ hilTasks }: HILStatusBarProps) => {
  const totalTasks = hilTasks.length;
  const completedTasks = hilTasks.filter(task => task.status === "completed").length;
  const inProgressTasks = hilTasks.filter(task => task.status === "in-progress").length;
  const pendingTasks = hilTasks.filter(task => task.status === "pending").length;
  const reviewPendingTasks = hilTasks.filter(task => task.status === "review-pending").length;
  
  const overallProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case "review-pending":
        return <Users className="w-4 h-4 text-purple-500" />;
      default:
        return null;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "review-pending":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-slate-900">Human-in-the-Loop Tasks</h3>
        </div>
        <div className="text-sm text-slate-600">
          {completedTasks}/{totalTasks} Completed
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span>Overall Progress</span>
          <span>{Math.round(overallProgress)}%</span>
        </div>
        <Progress value={overallProgress} className="h-3" />
      </div>
      
      {/* Status Badges */}
      <div className="flex flex-wrap gap-3 mb-4">
        <Badge className={`${getStatusColor("completed")} border`}>
          <CheckCircle className="w-3 h-3 mr-1" />
          Completed: {completedTasks}
        </Badge>
        <Badge className={`${getStatusColor("in-progress")} border`}>
          <Clock className="w-3 h-3 mr-1" />
          In Progress: {inProgressTasks}
        </Badge>
        <Badge className={`${getStatusColor("pending")} border`}>
          <AlertCircle className="w-3 h-3 mr-1" />
          Pending: {pendingTasks}
        </Badge>
        <Badge className={`${getStatusColor("review-pending")} border`}>
          <Users className="w-3 h-3 mr-1" />
          Review Pending: {reviewPendingTasks}
        </Badge>
      </div>
      
      {/* Recent Tasks */}
      <div>
        <h4 className="text-sm font-medium text-slate-900 mb-2">Recent HIL Tasks</h4>
        <div className="space-y-2">
          {hilTasks.slice(0, 3).map((task) => (
            <div key={task.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(task.status)}
                <div>
                  <div className="text-sm font-medium text-slate-900">{task.taskName}</div>
                  <div className="text-xs text-slate-500">
                    {task.taskType} • {task.assignedTo || "Unassigned"}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-900">{task.progress}%</div>
                <div className="text-xs text-slate-500">{task.lastUpdated}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HILStatusBar;
