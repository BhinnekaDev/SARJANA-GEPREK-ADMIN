import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAoxDUuTp_qLfAvxLrDJ65OuNt8asAAHyw",
  authDomain: "ndaru-farm-v2-cf992.firebaseapp.com",
  projectId: "ndaru-farm-v2-cf992",
  storageBucket: "ndaru-farm-v2-cf992.appspot.com",
  messagingSenderId: "319383341376",
  appId: "1:319383341376:web:804965ac2bf038fae612a5",
  measurementId: "G-KPZ3VS9EN7",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { database, auth, storage, analytics };
