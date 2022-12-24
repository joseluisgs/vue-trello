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
      <Icon
        icon="mdi:theme-light-dark"
        class="mx-1 text-2xl text-primary-focus"
      />
      <div class="form-control">
        <input
          data-toggle-theme="light,night"
          data-act-class="night"
          type="checkbox"
          class="toggle-primary toggle"
          checked
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import UserAvatar from '@/components/UserAvatar.vue'
  import { useBoardStore } from '@/stores/board'
  import { Icon } from '@iconify/vue'
  import { themeChange } from 'theme-change'
  import { computed, onMounted } from 'vue'

  // La store
  const boardStore = useBoardStore()

  // Cuando se monta el componente, se cambia el tema
  onMounted(() => {
    themeChange(false)
  })

  // computed de avatar, podría usar la store directamente
  const boardName = computed(() => boardStore.boardName)
</script>

<style scoped></style>
