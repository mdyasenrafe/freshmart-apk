import { initializeApp } from "firebase/app";
import FirebaseConfig from "./Firebase.Config";

const firebaseInitAuth = () => {
  // firebase
  const app = initializeApp(FirebaseConfig);
};

export default firebaseInitAuth;
