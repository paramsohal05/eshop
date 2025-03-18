import { useEffect, useState } from 'react'
import {config} from '../../config.ts';
import { getData } from "../lib/index.ts";
import Carousel from 'react-multi-carousel';
import { CategoryProps } from '../type.ts';
import { Link } from 'react-router-dom';
import CustomLeftArrow from './CustomLeftArrow.tsx';
import CustomRightArrow from './CustomRightArrow.tsx';



const responsive = {
  xlg: {
    breakpoint: { max: 3000, min: 1200 },
    items: 4,
    slidesToSlide: 3// optional, default to 1.
  },
  lg: {
    breakpoint: { max: 1200, min: 992 },
    items: 4,
    slidesToSlide: 3// optional, default to 1.
  },
  md: {
    breakpoint: { max: 992, min: 768 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  sm: {
    breakpoint: { max: 768, min:576 },
    items: 2,
    slidesToSlide: 3 // optional, default to 1.
  },
  xs: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const BannerCategories = () => {
  const [categories, setCategories]=useState([])

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
  return( 
    <Carousel
    responsive={responsive}
    infinite={true}
    autoPlay={true}
    transitionDuration={1000}
    customLeftArrow={<CustomLeftArrow/>}
    customRightArrow={<CustomRightArrow/>}
    className='flex flex-row sm:gap-x-1 px-24 sm:px-12 py-4 my-3 bg-gray-200 max-w-screen-sm sm:max-w-screen-md md:max-w-screen-2xl  mx-auto relative '>
     {categories.map((item:CategoryProps)=>(
      <Link to={`category/${item?._base}`} key={item?._id}
      className='flex flex-1  items-center border bg-whiteText border-gray-400 w-64 sm:w-60 md:w-56
      hover:border-skyText hover:shadow-lg p-2 rounded-md gap-1'>
         <img src={item?.image} alt='categoryImage'
         className='w-10 h-10 object-cover rounded-full'/>
         <p className='text-gray-600 hover:text-gray-800 font-semibold text-base'>{item?.name}</p>
      </Link>
     ))}
    </Carousel>
  )
}

export default BannerCategories