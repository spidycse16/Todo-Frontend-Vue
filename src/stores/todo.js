import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth'; 

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
  }),
  actions: {

    setAuthorizationHeader() {
      const authStore = useAuthStore();
      if (authStore.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
      } else {
    
        delete axios.defaults.headers.common['Authorization'];
      }
    },


    async fetchTodos() {
      this.setAuthorizationHeader(); 

      try {
        const response = await axios.get('/todos');
        this.todos = response.data;
      } catch (error) {
        console.error('Error fetching todos:', error.response?.data || error);
      }
    },


    async addTodo(todo) {
      this.setAuthorizationHeader();  

      try {
        const response = await axios.post('/todos', { ...todo, status: 'pending' });
        this.todos.push(response.data);
      } catch (error) {
        console.error('Error adding todo:', error.response?.data || error);
      }
    },


    async updateTodo(id, updatedTodo) {
      this.setAuthorizationHeader(); 

      try {
        await axios.put(`/todos/${id}`, updatedTodo);
        const index = this.todos.findIndex((todo) => todo.id === id);
        if (index !== -1) this.todos[index] = { ...this.todos[index], ...updatedTodo };
      } catch (error) {
        console.error('Error updating todo:', error.response?.data || error);
      }
    },

  
    async deleteTodo(id) {
      this.setAuthorizationHeader(); 

      try {
        await axios.delete(`/todos/${id}`);
        this.todos = this.todos.filter((todo) => todo.id !== id);
      } catch (error) {
        console.error('Error deleting todo:', error.response?.data || error);
      }
    },
  },
});
