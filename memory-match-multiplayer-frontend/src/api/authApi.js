import { api } from './axiosClient.js';

// paths of Spring Boot controllers.
export const authApi = {
  register: (username, password) => api.post('/api/auth/register', { username, password })
};

