import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDCy9_Bm1C6Y4BaTOMmUfn3l3O_KnLL1so",
  authDomain: "musicfy-laq.firebaseapp.com",
  databaseURL: "https://musicfy-laq.firebaseio.com",
  projectId: "musicfy-laq",
  storageBucket: "musicfy-laq.appspot.com",
  messagingSenderId: "774990946549",
  appId: "1:774990946549:web:e682c609323a12128e65bc"
};


export default firebase.initializeApp(firebaseConfig);
