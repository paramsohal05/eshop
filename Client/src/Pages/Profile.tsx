import { useEffect, useState } from "react";
import { store } from "../lib/store"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import Container from "../ui/Container";
import UserInfo from "../ui/UserInfo";
import Registeration from "../ui/Registeration";
import Loader from "../ui/Loader";



const Profile = () => {
  const [loading, setLoading]=useState(false)
  const {currentUser, getUserInfo}=store();
  
  
  

  useEffect(()=>{
    setLoading(true)
      const unSub=onAuthStateChanged(auth, (user)=>{
        getUserInfo(user?.uid)
        setLoading(false)
        

      })
      
      return ()=>{
        
        unSub();
        
       
      }

  },[currentUser, getUserInfo])

  

  useEffect(()=>{
    if(currentUser){
      document.title='eShop-My Account'
    } 
  },[currentUser])


  return (
    <Container className="relative">
      {currentUser? <UserInfo currentUser={currentUser}/>:<Registeration/>}
      {loading && <Loader/>}
    </Container>
  )
}

export default Profile