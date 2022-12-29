<template>
  <div>Card View</div>
  <AppCard :card="card" />
</template>

<script setup>
  import AppCard from '@/components/AppCard.vue'
  import { useBoardStore } from '@/stores/board'
  import { onMounted, ref, watch, watchEffect } from 'vue'
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

  // watchEffect se ejecuta cada vez que cambia algo en el componente, me ahorro el watch y el onMounted
  watchEffect(async () => {
    console.log('watchEffect-->' + route.params.id)
    await fetchCard()
  })

  // Si es la primeta vez
  // onMounted(async () => {
  //   await fetchCard()
  // })

  // hacemos un watch para que cuando cambie el id de la ruta, se vuelva a ejecutar
  // la función
  // watch(
  //   () => route.params.id,
  //   async () => {
  //     console.log('watch-->' + route.params.id)
  //     await fetchCard()
  //   }
  // )
</script>

<style scoped></style>
