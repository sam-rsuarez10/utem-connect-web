<script setup>
import { useAuthStore } from '../../stores/auth';
import { onMounted, reactive, computed, watch } from 'vue';
import { fetchUserInfo } from '../../utils/fetchUserInfo';
import { useRouter } from 'vue-router';
import axios from '@/axios';

const authStore = useAuthStore();
const router = useRouter();

const connectButtonState = reactive({
    isConnection: false, // user is not a connection with logged user
    isPending: false, // connect request is pending
    buttonText: '',
});

const connectButtonText = computed(() => {
    if (connectButtonState.isConnection) {
        return 'Chat';
    } else if (connectButtonState.isPending) {
        return 'Solicitud enviada';
    } else {
        return 'Conectar';
    }
});

watch(connectButtonText, (newText) => {
    connectButtonState.buttonText = newText;
});

const props = defineProps({
    username: String,
});

const userInfo = reactive({
    username: props.username,
    names: '',
    lastnames: '',
    career: '',
    description: '',
});

const connectionRequest = reactive({
    id: '',
    userReply: '',
    replyState: false,
});

const sendConnectRequest = async () => {

    try {
        const response = await axios.post(
            '/connect-api/send',
            {
                user_to_username: userInfo.username,
            },
            {
                headers: {
                    Authorization: `Token ${authStore.token}`,
                },
            }
        );

        if (response.status === 200) {
            connectButtonState.isPending = true;
        }
    } catch (error) {
        console.error('Error sending request: ', error);
    }
};

const createChat = async () => {
    try {
        const response = await axios.post(
            '/chat-api/chats',
            {
                first_user: authStore.user,
                second_user: userInfo.username,
            },
            {
                headers: {
                    Authorization: `Token ${authStore.token}`,
                },
            }
        );

        if (response.status === 200 || response.status === 201) {
            router.push(`/chat/${response.data['chat'].id}`);
        }
    } catch (error) {
        console.error('Error creating chat: ', error);
    }
};

const handleConnectButtonClick = () => {
    if (connectButtonState.isPending)
        return;

    if (connectButtonState.isConnection) {
        createChat();
    } else {
        sendConnectRequest();
    }
}

const handleRequestReply = async (reply) => {
    /* the reply param should be 'accepted' or 'rejected' 
    in order to be handled correctly by the backend */

    try {

        const response = await axios.patch(
            `/connect-api/reply-request/${connectionRequest.id}`, 
            {
                reply: reply,
            },
            {
                headers: {
                    Authorization: `Token ${authStore.token}`,
                },
            }
        );

        if (response.status === 200 && reply == 'accepted') {
            connectButtonState.isConnection = true;
            connectionRequest.replyState = false;
        } else if (response.status === 200 && reply == 'rejected') {
            connectionRequest.replyState = false;
            connectButtonState.isPending = false;
            connectButtonState.isConnection = false;
            connectButtonState.buttonText = 'Conectar';
        }
    } catch (error) {
        console.error('Error proccesing reply: ', error);
    }
};

const fetchInfo = async () => {
    try {
        const response = await fetchUserInfo(true, props.username, authStore.token);
        userInfo.username = props.username;
        const userData = response.data['user-info'];

        if (userData.middle_name) {
            userInfo.names = `${userData.first_name} ${userData.middle_name}`;
        } else {
            userInfo.names = userData.first_name;
        }

        if (userData.second_surname) {
            userInfo.lastnames = `${userData.last_name} ${userData.second_surname}`;
        } else {
            userInfo.lastnames = userData.last_name;
        }

        if (userData.career) {
            userInfo.career = userData.career;
        } else {
            userInfo.career = 'Sin carrera';
        }

        if (userData.personal_description) {
            userInfo.description = userData.personal_description;
        } else {
            userInfo.description = 'Sin descripción';
        }

    } catch (error) {
        console.error('Error fetching user info: ', error);
    }
}

