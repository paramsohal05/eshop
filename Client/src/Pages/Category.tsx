import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../ui/Loader"
import Container from "../ui/Container"
import { config } from "../../config"
import { getData } from "../lib"
import CategoryFilters from "../ui/CategoryFilters"
import ProductCard from "../ui/ProductCard"
import { ProductType } from "../type"


const Category = () => {
  const [loading, setLoading]=useState(false)
  const [products, setProducts]=useState([])
  const [formatId, setFormatId]=useState<string| null>('')

  const {id}=useParams()

  

  useEffect(()=>{
    const fetchData=async()=>{
        const endpoint=`${config?.baseUrl}/categories/${id}`
        try {
          setLoading(true)
          const data=await getData(endpoint)
          setProducts(data)
        } catch (error) {
          console.log(`Error while fetching ${id} category data`, error)
        } finally {
          setLoading(false)
        }
    }
    fetchData()
  },[id])

  useEffect(()=>{
    if(id!==undefined){
      const formatId=async(id:string)=>{
        const formattedid=await id
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/(^\w|\s\w)/g, (match:any)=>match.toUpperCase())
         setFormatId(formattedid)
       
       }
       formatId(id)
    }
    
  
  },[id])
 
  
   useEffect(()=>{
    document.title=`eShop-${formatId}`;
  },[products])

  

  return (
    <div className="">
      {
        loading? <Loader/>:<Container>
          <h2 className="text-center text-3xl font-bold mb-8">{formatId}</h2>
          <div className="flex justify-center md:justify-start gap-8">
            <CategoryFilters id={id}/>
            <div className="grid grid-cols-1 items-center justify-center sm:justify-between sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {
                products?.map((item:ProductType)=>(
                  <ProductCard key={item?._id} item={item}/>
                ))
              }
            </div>
          </div>
        </Container>
      }
    </div>
  )
}

export default Category