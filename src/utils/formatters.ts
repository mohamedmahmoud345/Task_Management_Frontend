import { format, formatDistanceToNow, isPast, isToday, differenceInDays } from 'date-fns';

export const formatDate = (date: string | null): string => {
  if (!date) return 'No due date';
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatDateTime = (date: string): string => {
  return format(new Date(date), 'MMM dd, yyyy HH:mm');
};

export const formatRelativeTime = (date: string): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const isOverdue = (dueDate: string | null): boolean => {
  if (!dueDate) return false;
  return isPast(new Date(dueDate)) && !isToday(new Date(dueDate));
};

export const isDueToday = (dueDate: string | null): boolean => {
  if (!dueDate) return false;
  return isToday(new Date(dueDate));
};

export const isDueSoon = (dueDate: string | null): boolean => {
  if (!dueDate) return false;
  const daysUntilDue = differenceInDays(new Date(dueDate), new Date());
  return daysUntilDue > 0 && daysUntilDue <= 3;
};

export const getDueDateBadgeColor = (dueDate: string | null): string => {
  if (!dueDate) return 'bg-gray-100 text-gray-800';
  if (isOverdue(dueDate)) return 'bg-red-100 text-red-800';
  if (isDueToday(dueDate)) return 'bg-orange-100 text-orange-800';
  if (isDueSoon(dueDate)) return 'bg-yellow-100 text-yellow-800';
  return 'bg-gray-100 text-gray-800';
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getInitials = (name: string): string => {
  const words = name.trim().split(' ');
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};
