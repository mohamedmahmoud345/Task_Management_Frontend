import React from 'react';
import type { TaskFilters as ITaskFilters, Status, Priority } from '../../types/task.types';
import { FiSearch, FiX } from 'react-icons/fi';
import { STATUS_LABELS, PRIORITY_LABELS } from '../../utils/constants';

interface TaskFiltersProps {
  filters: ITaskFilters;
  onFiltersChange: (filters: ITaskFilters) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({ filters, onFiltersChange }) => {
  const handleStatusFilter = (status: Status | 'ALL') => {
    onFiltersChange({ ...filters, status });
  };

  const handlePriorityFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, priority: e.target.value as Priority | 'ALL' });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, sortBy: e.target.value as 'dueDate' | 'priority' | 'createdDate' });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  const clearFilters = () => {
    onFiltersChange({
      status: 'ALL',
      priority: 'ALL',
      search: '',
      sortBy: 'dueDate',
      sortOrder: 'asc',
    });
  };

  const hasActiveFilters = 
    filters.status !== 'ALL' || 
    filters.priority !== 'ALL' || 
    (filters.search && filters.search.length > 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search tasks by title..."
            value={filters.search || ''}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Status Filter Chips */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700 mr-2">Status:</span>
          {(['ALL', 'TODO', 'IN_PROGRESS', 'COMPLETED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => handleStatusFilter(status)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filters.status === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'ALL' ? 'All' : STATUS_LABELS[status]}
            </button>
          ))}
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-2 flex-1 sm:flex-initial">
          <label className="text-sm font-medium text-gray-700">Priority:</label>
          <select
            value={filters.priority || 'ALL'}
            onChange={handlePriorityFilter}
            className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          >
            <option value="ALL">All</option>
            <option value="LOW">{PRIORITY_LABELS.LOW}</option>
            <option value="MEDIUM">{PRIORITY_LABELS.MEDIUM}</option>
            <option value="HIGH">{PRIORITY_LABELS.HIGH}</option>
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 flex-1 sm:flex-initial">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={filters.sortBy || 'dueDate'}
            onChange={handleSortChange}
            className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            <FiX size={16} />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};
