import { Router } from "express";
import { blogsData } from "../constants/index.mjs";


const blogRouter=Router();

blogRouter.get("/blogs", (req, res)=>{
  res.send(blogsData)
})


export default blogRouter;
