<template>
  <div class="mb-3 cursor-move rounded border border-white bg-white px-3 pt-3 pb-5 shadow">
    <h4 class="text-md font-sans font-semibold tracking-wide text-gray-700">
      {{ card.name }}
    </h4>
    <div class="mt-4 flex items-center justify-between">
      <p class="text-sm text-gray-600">{{ cardDate }}</p>
      <UserAvatar />
    </div>
  </div>
</template>

<script setup>
  import UserAvatar from '@/components/UserAvatar.vue'
  import { computed } from 'vue'

  // Mis propiedades
  const props = defineProps({
    card: {
      type: Object,
    },
  })

  const cardDate = computed(() => new Date(+props.card.date).toLocaleDateString('es-ES'))
</script>

<style scoped></style>
