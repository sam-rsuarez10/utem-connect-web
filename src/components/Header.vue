<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
    const logoutSuccess = await authStore.logout();

    if (logoutSuccess) {
        router.push('/');
    }
};
</script>

<template>
    <header>
        <router-link to="/home" class="router-link">
            <h1 id="header-title">UtemConnect</h1>
        </router-link>
        <div class="dropdown" v-if="authStore.isAuthenticated">
            <button class="btn dropdown-toggle" type="button" id="logoutDropdown" data-bs-toggle="dropdown"
                aria-expanded="false">
                <i class='bx bxs-cog bx-sm' title="opciones"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="logoutDropdown">
                <li>
                    <button id="logout" class="dropdown-item" @click="logout">Cerrar sesión</button>
                </li>

                <li>
                    <router-link to="/me" class="router-link">
                        <button id="my-profile" class="dropdown-item">
                            Mi Perfil
                        </button>
                    </router-link>
                </li>
            </ul>
        </div>
    </header>
</template>

<style scoped>
header {
    display: flex;
    background-color: #0F7D70;
    height: 5rem;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    color: white;
}

#header-title {
    padding-left: 2rem;
    color: white;
}

#header-title:hover {
    font-size: 2.7rem;
    transition: 700ms;
}

.dropdown {
    padding-right: 5rem;
    color: white;
}

#log-out button {
    background-color: #0F7D70;
    border: none;
    color: white;
}

#logout:hover {
    background-color: red;
    transition: 500ms;
    color: white;
}

#my-profile:hover {
    background-color: #0F7D70;
    transition: 500ms;
    color: white;
}

.router-link {
    text-decoration: none;
}</style>