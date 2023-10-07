<script setup>
</script>

<template>
    <form action="#">
        <div class="info-container">
            <div class="profile-photo"></div>

            <div class="names-info">
                <div class="input-group">
                    <input type="text" id="username" class="form-control" value="username"
                        aria-label="Recipient's username with two button addons" disabled>
                    <button class="btn btn-outline-warning" type="button">Edit</button>
                    <button class="btn btn-outline-danger" type="button">Cancel</button>
                </div>

                <div class="input-group">
                    <input type="text" id="username" class="form-control" value="Samuel Benjamín"
                        aria-label="Recipient's username with two button addons" disabled>
                    <button class="btn btn-outline-warning" type="button">Edit</button>
                    <button class="btn btn-outline-danger" type="button">Cancel</button>
                </div>

                <div class="input-group">
                    <input type="text" id="username" class="form-control" value="Reyes Suárez"
                        aria-label="Recipient's username with two button addons" disabled>
                    <button class="btn btn-outline-warning" type="button">Edit</button>
                    <button class="btn btn-outline-danger" type="button">Cancel</button>
                </div>


                <div class="input-group">
                    <input type="text" id="username" class="form-control" value="Ingeniería Informática"
                        aria-label="Recipient's username with two button addons" disabled>
                    <button class="btn btn-outline-warning" type="button">Edit</button>
                    <button class="btn btn-outline-danger" type="button">Cancel</button>
                </div>

            </div>
            <div class="bottom-container">
                <div class="description-container">
                    <h5>Sobre mí</h5>
                    <textarea name="user-description" id="description" cols="35" rows="4">lorem ipsum</textarea>
                </div>

                <div class="submit-buttons-container">
                    <button class="option-button" id="save-button" type="submit">
                        Guardar
                    </button>

                    <button class="option-button" id="cancel-button">
                        Cancelar
                    </button>
                </div>
            </div>

        </div>
    </form>
</template>

<style scoped>
h5 {
    color: white;
}

.info-container {
    background-color: #155C5F;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 50rem;
    height: 45rem;
    border-radius: 5%;
    flex-direction: column;
}

.profile-photo {
    margin-top: 2.5rem;
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    background-color: gray;

}

.names-info {
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
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
    margin-top: 2rem;
}

.description-container {
    display: flex;
    flex-direction: column;
}

.option-button {
    width: 5.5rem;
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

.submit-buttons-container {
    align-self: flex-end;
    display: flex;
    width: 12rem;
    justify-content: space-between;
}

#save-button {
    background-color: #62BD62;
}

#save-button:hover {
    color: white;
}

#cancel-button {
    background-color: red;
}

#cancel-button:hover {
    color: white;
}
</style>