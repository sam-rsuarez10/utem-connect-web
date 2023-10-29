<script setup>
import { useAuthStore } from '../../stores/auth';
import axios from '@/axios';

const authStore = useAuthStore();

const emit = defineEmits();

const requestProps = defineProps({
    request: Object,
});

const handleRequestReply = async (reply) => {
    try {
        const response = await axios.patch(
            `/connect-api/reply-request/${requestProps.request.id}`, {
                reply: reply
            }, {
                headers: {
                    Authorization: `Token ${authStore.token}`
                }
            }
        );
        emit('delete-request-item', requestProps.request.id);
    } catch (error) {
        console.error('Error proccesing reply: ', error);
    }
};
</script>

<template>
    <div class="request-container">
        <div class="profile-photo"></div>
        <router-link :to="`/user/${requestProps.request.user_from}`" class="router-link">
            <span class="username-text">{{ request.user_from }}</span>
        </router-link>
        <div class="options">
            <button class="option-button btn btn-success" id="accept"
                @click="handleRequestReply('accepted')">
                Aceptar
            </button>
            <button class="option-button btn btn-danger" id="reject"
                @click="handleRequestReply('rejected')">
                Rechazar
            </button>
        </div>
    </div>
</template>

<style scoped>
.request-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 0.3rem solid #69BF64;
    border-bottom: 0.3rem solid #69BF64;
    height: 3.5rem;
    background-color: #20356A;
}

.profile-photo {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: gray;
    margin-left: 0.75rem;
}

.router-link {
    font-size: 1.2rem;
    text-decoration: none;
    color: white;
}

.router-link:hover {
    font-weight: bold;
}


.option-button{
    height: 2.7rem;
}

.options {
    display: flex;
    gap: 1rem;
}
</style>