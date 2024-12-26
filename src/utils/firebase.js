import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBzEjwURyiDcmWrM_vdqANVN9WxJQr6d08",
  authDomain: "khsparty.firebaseapp.com",
  databaseURL: "https://khsparty-default-rtdb.firebaseio.com",
  projectId: "khsparty",
  storageBucket: "khsparty.firebasestorage.app",
  messagingSenderId: "658831845381",
  appId: "1:658831845381:web:7176c6d631807e5b5ed46c",
  measurementId: "G-NCE5618PZY",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const authRef = collection(firestore, "booth_auth");
const uidRef = collection(firestore, "uid");

export async function getBoothAuthInfo() {
  try {
    const querySnapshot = await getDocs(authRef);
    let boothAuthList = [];
    querySnapshot.forEach((doc) => {
      boothAuthList.push(doc.data());
    });
    return boothAuthList;
  } catch (e) {
    return [e.message];
  }
}

export async function getUidByEmail(email) {
  try {
    const q = query(uidRef, where("email", "==", email));
    const querySnapshot = await getDoc(q);

    return querySnapshot.data().uid;
  } catch (e) {
    return e.message;
  }
}

export const db = getDatabase(app);
