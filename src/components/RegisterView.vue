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
    <div>
      <h4>Already have an account?</h4>
      <RouterLink to="/login">Login</RouterLink>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router'; 

export default {
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const password_confirmation = ref('');
    const authStore = useAuthStore();
    const router = useRouter(); 

    const register = async () => {
      try {
        await authStore.register({
          name: name.value,
          email: email.value,
          password: password.value,
          password_confirmation: password_confirmation.value,
        });
        alert('Registration successful!');
        router.push({ name: 'login' });
      } catch (error) {
        alert('Registration failed. Please try again.');
        console.error(error);
      }
    };

    return { name, email, password, password_confirmation, register };
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

input {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color:darkgreen;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

@media (max-width: 480px) {
  div {
    margin: 20px;
    padding: 15px;
  }

  h2 {
    font-size: 20px;
  }

  input {
    font-size: 12px;
    padding: 8px;
  }

  button {
    font-size: 14px;
    padding: 8px 12px;
  }
}
</style>

