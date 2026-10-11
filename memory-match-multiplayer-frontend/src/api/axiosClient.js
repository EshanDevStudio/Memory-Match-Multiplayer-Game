import axios from 'axios';


const BASE_URL = 'http://localhost:8080';

// Main client used by the whole app
export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});



// Turns an axios error into a message a person can act on.
export function getErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  if (!error.response) return 'Cannot reach the server. Check your connection and try again.';
  const data = error.response.data;
  if (typeof data === 'string' && data) return data;
  return data?.message || data?.error || fallback;
}