const checkPendingRequest = async () => {
    // check for any pending request between two users involved

    try {
        const response = await axios.get(
            `/connect-api/pending-requests?sender=${authStore.user}&receiver=${userInfo.username}`, {
            headers: {
                Authorization: `Token ${authStore.token}`,
            }
        });

        const requestData = response.data['connection_request'];
        if (requestData == 'null') {
            connectButtonState.buttonText = 'Conectar';
        } else if (requestData.user_from == authStore.user) {
            // logged user already sent a connect request to this user
            connectButtonState.buttonText = 'Solicitud enviada';
        } else {
            // logged user has to reply connection request
            connectionRequest.id = requestData.id;
            connectionRequest.replyState = true;
        }
    } catch (error) {
        console.error('Error checking for pending request: ', error);
    }
};

const checkExistingConnection = async () => {
    // check for any existing connection between teo users involved

    try {
        const response = await axios.get(
            `/connect-api/connections?user1=${authStore.user}&user2=${userInfo.username}`, {
            headers: {
                Authorization: `Token ${authStore.token}`,
            }
        });

        if (response.data['connection'] != 'null') {
            connectButtonState.isConnection = true;
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error checking for existing connection: ', error);
    }

};

onMounted(async () => {
    try {
        await fetchInfo();

        const haveConnection = await checkExistingConnection();

        if (!haveConnection)
            await checkPendingRequest();

    } catch (error) {
        console.error('something went wrong on mounting', error)
    }
});

watch(() => props.username, async (newUsername, oldUsername) => {
    if (newUsername != oldUsername) {
        await fetchInfo();
        const haveConnection = await checkExistingConnection();
        if (!haveConnection)
            await checkPendingRequest();
    }
});

</script>

<template>
    <div class="info-container">
        <div class="profile-photo"></div>

        <div class="names-info">
            <h3>{{ userInfo.username }}</h3>
            <h5>{{ userInfo.names }}</h5>
            <h5>{{ userInfo.lastnames }}</h5>
        </div>

        <h3 id="carrera">{{ userInfo.career }}</h3>

        <div class="bottom-container">
            <div class="description-container">
                <h5>Sobre mí</h5>
                <p id="description">{{ userInfo.description }}</p>
            </div>

            <button class="option-button" id="connect" @click="handleConnectButtonClick" v-if="!connectionRequest.replyState">
                {{ connectButtonState.buttonText }}
            </button>

            <div class="reply-buttons-container" v-if="connectionRequest.replyState">
                <button class="option-button" id="accept-button" @click="handleRequestReply('accepted')">
                    Aceptar
                </button>

                <button class="option-button" id="reject-button" @click="handleRequestReply('rejected')">
                    Rechazar
                </button>
            </div>
        </div>

    </div>
</template>

<style scoped>
.info-container {
    background-color: #155C5F;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 50rem;
    height: 40rem;
    border-radius: 5%;
    flex-direction: column;
    color: white;
}

.profile-photo {
    margin-top: 2.5rem;
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    background-image: url('../../assets/img/profile-photo.jpeg');
    background-size: cover;
    background-position: center center;
    order: -1;
}

.names-info {
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    justify-content: center;
    align-items: center;
}

#carrera {
    margin-top: 2rem;
    margin-left: 2rem;
    align-self: flex-start;
}

.bottom-container {
    display: flex;
    width: 45rem;
    height: 10rem;
    justify-content: space-between;
}

.description-container {
    display: flex;
    flex-direction: column;
}

.option-button {
    width: 5.5rem;
    height: 3.5rem;
    align-self: flex-end;
    border: none;
    border-radius: 7%;
}

.option-button:hover {
    font-size: 1.2rem;
    transition: 700ms;
}

#description {
    border-radius: 2%;
    height: auto;
    min-height: 4rem;
    max-height: 100%;
    overflow-y: auto;
}

#connect {
    background-color: #9ADB9A;
    margin-right: 2rem;
}

#connect:hover {
    background-color: #62BD62;
}

.reply-buttons-container {
    align-self: flex-end;
    display: flex;
    width: 12rem;
    justify-content: space-between;
}

#accept-button {
    background-color: #62BD62;
}

#accept-button:hover, #reject-button:hover {
    color: white;
}

#reject-button {
    background-color: red;
}


</style>