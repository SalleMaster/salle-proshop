import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBV_CDdi91yssDOU77j8fDoyq_w6yCgNYM',
  authDomain: 'salle-proshop.firebaseapp.com',
  databaseURL: 'https://salle-proshop.firebaseio.com',
  projectId: 'salle-proshop',
  storageBucket: 'salle-proshop.appspot.com',
  messagingSenderId: '258095230546',
  appId: '1:258095230546:web:a4f365887acfdebe89398b',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };