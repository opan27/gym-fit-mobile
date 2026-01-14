import { api } from './api';

export const meService = {
  getMe: () => api.get('/me'),
  updateProfile: (data: any) => api.put('/me/profile', data),
};
