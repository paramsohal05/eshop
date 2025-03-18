import { useEffect, useState } from "react"
import { config } from "../../config"
import { getData } from "../lib"
import { CategoryProps } from "../type"
import { Link } from "react-router-dom"
import { RotatingLines } from "react-loader-spinner"

const CategoryFilters = ({id}:{id: string | undefined}) => {
  const [loading, setLoading]=useState(false)
  const [categories, setCategories]=useState([])

  useEffect(()=>{
    const fetchData=async()=>{

      const endpoint=`${config?.baseUrl}/categories`;
      try {
        setLoading(true)
        const data=await getData(endpoint)
        setCategories(data)
        
      } catch (error) {
        console.log("Error while fetching categories", error)
      } finally{
        setLoading(false)
      }
      
    }
    fetchData()
  },[])
  
  return (
    <div className="hidden md:inline-flex flex-col gap-6">
      <p className="text-2xl font-bold">Filters</p>
      <div>
        <p className="uppercase text-sm font-semibold underline underline-offset-4
        decoration-[1px] w-36">Select Categories</p>
        <div className="my-4 flex flex-col justify-center gap-2 min-w-40">
        
          {
            loading? <div className="flex items-center justify-start my-5 ml-6">
                <RotatingLines
                visible={true}
                strokeWidth="4"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                width="50"/>
              </div>
            : categories?.map((item:CategoryProps)=>(
                  <Link key={item?._id} to={`/category/${item?._base}`}
                    className={`text-base font-medium text-start text-gray-600 underline 
                    underline-[1px] underline-offset-2 decoration-[1px] 
                    decoration-transparent hover:decoration-gray-950 hover:text-black
                    duration-200 ${item?._base===id? 'text-green-600 decoration-green-700': 'text-gray-600'}`}>
                    {item?.name}
                  </Link>
                ))}
            
          
        </div>
      </div>
    </div>
  )
}

export default CategoryFilters