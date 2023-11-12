<script setup>
import { ref, onMounted } from 'vue';
import PostCard from './PostCard.vue';

const inputRef = ref();

onMounted(() => inputRef.value.focus())
</script>

<template>
    <div class="post-container">
        <div class="input-group mb-3 post-input">
            <input type="text" class="form-control" placeholder="en qué estás pensando?" aria-label="post thought"
                aria-describedby="post-button" id="post-input" ref="inputRef">
            <button class="btn btn-primary" type="button" id="post-button">compartir</button>
        </div>

        <div class="post-content">
            <PostCard
                :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'" />
            
            <PostCard :text="'lorem impsum'"/>

            <PostCard :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit'"/>

            <PostCard :text="'Lorem ipsum dolor sit amet, consectetur adipiscing'"/>

            <PostCard :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget ligula aliquet, laoreet ligula vel, eleifend tellus. Sed volutpat, arcu et mattis laoreet, eros purus congue elit, vel ullamcorper velit tortor eget enim. Sed id varius quam. Ut lacinia lacus a velit tristique, et imperdiet leo ultricies. Quisque nec mauris ac sapien tincidunt luctus id vel libero. In hac habitasse platea dictumst. Integer dapibus, lacus ut finibus mattis, mi augue fermentum velit, ac ultricies felis arcu nec odio.Proin eu neque vehicula, scelerisque nisi et, sollicitudin sapien. Aenean posuere vehicula sem eu imperdiet. Suspendisse potenti. Proin vel volutpat libero. In hac habitasse platea dictumst. Etiam euismod justo vitae nulla accumsan, ut hendrerit nisl semper. Maecenas consectetur, ex at facilisis auctor, eros leo tincidunt tellus, sit amet gravida justo augue et nisl. Sed ut erat eu justo egestas rhoncus vel eget orci. Fusce auctor enim ut est aliquet, id vehicula purus efficitur. Nullam eu dui vel justo ullamcorper vestibulum in vel massa. Ut vel luctus elit.'"/>
        </div>
    </div>
</template>

<style scoped>
.post-container {
    background-color: #155C5F;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 50rem;
    height: 48rem;
    border-radius: 5%;
    flex-direction: column;

}

.post-content {
    background-color: #155C5F;
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: flex-start;
    width: 45rem;
    height: 46rem;
    flex-direction: column;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    overflow-y: scroll;

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