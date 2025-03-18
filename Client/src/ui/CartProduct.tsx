import { Link } from "react-router-dom"
import { ProductType } from "../type"
import FormattedPrice from "./FormattedPrice"
import AddToCartBtn from "./AddToCartBtn"
import { IoClose } from "react-icons/io5"
import { store } from "../lib/store"
import toast from "react-hot-toast"
import { FaCheck } from "react-icons/fa6"


const CartProduct = ({product}:{product:ProductType}) => {
  const {removeFromCart}=store();

  const handleRemoveProduct=()=>{
    if(product){
      removeFromCart(product?._id);
      toast.success(`${product?.name.substring(0,20)} deleted successfully!`)
    }
  }

  return (
    <div className="py-6 flex sm:py-10">
      <Link to={`/product/${product?._id}`}
      className="flex ">
          <img src={product?.images[0]} alt="productImage"
          className="h-24 w-24 sm:w-48 sm:h-48 object-cover rounded-md border 
          border-skyText/50 hover:border-skyText"/>
      </Link>
      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:pr-0 ">
    {/* col-1  */}
          <div className="flex flex-col gap-1 col-span-3">
            <h2 className="text-base font-semibold w-full">{product?.name.substring(0,80)}</h2>
            <p className="text-xs">Brand: {""}
              <span className="font-medium">{product?.brand}</span>
            </p>
            <p className="text-xs">Category: {""}
              <span className="font-medium">{product?.category}</span>
            </p>
            <div className="flex text-center gap-5 mt-2">
                <p className="font-semibold text-base mt-3">
                  <FormattedPrice amount={product?.discountedPrice*product?.quantity}/>
                </p>
                <AddToCartBtn product={product} showPrice={false}/>
            </div>
          </div>
    {/* col-2 */}
          <div className="mt-4 sm:mt-0 sm:pr-9">
            <div className="absolute right-0 top-0 ">
              <button onClick={handleRemoveProduct}
              className="-m-2 inline-flex p-2 text-gray-600 hover:text-red-600">
                <IoClose className="text-xl"/>
              </button>
            </div>
          </div>
        </div>
        <div>
            {product?.isStock && 
            <p className="mt-4 flex space-x-2 text-sm text-gray-700">
            <FaCheck className="text-lg text-green-600"/>
            <span>In Stock</span></p>}
            <p>You are saving {""}
            <span className="text-sm font-semibold text-green-600"><FormattedPrice 
            amount={product?.regularPrice-product?.discountedPrice}/></span> {""}
            upon purchase</p>
        </div>
      </div>
    </div>
  )
}

export default CartProduct