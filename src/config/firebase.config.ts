import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "microservice-bf05d.firebaseapp.com",
  projectId: "microservice-bf05d",
  storageBucket: "microservice-bf05d.appspot.com",
  messagingSenderId: "611729971080",
  appId: "1:611729971080:web:49f9c7ac8e4f7fb9730c3d",
  measurementId: "G-1J9JLYM24Y",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database };
