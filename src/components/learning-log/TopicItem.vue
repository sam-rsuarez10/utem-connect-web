<script setup>
    const props = defineProps({
        topic: Object,
    })
</script>

<template>
  <li>
    <span>{{ topic.name }}</span>
    <button>Edit</button>
    <button>Delete</button>
  </li>
</template>