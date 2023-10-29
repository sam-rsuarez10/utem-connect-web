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
                <div class="login-container">
                    <router-link to="/login">
                        <button class="option-button">Login</button>
                    </router-link>
                    <router-link to="/register">
                        <button class="option-button">Registrarse</button>
                    </router-link>
                </div>
            </div>
        </main>
        <Footer />
    </div>

    <div class="right-panel">
        <div class="description-container">
            <div class="presentation-logo"></div>
            <p class="presentation-description">¡Bienvenido a UtemConnect! Somos la red social exclusiva de la Universidad 
                Tecnológica Metropolitana, diseñada para que nuestros estudiantes interactúen 
                y se conozcan entre sí. Conéctate con tus compañeros y forma nuevas amistades 
                en un entorno especialmente creado para ti :) </p>
        </div>
    </div>
</template>


<style scoped>
#app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 50%;
    /* Half of the viewport width */
    position: relative;
    /* Make sure the parent is a positioned element */
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
    width: 30rem;
    height: 20rem;
    border-radius: 5%;
}

.login-container {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
}

.option-button {
    background-color: #26D76D;
    width: 10rem;
    height: 3.5rem;
    border-radius: 5%;
}

.right-panel {
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: 50%;
    background-color: #155C5F;
    display: flex;
    justify-content: center;
    align-items: center;
}

.description-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5rem;
}

.presentation-logo {
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
    background-image: url('../assets/img/cover.jpeg');
    background-size: cover;
    background-position: center center;
    order: -1;
}

.presentation-description {
    width: 25rem;
    text-align: center;
    color: white;
    font-size: 1.2rem;
    font-family: 'Courier New', Courier, monospace;
}
</style>
