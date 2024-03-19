<template>
  <div>
    <a-spin v-if="isLoading" class="custom-spin" />
    <RouterView v-if="!isLoading" />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
})
</script>
