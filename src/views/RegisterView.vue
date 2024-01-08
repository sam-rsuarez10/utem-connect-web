<script setup>
import { useRouter } from 'vue-router';
import Footer from '../components/Footer.vue'
import { useAuthStore } from '../stores/auth';
import { reactive } from 'vue';


const authStore = useAuthStore();
const router = useRouter();

const newUser = reactive({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
    middle_name: '',
    second_surname: '',
    errorMsg: '',
    invalid: false,
})

const register = async () => {
    // make validations
    if (!newUser.username || !newUser.email ||
        !newUser.first_name || !newUser.last_name ||
        !newUser.password) {
        newUser.invalid = true;
        newUser.errorMsg = 'por favor completa todos los campos requeridos'
        return;
    }

    if (newUser.password !== newUser.confirm_password) {
        newUser.invalid = true;
        newUser.errorMsg = 'las contraseñas deben de coincididr'
        return;
    }

    const registrationData = {
        username: newUser.username,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        password: newUser.password,
        ...(newUser.middle_name !== '' ? { middle_name: newUser.middle_name } : {}),
        ...(newUser.second_surname !== '' ? { second_surname: newUser.second_surname } : {}),
    };
    console.log('Registration Data:', registrationData);
    const registrationSuccess = await authStore.register(registrationData);

    if (registrationSuccess) {
        router.push('/verify');
    } else {
        newUser.invalid = true,
            newUser.errorMsg = 'no se pudo registrar, por favor intenta más tarde o verifica tus datos'
    }
}

</script>


<template>
    <header>
        <h1 id="header-title">UtemConnect</h1>
    </header>

    <main>
        <div class="container">
            <form class="row g-3" @submit.prevent="register">
                <div class="col-md-6">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" required v-model="newUser.first_name">
                </div>
                <div class="col-md-6">
                    <label for="segundoNombre" class="form-label">Segundo Nombre</label>
                    <input type="text" class="form-control" id="segundoNombre" placeholder="Opcional"
                        v-model="newUser.middle_name">
                </div>
                <div class="col-md-6">
                    <label for="apellido" class="form-label">Apellido</label>
                    <input type="text" class="form-control" id="apellido" required v-model="newUser.last_name">
                </div>
                <div class="col-md-6">
                    <label for="segundoApellido" class="form-label">Segundo Apellido</label>
                    <input type="text" class="form-control" id="segundoApellido" placeholder="Opcional"
                        v-model="newUser.second_surname">
                </div>
                <div class="col-6">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" required v-model="newUser.username">
                </div>
                <div class="col-6">
                    <label for="correoUtem" class="form-label">Correo Utem</label>
                    <input type="email" class="form-control" id="correoUtem" required v-model="newUser.email" placeholder="user@utem.cl">
                </div>
                <div class="col-6">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" required v-model="newUser.password">
                </div>
                <div class="col-6">
                    <label for="confirmPassword" class="form-label">Confirmación Password</label>
                    <input type="password" class="form-control" id="confirmPassword" required
                        v-model="newUser.confirm_password">
                </div>
                <span class="text-danger" v-if="newUser.invalid">{{ newUser.errorMsg }}</span>
                <div class="col-md-6 offset-md-3">
                    <div class="text-center mt-3">
                        <button type="submit" class="btn register-button" @click="register">Registrarse</button>
                    </div>
                </div>

            </form>

        </div>
    </main>

    <Footer />
</template>

<style scoped>
header {
    display: flex;
    background-color: #0F7D70;
    height: 5rem;
    width: 100%;
    align-items: center;
    color: white;
}

#header-title {
    padding-left: 2rem;
}

main {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background-color: #88C5E8;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5rem;
    width: 45rem;
    height: 35rem;
    border-radius: 5%;
}

.register-button {
    background-color: #26D76D;
    width: 10rem;
    height: 3.5rem;
    border-radius: 5%;
}
</style>