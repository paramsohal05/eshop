import express from 'express';
import 'dotenv/config'
import {fileURLToPath} from 'url';
import path from 'path';
import blogRouter from './routes/blogs.mjs';
import productRouter from './routes/products.mjs';
import categoryRouter from './routes/categories.mjs';
import highlightRouter from './routes/highlights.mjs';
import checkoutRouter from './routes/checkout.mjs';
import webhookRouter from './routes/webhook.mjs';

// import { readdirSync } from 'fs';


const app=express();
const httpsPort = Number(process.env.HTTPSPORT) || 8000;

app.use(express.json())

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

// const routesPath=path.resolve(__dirname, './routes')
// const routeFiles=readdirSync(routesPath)

// routeFiles.map(async(file)=>{
//     const routeModule= await import(`./routes/${file}`)
//     app.use('/', routeModule.default)

// })

// initialize routes
app.use(blogRouter)
app.use(productRouter)
app.use(categoryRouter)
app.use(highlightRouter)
app.use(checkoutRouter)
app.use(webhookRouter)




app.get("/", (req, res)=>{
   res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(httpsPort, ()=>{                                                                                                                                                          
    console.log(`Server is running on port ${httpsPort}`)
})

