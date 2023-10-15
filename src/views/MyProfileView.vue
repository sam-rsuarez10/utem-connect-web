<script setup>
import { useAuthStore } from '../stores/auth';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import MyProfileInfo from '../components/users/MyProfileInfo.vue';
import NavBar from '../components/NavBar.vue';
import RightPanel from '../components/RightPanel.vue';
import { reactive } from 'vue';

const authStore = useAuthStore();
const user = authStore.user;

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
        <MyProfileInfo />
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