<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import NavBar from '../components/NavBar.vue';
import RightPanel from '../components/RightPanel.vue';
import Chat from '../components/chat/Chat.vue';
import { reactive } from 'vue';


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
        <NavBar @show-right-panel="showRightPanel" :is-search-view="false"/>

        <Chat :chat-id="$route.params.chatId"/>

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