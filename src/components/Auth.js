import React from 'react'
import {auth ,provider} from "../firebase-config.js"
import {signInWithPopup} from "firebase/auth"
import Cookies from 'universal-cookie';

const cookies=new Cookies()

export default function Auth() {
    const signInWithGoogle = async ()=>{
    try{
        const result = await signInWithPopup(auth,provider)
        cookies.set("auth-token",result.user.refreshToken);
    }catch(err){
        console.log(err);
    }
}
  return (
    <div className="auth">
        <p>Sign in with you Google Account</p>
        <button onClick={signInWithGoogle}>Sign In with Google </button>
      
    </div>
  )
}
