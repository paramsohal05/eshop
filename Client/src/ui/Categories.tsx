import { useEffect, useState } from "react"
import Container from "./Container"
import { config } from "../../config"
import { getData } from "../lib"
import { CategoryProps } from "../type"
import { Link } from "react-router-dom"
import Title from "./Title"

const Categories = () => {
  const [categories, setCategories]=useState([])

  useEffect(()=>{
    const fetchData=async()=>{
      const endpoint=`${config?.baseUrl}/categories`
      const data=await getData(endpoint)
      setCategories(data)
    }
    fetchData()
  },[])

  return (
    <Container>
      <div>
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <Title text="Popular Categories"/>
          <Link to={'/category'} className="relative font-medium text-xl md:text-lg group mt-3 sm:mt-0">View All Categories
          <span className="absolute bottom-0 left-0 w-0 block h-[1px] bg-gray-600 transform -translate-x-[105%] group-hover:translate-x-0 duration-300 group-hover:w-full"/>
          </Link>
        </div>
        <div className="w-full h-[1px] bg-gray-400 my-4"/>
      </div>
      
      <div className="grid grid-cols-2 justify-between gap-4 px-10 md:px-6
      sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
        {
         categories.map((item:CategoryProps)=>(
          <Link key={item?._id} to={`category/${item?._base}`}
          className="relative h-56 sm:h-48 md:h-40 rounded-md flex flex-col  items-center 
          justify-center bg-slate-200 group overflow-hidden">
              <img src={item?.image} alt="categoryImage"
              className="w-full h-44 sm:h-40 md:h-28 rounded-md group-hover:scale-110 duration-300"/>
              <div className="">
                <p className="font-semibold text-lg md:text-base">{item?.name}</p>
              </div>
          </Link>
         ))
        }
      </div>
    </Container>
  )
}

export default Categories