import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authUser: null,
        authToken: null,
        invalid: false,
    }),

    getters: {
        user: (state) => state.authUser,
        token: (state) => state.authToken,
        isInvalid: (state) => state.invalid,
    },

    actions: {
        async login(username, password) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/auth/token/login', {
                    username: username,
                    password: password,
                });
                console.log(response)
                if (response.status === 200){
                    this.invalid = false;

                    this.authUser = username,
                    this.authToken = response.data.auth_token;
                    return true;
                } else {
                    this.invalid = true;
                    return false;
                }
            } catch (error) {
                console.error('Login failed: ', error);
                this.invalid = true;
                return false
            }
        }
    }
})