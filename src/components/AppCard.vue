<template>
  <div
    class="wrapper absolute top-0 left-0 z-10 flex h-full w-full cursor-pointer items-center justify-center bg-base-300 bg-opacity-90"
  >
    <div class="w-1/3 rounded bg-white p-3 shadow-md">
      <div class="flex items-center">
        <UserAvatar />
        <h1
          contenteditable
          class="ml-2 cursor-text text-center font-sans text-2xl font-semibold tracking-wide text-primary-focus"
        >
          {{ card.name }}
        </h1>
        <div class="flex-grow text-sm text-red-500">
          <div class="flex items-center justify-end">
            <Icon
              icon="material-symbols:delete"
              class="mr-1 text-right"
            />
            <a href="#">Delete Card</a>
          </div>
        </div>
      </div>
      <div class="my-3 flex items-center justify-between">
        <div>
          <label
            class="mr-3 text-sm text-indigo-600"
            for="done"
            >Mark as done</label
          >
          <input
            type="checkbox"
            id="done"
            :checked="card.done"
            class="checkbox-success checkbox checkbox-xs"
          />
        </div>
        <input
          class="bg-indigo-400 rounded p-1 text-sm text-primary-content"
          type="date"
          :value="cardDate"
        />
      </div>
      <p
        contenteditable
        class="cursor-text text-gray-600 text-sm"
      >
        {{ card.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
  import UserAvatar from '@/components/UserAvatar.vue';
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

  // Mis propiedades
  const props = defineProps({
    card: {
      type: Object,
    },
  })

  const cardDate = computed(() => new Date(+props.card.date).toLocaleDateString('en-CA'))
</script>

<style scoped></style>
