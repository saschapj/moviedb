import React, { useEffect, useState } from 'react'
import {auth} from "../Firebase/Firebase-config"
import { signInWithEmailAndPassword,onAuthStateChanged, signOut  } from "firebase/auth";
import { useNavigate } from 'react-router-dom'; 

const Signin = () => {

    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [user,setUser] = useState({})
    const navigate = useNavigate();
    

    useEffect(()=>{

      onAuthStateChanged(auth, (user) => {
        setUser(user);
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    })
    
      const signin = () => {
    signInWithEmailAndPassword(auth,email,password)    
    .then((userCredential)=>{
        //Signed in
        const user = userCredential.user;
        //..
        navigate("/");
    })
    .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        //...
    });
  }

  const signout=async ()=>{
    await signOut(auth);
  }

  
  
    

  return (

    <div>Signin {user?.email}
        
        <input type="text" placeholder='email...' onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="password" placeholder='password...' onChange={(e)=>{setPassword(e.target.value)}}/>
        <button onClick={() => {signin()}}>Sign in</button>
        <button onClick={()=>{signout()}}>Sign Out</button>
    </div>
  )
}

export default Signin