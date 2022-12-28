<template>
  <div>Card View</div>
  <div>{{ card.name }}</div>
  <div>{{ card.description }}</div>
  <div>{{ card.date}}</div>

</template>

<script setup>
  import { useBoardStore } from '@/stores/board'
  import { onMounted, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()
  const boardStore = useBoardStore()

  const card = ref({})

  async function fetchCard() {
    try {
      console.log('fetchCard-->' + route.params.id)
      const myCard = await boardStore.checkCard(route.params.id)
      card.value = myCard
    } catch (error) {
      console.error(error)
      router.push({ name: 'Board' })
    }
  }

  // Si es la primeta vez
  onMounted(async () => {
    await fetchCard()
  })

  // hacemos un watch para que cuando cambie el id de la ruta, se vuelva a ejecutar
  // la función
  watch(
    () => route.params.id,
    async () => {
      console.log('watch-->' + route.params.id)
      await fetchCard()
    }
  )

</script>

<style scoped></style>
