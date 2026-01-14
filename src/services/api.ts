import axios from 'axios';

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const api = axios.create({
  baseURL: 'http://10.101.15.47:4000/api', // ganti sesuai backend
  timeout: 10000,
});

// interceptor untuk tambah Authorization header
api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});
