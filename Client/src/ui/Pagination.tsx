import { useEffect, useState } from "react"
import { config } from "../../config"
import { getData } from "../lib"
import { ProductType } from "../type"
import ProductCard from "./ProductCard"
import ReactPaginate from "react-paginate"

interface ItemsProps{
  currentItems:ProductType[]
}

const Items=({currentItems}:ItemsProps)=>{
return(
  <div className="grid grid-cols-1 justify-center items-center sm:justify-between 
  sm:gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 p-12 
  sm:p-2">
    {currentItems && currentItems.map((item:ProductType)=>(
    <ProductCard key={item?._id} item={item}/>
    ))}
  </div>
)
}



const Pagination = () => {
  const [products, setProducts]=useState([])

  useEffect(()=>{
    const fetchData=async()=>{
      const endpoint=`${config.baseUrl}/products`
      const data=await getData(endpoint)
      setProducts(data)
    }
    fetchData()
  },[])

    

  const itemsPerPage=15;
  const [itemOffset, setItemOffset] = useState(0);
  const  [itemStart, setItemStart]=useState(1)
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event:any) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    const newStart=newOffset+1

    setItemOffset(newOffset);
    setItemStart(newStart);


    
  };
  return (
    <>
     <Items currentItems={currentItems}/>
     <div className="flex flex-col md:flex-row items-center  justify-center 
     md:justify-between md:gap-10">
      <ReactPaginate 
      onPageChange={handlePageClick} 
      nextLabel='Next'
      previousLabel='Prev'
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500
      duration-300 flex justify-center items-center"
      pageClassName="mx-3"
      containerClassName="flex text-base font-semibold py-10 "
      activeClassName="bg-black text-white"/>

      <p className="text-gray-600 font-semibold  text-lg md:text-base">Products from {itemStart} to {Math.min(endOffset, products?.length)}  of {products?.length}</p>
     </div>

    </>
  )
}

export default Pagination