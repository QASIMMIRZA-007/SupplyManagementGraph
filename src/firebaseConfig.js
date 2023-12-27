import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


const firebaseConfig = {
  apiKey: "AIzaSyCz56l95CdsCIpM0fQ1aP0h-7faxEpF9E0",
  authDomain: "smart-extension-a2655.firebaseapp.com",
  databaseURL: "https://smart-extension-a2655-default-rtdb.firebaseio.com",
  projectId: "smart-extension-a2655",
  storageBucket: "smart-extension-a2655.appspot.com",
  messagingSenderId: "108404219543",
  appId: "1:108404219543:web:36c224e5e91675f78613d2",
  measurementId: "G-L5EBRYLE0Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);





