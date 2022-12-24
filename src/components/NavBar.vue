<template>
  <div class="relative flex items-start justify-center">
    <div class="flex items-center">
      <div>
        <h1 class="text-center font-sans text-3xl font-semibold tracking-wide text-gray-700">
          {{ boardName }}
        </h1>
        <a
          href="#"
          class="ml-2 mt-3 block text-center text-sm"
          >Create column</a
        >
      </div>
    </div>
    <div class="absolute right-0 top-0 flex items-center">
      <a
        href="#"
        class="mr-2 text-sm"
        >Change background</a
      >
      <input
        type="search"
        class="mr-3 rounded bg-gray-300 p-1 text-sm text-gray-600"
        placeholder="Search cards"
      />
      <UserAvatar />
      <a
        href="#"
        class="ml-2 text-sm"
        >Logout</a
      >
    </div>
  </div>
</template>

<script setup>
  import UserAvatar from '@/components/UserAvatar.vue'
  import { useBoardStore } from '@/stores/board'
  import { computed } from 'vue'

  // La store
  const boardStore = useBoardStore()

  // computed de avatar, podría usar la store directamente
  const boardName = computed(() => boardStore.boardName)
</script>

<style scoped></style>
