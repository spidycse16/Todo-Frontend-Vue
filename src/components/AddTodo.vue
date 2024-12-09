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
  

      const addTodo = () => {
        if (newTodo.value.title.trim() && newTodo.value.description.trim()) {
          todoStore.addTodo({
            title: newTodo.value.title,
            description: newTodo.value.description,
          });
          router.push('/todo'); 
        }
      };
  
      const cancelAdd = () => {
        router.push('/todo'); 
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
    margin: 50px auto;
    background-color: #f9f9f9;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  

  div {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    box-sizing: border-box;
  }
  
  input:focus,
  textarea:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
  }
  
  /* Style for buttons */
  button {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    background-color:darkgreen;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button[type="button"] {
    background-color:red; 
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  button[type="button"]:hover {
    background-color: #5a6268; 
  }
  

  h2 {
    text-align: center;
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    form {
      padding: 15px;
    }
  
    button {
      font-size: 12px;
      padding: 8px 16px;
    }
  }
  </style>
  