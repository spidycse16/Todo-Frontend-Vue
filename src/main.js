import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import axios from 'axios';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
axios.defaults.baseURL = 'http://localhost:8000/api'; 
app.mount("#app");
