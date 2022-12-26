import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// Firebase
import { boardsCollection, columnsCollection } from '@/services/Firebase'
import { doc, getDoc, query, setDoc, where, onSnapshot } from 'firebase/firestore'

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

  const getNextColumnOrder = computed(
    () => Math.max(...columns.value.map((column) => column.order)) + 1
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

  function setColumns(newColumns) {
    columns.value = newColumns
  }

  async function getColumns(user) {
    console.log('obteniendo columnas')
    const uid = user.uid
    const q = query(columnsCollection, where('board', '==', uid))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const columns = []
      querySnapshot.forEach((doc) => {
        columns.push(doc.data())
      })
      setColumns(columns)
    })
  }

  async function createColumn(user) {
    const refDoc = doc(columnsCollection)
    const { id } = refDoc
    // Creamos la columna por defecto
    const column = {
      name: 'New Column',
      id,
      board: user.uid,
      order: columns.value.length ? getNextColumnOrder.value : 0, // Si no hay columnas, el orden es 0 sino el maximo orden + 1
    }
    // Guardamos la columna en firebase
    await setDoc(refDoc, column)
  }

  function updateColumns(columns) {
    console.log('updateColumns', columns)
  }

  function updateCards({ column, cards }) {
    console.log('updateCards', { column, cards })
  }

  async function initData(user) {
    await getBoard(user)
    await getColumns(user)
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
    createColumn,
    initData,
  }
})
