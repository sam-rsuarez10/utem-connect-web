<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TopicItem from '../components/learning-log/TopicItem.vue';

const topics = ref([]);

const fetchTopics = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/learning-api/topics', {
            headers: {
                Authorization: 'Token a66f357220a8f88926712f4837ae2e6ddf291376',
            },
        });
        topics.value = response.data;
    } catch (error) {
        console.error('Error fetching topics:', error);
    }
};

onMounted(fetchTopics);
</script>


<template>
  <div>
    <h1>Topics</h1>
    <button>Add</button>
      <ul>
        <TopicItem v-for="topic in topics['spiderman_23 topics']" :topic="topic" />
      </ul>
  </div>
</template>

<style scoped>
</style>