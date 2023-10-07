<script setup>
</script>

<template>
    <form action="#">
        <div class="info-container">
        <div class="profile-photo"></div>

        <div class="names-info">
            <h3>Username</h3>
            <h5>Samuel Benjamín</h5>
            <h5>Reyes Suárez</h5>
        </div>

        <h3 id="carrera">Ingeniería en Informática</h3>

        <div class="bottom-container">
            <div class="description-container">
                <h5>Sobre mí</h5>
                <textarea name="user-description" id="description" cols="35" rows="4">lorem ipsum</textarea>
            </div>

            <button class="option-button" id="edit">
                Editar
            </button>
        </div>

    </div>
    </form>
</template>

<style scoped>

.info-container {
    background-color: #155C5F;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 50rem;
    height: 40rem;
    border-radius: 5%;
    flex-direction: column;
}

.profile-photo {
    margin-top: 2.5rem;
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    background-color: gray;
    order: -1;
}

.names-info {
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    justify-content: center;
    align-items: center;
}

#carrera {
    margin-top: 2rem;
    margin-left: 2rem;
    align-self: flex-start;
}

.bottom-container {
    display: flex;
    width: 45rem;
    height: 10rem;
    justify-content: space-between;
}

.description-container {
    display: flex;
    flex-direction: column;
}

.option-button {
    width: 5rem;
    height: 3rem;
    align-self: flex-end;
    border: none;
    border-radius: 7%;
}

.option-button:hover {
    font-size: 1.2rem;
    transition: 700ms;
}

#description {
    border-radius: 2%;
    height: auto;
    min-height: 4rem;
    max-height: 100%;
    overflow-y: auto;
}

#edit {
    background-color: #9ADB9A;
    margin-right: 2rem;
}

#edit:hover{
    background-color: #62BD62;
}


</style>