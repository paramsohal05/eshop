
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

import Container from '../ui/Container';
import Loader from '../ui/Loader';


import { config } from '../../config';
import { getData } from '../lib';
import toast from 'react-hot-toast';
import { db } from '../lib/firebase';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { OrderType } from '../type';



const Success = () => {
  
  const location=useLocation();
  const sessionId=new URLSearchParams(location.search).get("session_id")
  
  const navigate=useNavigate();
  const [loading, setLoading]=useState(false)
  const [orderDetails, setOrderDetails]=useState<OrderType|null>()

  
  const fetchOrderData=async()=>{
    setLoading(true)
    const endpoint=`${config.baseUrl}/orders`
    const data=await getData(endpoint)
    
    try {
      
      setOrderDetails(data[0])
     
    } catch (error) {
      console.log("Error Fetching Order Data", error)
    } finally{
      setLoading(false)
    }
   
  } 

  const saveOrder=async()=>{
    try {
      setLoading(true)
      const userEmail=orderDetails?.userEmail;
      const orderRef=doc(db, "orders", userEmail!)
      const docSnap=await getDoc(orderRef)
      
      if(docSnap.exists()){
          // update the doc
          await updateDoc(orderRef, {
            orders:arrayUnion(orderDetails),
          })
      }else{
        // add data to db
        await setDoc(orderRef, {
          orders:[orderDetails,]
        })
      }
      toast.success("Payment done successfully and orders saved!")
      
    } catch (error) {
      toast.error("Error Saving order Data")
    }finally{
      setLoading(false)
    }
     
  }


  useEffect(()=>{
  if(sessionId){
    fetchOrderData()
    } else{
      navigate('/')
    }

    
  },[sessionId])
       
useEffect(()=>{
    
  if(orderDetails){
      
    saveOrder()
    
    
 }
},[orderDetails])




  return (
    <Container>
      {loading && <Loader/>}
      <div className='min-h-[400px] flex flex-col items-center justify-center 
      gap-y-5'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>
          {loading? 
          "Your order payment is processing..."
          :
          "Your Payment accepted by eShop.com"}
        </h2>
        <p>{loading? 'Once done':'Now'} you can view your orders or continue 
          shopping with us </p>
        <div className='flex items-center gap-x-5'>
          <Link to={'/orders'}>
              <button className='bg-gray-900 text-slate-100 w-52 h-12 
              rounded-full text-base font-semibold hover:bg-black duration-300'>
                View Orders</button>
          </Link>
        <Link to={'/'}>
              <button className='bg-gray-900 text-slate-100 w-52 h-12 
              rounded-full text-base font-semibold hover:bg-black duration-300'>
                Continue Shopping
              </button>
        </Link>
        </div>
      </div>
    </Container>
  )
}

export default Success;