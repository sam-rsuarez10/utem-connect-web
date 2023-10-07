<script setup>
import { reactive, onMounted, ref} from 'vue';
import { fetchUserInfo } from '../../utils/fetchUserInfo';
import { useAuthStore } from '../../stores/auth';

const authStore =  useAuthStore();

const textareaDesc = ref();

const userInfo = reactive({
    username: '',
    names: '',
    lastnames: '',
    career: '',
    description: '',
    editState: false,
}); 

const handleTextareaInput = () => {
    userInfo.editState = true;
};

const enableEdit = (inputId) => {
    userInfo.editState = true;
    const inputElement = document.getElementById(inputId);
    inputElement.removeAttribute('disabled');
    inputElement.focus();
};

const cancelEditInput = (inputId) => {
    const inputElement = document.getElementById(inputId);
    if (!inputElement.hasAttribute('disabled')) {
        inputElement.setAttribute('disabled', 'disabled');
    }
};

const fetchData = async () => {
    
};

onMounted( async () => {
    try {
        const response = await fetchUserInfo(true, authStore.user, authStore.token);
        const userData = response.data['user-info'];

        userInfo.username = userData.username;
        userInfo.career = userData.career;
        userInfo.description = userData.personal_description;
        userInfo.names = `${userData.first_name} ${userData.middle_name}`;
        userInfo.lastnames = `${userData.last_name} ${userData.second_surname}`;

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        textareaDesc.value.focus();
    } catch (error) {
        console.error('Error fetching user info: ', error);
    }
});
</script>

<template>
    <form action="#">
        <div class="info-container">
            <div class="profile-photo"></div>

            <div class="names-info">
                <div class="input-group">
                    <input type="text" id="username" class="form-control" v-model="userInfo.username"
                        aria-label="Recipient's username with two button addons" disabled>
                    <button class="btn btn-outline-warning" type="button" @click="enableEdit('username')">Edit</button>
                    <button class="btn btn-outline-danger" type="button" @click="cancelEditInput('username')">Cancel</button>
                </div>

                <div class="input-group">
                    <input type="text" id="names" class="form-control" v-model="userInfo.names"
                        aria-label="Recipient's username with two button addons" disabled>
                    <button class="btn btn-outline-warning" type="button" @click="enableEdit('names')">Edit</button>
                    <button class="btn btn-outline-danger" type="button" @click="cancelEditInput('names')">Cancel</button>
                </div>

                <div class="input-group">
                    <input type="text" id="lastnames" class="form-control" v-model="userInfo.lastnames"
                        aria-label="Recipient's username with two button addons" disabled>
                    <button class="btn btn-outline-warning" type="button" @click="enableEdit('lastnames')">Edit</button>
                    <button class="btn btn-outline-danger" type="button" @click="cancelEditInput('lastnames')">Cancel</button>
                </div>


                <div class="input-group">
                    <input type="text" id="career" class="form-control" v-model="userInfo.career"
                        aria-label="Recipient's username with two button addons" disabled>
                    <button class="btn btn-outline-warning" type="button" @click="enableEdit('career')">Edit</button>
                    <button class="btn btn-outline-danger" type="button" @click="cancelEditInput('career')">Cancel</button>
                </div>

            </div>
            <div class="bottom-container">
                <div class="description-container">
                    <h5>Sobre mí</h5>
                    <textarea 
                    ref="textareaDesc" 
                    name="user-description" 
                    id="description" cols="35" rows="4" 
                    v-model="userInfo.description"
                    @input="handleTextareaInput"
                    spellcheck="false"></textarea>
                </div>

                <div class="submit-buttons-container" v-if="userInfo.editState">
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