import { useEffect, useState } from "react"
import Login from "./Login"
import Label from "./Label"
import { twMerge } from "tailwind-merge"

import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../lib/firebase"
// import upload from "../lib/upload"
import { doc, setDoc } from "firebase/firestore"
import Loader from "./Loader"




const Registeration = () => {
const [login, setLogin]=useState(true)
  const [loading, setLoading]=useState(false)
  const [errMsg, setErrMsg]=useState('')

  const handleRegistration=async(e:any)=>{
     e.preventDefault();
     const formData=new FormData(e.target);
     const {firstName, lastName, email, password}:any=
     Object.fromEntries(formData);

     try {
       setLoading(true)
         const res=await createUserWithEmailAndPassword(auth, email, password)
        
          await setDoc(doc(db, "users", res.user.uid),{
            firstName, 
            lastName,
            email,
            id:res.user.uid,
          })
      
     } catch (error:any) {
      let errorMessage;
      switch (error.code){
         case "auth/invalid-email":
           errorMessage="Please enter a valid email.";
           break;

          case "auth/missing-password":
            errorMessage="Please enter a password.";
            break;
          case "auth/email-already-in-use":
            errorMessage= "This email is already in use. Try another email.";
            break;
          default:
            errorMessage= "An error occurred. Please try again.";
      }
     console.log("Error", error)
      setErrMsg(errorMessage)
     } finally{
      setLoading(false)
     }

  }

  useEffect(()=>{
    if(login!==true){
      document.title='eShop-Register'
    }
      
  },[login])

  const inputClassName=twMerge(`block w-full rounded-md bg-white/5 py-1.5 px-4 border-0
                  outline-none ring-1 ring-inset ring-white/10 text-white shadow-sm
                  focus:ring-skyText sm:text-sm sm:leading-6 mt-2`)
  return (
    <div>
      {login? 
      (<Login setLogin={setLogin}/>):
      (
        <div className="bg-gray-950 rounded-lg">
          <form onSubmit={handleRegistration}
          className="max-w-5xl mx-auto py-10 px-10  text-white ">
            {/* headings & paragraph */}
            <div className="border-b border-white/10 pb-5">
                <h2 className="text-lg font-semibold uppercase leading-7">
                  Registration Form
                </h2>
                <p className="text-sm mt-1 text-gray-300 leading-6">
                  You need to provide required information to get register with us.
                </p>
            </div>
            {/* input fields */}
            <div className="border-b border-b-white/10 pb-5 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-x-6 gap-y-5">
                {/* firstName */}
                <div className="sm:col-span-3">
                  <Label title="First Name" htmlFor="firstName"/>
                  <input 
                  type="text" 
                  name="firstName" 
                  className={inputClassName}/>
                </div>
                {/* lastname */}
                <div className="sm:col-span-3">
                  <Label title="Last Name" htmlFor="lastName"/>
                  <input 
                  type="text" 
                  name="lastName" 
                  className={inputClassName}/>
                </div>
               {/* email */}
                <div className="sm:col-span-4">
                  <Label title="Email Address" htmlFor="email"/>
                  <input 
                  type="email" 
                  name="email" 
                  className={inputClassName}/>
                </div>
              {/* password */}
                <div className="sm:col-span-4">
                  <Label title="Password" htmlFor="password"/>
                  <input 
                  type="password" 
                  name="password" 
                  className={inputClassName}/>
                </div>  
              </div>
            </div>
            {errMsg && <p className="bg-white/90 text-red-600 text-center py-1 
            rounded-md tracking-wide font-semibold">
              {errMsg}
            </p>}
            
            <button disabled={loading}
            type="submit" className={`mt-5  w-full py-2 
            uppercase text-base font-semibold tracking-wide text-gray-300 
            rounded-md hover:text-white  duration-200 
            ${loading? 'bg-gray-600 hover:bg-gray-500':'bg-indigo-700 hover:bg-indigo-600'}`}
            >
              {loading? 'Loading...':'Send'}
            </button>

          </form>
          <p className="text-sm leading-6 text-gray-400 text-center -mt-2 py-10">
            Already have an Account 
            <button onClick={()=>setLogin(true)} className="text-gray-200 font-semibold ml-2 underline 
            underline-offset-2 decoration-[1px] hover:text-white duration-200">
              Login
            </button>
          </p>
        </div>)}
        {loading && <Loader/>}
    </div>
  )
}

export default Registeration