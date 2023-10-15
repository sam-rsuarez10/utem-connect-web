<script setup>

const panelProps = defineProps({
    title: String,
    flag: String,
})
</script>

<template>
    <div class="right-panel">
        <div id="panel-title">
            <h3>{{ panelProps.title }}</h3>
        </div>

        <div id="panel-content">
            {{ panelProps.flag }}
            content
        </div>
    </div>
</template>

<style scoped>
.right-panel {
    position: fixed;
    top: 5rem;
    right: 0;
    bottom: 5rem;
    width: 25rem;
    background-color: #4B8C8F;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#panel-title {
    padding: 1.5rem;
}

#panel-content {
    width: 100%;
    height: 90%;
}
</style>
