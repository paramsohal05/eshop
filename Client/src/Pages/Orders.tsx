import { useEffect, useState } from "react"
import { store } from "../lib/store"

import { doc, getDoc } from "firebase/firestore"
import { db } from "../lib/firebase"
import Container from "../ui/Container"
import Loader from "../ui/Loader"
import { Link, useNavigate } from "react-router-dom"
import { orderItemsType, OrderType } from "../type"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { FaMinus, FaPlus } from "react-icons/fa6"

import FormattedPrice from "../ui/FormattedPrice"

const Orders = () => {
  // usestates
  
  const [orders, setOrders]=useState([])
  const [loading, setLoading]=useState(false)
  // zustand
  const {currentUser}=store()

  const navigate=useNavigate()

  // useeffectr


  useEffect(()=>{
    if(currentUser){
      const getData=async()=>{
        setLoading(true)
        try {
         const docRef=doc(db, 'orders', currentUser?.email!)
         const docSnap=await getDoc(docRef)
          
         if(docSnap.exists()){
            const orderData=docSnap?.data()?.orders;
            setOrders(orderData)
         }else{
          console.log("No orders yet!")
         }
          
        } catch (error) {
          console.log('Data fetching error', error)
        } finally{
          setLoading(false)
        }
      
      }
      getData()
    } else{
      navigate('/profile')
      
      
    }
    
  },[])

  // dynamic tab content
  useEffect(()=>{
    
      document.title='eShop-Orders';
    
    
  },[])


  return (
    <>
    
     <Container>
      {loading? <Loader/>: 
      orders.length>0 ? 
      // orders
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mt-1">Customer Order details</h2>
        {/* customer name */}
        <p className="text-gray-600 mt-1">Customer Name: {""}
          <span className="text-black font-semibold">
            {currentUser?.firstName} {""}
            {currentUser?.lastName}

          </span>
        </p>
        {/* total orders */}
        <p className="text-gray-600 mt-1"> Total Orders {""}
          <span className="text-black font-semibold">{orders.length}</span>
        </p>
        {/* para */}
        <p className="text-sm max-w-[600px] tracking-wide text-gray-500 mt-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore cum 
          rerum nemo deserunt reiciendis sint quas, assumenda beatae totam 
          corporis ut omnis ipsa. Necessitatibus ut odio vel officia impedit cum.
        </p>
        {/* tracking numbers */}
        <div className="flex flex-col gap-3">

          <div className="space-y-6 divide-y divide-gray-900/20">
            {orders.map((order:OrderType)=>{
              const totalAmt=order.orderItems.reduce(
                (acc, item)=>acc + (item?.price * item?.quantity || 0), 0)
              return (
                <Disclosure as="div" key={order?.paymentInfo?.paymentId} className='pt-6'>
                  {({open})=>(
                    <>
                      <dt>
                        <DisclosureButton className="flex w-full items-center 
                        justify-between text-left text-gray-900">
                          <span className="text-base font-semibold leading-7">
                            Tracking number: {""}
                            <span className="font-normal">
                              {order?.paymentInfo.paymentId}
                            </span>
                          </span>
                          <span className="">
                            {open? <FaMinus/>:<FaPlus/>}
                          </span>
                        </DisclosureButton>
                      </dt>
                      <DisclosurePanel as="dd" className='mt-5 pr-12'>
                        <div className="flex flex-col gap-2 bg-[#f4f4f480] p-5
                        border border-gray-300 ">
                          <p className="text-base font-semibold">
                            Your order {""} 
                            <span className="text-skyText font-bold text-xs"># {order.paymentInfo.
                            paymentId.substring(0, 20)}...</span> {""} 
                            has shipped and will be with you soon
                          </p>
                          <div className="flex flex-col gap-1">
                            {/* totalitems */}
                            <p className="text-sm text-gray-600">
                              Order item count: {""}
                              <span className="text-gray-800 font-semibold">
                                {order?.orderItems?.length}
                              </span>
                            </p>
                            {/* payment status */}
                            <p className="text-sm text-gray-600">
                              Payment Status: {""}
                              <span className="text-gray-800 font-semibold">
                                Paid by Stripe
                              </span>
                            </p>
                            {/* Order amount */}
                            <p className="text-sm text-gray-600">
                              Order Amount: {""}
                              <span className="text-gray-800 font-semibold">
                                <FormattedPrice amount={totalAmt}/>
                              </span>
                            </p>
                            
                          </div>
                          
                          {order?.orderItems?.map((item:orderItemsType)=>(
                            <div key={item?.productId} className="flex space-x-6 
                            py-3 border-b border-gray-300">
                              <Link to={`/product/${item?.productId}`} 
                              className="h-20 w-20 flex-none sm:h-40 sm:w-40 
                              rounded-lg bg-gray-200 border border-gray-300 
                              hover:border-skyText overflow-hidden">
                                <img src={item?.image} alt="productImg"
                                className="h-full w-full object-cover 
                                object-center hover:scale-110 duration-300"/>
                              </Link>
                              <div className="flex flex-col max-w-96 sm:max-w-none">
                                {/* name & description */}
                                <div className="">
                                  <Link to={`/product/${item?.productId}`}>
                                    <p className="font-medium text-gray-900 
                                    text-ellipsis max-w-52 sm:max-w-none">
                                    {item?.name}
                                    </p>
                                    
                                  </Link>
                                  <p className="mt-2 text-sm text-gray-900 
                                  text-ellipsis text-justify sm:text-start 
                                  max-w-56 sm:max-w-none">
                                    {item?.description}
                                  </p>
                                </div>
                               {/* quantity/subtotal/price row */}
                                <div className="mt-6 flex flex-1 items-end">
                                  <dl className="flex space-x-1 divide-x 
                                  divide-gray-200 text-sm sm:space-x-6 max-w-52 sm:max-w-none">
                                    {/* quantity */}
                                    <div className="flex flex-col items-center sm:flex-row ">
                                      <dt className="font-medium text-gray-900">
                                        Quantity
                                      </dt>
                                      <dd className="ml-2 text-gray-700">
                                        {item?.quantity}
                                      </dd>
                                    </div>
                                    {/* Price */}
                                    <div className="flex sm:pl-6 flex-col items-center sm:flex-row ">
                                      <dt className="font-medium text-gray-900">
                                        Price
                                      </dt>
                                      <dd className="ml-2 text-gray-700">
                                        <span className="text-black font-bold">
                                          <FormattedPrice amount={item?.price}/>
                                        </span>
                                      </dd>
                                    </div>
                                    {/* subtotal*/}
                                    <div className="flex sm:pl-6 flex-col items-center sm:flex-row">
                                      <dt className="font-medium text-gray-900">
                                        SubTotal
                                      </dt>
                                      <dd className="ml-2 text-gray-700">
                                        <span className="text-black font-bold">
                                          <FormattedPrice 
                                          amount={item?.price * item?.quantity}/>
                                        </span>
                                      </dd>
                                    </div>
                                  </dl>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          
                        </div>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              )
            }
              
            )}
          </div>

        </div>
      </div>: 
      // no orders
      <div className="flex flex-col items-center">
       <p className="text-2xl sm:text-4xl font-semibold text-gray-900
       tracking-tight">No Orders yet</p>
       <p className="mt-2 text-gray-700">
        You did not create any purchase from us yet
        </p>
       <Link
        to={'/product'} 
        className="mt-2 bg-gray-800 text-gray-100 px-6 py-2 rounded-md 
        hover:bg-black hover:text-white duration-200">
           Go to Shopping
       </Link>
      </div>}
    </Container>
    
    </>
   
  )
}

export default Orders;