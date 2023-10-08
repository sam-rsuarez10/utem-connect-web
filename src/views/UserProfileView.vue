<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import ProfileInfo from '../components/users/ProfileInfo.vue';

</script>

<template>
    <div id="app">
        <Header />

        <main>
            <ProfileInfo :username="$route.params.username"/>
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