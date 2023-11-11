<script setup>
import { reactive } from 'vue';

const emit = defineEmits();

const viewProps =  defineProps({
    isSearchView: Boolean,
});

const navOption = reactive ({
    title: '',
    flag: '',
});

const showConnectPanel = () => {
    navOption.title = 'Solicitudes de Conexión';
    navOption.flag = 'connect';
    emit('show-right-panel', navOption.title, navOption.flag);
};

const showChatPanel = () => {
    navOption.title = 'Chats';
    navOption.flag = 'chat';
    emit('show-right-panel', navOption.title, navOption.flag);
};

const showSearchPanel = () => {
    if (viewProps.isSearchView) {
        navOption.title = 'Filtros de búsqueda';
        navOption.flag = 'filters';
    } else {
        navOption.title = 'Búsqueda';
        navOption.flag = 'search';
    }
    emit('show-right-panel', navOption.title, navOption.flag);
};
</script>

<template>
    <nav class="vertical-navbar">
        <ul>
            <li class="nav-item">
                <button class="nav-button" @click="showChatPanel">Chats</button>
            </li>

            <li class="nav-item">
                <button class="nav-button" @click="showConnectPanel">Connect</button>
            </li>

            <li class="nav-item">
                <button class="nav-button" @click="showSearchPanel">{{ isSearchView ? 'Filtros' : 'Buscar' }}</button>
            </li>

        </ul>
    </nav>
</template>

<style scoped>
.vertical-navbar {
    position: fixed;
    top: calc((100vh - 15rem) / 2);
    left: 0;
    height: 15rem;
    width: 10rem;
    background-color: #4B8C8F;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5%;
}

/* Style the navigation links */
.vertical-navbar ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 2rem;
}

.vertical-navbar li {
    margin: 0;
    padding: 0;
}

.nav-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 9.5rem;

    height: 3rem;
}

.nav-button:hover {
    background-color: #1C7E1C;
    transition: 500ms;
    font-size: 1.2rem;
}

.nav-button {
    background-color: #62BD62;
    width: 9.5rem;
    height: 3rem;
    border-radius: 15%;
    color: white;
    border: none;
}
</style>