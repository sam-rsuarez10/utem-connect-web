<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TopicItem from '../components/learning-log/TopicItem.vue';
import { fetchTopics } from '../utils/fetchTopics'; 

const topics = ref([]);
const addingTopic = ref(false); // Flag to track "Add" mode
const newTopicName = ref('');


const addTopic = async () => {

    if (!newTopicName.value.trim()) {
        console.error('Topic name cannot be blank.');
        return;
      }

    try {
        const response = await axios.post('http://127.0.0.1:8000/learning-api/topics', {
            name: newTopicName.value,
        }, {
            headers: {
                Authorization: 'Token a66f357220a8f88926712f4837ae2e6ddf291376',
            },
        });

        if (response.status === 201) {
            newTopicName.value = ''; // Clear the input field
            addingTopic.value = false; // Exit "Add" mode
            const topicsData = await fetchTopics(true);
            topics.value = topicsData;
        }
    } catch (error) {
        console.error('Error adding topic:', error);
    }
};

const cancelAddTopic = () => {
    newTopicName.value = '';
    addingTopic.value = false;
};
onMounted(async () => {
  try {
    // Fetch topics for this route using the fetchTopics function
    const topicsData = await fetchTopics(true);
    topics.value = topicsData;
  } catch (error) {
    console.error('Error fetching topics:', error);
  }
});
</script>


<template>
  <div>
    <h1>Topics</h1>
    <button @click="addingTopic = true">Add</button>
    <!-- Input field for new topic when addingTopic is true -->
    <input v-if="addingTopic" v-model="newTopicName" />
    <button v-if="addingTopic" @click="addTopic">Confirm</button>
    <button v-if="addingTopic" @click="cancelAddTopic">Cancel</button>
      <ul>
        <TopicItem v-for="topic in topics['spiderman_23 topics']" :topic="topic" />
      </ul>
  </div>
</template>

<style scoped>
</style>