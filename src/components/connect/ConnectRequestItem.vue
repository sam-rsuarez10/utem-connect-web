<script setup></script>

<template>
    <div class="request-container">
        <div class="profile-photo"></div>
        <span class="username-text">username</span>
        <div class="options">
            <button class="option-button btn btn-success" id="accept">
                Aceptar
            </button>
            <button class="option-button btn btn-danger" id="reject">
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

.username-text {
    font-size: 1.2rem;
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