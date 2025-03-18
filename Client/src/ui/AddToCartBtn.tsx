import { twMerge } from "tailwind-merge";
import { ProductType } from "../type";
import { store } from "../lib/store";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import PriceTag from "./PriceTag";

interface Props{
  className?:string;
  title?:string;
  product?:ProductType
  showPrice?:boolean
}

const AddToCartBtn = ({className, title, product, showPrice=true}:Props) => {
   const [existingProduct, setExistingProduct]=useState<ProductType | null>(null)

    const {addToCart, cartProduct, decreaseQuantity}=store();
    


    useEffect(()=>{
       const availableProduct=cartProduct.find((item)=>item._id===product?._id)
       setExistingProduct(availableProduct || null)
    },[product, cartProduct])

    const handleAddToCart=()=>{
     if(product){
        addToCart(product)
        toast.success(`${product.name.substring(0,10)} added to cart successfully!`)
     }else{
        toast.error("The product is undefined")
     }

    }
    
    const handleDeleteProduct=()=>{
      if(existingProduct){
        if(existingProduct?.quantity>1){
          decreaseQuantity(existingProduct?._id);
          toast.success(`${existingProduct?.name.substring(0,10)} decreased successfully`)
        } else{
         toast.error('You can not decrease less than 1')
        }
      } else{
        
      }
    }

    const newClassName=twMerge(`bg-[#f6f6f6] px-2 border border-gray-300 text-xs rounded-full py-3 hover:bg-black 
      hover:text-white hover:scale-100 duration-200 font-semibold`, className)

      const getRegularPrice=()=>{
          if(existingProduct){
             if(product){
              return product?.regularPrice * existingProduct?.quantity
             }
          }else{
           return product?.regularPrice;
          }
      }

      const getDiscountedPrice=()=>{
         if(existingProduct){
            if(product){
              return product?.discountedPrice * existingProduct?.quantity 
              
            }
         }else{
            return product?.discountedPrice
         }
      }

  return (
    <>
     {
      showPrice && <PriceTag 
      discountedPrice={getDiscountedPrice()} 
      regularPrice={getRegularPrice()}/>
     }
    {existingProduct ? 
    <div className="flex self-center items-center justify-center gap-3 rounded-md 
    mt-2 border-[1px] border-gray-400 py-2 px-4 bg-slate-200 hover:bg-slate-300 scale-100 overflow-hidden duration-200">
       <button onClick={handleDeleteProduct}
       className="bg-[#e6e1e1] rounded-full p-1 border-[1px] border-gray-400
       text-sm text-black hover:border-skyText hover:bg-white 
       duration-200 cursor-pointer">
        <FaMinus/>
      </button>
        <p className="text-base font-semibold">{existingProduct?.quantity}</p>
      <button onClick={handleAddToCart}
      className="bg-[#e6e1e1] rounded-full p-1 border-[1px] border-gray-400
       text-sm text-black hover:border-skyText hover:bg-white 
       duration-200 cursor-pointer">
        <FaPlus/>
      </button>
    </div>
    : 
    <button onClick={handleAddToCart} className={newClassName}>
    {title}
  </button>}
    </>
  )
}

export default AddToCartBtn 
