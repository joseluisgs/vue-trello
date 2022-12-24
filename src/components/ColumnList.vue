<template>
  <div class="board">
    <!-- recorremos las columnas -->
    <AppColumn
      v-for="column in columns"
      :key="column.id"
      :column="column"
    >
      <CardList :column="column" />
    </AppColumn>
  </div>
</template>

<script setup>
  import AppColumn from '@/components/AppColumn.vue'
  import CardList from '@/components/CardList.vue'
  import { useBoardStore } from '@/stores/board'
  import { computed } from 'vue'

  // La store
  const boardStore = useBoardStore()
  const columns = computed(() => boardStore.boardColumns)
</script>

<style scoped>
  .board {
    @apply flex min-h-[50vh] overflow-x-auto py-10;
  }
</style>
