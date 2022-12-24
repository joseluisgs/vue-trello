<template>
  <BoardCard
    v-for="card in cards"
    :key="card.id"
    :card="card"
  />
</template>

<script setup>
  import BoardCard from '@/components/BoardCard.vue'
  import { useBoardStore } from '@/stores/board'
  import { computed } from 'vue'

  // Mis propiedades
  const props = defineProps({
    column: {
      type: Object,
    },
  })

  // La store
  const boardStore = useBoardStore()

  // De nuevo podemos usar directamente la store
  const cards = computed(() => boardStore.getCardsByColumn(props.column.id))
</script>

<style scoped></style>
