import { twMerge } from "tailwind-merge"
import Label from "./Label"

import { useEffect, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../lib/firebase"
import Loader from "./Loader"

const Login = ({setLogin}:any) => {
  // usestates
  const [loading, setLoading]=useState(false)
  const [errMsg, setErrMsg]=useState('')

  const handleLogin=async(e:any)=>{
    e.preventDefault();
    
    try {
      setLoading(true)
      const formData=new FormData(e.target)
    const {email, password}:any=Object.fromEntries(formData)

    await signInWithEmailAndPassword(auth, email, password)
    
    } catch (error:any) {
      let errorMessage;
      switch (error.code){
        case "auth/user-not-found":
          errorMessage="No user found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage="Incorrect Password";
          break;
        case "auth/invalid-email":
          errorMessage="Invalid email address";
          break;
        case "auth/invalid-credential":
          errorMessage="Email or Password not matched";
          break;
        default:
          errorMessage="An error occurred. Please try again"
      }
      console.log("Error", error)
      setErrMsg(errorMessage)
    } finally{
      setLoading(false)
    }

  }

  useEffect(()=>{
        document.title='eShop-Login'
    },[])

  const inputClassName=twMerge(`block w-full rounded-md bg-white/5 py-1.5 px-4 border-0
    outline-none ring-1 ring-inset ring-white/10 text-white shadow-sm
    focus:ring-skyText sm:text-sm sm:leading-6 mt-2`)
  return (
        <div className="bg-gray-950 rounded-lg">
          <form onSubmit={handleLogin}
          className="max-w-5xl mx-auto py-10 px-10  text-white ">
            {/* headings & paragraph */}
            <div className="border-b border-white/10 pb-5">
                <h2 className="text-lg font-semibold uppercase leading-7">
                  Sign in
                </h2>
                <p className="text-sm mt-1 text-gray-300 leading-6">
                  Please sign in to continue
                </p>
            </div>
            {/* input fields */}
            <div className="border-b border-b-white/10 pb-5 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-x-6 gap-y-5">
               {/* email */}
                <div className="sm:col-span-3">
                  <Label title="Email Address" htmlFor="email"/>
                  <input 
                  type="email" 
                  name="email" 
                  className={inputClassName}/>
                </div>
              {/* password */}
                <div className="sm:col-span-3">
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
              {loading? 'Loading...':'Sign in'}
            </button>

          </form>
          <p className="text-sm leading-6 text-gray-400 text-center -mt-2 py-10">
            Does not have an Account ?
            <button onClick={()=>setLogin(false)} className="text-gray-200 font-semibold ml-2 underline 
            underline-offset-2 decoration-[1px] hover:text-white duration-200">
              Register
            </button>
          </p>
          {loading && <Loader/>}
        </div>
   
  )
}

export default Login