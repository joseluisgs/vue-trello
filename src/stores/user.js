import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// Firebase
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getCurrentUser, useFirebaseAuth } from 'vuefire'

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

  // Mutations y Actions son funciones
  function setUser(currentUser) {
    user.value = currentUser
  }

  async function getUser() {
    // Get user from firebase
    const currentUser = await getCurrentUser()
    setUser(currentUser)
    return currentUser
  }

  async function userLogin() {
    // Login with firebase
    const auth = useFirebaseAuth()
    await signInWithPopup(auth, new GoogleAuthProvider())
    getUser()
  }

  async function userLogout() {
    // Logout from firebase
    const auth = useFirebaseAuth()
    await auth.signOut()
    setUser(null)
  }

  // Devolvemos el estado y las funciones que queramos que sean publicas, quitar user si no queremos que sea publico
  return { user, userAvatar, userLogin, userLogout, getUser }
})
