<script setup>
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const user = authStore.user;
console.log( "authenticated: "+ authStore.isAuthenticated)
console.log("user: " + user);
console.log("token: " + authStore.token);
console.log('invalid: ' + authStore.invalid);
</script>

<template>
  <main>
    <h1>Home</h1>
    <template v-if="authStore.isAuthenticated">
      <p>Welcome, {{ user }}!</p>
    </template>
    <template v-else>
      <p>Welcome to my social media in progress :)</p>
    </template>
  </main>
</template>
