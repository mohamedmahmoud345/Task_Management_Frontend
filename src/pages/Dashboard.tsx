import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { TaskList } from '../components/Tasks/TaskList';
import { TaskStats } from '../components/Tasks/TaskStats';
import { TaskFilters } from '../components/Tasks/TaskFilters';
import { TaskForm } from '../components/Tasks/TaskForm';
import { Button } from '../components/Common/Button';
import { Modal } from '../components/Common/Modal';
import { useTasks } from '../hooks/useTasks';
import type { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/task.types';
import { FiPlus } from 'react-icons/fi';

const Dashboard: React.FC = () => {
  const {
    tasks,
    filteredTasks,
    loading,
    filters,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    setFilters,
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = () => {
    setSelectedTask(null);
    setFormMode('create');
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const handleDeleteTask = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (taskData: CreateTaskRequest | UpdateTaskRequest) => {
    if (formMode === 'create') {
      await createTask(taskData as CreateTaskRequest);
    } else if (selectedTask) {
      await updateTask(selectedTask.id, taskData as UpdateTaskRequest);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedTask) {
      await deleteTask(selectedTask.id);
      setIsDeleteModalOpen(false);
      setSelectedTask(null);
    }
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Task Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage and track your tasks</p>
          </div>
          <Button onClick={handleCreateTask}>
            <FiPlus className="mr-2" size={20} />
            New Task
          </Button>
        </div>

        <TaskStats tasks={tasks} />

        <TaskFilters filters={filters} onFiltersChange={setFilters} />

        <TaskList
          tasks={filteredTasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          loading={loading}
        />

        <TaskForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          task={selectedTask}
          mode={formMode}
        />

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete Task"
          size="sm"
        >
          <div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default Dashboard;
