// lib/firebaseConfig.ts
import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native'
import { getFirestore } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: "AIzaSyA3KpGqrmUj35BBvQmO1VKr-SD4O_B7PO4",
  authDomain: "barbeariaapp-9bb29.firebaseapp.com",
  projectId: "barbeariaapp-9bb29",
  storageBucket: "barbeariaapp-9bb29.appspot.com", // <- CORRETO!
  messagingSenderId: "1091512827285",
  appId: "1:1091512827285:web:ef1e72e305d6f301ef4a9c"
}

// Inicializa o app
const app = initializeApp(firebaseConfig)

// Inicializa o Auth com persistência no AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

// Inicializa o Firestore
const db = getFirestore(app)

export { auth, db }
