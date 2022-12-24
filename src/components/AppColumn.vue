<template>
  <div class="column mr-4 cursor-move rounded bg-gray-100 p-3 shadow-md">
    <div class="flex justify-between">
      <div class="flex flex-row justify-center items-center">
        <Icon
          icon="material-symbols:delete"
          class="text-gray-600 mr-1"
        />
        <a
          href="#"
          class="text-sm text-gray-600"
        >
          Delete</a
        >
      </div>

      <div class="flex flex-row justify-center items-center">
        <Icon
          icon="mdi:card-plus"
          class="text-gray-600 mr-1"
        />
        <a
          href="#"
          class="text-sm text-gray-600"
        >
          Create Card</a
        >
      </div>
      
    </div>
    <h3 class="mb-3 text-center font-sans text-xl font-semibold tracking-wide text-primary-focus">
      {{ column.name }}
    </h3>
    <!-- Card -->
    <slot></slot>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
  // Mis propiedades
  const props = defineProps({
    column: {
      type: Object,
    },
  })

  // Mis metodos
</script>

<style scoped>
  .column {
    @apply basis-1/4; /* flex-basis: 25%   25% del ancho del contenedor 4 columnas */
  }
</style>
