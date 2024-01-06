<script setup>
import { reactive, onMounted, ref } from 'vue';
import { fetchUserInfo } from '../../utils/fetchUserInfo';
import { useAuthStore } from '../../stores/auth';
import axios from '@/axios';

const authStore = useAuthStore();

const textareaDesc = ref();

const userInfo = reactive({
    username: '',
    firstname: '',
    middle_name: '',
    lastname: '',
    second_surname: '',
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

const resetComponent = () => {

    const savedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (savedUserInfo) {
        userInfo.username = savedUserInfo.username;
        userInfo.firstname = savedUserInfo.firstname;
        userInfo.lastname = savedUserInfo.lastname;
        userInfo.middle_name = savedUserInfo.middle_name;
        userInfo.second_surname = savedUserInfo.second_surname;
        userInfo.career = savedUserInfo.career;
        userInfo.description = savedUserInfo.description;
    }

    disbaleInputs();

    userInfo.editState = false;

    textareaDesc.value.focus();
};

const disbaleInputs = () => {

    const inputElements = document.querySelectorAll('input');
    inputElements.forEach((inputElement) => {
        inputElement.setAttribute('disabled', 'disabled');
    });
}

const saveUserInfo = async () => {
    const payload = {
        first_name: userInfo.firstname,
        last_name: userInfo.lastname,
        middle_name:  userInfo.middle_name? userInfo.middle_name : '',
        second_surname: userInfo.second_surname? userInfo.second_surname : '',
        career: userInfo.career,
        personal_description: userInfo.description,
    };

    // Add username to payload if it's different from authStore
    if (userInfo.username !== authStore.user) {
        payload.username = userInfo.username;
    }

    try {
        const response = await axios.put('/user-api/user-info', payload, {
            headers: {
                Authorization: `Token ${authStore.token}`,
            },
        });

        if (response.status === 200) {
            // Update auth store username if it was changed
            if (userInfo.username !== authStore.user) {
                authStore.$patch({ authUser: userInfo.username })
            }

            // Refresh component data and localStorage
            fetchUserAndInitialize();
            userInfo.editState = false;
            disbaleInputs();
        }
    } catch (error) {
        console.error('Error saving user info: ', error);
    }
};

const fetchUserAndInitialize = async () => {
    try {
        const response = await fetchUserInfo(true, authStore.user, authStore.token);
        const userData = response.data['user-info'];

        userInfo.username = userData.username;
        userInfo.career = userData.career;
        userInfo.description = userData.personal_description;
        userInfo.firstname = userData.first_name;
        userInfo.middle_name = userData.middle_name;
        userInfo.lastname = userData.last_name;
        userInfo.second_surname = userData.second_surname;

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        textareaDesc.value.focus();
    } catch (error) {
        console.error('Error fetching user info: ', error);
    }
};

onMounted(fetchUserAndInitialize);
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
                    <button class="btn btn-outline-danger" type="button"
                        @click="cancelEditInput('username')">Cancel</button>
                </div>

                <div class="input-group">
                    <input type="text" id="firstname" class="form-control" v-model="userInfo.firstname"
                        aria-label="Recipient's username with two button addons" disabled>
                    <button class="btn btn-outline-warning" type="button" @click="enableEdit('firstname')">Edit</button>
                    <button class="btn btn-outline-danger" type="button" @click="cancelEditInput('firstname')">Cancel</button>
                </div>

                <div class="input-group">
                    <input type="text" id="middle-name" class="form-control" v-model="userInfo.middle_name"
                        aria-label="Recipient's username with two button addons" disabled>
                    <button class="btn btn-outline-warning" type="button" @click="enableEdit('middle-name')">Edit</button>
                    <button class="btn btn-outline-danger" type="button" @click="cancelEditInput('middle-name')">Cancel</button>
                </div>

                <div class="input-group">
                    <input type="text" id="lastname" class="form-control" v-model="userInfo.lastname"
                        aria-label="Recipient's username with two button addons" disabled>
                    <button class="btn btn-outline-warning" type="button" @click="enableEdit('lastname')">Edit</button>
                    <button class="btn btn-outline-danger" type="button"
                        @click="cancelEditInput('lastname')">Cancel</button>
                </div>

                <div class="input-group">
                    <input type="text" id="surname" class="form-control" v-model="userInfo.second_surname"
                        aria-label="Recipient's username with two button addons" disabled>
                    <button class="btn btn-outline-warning" type="button" @click="enableEdit('surname')">Edit</button>
                    <button class="btn btn-outline-danger" type="button"
                        @click="cancelEditInput('surname')">Cancel</button>
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
                    <textarea ref="textareaDesc" name="user-description" id="description" cols="35" rows="4"
                        v-model="userInfo.description" @input="handleTextareaInput" spellcheck="false"></textarea>
                </div>

                <div class="submit-buttons-container" v-if="userInfo.editState">
                    <button class="option-button" id="save-button" type="submit" @click="saveUserInfo">
                        Guardar
                    </button>

                    <button class="option-button" id="cancel-button" @click="resetComponent()">
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
    height: 50rem;
    border-radius: 5%;
    flex-direction: column;
}

.profile-photo {
    margin-top: 2.5rem;
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    background-image: url('../../assets/img/profile-photo.jpeg');
    background-size: cover;
    background-position: center center;

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