<template>
  <div class="avatar">
    <div class="w-8 rounded-full">
      <img :src="userAvatar"  referrerpolicy="no-referrer"/>
    </div>
  </div>
</template>

<script setup>
  import { useUserStore } from '@/stores/user'
  import { computed } from 'vue'

  // La store
  const userStore = useUserStore()

  // computed de avatar, podría usar la store directamente
const userAvatar = computed(() => userStore.userAvatar)
  // console.log(userAvatar.value)
</script>

<style scoped></style>
