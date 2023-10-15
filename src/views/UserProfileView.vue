<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import ProfileInfo from '../components/users/ProfileInfo.vue';
import NavBar from '../components/NavBar.vue';
import RightPanel from '../components/RightPanel.vue';
import { reactive } from 'vue';

if (typeof document.hidden !== "undefined") {
    // Add an event listener to the visibilitychange event
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            // Tab has become visible, so refresh the page
            location.reload();
        }
    });
}

const rightPanelOptions = reactive({
    title: '',
    flag: '',
    isVisible: false,
});

const showRightPanel = (title, flag) => {
    rightPanelOptions.title = title;
    rightPanelOptions.flag = flag;
    rightPanelOptions.isVisible = true;
};

const hidePanel = () => {
    rightPanelOptions.isVisible = false;
}
</script>

<template>
    <Header />

    <main>
        <NavBar @show-right-panel="showRightPanel" />
        <ProfileInfo :username="$route.params.username" />
        <RightPanel v-if="rightPanelOptions.isVisible" :title="rightPanelOptions.title" :flag="rightPanelOptions.flag"
            @hide-panel="hidePanel" />
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