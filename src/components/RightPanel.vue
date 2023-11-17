<script setup>
import ConnectRequestItem from './connect/ConnectRequestItem.vue';
import ChatItem from './chat/ChatItem.vue';
import { ref, onMounted, watch, nextTick } from 'vue';
import { useAuthStore } from '../stores/auth';
import { fetchPendingRequests } from '../utils/fetchPendingRequests';
import { fetchUserChats } from '../utils/fetchUserChats';
import RightPanelSearchItem from './search/RightPanelSearchItem.vue';
import { useRouter } from 'vue-router';
import FilterItem from './search/FilterItem.vue';

const router = useRouter();

const authStore = useAuthStore();

const pendingRequests = ref([]);
const chats = ref([]);
const searchInputRef = ref();

const emit = defineEmits();

const panelProps = defineProps({
    title: String,
    flag: String,
})

const emitHidePanel = () => emit('hide-panel');

const fetchConnectRequests = async () => {
    const response = await fetchPendingRequests(true, authStore.token);
    pendingRequests.value = response.data.pending_requests;
};

const fetchChats = async () => {
    const response = await fetchUserChats(true, authStore.token);
    chats.value = response.data.user_chats;
}

const fetchPanelInfo = async () => {
    try {
        if (panelProps.flag == 'connect') {
            // fetch pending requests
            await fetchConnectRequests();
        } else if (panelProps.flag == 'chat') {
            await fetchChats();
        } else if (panelProps.flag == 'search') {
            await nextTick();
            searchInputRef.value.focus();
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};

onMounted(() => fetchPanelInfo());

watch(() => panelProps.flag, async (newFlag, oldFlag) => {
    if (newFlag !== oldFlag) {
        await fetchPanelInfo();
    }
});

const deleteRequest = (requestId) => {
    pendingRequests.value = pendingRequests.value.filter(request => request.id !== requestId);
}

</script>

<template>
    <div class="right-panel">
        <button id="hide-button" @click="emitHidePanel">Ocultar</button>
        <div id="panel-title">
            <h3>{{ panelProps.title }}</h3>
        </div>

        <div class="input-group mb-3 search-input" v-if="panelProps.flag === 'search'">
            <input type="text" class="form-control" placeholder="escribe un nombre o correo utem"
                aria-label="Recipient's username" aria-describedby="button-addon2" ref="searchInputRef">
            <button class="btn btn-primary" type="button" id="quick-search-button">buscar</button>
        </div>

        <div class="panel-content">

            <ConnectRequestItem v-for="request in pendingRequests" :key="request.id" :request="request"
                @delete-request-item="deleteRequest" v-if="panelProps.flag == 'connect'" />

            <ChatItem v-for="chat in chats" :key="chat.id" :chat="chat" v-if="panelProps.flag == 'chat'" />

            <RightPanelSearchItem v-if="panelProps.flag === 'search'" />

            <FilterItem :filter-name="'carrera'" v-if="panelProps.flag === 'filters'" />
            <FilterItem :filter-name="'descripciones clave'" v-if="panelProps.flag === 'filters'" />
        </div>

        <button v-if="panelProps.flag === 'search'" @click="router.push('/search');" class="search-button">búsqueda
            avanzada</button>

    </div>
</template>

<style scoped>
.right-panel {
    position: fixed;
    top: 5rem;
    right: 0;
    bottom: 5rem;
    width: 25rem;
    background-color: #4B8C8F;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#panel-title {
    padding: 1.5rem;
}

.panel-content {
    width: 100%;
    height: 90%;
    overflow-y: auto;

    /* Hide scrollbar by default */
    &::-webkit-scrollbar {
        width: 0;
    }

    /* Handle on hover */
    &:hover::-webkit-scrollbar {
        width: 0.5rem;
    }

    /* Customize scrollbar track */
    &::-webkit-scrollbar-track {
        background: #155C5F;
    }

    /* Customize scrollbar thumb */
    &::-webkit-scrollbar-thumb {
        background: #82B7B7;
    }
}

#hide-button {
    border: none;
    background-color: #62BD62;
    align-self: flex-start;
    width: 5rem;
    border-radius: 5%;
    color: white;
}

#hide-button:hover {
    background-color: #1C7E1C;
    transition: 500ms;
}

.search-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
}

.search-input,
.filter-input {
    width: 90%;
}

.search-button {
    margin-top: 1rem;
    margin-bottom: 2rem;
    border: none;
    width: 30%;
    border-radius: 5%;
    background-color: #003D3D;
    color: white;
    font-size: 0.95rem;
    transition: transform 900ms ease;
}

.search-button:hover {
    font-size: 1.1rem;
    transform: scale(1.1);
}
</style>
