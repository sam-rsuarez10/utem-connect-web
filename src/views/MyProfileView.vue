<script setup>
import { useAuthStore } from '../stores/auth';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

const authStore = useAuthStore();
const user = authStore.user;
</script>

<template>
    <div id="app">
        <Header />

        <main>
            <h2>my profile info</h2>
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

main {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>