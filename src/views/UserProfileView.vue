<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import ProfileInfo from '../components/users/ProfileInfo.vue';
import NavBar from '../components/NavBar.vue';
import RightPanel from '../components/RightPanel.vue';

if (typeof document.hidden !== "undefined") {
    // Add an event listener to the visibilitychange event
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            // Tab has become visible, so refresh the page
            location.reload();
        }
    });
}
</script>

<template>
    <Header />

    <main>
        <NavBar />
        <ProfileInfo :username="$route.params.username" />
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