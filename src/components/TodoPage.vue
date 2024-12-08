<template>
  <div>
    <h2>My To-Do List</h2>

    <!-- Add Todo Button -->
    <button @click="goToAddTodoPage">Add Todo</button>

    <ul>
      <li v-for="todo in todoStore.todos" :key="todo.id">
        <span :class="{ completed: todo.status === 'completed' }">{{ todo.title }}</span>
        <button @click="editTodo(todo)">Edit</button>
        <button @click="deleteTodo(todo.id)">Delete</button>
        <button @click="markAsDone(todo)">Done</button> <!-- "Done" button -->
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useTodoStore } from '../stores/todo';
import { useRouter } from 'vue-router'; // Import useRouter for navigation

export default {
  setup() {
    const todoStore = useTodoStore();
    const router = useRouter();

    // Fetch todos on component mount
    onMounted(() => {
      todoStore.fetchTodos();
    });

    // Navigate to AddTodo page
    const goToAddTodoPage = () => {
      router.push({ name: 'add-todo' }); // Ensure 'add-todo' is the route name
    };

    // Start editing a todo
    const editTodo = (todo) => {
      router.push({ name: 'edit-todo', params: { id: todo.id } });
    };

    // Delete todo
    const deleteTodo = (id) => {
      todoStore.deleteTodo(id);
    };

    // Mark todo as complete (Done)
    const markAsDone = (todo) => {
      const updatedTodo = { ...todo, status: 'completed' }; // Update the status to 'completed'
      todoStore.updateTodo(todo.id, updatedTodo); // Call the store method to update the todo
    };

    return {
      todoStore,
      goToAddTodoPage,
      editTodo,
      deleteTodo,
      markAsDone,
    };
  },
};
</script>

<style scoped>
/* Styling remains unchanged */
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

.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
