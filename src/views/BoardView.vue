<template>
  <NavBar />
  <ColumnList />
  <RouterView />
</template>

<script setup>
  import ColumnList from '@/components/ColumnList.vue'
  import NavBar from '@/components/NavBar.vue'
  import { useBoardStore } from '@/stores/board'
  import { useUserStore } from '@/stores/user'
  import { onMounted } from 'vue'

  const boardStore = useBoardStore()
  const userStore = useUserStore()

  // Cuando se monta el componente, se cambia el tema
  onMounted(async () => {
    const user = await userStore.getUser()
    await boardStore.getBoard(user)
  })
</script>

<style scoped></style>
