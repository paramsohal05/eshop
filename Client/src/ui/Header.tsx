import { IoClose, IoSearchOutline } from "react-icons/io5"
import logo from "../assets/logo.png"
import { useEffect, useState } from "react"
import { FiShoppingBag, FiStar} from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import Container from "./Container";
import {  Link, useLocation} from "react-router-dom";
import {config} from '../../config.ts';
import { getData } from "../lib";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import {CategoryProps, ProductType} from '../type.ts'
import ProductCard from "./ProductCard.tsx";
import { store } from "../lib/store.ts";
import { MdOutlineMenu } from "react-icons/md";


const bottomNavigation=[
  {title:"Home", link:"/"},
  {title:"Shop", link:"/product"},
  {title:"Cart", link:"/cart"},
  {title:"Orders", link:"/orders"},
  {title:"My Account", link:"/profile"},
  
];

const Header = () => {
const [searchText, setSearchText]=useState("");
const [categories, setCategories]=useState([]);
const [products, setProducts]=useState([]);

const [filteredProduct, setFilteredProduct]=useState([])

const location=useLocation()
const pathName=location.pathname;
const activePageName=pathName?.split('/')

const {cartProduct, favoriteProduct, currentUser}=store()

const userAvatarUrl="https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"

useEffect(()=>{
  const fetchData=async()=>{
   const endpoint=`${config?.baseUrl}/products`
   try {
     const data=await getData(endpoint)
     setProducts(data);
     
   } catch (error) {
     console.log("Error while fetching data", error)
   }
  }
  fetchData();
},[])

useEffect(()=>{
   const fetchData=async()=>{
    const endpoint=`${config?.baseUrl}/categories`
    try {
      const data=await getData(endpoint)
      setCategories(data);
      
    } catch (error) {
      console.log("Error while fetching data", error)
    }
   }
   fetchData();
},[])


useEffect(()=>{
  const filtered=products.filter((item:ProductType)=>item?.name.toLowerCase().includes(searchText.toLowerCase()))
  setFilteredProduct(filtered)
},[searchText])


  return (
    <div className="w-full bg-whiteText sticky top-0 z-50">
      {/* top */}
        <div className="max-w-screen-xl mx-auto h-20 px-4 py-2 my-5 md:my-0  flex items-center justify-between">
        {/* logo */}
        <Link to={"/"}>
        <img src={logo} alt="logo" className="w-20 md:w-14 ml-5 rounded-xl"/>
        </Link>
        
        {/* searchbar */}
        
          <div className="relative hidden md:inline-flex max-w-2xl w-3/5">
          <input type="text" placeholder="Search products" 
          onChange={(e)=>setSearchText(e.target.value)}
          value={searchText}
          className="outline-none text-gray-900 text-lg rounded-full w-full placeholder:text-base placeholder:tracking-wide 
          placeholder:text-gray-500 placeholder:font-normal flex-1 ring-1 ring-inset ring-gray-300 shadow-sm px-4 py-2 
          focus:ring-1 focus:ring-darkText sm:text-sm"/>
          {
            searchText?
            (
              <IoClose onClick={()=>setSearchText("")}
              className="absolute top-2.5 text-xl right-4 hover:text-red-500 cursor-pointer duration-200"/>
              
            ):
            (
              <IoSearchOutline className="absolute top-2.5 text-xl right-4"/>
            )
          }
          </div>
            {/* search products will apppear here */}

          {
          searchText && (
          <Container className="absolute left-10 right-10 top-40 md:top-16 w-full bg-white px-10 py-10 z-20 mx-auto max-h-[500px] rounded-md text-black
          overflow-y-scroll shadow-lg shadow-skyText">
            {filteredProduct.length >0 ? 
            <div className="grid grid-cols-1 max-w-96 mx-auto md:max-w-none md:grid-cols-3 lg:grid-cols-5 gap-5">
              {filteredProduct?.map((item:ProductType)=>(
                <ProductCard key={item?._id} item={item} setSearchText={setSearchText}/>
              ))}
            </div> : 
            <div className="py-6 px-3 bg-gray-200 max-w-96 mx-auto md:max-w-none flex items-center justify-center border border-gray-600 rounded-md">
              <p className="text-xl font-normal">Nothing matches with your search keywords {""}
                <span className="text-red-500 underline underline-offset-2 font-semibold decoration-[1px]">{`(${searchText})`}</span>
                . Please try again
              </p>
            </div>}
          </Container>)
        }
        
       
        
        {/* menubar */}
        <div className="flex items-center gap-x-4 text-4xl lg:text-xl font-semibold px-2">
          {/* user */}
          <Link to={"/profile"}>
          {currentUser? <img src={userAvatarUrl} alt="userProfile"
          className="w-8 h-8 rounded-full"/>:
          <button className="bg-blue-600 rounded-md py-1 px-3 text-white 
          hover:bg-blue-600/50">Login</button>}
          
          </Link>
         
          {/* favorites */}
          <Link to={"/favorite"} className="relative block">
            <FiStar className="hover:text-skyText duration-200 cursor-pointer"/>
            <span className="absolute -top-3 -right-3 lg:-top-1 lg:-right-2 
            bg-redText text-whiteText rounded-full text-[16px] lg:text-[9px] 
            inline-flex items-center justify-center w-7 h-7 lg:w-4 lg:h-4">
              {favoriteProduct?.length>0? favoriteProduct.length : "0"}
            </span>
          </Link>
          {/* shopping bag */}
          <Link to={"/cart"} className="relative block">
            <FiShoppingBag className="hover:text-skyText duration-200 cursor-pointer"/>
            <span className="absolute -top-3 -right-3 lg:-top-1 lg:-right-2 bg-redText text-whiteText rounded-full text-[16px] lg:text-[9px] inline-flex items-center justify-center w-7 h-7 lg:w-4 lg:h-4">
              {cartProduct?.length>0 ? cartProduct?.length : "0"}</span>
          </Link>
        </div>
      </div>
      {/* smaller screen searchbar */}
      
        
      <div className="relative flex md:hidden max-w-full mx-4 my-4">
          <input type="text" placeholder="Search products" 
          onChange={(e)=>setSearchText(e.target.value)}
          value={searchText}
          className="outline-none relative text-gray-900 text-lg rounded-full w-full placeholder:text-base placeholder:tracking-wide 
          placeholder:text-gray-500 placeholder:font-normal flex-1 ring-1 ring-inset ring-gray-300 shadow-sm px-4 py-4 
          focus:ring-1 focus:ring-darkText sm:text-sm"/>
          {
            searchText?
            (
              <IoClose onClick={()=>setSearchText("")}
              className="absolute top-3.5 text-2xl right-4 hover:text-red-500 cursor-pointer duration-200"/>
              
            ):
            (
              <IoSearchOutline className="absolute top-3.5 text-2xl right-4"/>
            )
          }
          </div>
      {/* navbar */}
      <div className="w-full bg-darkText text-whiteText">
       
      <Container className="py-2 max-w-4xl flex items-center gap-5 justify-between">
 {/* select category */}
        <Menu>
          <MenuButton className='inline-flex gap-2 items-center border 
          border-gray-400 hover:border-white px-3 py-1 rounded-md 
          text-gray-300 hover:text-white font-semibold'>
          Select Category <FaChevronDown className="text-base mt-1"/>
          </MenuButton>
          <Transition 
           enter="transition ease-out duration-75"
           enterFrom="opacity-0 scale-95"
           enterTo="opacity-100 scale-100"
           leave="transition ease-in duration-100"
           leaveFrom="opacity-100 scale-100"
           leaveTo="opacity-0 scale-95">
            <MenuItems anchor="bottom start"
            className="w-56 origin-top-right flex flex-col gap-3 border-white/5 bg-black text-sm/6 
            rounded-xl p-1 text-gray-300 [--anchor-gap:var(--spacing-1)] focus:outline-none hover:text-white z-50">
             {categories.map((item:CategoryProps)=>(
              <MenuItem key={item?._id}>
                <Link to={`/category/${item?._base}`}
                className="flex items-center gap-3 w-full data-[focus]:bg-white/10
                tracking-wide p-2 rounded-md">
                 <img 
                 src={item?.image} 
                 alt="categoryImage"
                 className="w-10 h-10 rounded-md object-cover"/>
                 {item?.name}
                </Link>
                
              </MenuItem>
             ))}
            </MenuItems>
          </Transition>
        </Menu>
 {/* bgscreen navbar */}
        {
          bottomNavigation.map(({title, link})=>{
            const pageName=link?.split("/")
            const actPage=pageName[1]
            return (
               <Link to={link} key={title} className={`hidden md:inline-flex text-sm 
            font-semibold uppercase text-whiteText/90 hover:text-whiteText 
            duration-200 relative overflow-hidden group cursor-pointer`}>
              {title}
              <span className="inline-flex w-full h-[1px] bg-whiteText absolute 
              bottom-0 left-0 transform -translate-x-[105%] 
              group-hover:translate-x-0 duration-300 "/>
              {activePageName[1]===actPage && <span className="inline-flex w-full 
              h-[1px] bg-whiteText absolute bottom-0 left-0 "/>}
            </Link>
            )
           
})

        }
    {/* small screen menu item */}
       <div className="inline-flex md:hidden">
       <Menu>
          <MenuButton className='
          text-gray-200 hover:text-white'>
            <MdOutlineMenu size={"30px"}/>
          </MenuButton>
          <Transition 
           enter="transition ease-out duration-75"
           enterFrom="opacity-0 scale-95"
           enterTo="opacity-100 scale-100"
           leave="transition ease-in duration-100"
           leaveFrom="opacity-100 scale-100"
           leaveTo="opacity-0 scale-95">
            <MenuItems anchor="bottom start"
            className="origin-top-right flex flex-col gap-3 border-white/5 bg-black text-sm/6 
            rounded-xl p-4 text-gray-300 [--anchor-gap:var(--spacing-1)] focus:outline-none hover:text-white z-50">
             {bottomNavigation.map(({title, link})=>(
              <MenuItem key={title}>
                <Link to={link}
                className=" data-[focus]:bg-white/10
                tracking-wide p-4 rounded-md w-44">
                 
                 <p className="text-2xl">{title}</p>
                </Link>
                
              </MenuItem>
             ))}
            </MenuItems>
          </Transition>
        </Menu>
       </div>
      </Container>
      </div>
     
    </div>
  )
}

export default Header