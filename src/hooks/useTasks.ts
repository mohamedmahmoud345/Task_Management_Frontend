import { useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import type { TaskContextType } from '../types/task.types';

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
