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
    border-top: 0.1rem solid #69BF64;
    border-bottom: 0.1rem solid #69BF64;
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

.connect-button {
    margin-left: auto;
    margin-right: 2rem;
    height: 2rem;
}
</style>