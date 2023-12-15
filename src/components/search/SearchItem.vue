<script setup>

const userProps = defineProps({
    user: Object,
});
</script>

<template>
    <div class="user-container">
        <div class="profile-photo"></div>
        <router-link :to="`/user/${user.username}`" class="router-link">
            <span class="username-text">{{ user.username }}</span>
        </router-link>

        <button v-if="user.action != 'reply'" :class="['action-button',
            { 'btn btn-success': user.action == 'chat' || user.action == 'conectar' },
            { 'btn btn-warning': user.action == 'pendiente' }]">{{ user.action }}</button>

        <div class="options" v-if="user.action == 'reply'">
            <button class="action-button btn btn-success" id="accept">
                aceptar
            </button>
            <button class="action-button btn btn-danger" id="reject">
                rechazar
            </button>
        </div>
    </div>
</template>

<style scoped>
.user-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 0.1rem solid #69BF64;
    height: 4rem;
    background-color: #20356A;
    width: 100%;
    margin: 0.5rem 0 0.5rem 0;
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
    margin-left: 2rem;
}

.router-link:hover {
    font-weight: bold;
}

.action-button {
    margin-left: auto;
    margin-right: 2rem;
    height: 2rem;
}
.options {
    display: flex;
    margin-left: auto;
}
</style>