
import { ProductType } from '../type'
import { store } from '../lib/store'
import { useNavigate } from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js';
import { config } from '../../config';

const CheckoutBtn = ({products}:{products:ProductType[]}) => {
  const navigate=useNavigate()
  const {currentUser}=store()

  const publishableKey="pk_test_51QtPGbFY187OQ5CGz1qW4jurRj7VqsxnWNBcYovqWmqdLxP9TojUI6iM7eujF39jpRzIpaSEsJaAT8xv38o3l37h00HLJ42VyD";
   const stripePromise=loadStripe(publishableKey)

  const handleCheckout=async()=>{
   const stripe= await stripePromise
   let headers=new Headers()
   headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin','https://eshop-n5zy.vercel.app');
   const response= await fetch(`${config?.baseUrl}/checkout`, {

    method:'POST',
    mode:'no-cors',
    headers:headers,

    body:JSON.stringify({
      items:products,
      email:currentUser?.email,
      userId:currentUser?.id
    })

    
   })

   const checkoutSession=await response.json()
   const result:any=await stripe?.redirectToCheckout({
     sessionId:checkoutSession.id,
     
   })

   if(result.error){
    window.alert(result?.error?.message)
   }
  }

  return (
    <div className='mt-4'>
      
    {currentUser? 
      
    (<button onClick={handleCheckout}
      type='submit' className='w-full border border-transparent rounded-md
    bg-gray-800 px-4 py-3 text-base text-white font-medium hover:bg-black
    focus:outline-none  focus:ring-2 focus:ring-skyText focus:ring-offset-2
    focus:ring-offset-gray-50 duration-200'>Checkout</button>)
    :
    (<button className='w-full text-base text-white text-center rounded-md border
      border-transparent bg-gray-500 px-4 py-3 cursor-not-allowed'>
      Checkout
    </button>)
    }
    {!currentUser && 
      <p className='text-sm text-red-600 mt-2 font-semibold text-center'>
      Need to sign in to make checkout <span onClick={()=>navigate('/profile')}
        className='text-blue-700 font-bold text-base cursor-pointer ml-2'>Sign in</span></p>}
    
    </div>
  )
}

export default CheckoutBtn
