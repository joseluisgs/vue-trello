import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// Firebase
import { boardsCollection, cardsCollection, columnsCollection } from '@/services/Firebase'
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

  const getNextCardOrder = computed(() => Math.max(...cards.value.map((card) => card.order)) + 1)

  const getBoardBackgroundColor = computed(() => board.value.backgroundColor)

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
      console.log('Creando board vacío para usuario')
      await setDoc(doc(boardsCollection, uid), defaultBoard)
      setBoard(defaultBoard)
    } else {
      // Si existe el board, creamos uno por defecto
      console.log('Obtener el board del usuario')
      setBoard(myBoard.data())
    }
  }

  async function updateBoardName(uid, newName) {
    const boardRef = doc(boardsCollection, uid)
    await updateDoc(boardRef, {
      name: newName,
    })
  }

  async function updateBoardBackgroundColor(uid, newColor) {
    const boardRef = doc(boardsCollection, uid)
    await updateDoc(boardRef, {
      backgroundColor: newColor,
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
      // Ha cambiado el orden de la columna?
      if (column.order !== index) {
        column.order = index
        await updateColumnOrder(column)
      }
    })
  }

  async function deleteColumn(idColumn) {
    const columnRef = doc(columnsCollection, idColumn)
    await deleteDoc(columnRef)
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

  async function createCard(user, columnId) {
    console.log('creando tarjeta', user.uid, columnId)
    const refDoc = doc(cardsCollection)
    const { id } = refDoc
    // Creamos la columna por defecto
    const card = {
      name: 'New Card',
      description: 'This is a card description',
      id,
      board: user.uid,
      column: columnId,
      date: new Date().getTime() + 5 * 24 * 60 * 60 * 1000, // 5 dias
      done: false,
      order: cards.value.length ? getNextCardOrder.value : 0, // Si no hay columnas, el orden es 0 sino el maximo orden + 1
    }
    // Guardamos la tarjeta en firebase
    await setDoc(refDoc, card)
  }

  async function updateCardMetadata(card) {
    const cardRef = doc(cardsCollection, card.id)
    await updateDoc(cardRef, {
      order: card.order,
      column: card.column,
    })
  }

  function updateCards(column, cards) {
    console.log('updateCards', column, cards)
    cards.forEach(async (card, index) => {
      // Ha cambiado el orden de la tarjeta? --> en la columna o se ha ido a tra columna o ambas
      if (card.order !== index || card.column !== column.id) {
        card.order = index
        card.column = column.id
        await updateCardMetadata(card)
      }
    })
  }

  function checkCard(cardId) {
    return new Promise(async (resolve, reject) => {
      // Buscamos localmente en el estado
      if (cards.value.length) {
        const localCard = cards.value.find((card) => card.id === cardId)
        if (localCard) {
          resolve(localCard)
        } else {
          reject('Card not found')
        }
      } else {
        // Si no hay tarjetas en el estado, las buscamos en firebase
        console.log('Buscando en firebase')
        const myCardRef = doc(cardsCollection, cardId)
        const myCard = await getDoc(myCardRef)
        if (myCard.exists()) {
          resolve(myCard.data())
        } else {
          reject('Card not found')
        }
      }
    })
  }

  async function updateCardInfo(card) {
    const [id, key, value] = Object.values(card)
    console.log('updateCardInfo', id, key, value)
    const cardRef = doc(cardsCollection, id)
    await updateDoc(cardRef, {
      [key]: value,
    })
  }

  async function deleteCard(idCard) {
    const cardRef = doc(cardsCollection, idCard)
    await deleteDoc(cardRef)
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
    createCard,
    checkCard,
    updateCardInfo,
    deleteCard,
    getBoardBackgroundColor,
    updateBoardBackgroundColor,
    initBoard,
    resetBoard,
  }
})
