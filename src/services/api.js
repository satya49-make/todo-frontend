// api.js
import dummyTodos from '../data/dummyTodos.json'
import dummyUsers from '../data/users.json'

// Base URL from environment
const API_BASE = import.meta.env.VITE_API_BASE;
console.log("All env vars:", import.meta.env);
console.log("API_BASE:", import.meta.env.VITE_API_BASE);

// Auth APIs
export const authAPI = {
  // Register a new user
  register: async (email, username, password, role = 'USER') => {
    try {
      console.log("API_BASE:", import.meta.env.VITE_API_BASE);
      console.log("url:", `${API_BASE}/auth/register`);
      console.log("Request body:", { email, username, role });
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, username, password, role })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw { response: { data: errorData } };
      }

      const token = await res.text(); // backend returns token as plain string
      return { data: { username, email, token } };
    } catch (err) {
      console.error("Register failed:", err);
      throw err;
    }
  },

  // Login existing user
  login: async (username, password) => {
    try {
      console.log("url:", `${API_BASE}/auth/login`);
      console.log("Request body:", { username, password });
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw { response: { data: errorData } };
      }

      const token = await res.text(); // backend returns token as plain string
      localStorage.setItem('authToken', token);
      console.log("Login successful, token stored in localStorage");
      console.log("Received token:", token);
      return { data: { username, token } };
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  }
};

export const taskAPI = {
  // Get all tasks for current user
  getTasks: async () => {
    try {
      console.log("Fetching tasks with authToken:", `Bearer ${localStorage.getItem('authToken')}`);
      const res = await fetch(`${API_BASE}/tasks`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      return { data };
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      return { data: [] };
    }
  },

  // Create a new task
  createTask: async (title, description = '') => {
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
      });
      const data = await res.json();
      return { data };
    } catch (err) {
      console.error("Failed to create task:", err);
      return { data: null };
    }
  },

  // Update a task
  updateTask: async (id, { title, description, status, progress }) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, status, progress })
      });
      const data = await res.json();
      return { data };
    } catch (err) {
      console.error("Failed to update task:", err);
      return { data: null };
    }
  },

  // Delete a task
  deleteTask: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      return { data: { success: res.ok } };
    } catch (err) {
      console.error("Failed to delete task:", err);
      return { data: { success: false } };
    }
  },
};

export default taskAPI;
