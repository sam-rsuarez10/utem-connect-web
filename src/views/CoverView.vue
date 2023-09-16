<template>
    <div id="app">
        <header>
            <h1 id="header-title">UtemConnect</h1>
        </header>
        <main>
            <div class="container">
                <div class="login-container">
                    <button class="option-button">Login</button>
                    <button class="option-button">Registrarse</button>
                </div>
            </div>
        </main>
        <footer>
            <h6>Developed by Samuel Reyes Suárez</h6>
        </footer>
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

footer {
    background-color: #D9D9D9;
    color: black;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
}
</style>