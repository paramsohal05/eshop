import amex from '../assets/amex1.png';
import Gpay from '../assets/Gpay.png';
import mastercard from '../assets/mastercard.png'
import payPal from '../assets/payPal.png'
import dPay from '../assets/dPay1.png'
import visa from '../assets/visa1.png'

const paymentLogos=[
  {
    img:amex,
    alt:"Amex"
  },
  {
    img:Gpay,
    alt:"G Pay"
  },
  {
    img:mastercard,
    alt:"Mastercard"
  },
  {
    img:payPal,
    alt:"Paypal"
  },
  {
    img:dPay,
    alt:"D Pay"
  },
  {
    img:visa,
    alt:"Visa"
  },
]

const PaymentMethods = () => {
  return (
    <div>
      {/* window */}
      <div  className="hidden md:flex items-center gap-4">
          {
            paymentLogos.map(({img, alt})=>(
              
                <img key={alt} src={img} alt={alt} className="w-14 object-cover"/>
            ))
          }
         </div>
         {/* mobile */}
         <div  className="md:hidden  items-center gap-y-6 gap-x-10 grid grid-cols-3">
          {
            paymentLogos.map(({img, alt})=>(
              
                <img key={alt} src={img} alt={alt} className="w-20 object-cover"/>
            ))
          }
         </div>
    </div>
  )
}

export default PaymentMethods