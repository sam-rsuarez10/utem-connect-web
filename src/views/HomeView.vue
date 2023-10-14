<script setup>
import { useAuthStore } from '../stores/auth';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import NavBar from '../components/NavBar.vue';
import RightPanel from '../components/RightPanel.vue';

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
      <div class="welcome-container">
        <i class='bx bxs-smile bx-lg' style='color:#62bd62'  ></i>
        <p class="welcome">
          ¡Hola {{ user }}! Conéctate, busca amigos, 
          envía solicitudes, chatea en privado y comparte tus pensamientos 
          e ideas en un espacio diseñado 
          para la comunidad universitaria de la UTEM.
        </p>
      </div>
      <!-- <RightPanel /> -->
    </main>
    <Footer />
  </div>
</template>

<style scoped>


main {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Style for the welcome div */
.welcome-container {
  position: absolute;
  left: 0;
  bottom: 5rem;
  width: 17rem;
  background-color: #4B8C8F;
  padding: 0.75rem;
  border-radius: 5%;
}

.welcome {
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.85rem;
  color: white;
}

</style>