<script setup>
</script>

<template>
    <div class="card">
        <div class="card-header">
            <div class="profile-photo"></div>
            <span class="username-text">username</span>
        </div>
        <div class="card-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</p>
        </div>
        <div class="card-footer">
            <div class="interactions">
                <i title="like" class='bx bxs-heart bx-md' style='color:#a00000'  ></i>
                <i title="responder" class='bx bxs-paper-plane bx-md' style='color:#155c5f'  ></i>
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
    min-height: 10rem;
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
}

.username-text {
    margin-left: 1rem;
    font-size: 1.5rem;
}

.username-text:hover {
    font-weight: bold;
}

.card-content {
    flex: 1;
    padding: 0.625rem;
    overflow: auto;
}

.card-footer {
    padding: 0.625rem;
    text-align: right;
}

.like-responder {
    font-size: 0.75rem;
    color: #ccc;
}
</style>
