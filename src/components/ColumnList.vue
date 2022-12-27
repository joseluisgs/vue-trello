<template>
  <!-- draggable -->
  <draggable
    v-model="columns"
    class="board"
    item-key="id"
    group="columns"
  >
    <!-- Mirar la documentación porque se debe llamar así-->
    <template #item="{ element }">
      <AppColumn :column="element">
        <CardList :column="element" />
      </AppColumn>
    </template>
  </draggable>
</template>

<script setup>
  import AppColumn from '@/components/AppColumn.vue'
  import CardList from '@/components/CardList.vue'
  import { useBoardStore } from '@/stores/board'
  import { computed } from 'vue'
  import draggable from 'vuedraggable' // Para arrastrar

  // La store
  const boardStore = useBoardStore()
  // getter y setter
  const columns = computed({
    get: () => boardStore.boardColumns,
    set: (columns) => boardStore.updateColumns(columns),
  })
</script>

<style scoped>
  .board {
    @apply grid min-h-[50vh] overflow-x-auto py-10 grid-cols-5 gap-4;
  }
</style>
