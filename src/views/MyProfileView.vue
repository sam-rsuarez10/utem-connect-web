<script setup>
import { useAuthStore } from '../stores/auth';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import MyProfileInfo from '../components/users/MyProfileInfo.vue';
import NavBar from '../components/NavBar.vue';
import RightPanel from '../components/RightPanel.vue';

const authStore = useAuthStore();
const user = authStore.user;
</script>

<template>
    <Header />

    <main>
        <NavBar />
        <MyProfileInfo />
        <RightPanel />
    </main>

    <Footer />
</template>

<style scoped>

main {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>