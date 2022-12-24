<template>
  <main class="h-full">
    <RouterView />
  </main>
  <Footer />
</template>

<script setup>
  import Footer from '@/components/Footer.vue'
  import { RouterView } from 'vue-router'
</script>

<style scoped></style>
