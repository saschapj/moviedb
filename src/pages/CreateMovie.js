import React, { useEffect, useState } from 'react'
import {auth} from "../Firebase/Firebase-config"
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore"; 
import {db} from "../Firebase/Firebase-config"
const CreateMovie = () => {
    
    const [movieTitle,setMovieTitle] = useState("");

    useEffect(()=>{

        onAuthStateChanged(auth, (user) => {
          
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

      
    const addMovie = async (title) => {        
            try {
                const docRef = await addDoc(collection(db, "movies"), {
                    title: title,
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    
  return (    
    <div>CreateTodo
        <input onChange={(e) => {setMovieTitle(e.target.value)}} placeholder='title...'/>
        <button onClick={() => {addMovie(movieTitle)}}>Add Movie</button>
    </div>
  )
}

export default CreateMovie