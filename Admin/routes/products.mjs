import { Router } from "express";
import { products } from "../constants/index.mjs";

const productRouter=Router();

productRouter.get("/products", (req, res)=>{
  res.send(products);
})

productRouter.get("/products/:id", (req, res)=>{
  const productId=req.params.id;
  const product=products.find((item)=>item._id==productId);
  if(!productId){
    res.status(404).json({Message:"The Items is not found"})
  }
 res.send(product)
})

export default productRouter;