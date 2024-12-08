<template>
    <div>
      <h2>My To-Do List</h2>
      <form @submit.prevent="addTodo">
        <input v-model="newTodo" placeholder="New Todo" required />
        <button type="submit">Add Todo</button>
      </form>
  
      <ul>
        <li v-for="todo in todoStore.todos" :key="todo.id">
          <span>{{ todo.title }}</span>
          <button @click="editTodo(todo)">Edit</button>
          <button @click="deleteTodo(todo.id)">Delete</button>
        </li>
      </ul>
  
      <!-- Edit Todo Modal -->
      <div v-if="isEditing" class="modal">
        <div class="modal-content">
          <h3>Edit Todo</h3>
          <input v-model="todoToEdit.title" placeholder="Edit Todo" required />
          <button @click="saveTodo">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useTodoStore } from '../stores/todo';
  
  export default {
    setup() {
      const todoStore = useTodoStore();
      const newTodo = ref('');
      const isEditing = ref(false);
      const todoToEdit = ref(null);
  
      // Fetch todos on component mount
      onMounted(() => {
        todoStore.fetchTodos();
      });
  
      // Add new todo
      const addTodo = () => {
        if (newTodo.value.trim()) {
          todoStore.addTodo({ title: newTodo.value });
          newTodo.value = '';
        }
      };
  
      // Start editing a todo
      const editTodo = (todo) => {
        isEditing.value = true;
        todoToEdit.value = { ...todo };
      };
  
      // Save edited todo
      const saveTodo = () => {
        todoStore.updateTodo(todoToEdit.value.id, { title: todoToEdit.value.title });
        cancelEdit();
      };
  
      // Cancel editing
      const cancelEdit = () => {
        isEditing.value = false;
        todoToEdit.value = null;
      };
  
      // Delete todo
      const deleteTodo = (id) => {
        todoStore.deleteTodo(id);
      };
  
      return {
        todoStore,
        newTodo,
        addTodo,
        editTodo,
        saveTodo,
        cancelEdit,
        deleteTodo,
        isEditing,
        todoToEdit,
      };
    },
  };
  </script>
  
  <style>
  /* Basic styling for the Todo list */
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  
  button {
    margin-left: 10px;
  }
  
  /* Modal styling */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
  }
  </style>
  