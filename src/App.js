import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import firebase from './utils/firebase';
import 'firebase/auth';
import Auth from './pages/Auth/Auth';
import LoggedLayout from './layouts/LoggedLayout';

function App() {
  
  const [user, setUser] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadApp, setReloadApp] = useState(false)

  firebase.auth().onAuthStateChanged(currentUser => {
    if(!currentUser?.emailVerified){
      firebase.auth().signOut();
      setUser(null);
    }else {
      setUser(currentUser);
    }

    setIsLoading(false);

  });

  if(isLoading) return null;


  return (
    <>
      { !user ? <Auth /> : <LoggedLayout user={user} setUser={setUser} setReloadApp={setReloadApp}/>}
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={false}
      />
    </>
  )
    
}




export default App;
