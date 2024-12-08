import { defineStore } from "pinia";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        token: localStorage.getItem("auth_token") || null,
    }),
    actions: {
        async login(credentials) {
            try {
                const response = await axios.post(`${API_BASE_URL}/login`, credentials);
                this.token = response.data.token;
                this.user = response.data.user;
                localStorage.setItem("auth_token", this.token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
            } catch (error) {
                throw new Error(error.response.data.message || "Login failed");
            }
        },
        async register(data) {
            try {
                const response = await axios.post(`${API_BASE_URL}/register`, data);
                this.token = response.data.token;
                this.user = response.data.user;
                localStorage.setItem("auth_token", this.token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
            } catch (error) {
                throw new Error(error.response.data.message || "Registration failed");
            }
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem("auth_token");
            delete axios.defaults.headers.common["Authorization"];
        },
    },
});
