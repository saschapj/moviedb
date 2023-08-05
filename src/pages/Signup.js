import React, { useState } from 'react'
import {auth} from "../Firebase/Firebase-config"
import { createUserWithEmailAndPassword } from "firebase/auth";


const Signup = () => {

    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const signup = () => {
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        //Signed in
        const user = userCredential.user;
        //..
    })
    .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        //...
    });
  }
    

  return (

    <div>Signup
        
        <input type="text" placeholder='email...' onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="password" placeholder='password...' onChange={(e)=>{setPassword(e.target.value)}}/>
        <button onClick={() => {signup()}}>Sign up</button>
    </div>
  )
}

export default Signup