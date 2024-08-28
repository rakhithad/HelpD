// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCkxGOldJvgtjkLqC9gwZmg5HLOs8Jd0Bg",
    authDomain: "helpdesk-f2ac9.firebaseapp.com",
    projectId: "helpdesk-f2ac9",
    storageBucket: "helpdesk-f2ac9.appspot.com",
    messagingSenderId: "1081461760629",
    appId: "1:1081461760629:web:64a2e1af2af2f8ed4d8e3c",
    measurementId: "G-4GGNRL1Y2R"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth };
