<template>
  <div class="column cursor-move rounded bg-gray-100 p-3 shadow-md">
    <div class="flex justify-between">
      <div class="flex flex-row items-center justify-center">
        <Icon
          v-if="emptyColumn"
          icon="material-symbols:delete"
          class="mr-1 text-red-500"
          @click="deleteColumn"
        />
        <a
          v-if="emptyColumn"
          @click="deleteColumn"
          href="#"
          class="text-sm text-red-500"
        >
          Delete</a
        >
      </div>

      <div class="flex flex-row items-center justify-center">
        <Icon
          icon="mdi:card-plus"
          class="mr-1 text-indigo-500"
        />
        <a
          @click="createCard"
          href="#"
          class="text-sm text-indigo-500"
        >
          Create Card</a
        >
      </div>
    </div>
    <h3
      class="mb-3 cursor-text py-1 text-center font-sans text-xl font-semibold tracking-wide text-primary-focus"
      contenteditable
      @blur="onEdit"
    >
      {{ column.name }}
    </h3>
    <!-- Card -->
    <slot></slot>
  </div>
</template>

<script setup>
  import { useBoardStore } from '@/stores/board'
  import { useUserStore } from '@/stores/user'
  import { Icon } from '@iconify/vue'
  import { computed } from 'vue'
  // Mis propiedades
  const props = defineProps({
    column: {
      type: Object,
    },
  })

  const boardStore = useBoardStore()
  const userStore = useUserStore()

  // Ojo, no borar si hay algo de búsqueda
  const emptyColumn = computed(
    () =>
      boardStore.getCardsByColumn(props.column.id).length === 0 && boardStore.getSearchTerm === ''
  )

  // Mis metodos
  async function onEdit(event) {
    try {
      if (event.target.innerText.trim() === '') return (event.target.innerText = props.column.name)
      await boardStore.updateColumnName(props.column.id, event.target.innerText.trim())
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteColumn() {
    try {
      await boardStore.deleteColumn(props.column.id)
    } catch (error) {
      console.error(error)
    }
  }

  async function createCard() {
    try {
      const user = await userStore.getUser()
      await boardStore.createCard(user, props.column.id)
    } catch (error) {
      console.error(error)
    }
  }
</script>

<style scoped>
  .column {
    @apply basis-1/4; /* flex-basis: 25%   25% del ancho del contenedor 4 columnas */
  }
</style>
