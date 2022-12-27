import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// Firebase
import { boardsCollection, columnsCollection, cardsCollection } from '@/services/Firebase'
import {
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'

// Definimo nuestra store con Oinia similar a un composable!!!

export const useBoardStore = defineStore('board', () => {
  // Estado son ref
  const board = ref({})
  const columns = ref([])
  const cards = ref([])

  const unsubscribeColumns = ref(null)
  const unsubscribeCards = ref(null)

  // Getter son computed
  const boardName = computed(() => board.value.name)
  const boardColumns = computed(() =>
    columns.value
      .filter((column) => column.board === board.value.id)
      .sort((a, b) => a.order - b.order)
  )
  const getCardsByColumn = computed(
    () => (column) =>
      cards.value.filter((card) => card.column === column).sort((a, b) => a.order - b.order)
  )

  const getNextColumnOrder = computed(
    () => Math.max(...columns.value.map((column) => column.order)) + 1
  )

  // Mutations y Actions son funciones

  // Board
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

  async function updateBoardName(uid, newName) {
    const boardRef = doc(boardsCollection, uid)
    await updateDoc(boardRef, {
      name: newName,
    })
  }

  async function initBoard(user) {
    console.log('initData')
    await getBoard(user)
    await getColumns(user)
    await getCards(user)
  }

  async function resetBoard() {
    // Quitamos los listeners de firebase
    console.log('unsubscribe')
    unsubscribeColumns.value()
    unsubscribeCards.value()
  }

  // Columns
  function setColumns(newColumns) {
    columns.value = newColumns
  }

  async function getColumns(user) {
    console.log('obteniendo columnas')
    const uid = user.uid
    const q = query(columnsCollection, where('board', '==', uid))
    unsubscribeColumns.value = onSnapshot(q, (querySnapshot) => {
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

  async function updateColumnName(idColumn, newName) {
    const columnRef = doc(columnsCollection, idColumn)
    await updateDoc(columnRef, {
      name: newName,
    })
  }

  async function updateColumnOrder(column) {
    const columnRef = doc(columnsCollection, column.id)
    await updateDoc(columnRef, {
      order: column.order,
    })
  }

  function updateColumns(columns) {
    columns.forEach(async (column, index) => {
      if (column.order !== index) {
        column.order = index
        await updateColumnOrder(column)
      }
    })
  }

  async function deleteColumn(idColumn) {
    const columnRef = doc(columnsCollection, idColumn)
    await deleteDoc(columnRef)
    // Deberíamos borrar las tarjetas de la columna
  }

  // Cards

  function setCards(newCards) {
    cards.value = newCards
  }

  async function getCards(user) {
    console.log('obteniendo tarjetas')
    const uid = user.uid
    const q = query(cardsCollection, where('board', '==', uid))
    unsubscribeCards.value = onSnapshot(q, (querySnapshot) => {
      const cards = []
      querySnapshot.forEach((doc) => {
        cards.push(doc.data())
      })
      setCards(cards)
    })
  }
  

  function updateCards({ column, cards }) {
    console.log('updateCards', { column, cards })
  }

  // Devolvemos el estado y las funciones que queramos que sean publicas
  // quitar las que no queramos que sean publicas
  return {
    board,
    columns,
    cards,
    boardName,
    boardColumns,
    updateBoardName,
    getCardsByColumn,
    updateColumns,
    updateCards,
    createColumn,
    updateColumnName,
    deleteColumn,
    initBoard,
    resetBoard,
  }
})
