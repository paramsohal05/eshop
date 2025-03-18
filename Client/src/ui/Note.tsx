
import { IoClose } from 'react-icons/io5'
import Container from './Container'
interface CloseType{
  setClose?:any
}

const Note = ({setClose}:CloseType) => {

  const handleClose=()=>{
    setClose(true)
  }
  
  return (
    <Container className='flex mx-auto items-center justify-center h-screen'>
      <div className='flex flex-col gap-2 border border-gray-100 max-w-2xl px-6 py-2 bg-gray-300 text-gray-950
      rounded-md overflow-hidden hover:border-skyText shadow-md shadow-skyText'>
        {/* row 1 */}
        <div className='flex justify-between items-center border-b border-gray-500 py-2'>
          <h1 className='text-3xl text-center font-semibold text-red-700'>Important Notice!</h1>
        <IoClose onClick={handleClose}size={"40px"} className='text-gray-700 font-bold p-2 rounded-full cursor-pointer
         hover:text-red-600 hover:bg-white '/>
        </div>
        {/* row2 */}
        <div>
          <p className='text-base tracking-tight leading-6 text-justify'>This website named eShop is just a dummy 
            e-commerce project , was developed to apply, enhance & test web development skills. The products' images and textual data used in it are not real. Although, the Stripe Payment integration is in the
            test Mode, yet do not try to do checkout or payment with your real credit card details. 
            You can use dummy credit card instead for testing.
            </p>
            <p className='text-gray-700 font-bold text-end'>Thanks!</p>
        </div>
      
      </div>
    </Container>
  )
}

export default Note