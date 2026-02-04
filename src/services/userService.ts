import api from './api';

export const userService = {
  // Upload profile photo
  uploadProfilePhoto: async (file: File): Promise<{ url: string; message: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/api/User/upload-photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get profile photo URL
  getProfilePhoto: async (): Promise<string> => {
    const response = await api.get<string>('/api/User/profile-photo');
    return response.data;
  },
};
