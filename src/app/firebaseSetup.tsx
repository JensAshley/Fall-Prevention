import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { } from 'firebase/database';
import { } from 'firebase/messaging';
// Additional Firebase products: https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXs5mLRKQjHh9o3P3uvIquS5Z_434qul0",
  authDomain: "fall-prevention-4a705.firebaseapp.com",
  databaseURL: "https://fall-prevention-4a705-default-rtdb.firebaseio.com",
  projectId: "fall-prevention-4a705",
  storageBucket: "fall-prevention-4a705.appspot.com",
  messagingSenderId: "485609013461",
  appId: "1:485609013461:web:b861584fd81f2fcaa6e25c",
  measurementId: "G-8JYKHTKH5H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const secondaryApp = initializeApp(firebaseConfig, "Secondary"); // used to create new users
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default app;
export { auth, secondaryApp };