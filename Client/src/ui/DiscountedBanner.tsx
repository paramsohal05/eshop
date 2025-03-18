import { Link } from "react-router-dom"
import Container from "./Container"
import Title from "./Title"
import headphone from '../assets/headpho.avif'
import spects from '../assets/spec.webp'
import mi from '../assets/redmilogo.png'
import sony from '../assets/sonylogo.png'
import marshall from '../assets/marshalllogo.png'
import lg from '../assets/lglogo.png'
import samsung from '../assets/samsunglogo.png'
import adidas from '../assets/adidaslogo.png'


const DiscountedBanner = () => {
  const popularSearchItems=[
    {title:"Smart Watches", link:"smartwatches"},
    {title:"Headphone", link:"headphones"},
    {title:"Cameras", link:"camerasAndPhotos"},
    {title:"Audio", link:"tvAndAudio"},
    {title:"Laptop & Computers", link:"computersAndLaptop"},
    {title:"Cell Phone", link:"cellphones"}
  ]
  
  return (
    <Container>
      <Title text="Popular Search"/>
      <div className="max-w-full h-[1px] bg-gray-400 mt-4"/>
      <div className="my-7 flex flex-wrap items-center gap-4">
        {
          popularSearchItems.map(({title, link})=>(
            <Link key={title} to={`/category/${link}`}
            className="border border-[px] border-gray-400 rounded-full px-8 py-3 
            font-medium hover:bg-black hover:text-white duration-200">
             {title}
            </Link>
          ))
        }
      </div>
      <div className="w-full bg-[#d1cece] flex items-center justify-between 
      p-1  rounded-lg">
        <img src={headphone} alt="discountedImageOne"
        className="hidden lg:inline-flex h-36"/>
        <div className="flex flex-col flex-1 items-center">
          <div className="flex items-center justify-center gap-x-3 text-xl md:text-4xl font-bold gap-1 py-1">
            <h2>Sony Headphone</h2>
            <Link to={`/product`} 
            className="border border-red-700 rounded-full text-red-700 py-2 
            px-4 text-lg lg:text-xl">
             Discount 20%
            </Link>
          </div>
          <p className="text-base md:text-sm text-gray-600 font-medium md:mt-1 my-2">You're out to play or stepping out to make</p>
        </div>
        <img src={spects} alt="discountedImageTwo"
        className="hidden lg:inline-flex h-36"/>
      </div>
      <div className="mt-4">
        <p className="text0-2xl font-bold">Brands We Distribute</p>
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-7">
           <div className="border border-r-0 border-gray-400 h-28
           flex items-center justify-center px-6 py-2 group cursor-pointer">
            <img src={mi} alt="miLogo" 
            className="w-36 h-auto group-hover:opacity-50 duration-200"/>
           </div>
           <div className="border border-r-0 border-gray-400 h-28
           flex items-center justify-center px-6 py-2 group cursor-pointer">
            <img src={sony} alt="miLogo" 
            className="w-36 h-auto group-hover:opacity-50 duration-200"/>
           </div>
           <div className="border border-r-0 border-gray-400 
           flex items-center justify-center px-6 py-2 group cursor-pointer h-28">
            <img src={marshall} alt="miLogo" 
            className="w-36 h-auto group-hover:opacity-50 duration-200"/>
           </div>
           <div className="border border-r-0 border-gray-400 
           flex items-center justify-center px-6 py-2 group cursor-pointer h-28">
            <img src={lg} alt="miLogo" 
            className="w-36 h-auto group-hover:opacity-50 duration-200 "/>
           </div>
           <div className="border border-r-0 border-gray-400 
           flex items-center justify-center px-6 py-2 group cursor-pointer h-28">
            <img src={samsung} alt="miLogo" 
            className="w-36 h-full group-hover:opacity-50 duration-200"/>
           </div>
           <div className="border  border-gray-400 
           flex items-center justify-center px-6 py-2 group cursor-pointer h-28">
            <img src={adidas} alt="miLogo" 
            className="w-36 h-auto group-hover:opacity-50 duration-200"/>
           </div>
         </div>
      </div>
    </Container>
  )
}

export default DiscountedBanner