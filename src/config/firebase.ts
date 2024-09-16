import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkTVbiuT99089Z8w0yskv7twOniR_YCRE",
  authDomain: "films-aed2d.firebaseapp.com",
  projectId: "films-aed2d",
  storageBucket: "films-aed2d.appspot.com",
  messagingSenderId: "928663154226",
  appId: "1:928663154226:web:97cf83824668d47873d62b",
  measurementId: "G-CDZ4Q5RKZQ"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
