// Importa las funciones que necesitas de los SDKs que necesitas
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAwUVvgO1goPcuMny-oEbQgBx0HlYgr8aA",
  authDomain: "eljardindenaru-31ba0.firebaseapp.com",
  projectId: "eljardindenaru-31ba0",
  storageBucket: "eljardindenaru-31ba0.appspot.com",
  messagingSenderId: "999653693526",
  appId: "1:999653693526:web:155af1f7ba6fdde3c243f7",
  measurementId: "G-RH9CZFP4T3"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

// Exporta las funciones de Firebase que vas a usar
export { app, analytics, auth };