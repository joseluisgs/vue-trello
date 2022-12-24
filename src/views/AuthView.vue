<template>
  <div>Auth View</div>
</template>

<script setup>
  import { useUserStore } from '@/stores/user'

  const userStore = useUserStore()
  // console.log('user', userStore.user)
  // console.log('avatar', userStore.userAvatar)
</script>

<style scoped></style>
