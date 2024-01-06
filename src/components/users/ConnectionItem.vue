<script setup>

const connectionProps = defineProps({
    connection: Object,
});

</script>

<template>
    <router-link :to="`/user/${connection.username}`" class="router-link">
        <div class="connection-container">
            <div class="profile-photo"></div>
            <span class="username-text">{{ connection.username }}</span>

        </div>
    </router-link>
</template>

<style scoped>
.connection-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-top: 0.3rem solid #69BF64;
    border-bottom: 0.3rem solid #69BF64;
    height: 3.5rem;
    background-color: #20356A;
    padding: 0.5rem;
}

.profile-photo {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-image: url('../../assets/img/profile-photo.jpeg');
    background-size: cover;
    background-position: center center;
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
