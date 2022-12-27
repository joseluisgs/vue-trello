<template>
  <!-- draggable -->
  <draggable
    v-model="cards"
    group="cards"
    item-key="id"
  >
    <template #item="{ element }">
      <BoardCard :card="element" />
    </template>
  </draggable>
</template>

<script setup>
  import BoardCard from '@/components/BoardCard.vue'
  import { useBoardStore } from '@/stores/board'
  import { computed } from 'vue'
  import draggable from 'vuedraggable' // Para arrastrar

  // Mis propiedades
  const props = defineProps({
    column: {
      type: Object,
    },
  })

  // La store
  const boardStore = useBoardStore()

  // De nuevo podemos usar directamente la store
  const cards = computed({
    get: () => boardStore.getCardsByColumn(props.column.id),
    set: (cards) => boardStore.updateCards(props.column, cards),
  })
</script>

<style scoped></style>
