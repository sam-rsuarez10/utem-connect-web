<script setup>
import Footer from '../components/Footer.vue'

</script>


<template>
    <div id="app">
        <header>
            <h1 id="header-title">UtemConnect</h1>
        </header>

        <main>
            <div class="container">
                <form class="row g-3">
                    <div class="col-md-6">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="nombre" required>
                    </div>
                    <div class="col-md-6">
                        <label for="segundoNombre" class="form-label">Segundo Nombre</label>
                        <input type="text" class="form-control" id="segundoNombre" placeholder="Opcional">
                    </div>
                    <div class="col-md-6">
                        <label for="apellido" class="form-label">Apellido</label>
                        <input type="text" class="form-control" id="apellido" required>
                    </div>
                    <div class="col-md-6">
                        <label for="segundoApellido" class="form-label">Segundo Apellido</label>
                        <input type="text" class="form-control" id="segundoApellido" placeholder="Opcional">
                    </div>
                    <div class="col-6">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="username" required>
                    </div>
                    <div class="col-6">
                        <label for="correoUtem" class="form-label">Correo Utem</label>
                        <input type="email" class="form-control" id="correoUtem" required>
                    </div>
                    <div class="col-6">
                        <label for="carrera" class="form-label">Carrera</label>
                        <input type="text" class="form-control" id="carrera" required>
                    </div>
                    <div class="col-6">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" required>
                    </div>
                    <div class="col-6">
                        <label for="confirmPassword" class="form-label">Confirmación Password</label>
                        <input type="password" class="form-control" id="confirmPassword" required>
                    </div>
                    <div class="col-md-6 offset-md-3">
                        <div class="text-center mt-3">
                            <router-link to="/verify">
                                <button type="submit" class="btn register-button">Registrarse</button>
                            </router-link>
                        </div>
                    </div>

                </form>

            </div>
        </main>

        <Footer />
    </div>
</template>

<style scoped>
#app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

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