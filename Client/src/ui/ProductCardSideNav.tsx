import { FaRegEye, FaRegStar, FaStar } from "react-icons/fa6"
import { LuArrowLeftRight } from "react-icons/lu"
import { twMerge } from "tailwind-merge"
import { store } from "../lib/store"
import { ProductType } from "../type"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


const ProductCardSideNav = ({product}:{product?:ProductType}) => {
  const [existingProduct, setExistingProduct]=useState<ProductType | null>(null)
  const {addToFavorite, favoriteProduct}=store()
   
   useEffect(()=>{
     const availableProduct=favoriteProduct.find((item)=>
    item?._id===product?._id)
     setExistingProduct(availableProduct || null)
    
   },[product, favoriteProduct])
    
    const handleFavorite=()=>{
      if(product){
        addToFavorite(product).then(()=>{
          toast.success(existingProduct? 
            `${product?.name.substring(0,10)} removed from favorite `
            :`${product?.name.substring(0,10)} added as favorite`)
        })

      }
    }


  const newClassName=twMerge(`w-11 h-11 inline-flex items-center justify-center text-lg
       text-black rounded-full hover:bg-black hover:text-white duration-200`)
  return (
    <div className="absolute top-1 right-1 flex flex-col gap-2 
    transition translate-x-12 group-hover:translate-x-0 duration-300">
      <span onClick={handleFavorite} className={newClassName}>
        {existingProduct? <FaStar />: <FaRegStar />}
      </span>
      <span className={newClassName}>
        <LuArrowLeftRight/>
      </span>
      <span className={newClassName}>
        <FaRegEye/>
      </span>
    </div>
  )
}

export default ProductCardSideNav