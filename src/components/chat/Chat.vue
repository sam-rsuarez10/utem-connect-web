<script setup>
import axios from "@/axios";
import { onMounted, reactive, watch } from "vue";
import { useAuthStore } from "../../stores/auth";
import MessageItem from './MessageItem.vue';

const authStore = useAuthStore();

const chatProps = defineProps({
    chatId: String,
});

const chatDetail = reactive({
    other_user: '',
});

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

    chatSocket.onmessage = function (e) {
        console.log('onmessage');
    };

    chatSocket.onclose = function (e) {
        console.log('onclose');
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

onMounted(async () => {
    await fetchChat();
    initiateWebSocket();
});

watch(() => chatProps.chatId, async (newId, oldId) => {
    if (newId != oldId) {
        await fetchChat();
        initiateWebSocket();
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
            <MessageItem :my-message="true" :text="'hi'" />

            <MessageItem :my-message="false" :text="'hi! how are u'" />

        </div>
        <form action="#" class="message-input">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="escribe un mensaje..."
                    aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn btn-primary" type="submit" id="button-addon2">enviar</button>
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

#send-button {
    background-color: #69BF64;
    /* Adjust the style as needed */
    color: white;
    border: none;
}
</style>
