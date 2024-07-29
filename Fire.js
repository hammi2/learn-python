import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCkyYZyJvVD1iD9fA20-TeCxHAWSGe_68U",
  authDomain: "python-react-b81ab.firebaseapp.com",
  databaseURL: "https://python-react-b81ab-default-rtdb.firebaseio.com",
  projectId: "python-react-b81ab",
  storageBucket: "python-react-b81ab.appspot.com",
  messagingSenderId: "737356871546",
  appId: "1:737356871546:web:f9fea7bbef59620c9208c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistence and get a reference to the service
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firebase Realtime Database and get a reference to the service
const database = getDatabase(app);

export { auth, database };

