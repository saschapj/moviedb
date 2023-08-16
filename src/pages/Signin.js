import React, { useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase-config";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
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
  });

  const signin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //Signed in
        const user = userCredential.user;
        //..
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //...
      });
  };

  const signout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <input
        className="bg-black placeholder-white text-2xl border-dashed border-white border-2 mx-2"
        type="text"
        placeholder="email..."
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="bg-black placeholder-white text-2xl border-dashed border-white border-2 mx-2"
        type="password"
        placeholder="password..."
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        className="hover:text-black hover:bg-white text-white bg-black border-2 p-4 m-4 min-w-[8rem] "
        onClick={() => {
          signin();
        }}
      >
        Sign in
      </button>
      <button
        className="hover:text-black hover:bg-white text-white bg-black border-2 p-4 m-4 min-w-[8rem] "
        onClick={() => {
          signout();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Signin;

//<ul className='px-4 flex text-white text-2xl mb-8 items-center'>
//<li onClick={((e)=>{setActiveLink(e.target.text)})} className={`px-4 py-8 ${activeLink==='Home'&&'text-black bg-white'}`}><Link to="/">Home</Link></li>
//<li onClick={((e)=>{setActiveLink(e.target.text)})} className={`px-4 py-8 ${activeLink==='Login'&&'text-black bg-white'}`}><Link to="/signin">Login</Link></li>
