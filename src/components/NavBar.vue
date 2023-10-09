<script setup></script>

<template>
    <nav class="vertical-navbar">
        <ul>
            <li class="nav-item">
                <button class="nav-button">Chats</button>
            </li>

            <li class="nav-item">
                <button class="nav-button">Connect</button>
            </li>

            <li class="nav-item">
                <button class="nav-button">Buscar</button>
            </li>

        </ul>
    </nav>
</template>

<style scoped>
.vertical-navbar {
    position: fixed;
    top: calc((100vh - 15rem) / 2);
    left: 0;
    height: 15rem;
    width: 10rem;
    background-color: #4B8C8F;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5%;
}

/* Style the navigation links */
.vertical-navbar ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 2rem;
}

.vertical-navbar li {
    margin: 0;
    padding: 0;
}

.nav-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 9.5rem;

    height: 3rem;
}

.nav-button:hover {
    background-color: #1C7E1C;
    transition: 500ms;
    font-size: 1.2rem;
}

.nav-button {
    background-color: #62BD62;
    width: 9.5rem;
    height: 3rem;
    border-radius: 15%;
    color: white;
    border: none;
}
</style>