import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// Firebase config cho ứng dụng React Native
const firebaseConfig = {
  apiKey: "AIzaSyALpnD1mYK7VuaFmuEDstaYHw8pzuHdZ7Y",
  authDomain: "e-book-ccea4.firebaseapp.com",
  databaseURL: "https://e-book-ccea4-default-rtdb.firebaseio.com",
  projectId: "e-book-ccea4",
  storageBucket: "e-book-ccea4.appspot.com",  // Đảm bảo đúng URL này
  messagingSenderId: "537469765673",
  appId: "1:537469765673:web:115c2137faa23463323438",
  measurementId: "G-6HF712MFV0",
};

// Khởi tạo Firebase app
export const firebaseAuth = auth();
export const firebaseFirestore = firestore();
export const firebaseStorage = storage();

export default app;

