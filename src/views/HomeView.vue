<script setup>
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const user = authStore.user;
</script>

<template>
  <main>
    <h1>Home</h1>
    <template v-if="user">
      <p>Welcome, {{ user }}!</p>
    </template>
    <template v-else>
      <p>Welcome to my social media in progress :)</p>
    </template>
  </main>
</template>
