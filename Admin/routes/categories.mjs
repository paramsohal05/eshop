import { Router } from "express";
import { categories, products } from "../constants/index.mjs";


const categoryRouter=Router();

categoryRouter.get("/categories", (req, res)=>{
  res.send(categories)
})

categoryRouter.get("/categories/:id", (req, res)=>{
  const id=req.params.id;
  const matchedProducts=products.filter((item)=>item._base===id);

  if(!matchedProducts || matchedProducts.length===0){
    res.
    status(404)
    .json({message:"No Product in this category"})
  }

  res.json(matchedProducts)
})

export default categoryRouter;


