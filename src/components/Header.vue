<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
    const logoutSuccess = await authStore.logout();

    if (logoutSuccess) {
        router.push('/');
    }
};
</script>

<template>
    <header>
        <h1 id="header-title">UtemConnect</h1>
        <span id="log-out" v-if="authStore.isAuthenticated">
            <button @click="logout">Log out</button>
        </span>
    </header>
</template>

<style scoped>
header {
    display: flex;
    background-color: #0F7D70;
    height: 5rem;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    color: white;
}

#header-title {
    padding-left: 2rem;
}

#log-out {
    padding-right: 5rem;
}

#log-out button {
    background-color: #0F7D70;
    border: none;
    color: white;
}

#log-out button:hover {
    background-color: red;
}
</style>