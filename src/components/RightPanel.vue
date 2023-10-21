<script setup>
import ConnectRequestItem from './connect/ConnectRequestItem.vue';
import ChatItem from './chat/ChatItem.vue';
import { ref, onMounted} from 'vue';
import { useAuthStore } from '../stores/auth';
import { fetchPendingRequests } from '../utils/fetchPendingRequests';
import { fetchUserChats } from '../utils/fetchUserChats';

const authStore = useAuthStore();

const pendingRequests = ref([]);
const chats = ref([]);

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
        if (panelProps.flag == 'connect'){
            // fetch pending requests
            await fetchConnectRequests();
        }  else if (panelProps.flag == 'chat') {
            await fetchChats();
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};

onMounted(() => fetchPanelInfo());

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

        <div class="panel-content">
            <ConnectRequestItem
                v-for="request in pendingRequests"
                :key="request.id"
                :request="request"
                @delete-request-item="deleteRequest"
                v-if="panelProps.flag == 'connect'"
            />

            <ChatItem 
                v-for="chat in chats"
                :key="chat.id"
                :chat="chat"
                v-if="panelProps.flag == 'chat'"
            />
        </div>
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
</style>