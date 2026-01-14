import { api } from './api';

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = { email: string; password: string; name: string };
export type VerifyOtpPayload = { email: string; otp: string };

export const authService = {
  login: (data: LoginPayload) => api.post('/auth/login', data),
  register: (data: RegisterPayload) => api.post('/auth/register', data),
  verifyOtp: (data: VerifyOtpPayload) => api.post('/auth/verify-otp', data),
};
