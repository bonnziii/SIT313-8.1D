// Import the necessary functions from Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Add this import

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFVpwBWZAKwZUMWGhsxiWAdFe0pnndMys",
  authDomain: "sit313-2e38e.firebaseapp.com",
  projectId: "sit313-2e38e",
  storageBucket: "sit313-2e38e.appspot.com",
  messagingSenderId: "470188013723",
  appId: "1:470188013723:web:20c57140e97d950448ee3e",
  measurementId: "G-XYNF5EH1HW"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app); // Add this line

// Set up Google Auth Provider (optional)
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// Export Firebase services for use in other parts of your app
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signOutUser = () => signOut(auth);
export const createAuthUserWithEmailAndPassword = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
export { auth, db, storage }; // Add storage to the exports
