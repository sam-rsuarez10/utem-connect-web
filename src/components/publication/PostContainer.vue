<script setup>
import { ref, onMounted } from 'vue';
import PostCard from './PostCard.vue';

const inputRef = ref();

onMounted(() => inputRef.value.focus())
</script>

<template>
    <div class="post-container">
        <div class="input-group mb-3 post-input">
            <input type="text" class="form-control" 
                placeholder="en qué estás pensando?" 
                aria-label="post thought"
                aria-describedby="post-button" 
                id="post-input"
                ref="inputRef">
            <button class="btn btn-primary" type="button" id="post-button">compartir</button>
        </div>

        <div class="post-content">
            <PostCard />
        </div>
    </div>
</template>

<style scoped>
.post-container{
    background-color: #155C5F;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 50rem;
    height: 48rem;
    border-radius: 5%;
    flex-direction: column;

}

.post-content{
    background-color: #155C5F;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45rem;
    height: 46rem;
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

.post-input {
    margin: 2rem;
    width: 70%;
}

</style>