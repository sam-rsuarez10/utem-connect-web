<script setup>
import SearchItem from './SearchItem.vue';
import { ref, onMounted } from 'vue';
import { searchUsers } from '../../utils/userSearch';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();

const inputRef = ref(null);
const results = ref([]);

const advancedSearchUsers = async () => {
    let input = inputRef.value.value;

    let response = null;

    if (input.includes('@') || !input.includes(' ') ){
        response = await searchUsers(null, null, input, null, null, authStore.token);
    } else {
        const [name, last] = input.split(' ');
        response = await searchUsers(name, last, null, null, null, authStore.token);
    }

    results.value = response.data.users;
}

onMounted(() => inputRef.value.focus());
</script>

<template>
    <div class="search-container">
        <div class="input-group mb-3 search-input">
            <input type="text" class="form-control" 
                placeholder="escribe un nombre de usuario, nombre o correo utem" 
                aria-label="search bar"
                aria-describedby="main-search" 
                id="main-search-input"
                ref="inputRef">
            <button class="btn btn-primary" type="button" id="main-search" @click="advancedSearchUsers()">buscar</button>
        </div>

        <div class="user-search">
            <SearchItem v-for="user in results" :key="user.username" :user="user"/>
        </div>
    </div>
</template>

<style scoped>
.search-container {
    background-color: #155C5F;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 50rem;
    height: 40rem;
    border-radius: 5%;
    flex-direction: column;

}

.user-search {
    background-color: #155C5F;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45rem;
    height: 35rem;
    flex-direction: column;
    margin-top: 2rem;
    overflow-y: auto;

    /* Hide scrollbar by default */
    &::-webkit-scrollbar {
        width: 0;
    }

    /* Handle on hover */
    &:hover::-webkit-scrollbar {
        width: 0.5rem;
    }

    /* Customize scrollbar track */
    &::-webkit-scrollbar-track {
        background: #155C5F;
    }

    /* Customize scrollbar thumb */
    &::-webkit-scrollbar-thumb {
        background: #061F44;
    }
}

.search-input {
    margin: 2rem;
    width: 90%;
}

</style>