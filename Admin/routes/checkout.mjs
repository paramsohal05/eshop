import { Router } from "express"
import Stripe from "stripe";

const checkoutRouter=Router();


const stripeSecretKey =process.env.STRIPE_SECRET_KEY;




checkoutRouter.post("/checkout", async(req, res)=>{
  const stripe= new Stripe(stripeSecretKey, {
    apiVersion:"2025-01-27.acacia"
  })
  try {
    const {items, email, userId}=await req.body; 
     
    const extractingItems=items.map((item)=>({
      quantity:item.quantity,
      price_data:{
        currency:"usd",
        unit_amount:item?.discountedPrice*100,
        product_data:{
          name:item.name,
          description:item.description,
          images:item.images,
          metadata:{
            productId:item._id
          }
          
          
      }
       
        },
      
    }))

    const session=await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:extractingItems,
      mode:'payment',
      success_url:'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url:'http://localhost:5173/cancel',
      metadata:{
        email,
        userId
      },
    })

    
    
    res.json({
      message:'Server is connected',
      success:true,
      id:session.id,
      session
    })

  } catch (error) {
    res.status(500).json({error:error})
  }
})







export default checkoutRouter;




