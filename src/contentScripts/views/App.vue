<script setup lang="ts">
import Review from './review.vue'
const props = defineProps({
  content: {
    type: String,
    default: () => '',
  },
})
</script>

<template>
  <Review :content="props.content" />
</template>
