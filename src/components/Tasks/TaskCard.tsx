import React from 'react';
import type { Task } from '../../types/task.types';
import { FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';
import { formatDate, truncateText, getDueDateBadgeColor } from '../../utils/formatters';
import { PRIORITY_COLORS, PRIORITY_LABELS, STATUS_COLORS, STATUS_LABELS } from '../../utils/constants';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-5 border border-gray-200 animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          {task.title}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-primary-600 hover:text-primary-700 transition-colors"
            aria-label="Edit task"
          >
            <FiEdit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="text-red-600 hover:text-red-700 transition-colors"
            aria-label="Delete task"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-4">
          {truncateText(task.description, 100)}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${PRIORITY_COLORS[task.priority]}`}>
          {PRIORITY_LABELS[task.priority]}
        </span>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[task.status]}`}>
          {STATUS_LABELS[task.status]}
        </span>
      </div>

      {task.dueDate && (
        <div className="flex items-center text-sm">
          <FiCalendar className="mr-2 text-gray-500" size={16} />
          <span className={`px-2 py-1 rounded text-xs font-medium ${getDueDateBadgeColor(task.dueDate)}`}>
            Due: {formatDate(task.dueDate)}
          </span>
        </div>
      )}
    </div>
  );
};
