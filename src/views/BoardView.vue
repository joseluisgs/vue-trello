<template>
  <NavBar />
  <ColumnList />
  <RouterView />
</template>

<script setup>
  import ColumnList from '@/components/ColumnList.vue'
  import NavBar from '@/components/NavBar.vue'

  // const { board, columns, cards } = useBoardStore()
  // console.log('board', board)
  // console.log('columns', columns)
  // console.log('cards', cards)
</script>

<style scoped></style>
