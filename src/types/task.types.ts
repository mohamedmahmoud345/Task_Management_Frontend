export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type Status = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string | null;
  priority: Priority;
  status: Status;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  dueDate: string | null;
  priority: Priority;
  status: Status;
}

export interface UpdateTaskRequest {
  title: string;
  description: string;
  dueDate: string | null;
  priority: Priority;
  status: Status;
}

export interface TaskFilters {
  status?: Status | 'ALL';
  priority?: Priority | 'ALL';
  search?: string;
  sortBy?: 'dueDate' | 'priority' | 'createdDate';
  sortOrder?: 'asc' | 'desc';
}

export interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  loading: boolean;
  error: string | null;
  filters: TaskFilters;
  fetchTasks: () => Promise<void>;
  createTask: (task: CreateTaskRequest) => Promise<void>;
  updateTask: (id: number, task: UpdateTaskRequest) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  setFilters: (filters: TaskFilters) => void;
}
