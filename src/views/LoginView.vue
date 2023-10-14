<script setup>
import { reactive, ref, onMounted } from 'vue';
import Footer from '../components/Footer.vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';


const authStore = useAuthStore();

const router = useRouter();

const userState = reactive({
    username: '',
    password: '',
    invalid: false,
    errorMsg: '',
});

const usernameInput = ref(null);

const login = async () => {
    if (userState.username == '' || userState.password == '') {
        userState.invalid = true;
        userState.errorMsg = 'campos username y password son requeridos para login'
        return;
    }
    const loginSuccess = await authStore.login(userState.username, userState.password);
    if (loginSuccess) {
        userState.invalid = false;
        userState.errorMsg = '';
        router.push('/home');
    } else {
        userState.invalid = true;
        userState.errorMsg = 'credenciales incorrectas';
    }
}

onMounted(() => {
    usernameInput.value.focus();
});
</script>

<template>
    <header>
        <h1 id="header-title">UtemConnect</h1>
    </header>

    <main>
        <div class="container">
            <div class="login-container">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Username"
                        v-model="userState.username" required @keydown.enter="login" ref="usernameInput">
                    <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                        v-model="userState.password" required @keydown.enter="login">
                    <label for="floatingPassword">Password</label>
                </div>
                <span class="text-danger" v-if="userState.invalid">{{ userState.errorMsg }}</span>
                <button id="login-button" @click="login">Login</button>
            </div>
        </div>
    </main>

    <Footer />
</template>

<style scoped>
header {
    display: flex;
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
    height: 25rem;
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
    align-self: center;
}
</style>