import React from 'react';
import type { Task } from '../../types/task.types';
import { FiCheckCircle, FiClock, FiAlertCircle, FiList } from 'react-icons/fi';
import { isOverdue } from '../../utils/formatters';

interface TaskStatsProps {
  tasks: Task[];
}

export const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'COMPLETED').length;
  const inProgressTasks = tasks.filter((task) => task.status === 'IN_PROGRESS').length;
  const overdueTasks = tasks.filter((task) => isOverdue(task.dueDate) && task.status !== 'COMPLETED').length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: FiList,
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: FiCheckCircle,
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      icon: FiClock,
      color: 'bg-orange-100 text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      label: 'Overdue',
      value: overdueTasks,
      icon: FiAlertCircle,
      color: 'bg-red-100 text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`${stat.bgColor} rounded-lg p-5 border border-gray-200 transition-transform hover:scale-105`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} rounded-full p-3`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalTasks > 0 && (
        <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-bold text-primary-600">{completionPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>
      )}
    </div>
  );
};
