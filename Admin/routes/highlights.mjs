import { Router } from "express";
import { highlightsProducts } from "../constants/index.mjs";

const highlightRouter=Router();

highlightRouter.get("/highlights", (req, res)=>{
    res.send(highlightsProducts)
})

export default highlightRouter;