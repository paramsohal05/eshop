import { Router } from "express";
import Stripe from "stripe";

const webhookRouter=Router()

const stripeSecretKey=process.env.STRIPE_SECRET_KEY
const endpointSecret="whsec_HYQ2f1bq9BJNOlkkzQtpk1g1KHJvNU5c";

const ordersData=[];

const getLineItems=async(lineItems)=>{
  const stripe= new Stripe(stripeSecretKey, {
    apiVersion:"2025-01-27.acacia"
  })
    const orderItems=[];
 
   if(lineItems.data.length>0){
    for (const item of lineItems.data){
        const product=await stripe.products.retrieve(item.price.product);
        
        const totalPrice=(item.price.unit_amount*item.quantity)/100
        const productData={
          productId:product.metadata.productId,
          name:product.name,
          price:item.price.unit_amount/100,
          quantity:item.quantity,
          totalPrice:totalPrice,
          image:product.images[0],
          description:product.description
        }

       orderItems.push(productData)
       
       
       
    }
    return orderItems;
   }

  
}

// getorderInfo
const getOrderInfo=async(session, orderItems)=>{
    const orderdetails=[];
    const orderinfo={
      userId:session.metadata.userId,
       userEmail:session.metadata.email,
       orderItems:orderItems,
       paymentInfo:{
        paymentId:session.payment_intent,
        payment_method_type:session.payment_method_types,
        payment_status:session.payment_status,
      },
     totalAmount:session.amount_total,
    itemsPrice:session.amount_subtotal,
     shippingOptionCharge:session.shipping_options

}
 orderdetails.push(orderinfo)
 return orderdetails
}
// webhook
webhookRouter.post('/webhook', async(req, res)=>{
  const stripe= new Stripe(stripeSecretKey, {
    apiVersion:"2025-01-27.acacia"
  })
    const sig=req.headers['stripe-signature'];
    let event;

    const payloadString=JSON.stringify(req.body)

    const header=stripe.webhooks.generateTestHeaderString({
      payload:payloadString,
      secret:endpointSecret
    })

    try {
      event=stripe.webhooks.constructEvent(
        payloadString, 
        header, 
        endpointSecret
      )
    } catch (error) {
      res.status(400).send(`Webhook Error: ${error.message}`)
      return;
    }

    
    // Handle the event

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      const lineItems=await stripe.checkout.sessions.listLineItems(session.id)
      const orderItems=await getLineItems(lineItems)
      
      const orderinfo=await getOrderInfo(session, orderItems)
      
      ordersData.push(orderinfo)
      
      break;
    
    default:

      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
  
  // Return a 200 response to acknowledge receipt of the event
  res.status(200).send();
  
})

// orderData route and Controller

webhookRouter.get('/orders', async(req, res)=>{
  if(ordersData.length>0){
    const orders= await ordersData[0]
     res.send(orders)
  }
  else{
    res.send("No orders data found")
  }
   
})



export default webhookRouter;