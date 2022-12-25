import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// Firebase
import { boardsCollection } from '@/services/Firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

// Definimo nuestra store con Oinia similar a un composable!!!

export const useBoardStore = defineStore('board', () => {
  // Estado son ref
  const board = ref({})
  const columns = ref([])
  const cards = ref([])

  // Getter son computed
  const boardName = computed(() => board.value.name)
  const boardColumns = computed(() =>
    columns.value.filter((column) => column.board === board.value.id)
  )
  const getCardsByColumn = computed(
    () => (column) =>
      cards.value.filter((card) => card.column === column).sort((a, b) => a.order - b.order)
  )

  // Mutations y Actions son funciones
  function setBoard(newBoard) {
    board.value = newBoard
  }

  async function getBoard(user) {
    const uid = user.uid
    // Board por defecto
    const defaultBoard = {
      name: 'Your first board 🔥',
      id: uid,
      backgroundColor: '#FFFFFF',
    }
    // obtenemos la coleccion de boards de firebase del usuario actual
    const myBoardRef = doc(boardsCollection, uid)
    const myBoard = await getDoc(myBoardRef)

    // Si no existe el board, creamos uno por defecto
    if (!myBoard.exists()) {
      console.log('Creando board por defecto')
      await setDoc(doc(boardsCollection, uid), defaultBoard)
      setBoard(defaultBoard)
    } else {
      // Si existe el board, creamos uno por defecto
      console.log('Obtener el board por defecto')
      setBoard(myBoard.data())
    }
  }

  function updateColumns(columns) {
    console.log('updateColumns', columns)
  }

  function updateCards({ column, cards }) {
    console.log('updateCards', { column, cards })
  }

  // Devolvemos el estado y las funciones que queramos que sean publicas
  return {
    board,
    columns,
    cards,
    boardName,
    boardColumns,
    getCardsByColumn,
    updateColumns,
    updateCards,
    getBoard,
  }
})
