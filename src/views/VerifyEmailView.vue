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
                <span>Se envió un código de verificación a tu correo utem para validarlo</span>
                <form class="row g-3">
                    <div class="input-group mb-3">
                        <input id="otp" type="text" class="form-control" placeholder="323067"
                            aria-label="Recipient's username" aria-describedby="button-addon2">
                        <button class="btn verify-button" type="button" id="button-addon2">Confirmar</button>
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
    width: 30rem;
    height: 15rem;
    border-radius: 5%;
}

.verify-button {
    background-color: #26D76D;
}

.verify-button:hover {
    background-color: #0F7D70;
    color: white;
}
</style>