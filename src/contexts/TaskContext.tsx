/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { TaskContextType, Task, CreateTaskRequest, UpdateTaskRequest, TaskFilters } from '../types/task.types';
import { taskService } from '../services/taskService';
import { getErrorMessage } from '../services/api';
import { toast } from 'react-toastify';

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<TaskFilters>({
    status: 'ALL',
    priority: 'ALL',
    search: '',
    sortBy: 'dueDate',
    sortOrder: 'asc',
  });

  const fetchTasks = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (task: CreateTaskRequest): Promise<void> => {
    try {
      const newTask = await taskService.createTask(task);
      setTasks((prev) => [...prev, newTask]);
      toast.success('Task created successfully!');
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message || 'Failed to create task');
      throw err;
    }
  };

  const updateTask = async (id: number, task: UpdateTaskRequest): Promise<void> => {
    try {
      const updatedTask = await taskService.updateTask(id, task);
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
      toast.success('Task updated successfully!');
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message || 'Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id: number): Promise<void> => {
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success('Task deleted successfully!');
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message || 'Failed to delete task');
      throw err;
    }
  };

  const setFilters = (newFilters: TaskFilters): void => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  };

  // Apply filters and sorting
  const filteredTasks = React.useMemo(() => {
    let result = [...tasks];

    // Filter by status
    if (filters.status && filters.status !== 'ALL') {
      result = result.filter((task) => task.status === filters.status);
    }

    // Filter by priority
    if (filters.priority && filters.priority !== 'ALL') {
      result = result.filter((task) => task.priority === filters.priority);
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter((task) =>
        task.title.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    if (filters.sortBy === 'dueDate') {
      result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return filters.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    } else if (filters.sortBy === 'priority') {
      const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
      result.sort((a, b) => {
        return filters.sortOrder === 'desc'
          ? priorityOrder[b.priority] - priorityOrder[a.priority]
          : priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    }

    return result;
  }, [tasks, filters]);

  const value: TaskContextType = {
    tasks,
    filteredTasks,
    loading,
    error,
    filters,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    setFilters,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
