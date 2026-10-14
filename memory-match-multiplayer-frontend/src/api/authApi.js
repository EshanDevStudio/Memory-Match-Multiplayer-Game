import { api } from './axiosClient.js';

// paths of Spring Boot controllers.
export const authApi = {
  register: (username, password) => api.post('/api/auth/register', { username, password }),
  login: (username, password) => api.post('/api/auth/login', { username, password }),
};

export const secureApi = {
  //any endpoint that requires a valid JWT
  hello: () => api.get('/api/secure/hello'),
};