import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { board as seedBoard, cards as seedCards, columns as seedColumns } from '@/services/seed.js'

// Definimo nuestra store con Oinia similar a un composable!!!

export const useBoardStore = defineStore('board', () => {
  // Estado son ref
  const board = ref(seedBoard)
  const columns = ref(seedColumns)
  const cards = ref(seedCards)

  // Getter son computed
  const boardName = computed(() => board.value.name)

  // Mutations y Actions son funciones
  // function increment() {
  //   count.value++
  // }

  // Devolvemos el estado y las funciones que queramos que sean publicas
  return { board, columns, cards, boardName }
})
