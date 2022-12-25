import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// Firebase
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getCurrentUser, useFirebaseAuth } from 'vuefire'

// Definimo nuestra store con Oinia similar a un composable!!!

export const useUserStore = defineStore('user', () => {
  // Estado son ref
  const user = ref(null) //ref(seedUser)

  // Getter son computed
  const userAvatar = computed(() => {
    const avatar =
      user.value?.providerData[0].photoURL ||
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
  }

  async function userLogin() {
    // Login with firebase
    const auth = useFirebaseAuth()
    const result = await signInWithPopup(auth, new GoogleAuthProvider())
    setUser(result.user)
  }

  async function userLogout() {
    // Logout from firebase
    const auth = useFirebaseAuth()
    await auth.signOut()
    setUser(null)
  }

  // Devolvemos el estado y las funciones que queramos que sean publicas
  return { user, userAvatar, userLogin, userLogout, getUser }
})
