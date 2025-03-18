import BannerCategories from "./ui/BannerCategories"

import "react-multi-carousel/lib/styles.css";
import HomeBanner from "./ui/HomeBanner";
import Highlights from "./ui/Highlights";
import Categories from "./ui/Categories";
import ProductList from "./ui/ProductList";
import DiscountedBanner from "./ui/DiscountedBanner";
import Blog from "./ui/Blog";
import { useEffect, useState } from "react";
import Note from "./ui/Note";


function App() {
  const [close, setClose]=useState(false)

  useEffect(()=>{
    
  })
 
  useEffect(()=>{
    document.title='eShop-Home'
  },[])

  return (
    <main>
      {!close && <div className='fixed top-0 left-0 bg-black bg-opacity-80 z-50 h-screen w-screen no-doc-scroll '>
        <Note setClose={setClose}/>
      </div>}
      
      <BannerCategories/>
      <HomeBanner/>
      <Highlights/>
      <Categories/>
      <ProductList/>
      <DiscountedBanner/>
      <Blog/>
    </main>
  )
}

export default App
