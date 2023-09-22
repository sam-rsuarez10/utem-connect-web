<script setup>
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
</script>

<template>
    <header>
            <h1 id="header-title">UtemConnect</h1>
            <span id="#log-out" v-if="authStore.isAuthenticated">Log out</span>
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
    padding-right: 2rem;
}
</style>