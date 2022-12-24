<template>
  <NavBar />
  <RouterView />
</template>

<script setup>
  import NavBar from '@/components/NavBar.vue'
  import { useBoardStore } from '@/stores/board'

  const { board, columns, cards } = useBoardStore()
  console.log('board', board)
  console.log('columns', columns)
  console.log('cards', cards)
</script>

<style scoped></style>
