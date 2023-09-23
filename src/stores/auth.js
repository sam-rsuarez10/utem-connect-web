import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authUser: null,
        authToken: null,
        invalid: false,
        authenticated: false,
        registerEmail: null, // for register use
    }),

    getters: {
        user: (state) => state.authUser,
        token: (state) => state.authToken,
        isInvalid: (state) => state.invalid,
        isAuthenticated: (state) => state.authenticated,
        email: (state) => state.registerEmail,
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

                if (response.status === 204) {
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
        },

        async register(userData) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/user-api/register', userData);
                console.log(response)
                if (response.status === 201) {
                    this.registerEmail = userData.email
                    return true;
                } else {
                    return false;
                }

            } catch (error) {
                console.error('Registration failed: ', error);
                return false;
            }
        },

        async verifyUser(otp) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/user-api/verify', {
                    email: this.email,
                    otp: otp,
                });

                if (response.status === 200){
                    this.registerEmail = null;
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Verification failed: ', error)
                return false;
            }
        }
    }
})