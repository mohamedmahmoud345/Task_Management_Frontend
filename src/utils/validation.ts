export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const getPasswordStrength = (password: string): {
  strength: 'weak' | 'medium' | 'strong';
  label: string;
  color: string;
} => {
  if (password.length < 8) {
    return { strength: 'weak', label: 'Weak', color: 'bg-red-500' };
  }
  
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  if (strength <= 2) {
    return { strength: 'weak', label: 'Weak', color: 'bg-red-500' };
  } else if (strength <= 4) {
    return { strength: 'medium', label: 'Medium', color: 'bg-yellow-500' };
  } else {
    return { strength: 'strong', label: 'Strong', color: 'bg-green-500' };
  }
};

export const validateTaskTitle = (title: string): string | null => {
  if (!title.trim()) {
    return 'Title is required';
  }
  if (title.length < 5) {
    return 'Title must be at least 5 characters';
  }
  if (title.length > 200) {
    return 'Title must not exceed 200 characters';
  }
  return null;
};

export const validateTaskDescription = (description: string): string | null => {
  if (description.length > 300) {
    return 'Description must not exceed 300 characters';
  }
  return null;
};
