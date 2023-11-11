<script setup>
</script>

<template>
    <div class="user-container">
        <div class="profile-photo"></div>
        <router-link to="#" class="router-link">
            <span class="username-text">username</span>
        </router-link>

        <button class="connect-button btn btn-success">conectar</button>
    </div>
</template>

<style scoped>
.user-container {
    display: flex;
    justify-content: flex-start;
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
    margin-left: 0.75rem;
}

.router-link:hover {
    font-weight: bold;
}

.connect-button {
    margin-left: 7rem;
}
</style>