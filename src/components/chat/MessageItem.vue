<script setup>
import { computed } from 'vue';

const messageProps = defineProps({
    text: String,
    myMessage: Boolean, // message belongs to logged user
});

const textColor = computed(() => {
    return messageProps.myMessage ?'#2B8346' : '#003D3D';
});
</script>

<template>
    <div class="message-container" :class="{ 'my-message': messageProps.myMessage }">
        <div class="text-container" :style="{ backgroundColor: textColor }">
            <p class="text-message">{{ messageProps.text }}</p>
        </div>
    </div>
</template>
  
<style scoped>
.message-container {
    display: flex;
    margin: 0.5rem;

}

.my-message {
    justify-content: flex-end;
    /* Place message at the right side if it's the user's message */
}

.text-container {
    max-width: 20rem;
    /* Set your specific max width here */
    word-wrap: break-word;
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.text-message {
    margin: 0;
    /* Remove default margin to align text with the message box */
}
</style>