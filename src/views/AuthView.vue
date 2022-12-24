<template>
  <div>Auth View</div>
</template>

<script setup>
  import { userStore } from '@/stores/user'

  const { user } = userStore()
  console.log('user', user)
</script>

<style scoped></style>
