<template>
    <div>
      <h2>Add New Todo</h2>
      <form @submit.prevent="addTodo">
        <div>
          <label for="title">Title:</label>
          <input v-model="newTodo.title" id="title" type="text" required />
        </div>
  
        <div>
          <label for="description">Description:</label>
          <textarea v-model="newTodo.description" id="description" required></textarea>
        </div>
  
        <button type="submit">Add Todo</button>
        <button type="button" @click="cancelAdd">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useTodoStore } from '../stores/todo';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const todoStore = useTodoStore();
      const router = useRouter();
      const newTodo = ref({
        title: '',
        description: '',
      });
  
      // Add new todo to store
      const addTodo = () => {
        if (newTodo.value.title.trim() && newTodo.value.description.trim()) {
          todoStore.addTodo({
            title: newTodo.value.title,
            description: newTodo.value.description,
          });
          router.push('/todo'); // Redirect to Todo list after adding
        }
      };
  
      // Cancel adding and navigate back to Todo list
      const cancelAdd = () => {
        router.push('/'); // Redirect to Todo list
      };
  
      return {
        newTodo,
        addTodo,
        cancelAdd,
      };
    },
  };
  </script>
  
  <style scoped>
  form {
    max-width: 400px;
    margin: 0 auto;
  }
  
  div {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
  }
  
  button {
    margin-top: 10px;
  }
  </style>
  