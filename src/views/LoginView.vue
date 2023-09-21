<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import Footer from '../components/Footer.vue';

const userState = reactive({
    username: '',
    password: '',
    invalid: false,
});

const login = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/auth/token/login', {
            username: userState.username,
            password: userState.password,
        });

        if (response.status === 200) {
            // Assuming the response contains a token
            const token = response.data.auth_token;

            // Store the token in a secure way (e.g., Vuex store, localStorage, or cookies)
            // Here, we'll use localStorage for simplicity
            //localStorage.setItem('token', token);
            console.log('User: ' + userState.username);
            console.log('Logged in with token: ' + token);
            // Redirect the user to the home view for logged-in users
            // You can use Vue Router for navigation
            // For example: router.push('/home');
        }
    } catch (error) {
        console.error('Login failed:', error);
        userState.invalid = true;
    }
}
</script>

<template>
    <div id="app">
        <header>
            <h1 id="header-title">UtemConnect</h1>
        </header>

        <main>
            <div class="container">
                <div class="login-container">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" placeholder="Username"
                            v-model="userState.username">
                        <label for="floatingInput">Username</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                            v-model="userState.password">
                        <label for="floatingPassword">Password</label>
                    </div>
                    <button id="login-button"  @click="login">Login</button>
                </div>
            </div>
        </main>

        <Footer />
    </div>
</template>

<style scoped>
#app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

header {
    display: flex;

    #app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    background-color: #0F7D70;
    height: 5rem;
    width: 100%;
    align-items: center;
    color: white;
}

#header-title {
    padding-left: 2rem;
}

main {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background-color: #88C5E8;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5rem;
    width: 30rem;
    height: 20rem;
    border-radius: 5%;
}

.login-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

#login-button {
    background-color: #26D76D;
    width: 10rem;
    height: 3.5rem;
    border-radius: 5%;
}
</style>