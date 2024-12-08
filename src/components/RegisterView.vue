<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="name" placeholder="Name" type="text" required />
      <input v-model="email" placeholder="Email" type="email" required />
      <input v-model="password" placeholder="Password" type="password" required />
      <input v-model="password_confirmation" placeholder="Confirm Password" type="password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router'; // Import useRouter

export default {
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const password_confirmation = ref('');
    const authStore = useAuthStore();
    const router = useRouter(); // Initialize router

    const register = async () => {
      try {
        // Make sure to call your store's register function
        await authStore.register({
          name: name.value,
          email: email.value,
          password: password.value,
          password_confirmation: password_confirmation.value,
        });
        alert('Registration successful!');
        router.push({ name: 'login' }); // Redirect to login page after successful registration
      } catch (error) {
        alert('Registration failed. Please try again.');
        console.error(error);
      }
    };

    return { name, email, password, password_confirmation, register };
  },
};
</script>
