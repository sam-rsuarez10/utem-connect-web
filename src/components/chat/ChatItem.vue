<script setup>

const chatProps = defineProps({
    chat: Object,
});

</script>

<template>
    <div class="chat-container">
        <div class="profile-photo"></div>
        <router-link :to="`/chat/${chat.id}`" class="router-link">
            <span class="username-text">{{ chat.other_user }}</span>
        </router-link>
    </div>
</template>

<style scoped>
.chat-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-top: 0.3rem solid #69BF64;
    border-bottom: 0.3rem solid #69BF64;
    height: 3.5rem;
    background-color: #20356A;
    padding: 0.5rem;
    /* Add some padding for spacing */
}

.profile-photo {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: gray;
    margin-right: 0.75rem;
}

.username-text {
    font-size: 1.2rem;
    color: white;
    flex: 1;
}

.router-link {
    text-decoration: none;
}

.router-link:hover {
    font-weight: bold;
}
</style>
