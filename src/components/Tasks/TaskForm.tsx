import React, { useState, useEffect } from 'react';
import type { Task, CreateTaskRequest, UpdateTaskRequest, Priority, Status } from '../../types/task.types';
import { Modal } from '../Common/Modal';
import { Button } from '../Common/Button';
import { Input } from '../Common/Input';
import { validateTaskTitle, validateTaskDescription } from '../../utils/validation';
import { PRIORITY_LABELS, STATUS_LABELS } from '../../utils/constants';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: CreateTaskRequest | UpdateTaskRequest) => Promise<void>;
  task?: Task | null;
  mode: 'create' | 'edit';
}

export const TaskForm: React.FC<TaskFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
  mode,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('MEDIUM');
  const [status, setStatus] = useState<Status>('TODO');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  useEffect(() => {
    if (task && mode === 'edit') {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
      setPriority(task.priority);
      setStatus(task.status);
    } else {
      resetForm();
    }
  }, [task, mode, isOpen]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('MEDIUM');
    setStatus('TODO');
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: { title?: string; description?: string } = {};

    const titleError = validateTaskTitle(title);
    if (titleError) {
      newErrors.title = titleError;
    }

    const descriptionError = validateTaskDescription(description);
    if (descriptionError) {
      newErrors.description = descriptionError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      const taskData: CreateTaskRequest | UpdateTaskRequest = {
        title,
        description,
        dueDate: dueDate || null,
        priority,
        status,
      };

      await onSubmit(taskData);
      resetForm();
      onClose();
    } catch {
      // Error is handled in TaskContext with toast
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === 'create' ? 'Create New Task' : 'Edit Task'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
          placeholder="Enter task title (5-200 characters)"
          required
          helperText={`${title.length}/200 characters`}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (max 300 characters)"
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">{description.length}/300 characters</p>
        </div>

        <Input
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority <span className="text-red-500">*</span>
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          >
            <option value="LOW">{PRIORITY_LABELS.LOW}</option>
            <option value="MEDIUM">{PRIORITY_LABELS.MEDIUM}</option>
            <option value="HIGH">{PRIORITY_LABELS.HIGH}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          >
            <option value="TODO">{STATUS_LABELS.TODO}</option>
            <option value="IN_PROGRESS">{STATUS_LABELS.IN_PROGRESS}</option>
            <option value="COMPLETED">{STATUS_LABELS.COMPLETED}</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {mode === 'create' ? 'Create Task' : 'Update Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
