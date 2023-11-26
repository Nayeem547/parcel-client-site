
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjjOC-WoLgLCq8VjY7EBukcfK6jM5cs60",
  authDomain: "parcel-client-site.firebaseapp.com",
  projectId: "parcel-client-site",
  storageBucket: "parcel-client-site.appspot.com",
  messagingSenderId: "161102477093",
  appId: "1:161102477093:web:de836209c22584b7b7cccc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;