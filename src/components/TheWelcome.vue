<script setup>
import WelcomeItem from './WelcomeItem.vue';
</script>

<template>
  <div class="welcome-page">
    <header>
      <h1>Welcome to My To-Do App</h1>
      <p>Stay organized and keep track of your tasks easily!</p>
    </header>

    <main>
      <WelcomeItem>
        <h2>Features</h2>
        <ul>
          <li>Easy Task Management</li>
          <li>Simple and Intuitive UI</li>
          <li>Track Your Progress</li>
        </ul>
      </WelcomeItem>
      <div class="auth-links">
        <RouterLink to="/register" class="auth-link register-link">Register</RouterLink>
        <RouterLink to="/login" class="auth-link login-link">Login</RouterLink>
      </div>
    </main>
  </div>
</template>

<style scoped>

.welcome-page {
  font-family: Arial, sans-serif;
  text-align: center;
  background: darkgrey;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}


header h1 {
  font-size: 3rem;
  margin-bottom: 10px;
}

header p {
  font-size: 1.5rem;
  margin-bottom: 20px;
}


main {
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

main h2 {
  font-size: 2rem;
  margin-bottom: 10px;
}

main ul {
  list-style: none;
  padding: 0;
}

main ul li {
  font-size: 1.2rem;
  margin: 10px 0;
}

/* Auth Links Section */
.auth-links {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.auth-link {
  font-size: 1.2rem;
  padding: 10px 20px;
  text-decoration: none;
  border: 2px solid white;
  border-radius: 25px;
  color: white;
  transition: all 0.3s ease-in-out;
}

.auth-link:hover {
  background-color: white;
  color: darkgrey;
  transform: scale(1.1);
}

.register-link {
  background-color: #6a11cb;
  border-color: #6a11cb;
}

.register-link:hover {
  background-color: white;
  color: #6a11cb;
}

.login-link {
  background-color: #2575fc; 
  border-color: #2575fc;
}

.login-link:hover {
  background-color: white;
  color: #2575fc;
}
</style>
