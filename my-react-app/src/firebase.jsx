import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAu-kx4NHvaIah7R2qewD3i-l6jkn9BP-A",
  authDomain: "mid-hackathone-smit.firebaseapp.com",
  projectId: "mid-hackathone-smit",
  storageBucket: "mid-hackathone-smit.firebasestorage.app",
  messagingSenderId: "992330056283",
  appId: "1:992330056283:web:2d1675d2cb60636fd9f57e"
};

export const app = initializeApp(firebaseConfig);