<script setup>
import {reactive} from "vue";
import axios from 'axios';

const emit = defineEmits();
const props = defineProps({
    topic: Object,
});

const topicState = reactive({
    edited: false,
    name: props.topic.name,
});

const toggleEdit = () => {
    topicState.edited = !topicState.edited;
}

const confirmEdit = async () => {
    try {
        const response = await axios.patch(
            `http://127.0.0.1:8000/learning-api/topics/${props.topic.name}`,
            { name: topicState.name },
            {
                headers: {
                  Authorization: 'Token a66f357220a8f88926712f4837ae2e6ddf291376',
                },
            }
        );
        if (response.status == 200){
            topicState.edited = false;
            props.topic.name = topicState.name;
        }
    } catch (error) {
        console.error('Error editing topic: ', error)
    }
};

const deleteTopic = async () => {
    try {
        const response = await axios.delete(
            `http://127.0.0.1:8000/learning-api/topics/${props.topic.name}`,
            {
                headers: {
                  Authorization: 'Token a66f357220a8f88926712f4837ae2e6ddf291376',
                },
            }
        );
        if (response.status == 204){
            emit("topic-deleted", props.topic.name);    
        }
    } catch (error) {
        console.error('Error deleting topic: ', error)
    }
};

</script>

<template>
  <li>
    <span v-if="!topicState.edited">{{ topicState.name }}</span>
    <input v-else v-model="topicState.name" />
    <button v-if="!topicState.edited" @click="toggleEdit">Edit</button>
    <button v-else @click="confirmEdit">Confirm</button>
    <button @click="deleteTopic">Delete</button>
  </li>
</template>