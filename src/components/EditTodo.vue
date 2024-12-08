<template>
    <div>
      <h2>Edit Todo</h2>
      <form @submit.prevent="updateTodo">
        <div>
          <label for="title">Title:</label>
          <input 
            v-model="todo.title" 
            id="title" 
            type="text" 
            required 
          />
        </div>
  
        <div>
          <label for="description">Description:</label>
          <textarea 
            v-model="todo.description" 
            id="description" 
            required
          ></textarea>
        </div>
  
        <button type="submit">Save Changes</button>
        <button type="button" @click="cancelEdit">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useTodoStore } from '../stores/todo';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    setup() {
      const todoStore = useTodoStore();
      const router = useRouter();
      const route = useRoute();
      const todo = ref({
        title: '',
        description: '',
      });
  
      // Fetch the specific todo based on the ID from the URL params
      const fetchTodo = async () => {
        const todoId = route.params.id;
        const existingTodo = todoStore.todos.find((todo) => todo.id === parseInt(todoId));
        if (existingTodo) {
          todo.value = { ...existingTodo };
        } else {
          console.error('Todo not found');
          router.push('/'); // Redirect to home if todo is not found
        }
      };
  
      // Call fetchTodo when the component is mounted
      onMounted(fetchTodo);
  
      // Update the todo item
      const updateTodo = async () => {
        if (todo.value.title.trim() && todo.value.description.trim()) {
          const todoId = route.params.id;
          await todoStore.updateTodo(todoId, todo.value);
          router.push('/todo'); // Redirect to the todo list after update
        }
      };
  
      // Cancel editing and navigate back to Todo list
      const cancelEdit = () => {
        router.push('/todo'); // Redirect to the todo list
      };
  
      return {
        todo,
        updateTodo,
        cancelEdit,
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
  