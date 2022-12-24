<template>
  <div class="column mr-4 cursor-move rounded bg-gray-100 p-3 shadow-md">
    <div class="flex justify-between">
      <a
        class="block text-right text-sm text-gray-600"
        href="#"
        >Delete</a
      >
      <a
        class="block text-right text-sm text-gray-600"
        href="#"
        >Create Card</a
      >
    </div>
    <h3 class="mb-3 text-center font-sans text-xl font-semibold tracking-wide text-primary-focus">
      {{ column.name }}
    </h3>
    <!-- Card -->
    <slot></slot>
  </div>
</template>

<script setup>
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
