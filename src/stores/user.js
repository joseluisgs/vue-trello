import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { user as seedUser } from '@/services/seed.js'

// Definimo nuestra store con Oinia similar a un composable!!!

export const useUserStore = defineStore('user', () => {
  // Estado son ref
  const user = ref(seedUser)

  // Getter son computed
  const userAvatar = computed(() => user.value.avatar)

  // Mutations y Actions son funciones
  // function increment() {
  //   count.value++
  // }

  // Devolvemos el estado y las funciones que queramos que sean publicas
  return { user, userAvatar }
})
