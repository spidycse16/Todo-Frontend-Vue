<template>
  <div>
    <h2>My To-Do List</h2>

    <button class="logout-button" @click="logout">Logout</button>

    <button class="add-todo-button" @click="goToAddTodoPage">Add Todo</button>

    <ul>
      <li v-for="todo in todoStore.todos" :key="todo.id">
        <span :class="{ completed: todo.status === 'completed' }">{{ todo.title }}</span>
        <button @click="markAsDone(todo)">Done</button>
        <button @click="editTodo(todo)">Edit</button>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useTodoStore } from '../stores/todo';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const todoStore = useTodoStore();
    const authStore = useAuthStore();
    const router = useRouter();

    onMounted(() => {
      todoStore.fetchTodos();
    });

    const goToAddTodoPage = () => {
      router.push({ name: 'add-todo' });
    };

    const editTodo = (todo) => {
      router.push({ name: 'edit-todo', params: { id: todo.id } });
    };

    const deleteTodo = (id) => {
      todoStore.deleteTodo(id);
    };

    const markAsDone = (todo) => {
      const updatedTodo = { ...todo, status: 'completed' };
      todoStore.updateTodo(todo.id, updatedTodo);
    };

    const logout = () => {
      authStore.logout();
      router.push({ name: 'login' });
    };

    return {
      todoStore,
      goToAddTodoPage,
      editTodo,
      deleteTodo,
      markAsDone,
      logout,
    };
  },
};
</script>

<style scoped>

div {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  font-size: 28px;
  margin-bottom: 20px;
}

button {
  font-size: 14px;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:first-of-type {
  display: block;
  margin: 0 auto 20px;
  background-color: #007bff;
  color: #fff;
}

button:first-of-type:hover {
  background-color: #0056b3;
}


.add-todo-button {
  background-color: #20c997; 
  color: #fff;
  margin-bottom: 20px;
}

.add-todo-button:hover {
  background-color: #198754; 
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 10px;
  transition: box-shadow 0.3s ease;
}

li:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.completed {
  text-decoration: line-through;
  color: #999;
}

li button {
  font-size: 12px;
  padding: 6px 12px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 5px;
}

li button:hover {
  background-color: #5a6268;
}

li button:nth-child(2) {
  background-color: #28a745; 
}

li button:nth-child(2):hover {
  background-color: #218838;
}

li button:nth-child(3) {
  background-color: #dc3545;
}

li button:nth-child(3):hover {
  background-color: #c82333;
}

li button:nth-child(4) {
  background-color: #17a2b8; 
}

li button:nth-child(4):hover {
  background-color: #138496;
}

@media (max-width: 480px) {
  div {
    padding: 15px;
  }

  h2 {
    font-size: 22px;
  }

  button {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>
