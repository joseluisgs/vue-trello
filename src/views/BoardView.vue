<template>
  <div>Board View</div>
  <RouterView />
</template>

<script setup>
import { boardStore } from '@/stores/board'
 
  const { board, columns, cards } = boardStore()
  console.log('board', board)
  console.log('columns', columns)
  console.log('cards', cards)
</script>

<style scoped></style>
