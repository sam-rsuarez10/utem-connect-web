<script setup>


const props = defineProps({
    userPost: Object,
    loggedUser: String,
});
</script>

<template>
    <div class="card">
        <div class="card-header">
            <div class="profile-photo"></div>
            <router-link :to="userPost.publisher === loggedUser ? '/me' : `/user/${userPost.publisher}`"
                class="router-link">
                <span class="username-text">{{ userPost.publisher }}</span>
            </router-link>

        </div>
        <div class="card-content">
            <p> {{ userPost.text }} </p>
        </div>
        <div class="card-footer">
            <div class="interactions">
                <i title="like" class='bx bxs-heart bx-md bx-tada-hover' style='color:#a00000'></i>
                <i title="responder" class='bx bxs-paper-plane bx-md bx-tada-hover' style='color:#155c5f'></i>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile-photo {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: gray;
    margin-left: 0.5rem;
}

.card {
    width: 20rem;
    min-height: fit-content;
    max-height: 20rem;
    box-shadow: 0 0.75rem 1rem rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    border-radius: 4%;
}

.card-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #ccc;
}

.username-text {
    margin-left: 1rem;
    font-size: 1.2rem;
}

.username-text:hover {
    font-weight: bold;
}

.card-content {
    flex: 1;
    padding: 0.625rem;
    overflow: auto;
    background-color: #CBF9FF;
}

.card-footer {
    background-color: #ccc;
    display: flex;
    justify-content: flex-end;
}

.router-link {
    text-decoration: none;
    color: black;
}

.router-link:hover {
    font-weight: bold;
}

i:hover {
    cursor: pointer;
}
</style>
