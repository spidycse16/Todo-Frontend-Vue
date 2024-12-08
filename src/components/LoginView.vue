<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" placeholder="Email" type="email" required />
      <input v-model="password" placeholder="Password" type="password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router'; // Import useRouter

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const authStore = useAuthStore();
    const router = useRouter(); 

    const login = async () => {
      try {
        await authStore.login({ email: email.value, password: password.value });
        alert('Login successful');
        router.push({ name: 'todo' }); // Use router.push to navigate
      } catch (error) {
        alert('Login failed. Please check your credentials.');
        console.error(error);
      }
    };

    return { email, password, login };
  },
};
</script>
