import React from 'react';
import type { Task } from '../../types/task.types';
import { TaskCard } from './TaskCard';
import { FiInbox } from 'react-icons/fi';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  loading?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-5 border border-gray-200 animate-pulse"
          >
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <FiInbox className="text-gray-400 mb-4" size={64} />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks found</h3>
        <p className="text-gray-500 text-center max-w-md">
          Get started by creating your first task. Click the "New Task" button to begin.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};
