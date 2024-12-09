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
  
      const fetchTodo = async () => {
        const todoId = route.params.id;
        const existingTodo = todoStore.todos.find((todo) => todo.id === parseInt(todoId));
        if (existingTodo) {
          todo.value = { ...existingTodo };
        } else {
          console.error('Todo not found');
          router.push('/todo'); 
        }
      };
  
      onMounted(fetchTodo);
  

      const updateTodo = async () => {
        if (todo.value.title.trim() && todo.value.description.trim()) {
          const todoId = route.params.id;
          await todoStore.updateTodo(todoId, todo.value);
          router.push('/todo');
        }
      };
  
  
      const cancelEdit = () => {
        router.push('/todo');
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

div {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}


h2 {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}


form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-size: 14px;
  font-weight: bold;
  color: #555;
}

input,
textarea {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: #007bff;
  outline: none;
}


button {
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

button[type='button'] {
  background-color: #6c757d;
}

button[type='button']:hover {
  background-color: #5a6268;
}


@media (max-width: 480px) {
  div {
    margin: 20px;
    padding: 15px;
  }

  h2 {
    font-size: 20px;
  }

  input,
  textarea {
    font-size: 12px;
    padding: 8px;
  }

  button {
    font-size: 14px;
    padding: 8px 12px;
  }
}
</style>
