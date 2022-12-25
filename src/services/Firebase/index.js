// importamos la instancia de firebase
import { initializeApp } from 'firebase/app'

// Firebase y sus servicios, importa lo que necesites
// import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { collection, getFirestore } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
  // your application settings
  apiKey: import.meta.env.VITE_APP_FIRE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIRE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_APP_FIRE_DATABASE_URL,
  projectId: `${import.meta.env.VITE_APP_FIRE_PROJECT_ID}`,
  storageBucket: import.meta.env.VITE_APP_FIRE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIRE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIRE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIRE_UAP,
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const boardsRef = collection(db, 'vuetrello-boards')

// Métodos de autentificación. Autenticación de Google, poner uno por método de identificación. Se debe activar en la consola de Firebase
//export const providerGoogle = new GoogleAuthProvider()
//export const auth = getAuth()
