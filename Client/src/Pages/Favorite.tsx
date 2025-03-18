import { Link } from "react-router-dom"
import { store } from "../lib/store"
import Container from "../ui/Container"
import FavoriteProdCard from "../ui/FavoriteProdCard"
import { useEffect } from "react"


const Favorite = () => {
  const {favoriteProduct}=store()

  useEffect(()=>{
      document.title='eShop-favoriteProducts';
    },[])
  return (
    <Container>
      {favoriteProduct?.length>0? 
      (<div>
        {/* top heading */}
        <div className="border-b border-b-gray-300 pb-6">
        <h2 className="text-2xl sm:text-3xl text-gray-900 font-bold 
        tracking-tight">Favorite Products</h2>
        <p className="text-sm text-gray-500 max-w-[500px] mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel facere 
          aspernatur laborum nobis non unde, beatae exercitationem assumenda 
          aliquam. Fugit eveniet provident quae voluptatibus earum autem facilis 
          illum sequi doloribus!</p>
      </div>
      {/* bottom products */}
      <div className="mt-6 flow-root px-4 sm:px-0 sm:mt-10">
        <div className="-my-6 divide-y divide-gray-300 sm:-my-10">
        {favoriteProduct?.map((item)=>(
          <FavoriteProdCard key={item?._id} product={item}/>
        ))}
        </div>
        
      </div>
      </div>)
      :(<div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-center text-gray-900 tracking-tight">
          Nothing added to favorite yet
        </h2>
        <p className="text-base sm:text-sm font-semibold text-gray-700 my-3 max-w-[500px] text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam esse 
          incidunt delectus, blanditiis ullam ut culpa soluta iste doloribus 
          explicabo! Laudantium, nesciunt cumque libero magnam recusandae debitis 
          tenetur illum fugit?
        </p>
        <Link to={`/product`}
        className=" bg-gray-300 py-2 px-4 text-base text-gray-900 rounded-md font-medium 
        hover:text-white hover:bg-black duration-200">
          Add Products
        </Link>
      </div>)}
    </Container>
  )
}

export default Favorite