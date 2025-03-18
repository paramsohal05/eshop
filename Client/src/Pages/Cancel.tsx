import { useEffect } from 'react'
import Container from '../ui/Container'
import { Link } from 'react-router-dom'
import { TfiFaceSad } from "react-icons/tfi";

const Cancel = () => {

  useEffect(()=>{
    document.title='eShop-PaymentDeclined';
  },[])
  return (
    <Container className=''>
      {/*  */}
        <div className='min-h-[400px] flex flex-col items-center justify-center 
      gap-5'>
        <h2 className='text-red-700 font-bold text-xl flex flex-col gap-3 items-center'>Payment Failed!
        <span><TfiFaceSad size={'40px'}/></span>
        </h2>
        
          <p className='text-gray-800 text-center max-w-2xl font-medium'>
            Sorry, Your Payment has been declined due to some issue.
            We hope you have provided correct card details. 
            You can try again.
          </p>
          <Link to={'/cart'} className='bg-gray-950 text-gray-300 p-2 font-medium
          rounded-md w-fit'>
            Go to Cart
          </Link>
        </div>
    </Container>
  )
} 

export default Cancel