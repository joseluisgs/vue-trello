import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// Firebase
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/services/Firebase'
import { useBoardStore } from './board'

// Definimo nuestra store con Oinia similar a un composable!!!

export const useUserStore = defineStore('user', () => {
  // Estado son ref
  const user = ref(null)

  // Getter son computed
  const userAvatar = computed(() => {
    const avatar =
      user.value?.photoURL ||
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png'
    return avatar
  })

  const userDisplayName = computed(() => {
    const displayName = user.value?.displayName || ''
    return displayName
  })

  // Mutations y Actions son funciones
  function setUser(currentUser) {
    user.value = currentUser
  }

  function getUser() {
    // Get user from firebase as a promise
    return new Promise((resolve) => {
      auth.onAuthStateChanged((user) => {
        setUser(user)
        resolve(user)
      })
    })
  }

  async function userLogin() {
    // Login with firebase
    await signInWithPopup(auth, new GoogleAuthProvider())
    await getUser()
    // Get board from firebase
    const boardStore = useBoardStore()
    // Inicializamos el board
    await boardStore.initData(user.value)
  }

  async function userLogout() {
    // Logout from firebase
    await auth.signOut()
    setUser(null)
  }

  // Devolvemos el estado y las funciones que queramos que sean publicas, quitar user si no queremos que sea publico
  return { user, userAvatar, userDisplayName, userLogin, userLogout, getUser }
})
