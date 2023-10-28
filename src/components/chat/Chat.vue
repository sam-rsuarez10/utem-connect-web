<script setup>
import axios from "@/axios";
import { onMounted, reactive, watch, ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import MessageItem from './MessageItem.vue';

const authStore = useAuthStore();

const chatProps = defineProps({
    chatId: String,
});

const chatDetail = reactive({
    other_user: '',
    messages: [],
});

const messageInput = ref(null);
const inputRef = ref();

let chatSocket = null; // Define the WebSocket variable

const initiateWebSocket = () => {
    if (chatSocket) {
        // Close any existing WebSocket connection
        chatSocket.close();
    }

    chatSocket = new WebSocket(
        `ws://${axios.defaults.baseURL.replace('http://', '')}/ws/${chatProps.chatId}`
    );

    chatSocket.onopen = function (event) {
        console.log('WebSocket connection established:', event);
    };

    chatSocket.onerror = function (event) {
        console.error('WebSocket error:', event);
    };

    chatSocket.onmessage = function (event) {
        const data = JSON.parse(event.data);

        if (data.message) {
            const myMessage = data.username == authStore.user;
            chatDetail.messages.push({text: data.message, myMessage });
        }
    };

    chatSocket.onclose = function (event) {
        console.log('closing websocket connection...');
    };
};

const fetchChat = async () => {
    try {
        const response = await axios.get(`/chat-api/chat/${chatProps.chatId}`, {
            headers: {
                Authorization: `Token ${authStore.token}`
            }
        })

        if (response.status == 200) {
            chatDetail.other_user = response.data['chat'].other_user;
        }
    } catch (error) {
        console.error('error fetching chat: ', error);
    }
}

const sendMessage = () => {
    const textMessage = messageInput.value.trim();

    if (textMessage === '')
        return;

    chatSocket.send(JSON.stringify({
        'message': textMessage,
        'username': authStore.user,
        'chat-id': chatProps.chatId
    }));

    messageInput.value = '';
};

onMounted(async () => {
    await fetchChat();
    initiateWebSocket();
    inputRef.value.focus();

});

watch(() => chatProps.chatId, async (newId, oldId) => {
    if (newId != oldId) {
        await fetchChat();
        initiateWebSocket();
        inputRef.value.focus();
    }
});
</script>

<template>
    <div class="chat-container">
        <div class="chat-header">
            <div class="profile-photo"></div>
            <h3>{{ chatDetail.other_user }}</h3>
        </div>
        <div class="chat-content">
            <MessageItem 
                v-for="(message, index) in chatDetail.messages"
                :key="index"
                :text="message.text"
                :myMessage="message.myMessage"
            />
        </div>
        <form class="message-input" @submit.prevent="sendMessage">
            <div class="input-group mb-3">
                <input  v-model="messageInput" ref="inputRef" id="input-message" type="text" class="form-control" placeholder="escribe un mensaje..."
                    aria-label="Recipient's username" aria-describedby="button-addon2">
                <button @click="sendMessage" @keydown.enter="sendMessage" class="btn btn-primary" type="submit" id="send-button">enviar</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.chat-container {
    background-color: #155C5F;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    /* Stretch all child elements */
    justify-content: space-between;
    /* Space between header, content, and form */
    width: 50rem;
    height: 45rem;
    border-radius: 5%;
    color: white;
}

.chat-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 1rem;
    /* Add padding for spacing */
}

.profile-photo {
    width: 3rem;
    /* Adjust size as needed */
    height: 3rem;
    /* To create a circle, make sure width and height are equal */
    border-radius: 50%;
    background-color: gray;
    margin-right: 1rem;
    /* Add margin for spacing */
}

h3 {
    margin: 0;
    /* Remove default margin to align text with the profile photo */
}

.chat-content {
    flex: 1;
    /* Fill the remaining space */
    background-color: #82B7B7;
    /* Adjust the style as needed */
    margin: 1rem;
    /* Add margin for spacing */
    border-radius: 5%;
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.message-input {
    display: flex;
    align-items: center;
    width: 100%;
    align-self: center;
    padding: 1rem;
    /* Add padding for spacing */
    background-color: #155C5F;
    /* Adjust the style as needed */
}

#send-message {
    flex: 1;
    /* Take up remaining space */
    margin-right: 1rem;
    /* Add margin for spacing */
}
</style>
