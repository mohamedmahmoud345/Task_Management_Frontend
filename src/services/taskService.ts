import api from './api';
import type { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/task.types';

export const taskService = {
  // Get all tasks for authenticated user
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/api/Task');
    return response.data;
  },

  // Get specific task by ID
  getTaskById: async (id: number): Promise<Task> => {
    const response = await api.get<Task>(`/api/Task/${id}`);
    return response.data;
  },

  // Create new task
  createTask: async (task: CreateTaskRequest): Promise<Task> => {
    const response = await api.post<Task>('/api/Task', task);
    return response.data;
  },

  // Update existing task
  updateTask: async (id: number, task: UpdateTaskRequest): Promise<Task> => {
    const response = await api.put<Task>(`/api/Task/${id}`, task);
    return response.data;
  },

  // Delete task
  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/api/Task/${id}`);
  },
};
