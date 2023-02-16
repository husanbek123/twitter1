import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { Firestore, getFirestore,  } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDQNox0_VOIJN2EO39gMvRMQJxQUnGb3ik",
  authDomain: "database-612de.firebaseapp.com",
  projectId: "database-612de",
  storageBucket: "database-612de.appspot.com",
  messagingSenderId: "614224867913",
  appId: "1:614224867913:web:f06d85922cb8007e5cc598",
  measurementId: "G-NS3T4Y0MFT"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) 
export const provider = new GoogleAuthProvider() 
export const db = getFirestore(app) 

