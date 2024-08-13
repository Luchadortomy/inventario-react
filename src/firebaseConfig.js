// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase de tu aplicación web
const firebaseConfig = {
  apiKey: "AIzaSyAsuy8524niSQYFfrGW3-wj3XRP1R3xCgA",
  authDomain: "inventario-chido.firebaseapp.com",
  databaseURL: "https://inventario-chido-default-rtdb.firebaseio.com",
  projectId: "inventario-chido",
  storageBucket: "inventario-chido.appspot.com",
  messagingSenderId: "850323714180",
  appId: "1:850323714180:web:18badb2c6c424a1d4892d1"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Configura Firestore y exporta la instancia
const db = getFirestore(app);

export { db };
