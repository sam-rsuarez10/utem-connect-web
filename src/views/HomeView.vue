<script setup>
import { useAuthStore } from '../stores/auth';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import NavBar from '../components/NavBar.vue';

const authStore = useAuthStore();
const user = authStore.user;
</script>

<template>
  <div id="app">
    <Header />
    <main>
      <NavBar />
      <div class="container">
        <h1>Home</h1>
        <div v-if="authStore.isAuthenticated">
          <p>Welcome, {{ user }}!</p>
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

main {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>