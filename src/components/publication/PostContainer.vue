<script setup>
import { ref, onMounted, reactive } from 'vue';
import PostCard from './PostCard.vue';
import { fetchPosts } from '../../utils/fetchPosts';
import axios from '@/axios';

const inputRef = ref();

const feed = ref([]); // users posts

const props = defineProps({
    username: String,
    token: String,
});

const fetchUserPosts = async () => {
    const response = await fetchPosts(true, props.token);
    if (response.status == 200)
        feed.value = response.data.posts;
};

onMounted(async () => {
    await fetchUserPosts();
    inputRef.value.focus();
});

const refreshFeed = async () => {
    await fetchUserPosts();

    // Scroll the post-content div back to the top
    const postContent = document.querySelector('.post-content');
    if (postContent) {
        postContent.scrollTop = 0;
    }
};

const sharePost = async () => {

    let text = inputRef.value.value.trim(); 

    if (text == '')
        return;

    try {
        const response = await axios.post('/publication-api/posts', { 'text': text }, {
            headers: {
                Authorization: `Token ${props.token}`,
            }
        });

        if (response.status == 201){
            await fetchUserPosts();
            inputRef.value.value = '';
        }

    } catch (error) {
        console.log('error sharing post: ', error);
    }
};
</script>

<template>
    <div class="post-container">
        <div class="input-group mb-3 post-input">
            <input type="text" class="form-control" placeholder="en qué estás pensando?" aria-label="post thought"
                aria-describedby="post-button" id="post-input" ref="inputRef" @v="postText">
            <button class="btn btn-primary" type="button" id="post-button" @click="sharePost()">compartir</button>
        </div>

        <i title="actualizar feed" class='bx bx-refresh bx-lg bx-spin-hover' style='color:#837c7c' @click="refreshFeed()"></i>

        <div class="post-content">
            <PostCard v-for="post in feed" :key="post.id" :user-post="post" :logged-user="props.username" />
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

i:hover {
    cursor: pointer;
    animation-iteration-count: initial;
}
</style>