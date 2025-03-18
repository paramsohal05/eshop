import { Link} from "react-router-dom";
import { store } from "../lib/store"
import CartProduct from "../ui/CartProduct";

import Container from "../ui/Container";
import FormattedPrice from "../ui/FormattedPrice";
import { useEffect, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import CheckoutBtn from "../ui/CheckoutBtn";


const Cart = () => {
  const [totalAmt, setTotalAmt]=useState({
    regular:0,
    discounted:0
  })

  const shippingAmt=25;
  const taxAmt=15;


  const {cartProduct}=store();

  useEffect(()=>{
    if(cartProduct.length>0 ){
      document.title='eShop-Cart Products'
    }else{
      document.title='eShop-Empty Cart'
    }
    
  },[cartProduct])
  
  useEffect(()=>{
    
    const totals=cartProduct.reduce((sum, product)=>{
      sum.regular +=product?.regularPrice * product?.quantity;
      sum.discounted +=product?.discountedPrice * product?.quantity;
  
      return sum;
    }, {regular:0, discounted:0})
  
    setTotalAmt(totals)
  },[cartProduct])
 
  return (
    <Container>
     {
      cartProduct.length>0 ? (<>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight 
        text-gray-900 text-center">Shopping Cart</h2>
        <div className="mt-10 lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <section className="lg:col-span-7 ">
            <div className="divide-y divide-gray-300 border-b border-t
             border-gray-300">
            {cartProduct?.map((product)=>(
              <CartProduct key={product?._id} product={product}/>
            ))}
            </div>
            
          </section>
          <section className="mt-16 h-fit rounded-lg bg-gray-200 px-4 py-6 sm:p-6 
          lg:col-span-5 lg:mt-0 lg:p-8 ">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <dl className="mt-6 space-y-4">
              {/* subtotal */}
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-700">SubTotal</dt>
                <dd className="text-sm font-medium text-gray-900"><FormattedPrice amount={totalAmt?.regular}/></dd>
              </div>
              {/* shipping estimate */}
              <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                <dt className="text-sm text-gray-700 flex items-center">
                  <span>Shipping estimate</span>

                  <FaQuestionCircle 
                  className=" h-4 w-4 text-gray-400 ml-2"
                  aria-hidden="true"/>
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  <FormattedPrice amount={shippingAmt}/>
                </dd>
              </div>
              {/* tax estimate */}
              <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                <dt className="text-sm text-gray-700 flex items-center">
                  <span>Tax estimate</span>

                  <FaQuestionCircle 
                  className=" h-4 w-4 text-gray-400 ml-2"
                  aria-hidden="true"/>
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  <FormattedPrice amount={taxAmt}/>
                </dd>
              </div>
              {/* total discount */}
              <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                <dt className="text-sm text-gray-900 font-medium">
                 Total Discount
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  <FormattedPrice amount={totalAmt.regular-totalAmt.discounted}/>
                </dd>
              </div>
              {/* order total */}
              <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                <dt className="text-sm text-gray-900 font-semibold ">
                 Order Total
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  <FormattedPrice amount={totalAmt.discounted+shippingAmt+taxAmt}/>
                </dd>
              </div>
            </dl>
            <CheckoutBtn products={cartProduct}/>
          </section>
        </div>

      </>):
      (<div className="bg-white h-96 flex flex-col py-5 gap-6 items-center 
      justify-center rounded-lg border border-gray-300 drop-shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight 
        text-gray-900">Shopping Cart</h2>
        <p className="max-w-[600px] text-center text-lg text-gray-600 
        tracking-wide leading-6">
          Your cart is empty Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam architecto placeat blanditiis. Nostrum, corporis possimus magni unde molestias beatae, maxime officiis tempora ullam exercitationem quos sequi est ex nemo totam!</p>
        <Link to={`/product`} className="bg-gray-800 text-gray-200  py-4 px-8
          rounded-lg font-semibold hover:bg-black hover:text-white
          duration-300 ">Go to Shopping</Link>
      </div>)
     }
    </Container>
    
  )
}

export default Cart