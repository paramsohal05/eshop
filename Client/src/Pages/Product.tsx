import { useParams } from "react-router-dom"
import { config } from "../../config"
import { useEffect, useState } from "react"
import { ProductType } from "../type"
import { getData } from "../lib"
import Container from "../ui/Container"
import Loader from "../ui/Loader"
import _ from 'lodash'
import PriceTag from "../ui/PriceTag"
import { MdOutlineStarOutline } from "react-icons/md"
import { FaRegEye } from "react-icons/fa6"
import FormattedPrice from "../ui/FormattedPrice"
import { IoClose } from "react-icons/io5"
import AddToCartBtn from "../ui/AddToCartBtn"
import PaymentMethods from "../ui/PaymentMethods"
import ProductCard from "../ui/ProductCard"
import Title from "../ui/Title"
import CategoryFilters from "../ui/CategoryFilters"

const Product = () => {
  const [productData, setProductData]=useState<ProductType | null>(null)
  const [allProducts, setAllProducts]=useState<ProductType[]>([])
  const [imgUrl, setImgUrl]=useState("");
  const [color, setColor]=useState("");
  const [loading, setLoading]=useState(false)

 
  const {id}=useParams()
   const endpoint= id?`${config?.baseUrl}/products/${id}`:`${config?.baseUrl}/products`
  
   
  
useEffect(()=>{
   const fetchData = async()=>{
      try {
        setLoading(true);
         const data= await getData(endpoint);
         if(id){
          setProductData(data)
          setAllProducts([])
         } else{
          setAllProducts(data)
          setProductData(null)
         }
      } catch (error) {
        console.error("Error While fetching Product Data", error)
      }finally{
        setLoading(false)
      }
   };
   fetchData();
},[id, endpoint])

 useEffect(()=>{
    if(productData){
      setImgUrl(productData?.images[0]);
      setColor(productData?.colors[0])
    }
 },[productData])

 useEffect(()=>{
  if(id){
    document.title=`eShop-${productData?.overView}`;
  } 
  else {
    document.title='eshop-Products Collection'
  }
     
   },[id, productData])

  return (
    <div className="">
      {loading? (<Loader/>):
      (<Container>
        {!!id && productData && _.isEmpty(allProducts) ? 
        // Single Product
        (
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            {/* product images */}
            <div className="flex justify-evenly gap-4">
              {/* multiple images */}
              <div className="flex flex-col gap-2">
              {productData?.images?.map((item, index)=>(
                <img src={item} alt="img" key={index}
                className={`w-24 h-20 cursor-pointer opacity-80 hover:opacity-100 
                  duration-300  border-[1px] border-gray-400
                ${item===imgUrl && `border-[1px] border-gray-700 opacity-100 rounded-sm`}`}
                onClick={()=>setImgUrl(item)}/>
              ))}
              </div>
              {/* single image */}
              <div className="">
                <img src={imgUrl} alt="img"
                className="w-60 h-60 border border-gray-300"/>
              </div>
            </div>
            {/* product content */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold">{productData?.name}</h2>
              {/* price row */}
              <div className="flex items-center justify-between">
                <PriceTag regularPrice={productData?.regularPrice} 
                discountedPrice={productData?.discountedPrice} 
                className='text-base'/>
                <div className="flex items-center gap-1">
                  <div className="flex items-center text-gray-500 text-base">
                    <MdOutlineStarOutline/>
                    <MdOutlineStarOutline/>
                    <MdOutlineStarOutline/>
                    <MdOutlineStarOutline/>
                    <MdOutlineStarOutline/>
                  </div>
                  <p className="text-base font-semibold">{`${productData?.reviews} reviews`}</p>
                </div>
              </div>
              {/* reviews row */}
              <p className="flex items-center text-base">
                <FaRegEye className="mr-1"/>
                <span className="mr-1 font-semibold">{productData?.reviews}</span> {""} 
                people are viewing this right now
              </p>
              {/* price text row */}
              <p>
                You are saving {""} 
                <span className="text-base text-green-600 font-semibold">
                  <FormattedPrice
                  amount={productData?.regularPrice-
                  productData?.discountedPrice}/>
                </span> {""}
                upon purchase
              </p>
              {/* color row */}
              <div>
                {
                  color && (
                    <p>
                      Color: {""}
                      <span className="capitalize font-medium"
                      style={{color: color}}>
                        {color}</span>
                    </p>
                    )}
                  <div className="flex items-center gap-3 mt-2">
                    {
                      productData?.colors?.map((item, index)=>(
                        <div key={index} 
                        className={`${item===color && 'border-2 border-black p-1 rounded-full'}`}
                        
                        onClick={()=>setColor(item)}>
                          <div className="w-10 h-10 rounded-full cursor-pointer"
                          style={{backgroundColor: item}}/>
                        </div>
                      ))
                    }
                  </div>
                  {
                    color && <button onClick={()=>setColor("")}
                    className="font-semibold flex items-center gap-1 mt-1 hover:text-red-600 duration-200">
                      <IoClose/> Clear
                    </button>
                  }
              </div>
              {/* brand row*/}
              <p className="text-lg">
                Brand: {""}
                <span className="font-medium">{productData?.brand}</span>
              </p>
              {/* category row */}
              <p className="text-lg">
                Category: {""}
                <span className="font-medium">{productData?.category}</span>
              </p>
              {/* add to cart btn row */}
              <AddToCartBtn title="Buy Now" product={productData}
              className="bg-black/80 text-gray-200 text-base hover:scale-100 
              hover:bg-black 
              hover:text-white duration-200"/>
              <div className="mt-2 flex flex-col items-center justify-center gap-2">
                <PaymentMethods/>
                <p className="text-gray-900/90 font-medium">Guaranteed safe & secure checkout</p>
              </div>
            </div>
        </div>
        )
      :
    // ALL Products
      (
        <div className="flex justify-center sm:justify-normal items-start gap-10">
          <CategoryFilters id={id}/>
            <div>
            <Title text="Products Collection" className="text-center mb-10"/>
                <div className="grid grid-cols-1 max-w-96 justify-center sm:justify-normal
                sm:max-w-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {allProducts.map((item:ProductType)=>(
                  <ProductCard item={item} key={item?._id}/>
                ))}
                </div>
            </div>
        </div>
        
        
      ) }
      </Container>)}
    </div>
  )
}
export default Product



