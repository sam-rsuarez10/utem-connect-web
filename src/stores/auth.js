import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authUser: null,
        authToken: null,
        invalid: false,
        authenticated: false,
    }),

    getters: {
        user: (state) => state.authUser,
        token: (state) => state.authToken,
        isInvalid: (state) => state.invalid,
        isAuthenticated: (state) => state.authenticated,
    },

    actions: {
        async login(username, password) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/auth/token/login', {
                    username: username,
                    password: password,
                });

                if (response.status === 200) {
                    this.invalid = false;
                    this.authenticated = true;
                    this.authUser = username,
                    this.authToken = response.data.auth_token;
                    console.log(this.authToken)
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
        },

        async logout() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/auth/token/logout', {}, {
                    headers: {
                        Authorization: `Token ${this.token}`,
                    },
                });

                if (response.status === 204){
                    this.authUser = null;
                    this.authToken = null;
                    this.invalid = false;
                    this.authenticated = false;
    
                    return true;
                }
                return false;
            } catch (error) {
                console.error('Logout failed: ', error);
                return false;
            }
        }
    }
})