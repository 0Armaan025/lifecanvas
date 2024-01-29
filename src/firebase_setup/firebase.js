import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACkCTvtbzjAYUXWFCZVQkmHIj9oDmGmDQ",
  authDomain: "lifecanvas-11e.firebaseapp.com",
  projectId: "lifecanvas-11e",
  storageBucket: "lifecanvas-11e.appspot.com",
  messagingSenderId: "830599258206",
  appId: "1:830599258206:web:929be923aa6eb922c654cf",
  measurementId: "G-GMD8LBH8X6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);