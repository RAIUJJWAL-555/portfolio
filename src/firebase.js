import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyCOHkNbOkTbEhuki-ZpHppQ0cFOF7xPnTA",
    authDomain: "portfolio-app-ad65f.firebaseapp.com",
    projectId: "portfolio-app-ad65f",
    storageBucket: "portfolio-app-ad65f.firebasestorage.app",
    messagingSenderId: "557087177494",
    appId: "1:557087177494:web:5c3638c78c51860ba36e37",
    measurementId: "G-K4E0G192BN",
    dataBaseURL:"https://portfolio-app-ad65f-default-rtdb.firebaseio.com/"
  };
  const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
