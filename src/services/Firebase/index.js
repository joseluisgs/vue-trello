// importamos la instancia de firebase
import { initializeApp } from 'firebase/app'

// Firebase y sus servicios, importa lo que necesites
// Firestore
import { collection, getFirestore } from 'firebase/firestore'
// Auth
import { getAuth } from 'firebase/auth'
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

// usamos el servicio de firestore
const db = getFirestore(firebaseApp)

// colecciones de firestore
export const boardsCollection = collection(db, 'vuetrello-boards')
export const columnsCollection = collection(db, 'vuetrello-columns')
export const cardsCollection = collection(db, 'vuetrello-cards')

// Métodos de autentificación. Autenticación de Google, poner uno por método de identificación. Se debe activar en la consola de Firebase
export const auth = getAuth()
