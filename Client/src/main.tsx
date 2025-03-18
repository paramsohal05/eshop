
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Layout from './ui/Layout.tsx'
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from 'react-router-dom'
import Product from './Pages/Product.tsx'
import Category from './Pages/Category.tsx'
import Profile from './Pages/Profile.tsx'
import Cart from './Pages/Cart.tsx'
import Favorite from './Pages/Favorite.tsx'
import Orders from './Pages/Orders.tsx'
import Success from './Pages/Success.tsx'
import Cancel from './Pages/Cancel.tsx'
import NotFound from './Pages/NotFound.tsx'

const RouterLayout=()=>{
  return(
    <Layout>
      <ScrollRestoration/>
      <Outlet/>
    </Layout>
  )
}

const router=createBrowserRouter([
  {
    path:"/", 
    element:<RouterLayout/>,
    children:[
      {path:"/", element:<App/>},
      {path:"/product", element:<Product/>},
      {path:"/product/:id", element:<Product/>},
      {path:"/category", element:<Category/>},
      {path:"/category/:id", element:<Category/>},
      {path:"/profile", element:<Profile/>},
      
      {path:"/cart", element:<Cart/>},
      {path:"/favorite", element:<Favorite/>},
      {path:"/orders", element:<Orders/>},
      {path:"/success", element:<Success/>},
      {path:"/cancel", element:<Cancel/>},
      {path:"*", element:<NotFound/>},
    ]

    
  }])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
