<script setup></script>

<template>
    <div class="chat-container">
        <div class="chat-header">
            <div class="profile-photo"></div>
            <h3>Username</h3>
        </div>
        <div class="chat-content"></div>
        <form action="#" class="message-input">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="escribe un mensaje..." aria-label="Recipient's username"
                    aria-describedby="button-addon2">
                <button class="btn btn-primary" type="submit" id="button-addon2">enviar</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.chat-container {
    background-color: #155C5F;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    /* Stretch all child elements */
    justify-content: space-between;
    /* Space between header, content, and form */
    width: 50rem;
    height: 45rem;
    border-radius: 5%;
    color: white;
}

.chat-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 1rem;
    /* Add padding for spacing */
}

.profile-photo {
    width: 3rem;
    /* Adjust size as needed */
    height: 3rem;
    /* To create a circle, make sure width and height are equal */
    border-radius: 50%;
    background-color: gray;
    margin-right: 1rem;
    /* Add margin for spacing */
}

h3 {
    margin: 0;
    /* Remove default margin to align text with the profile photo */
}

.chat-content {
    flex: 1;
    /* Fill the remaining space */
    background-color: #82B7B7;
    /* Adjust the style as needed */
    margin: 1rem;
    /* Add margin for spacing */
    border-radius: 5%;
}

.message-input {
    display: flex;
    align-items: center;
    width: 100%;
    align-self: center;
    padding: 1rem;
    /* Add padding for spacing */
    background-color: #155C5F;
    /* Adjust the style as needed */
}

#send-message {
    flex: 1;
    /* Take up remaining space */
    margin-right: 1rem;
    /* Add margin for spacing */
}

#send-button {
    background-color: #69BF64;
    /* Adjust the style as needed */
    color: white;
    border: none;
}
</style>
