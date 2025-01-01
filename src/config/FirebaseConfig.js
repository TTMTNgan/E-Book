// src/config/FirebaseConfig.js
import { initializeApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';  // Thêm cho auth
import { getFirestore } from '@react-native-firebase/firestore';  // Thêm cho Firestore
import { getStorage } from '@react-native-firebase/storage';  // Thêm cho Storage

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
const app = initializeApp(firebaseConfig);

// Khởi tạo các dịch vụ Firebase
export const auth = getAuth(app);  // Đảm bảo Firebase Auth hoạt động
export const db = getFirestore(app);  // Kết nối Firestore
export const storage = getStorage(app);  // Kết nối Storage

export default app;

