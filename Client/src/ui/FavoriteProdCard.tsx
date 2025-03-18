import { MdClose } from "react-icons/md"
import { ProductType } from "../type"
import { store } from "../lib/store"
import toast from "react-hot-toast";
import AddToCartBtn from "./AddToCartBtn";
import FormattedPrice from "./FormattedPrice";
import { useNavigate } from "react-router-dom";


const FavoriteProdCard = ({product}:{product:ProductType}) => {
  const {removeFromFavorite}=store();
  
  const navigate=useNavigate();

  return (
    <div className="py-6 flex ">
      {/* right part */}
     <div className="min-w-0 flex-1 lg:flex lg:flex-col">
     
        <div>
          {/* product details & remove btn */}
          <div className="sm:flex">
            {/* products details */}
            <div>
              <h2 className="font-medium text-gray-900">{product?.name}</h2>
              <p className="mt-2 hidden text-sm text-gray-500 sm:block">{product?.description}</p>
              <p className="text-sm mt-1">Brand: {""}
                <span className="font-medium">{product?.brand}</span>
              </p>
              <p className="text-sm mt-1">Category: {""}
                <span className="font-medium">{product?.category}</span>
              </p>
            </div>
            {/* remove btn */}
            <span onClick={()=>{removeFromFavorite(product?._id)
              toast.success('Removed from favorite successfully!')
            }}
            className="hidden sm:inline-block text-lg text-gray-500 hover:text-red-600 
            duration-200 cursor-pointer mt-4 sm:mt-0 ">
              <MdClose/>
            </span>
          </div>
          {/* add to button */}
          <div className="flex text-sm items-center gap-6 font-medium py-2">
            <AddToCartBtn product={product} title="Add to Cart" className="w-32"/>
          </div>
        </div>
  {/* amount saving para */}
  
        <p className="text-base sm:text-sm ">You are saving {""}
          <span className="text-sm text-green-600 font-semibold">
            <FormattedPrice amount={product?.regularPrice-product?.discountedPrice}/>
          </span> {""}
          upon purchase of its each quantity
        </p>
       
     </div>
     {/* left part */}
     <div className="ml-4 flex flex-col gap-y-20 sm:gap-y-0 sm:flex-shrink-0 h-full w-20 sm:h-40 sm:w-40 sm:order-first
     sm:ml-0 sm:mr-6 border border-gray-300  rounded-md hover:border-skyText 
     duration-200 cursor-pointer group overflow-hidden">
       <img onClick={()=>navigate(`/product/${product?._id}`)}
       src={product?.images[0]}
       alt="productImage"
       className="h-20 w-20 sm:h-full sm:w-full rounded-lg object-cover object-center 
       group-hover:scale-110 duration-200"
       />
       {/* remove btn */}
      <span onClick={()=>{removeFromFavorite(product?._id)
            toast.success('Removed from favorite successfully!')}}
            className="flex ml-10 sm:hidden text-lg text-gray-500 hover:text-red-600 
            duration-200 cursor-pointer mt-4 sm:mt-0 ">
            <MdClose/>
      </span>
      </div>
    </div>
  )
}

export default FavoriteProdCard