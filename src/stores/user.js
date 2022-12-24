import { defineStore } from 'pinia'
import { ref } from 'vue'

import { user as seedUser } from '@/services/seed.js'

// Definimo nuestra store con Oinia similar a un composable!!!

export const userStore = defineStore('user', () => {
  // Estado son ref
  const user = ref(seedUser)

  // Getter son computed
  //const doubleCount = computed(() => count.value * 2)

  // Mutations y Actions son funciones
  // function increment() {
  //   count.value++
  // }

  // Devolvemos el estado y las funciones que queramos que sean publicas
  return { user }
})
