// In your Pinia store (todo.js)
import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth'; // Import the auth store

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
  }),
  actions: {
    // Function to set Authorization header with token
    setAuthorizationHeader() {
      const authStore = useAuthStore();
      if (authStore.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
      } else {
        // Handle case if token is not available
        delete axios.defaults.headers.common['Authorization'];
      }
    },

    // Fetch todos with authorization
    async fetchTodos() {
      this.setAuthorizationHeader();  // Ensure the token is set in the header

      try {
        const response = await axios.get('/todos');
        this.todos = response.data;
      } catch (error) {
        console.error('Error fetching todos:', error.response?.data || error);
      }
    },

    // Add a new todo with authorization
    async addTodo(todo) {
      this.setAuthorizationHeader();  // Ensure the token is set in the header

      try {
        const response = await axios.post('/todos', { ...todo, status: 'pending' });
        this.todos.push(response.data);
      } catch (error) {
        console.error('Error adding todo:', error.response?.data || error);
      }
    },

    // Update a todo with authorization
    async updateTodo(id, updatedTodo) {
      this.setAuthorizationHeader();  // Ensure the token is set in the header

      try {
        await axios.put(`/todos/${id}`, updatedTodo);
        const index = this.todos.findIndex((todo) => todo.id === id);
        if (index !== -1) this.todos[index] = { ...this.todos[index], ...updatedTodo };
      } catch (error) {
        console.error('Error updating todo:', error.response?.data || error);
      }
    },

    // Delete a todo with authorization
    async deleteTodo(id) {
      this.setAuthorizationHeader();  // Ensure the token is set in the header

      try {
        await axios.delete(`/todos/${id}`);
        this.todos = this.todos.filter((todo) => todo.id !== id);
      } catch (error) {
        console.error('Error deleting todo:', error.response?.data || error);
      }
    },
  },
});
