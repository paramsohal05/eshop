import { Link } from "react-router-dom"
import Title from "./Title"
import Container from "./Container"
import Pagination from "./Pagination"



const ProductList = () => {
  

  return (
    <Container >
      <div>
        <div className="flex flex-col gap-y-3 sm:gap-y-0 sm:flex-row justify-between items-center">
          <Title text="Top Selling Products"/>
          <Link to={`/product`} className="relative font-medium text-xl md:text-lg group">View All Products
          <span className="absolute bottom-0 left-0 w-0 block h-[1px] bg-gray-600 transform -translate-x-[105%] 
          group-hover:translate-x-0 duration-300 group-hover:w-full"/>
          </Link>
        </div>
        <div className="w-full h-[1px] bg-gray-400 my-4"/>
      </div>
      <Pagination/>
    </Container>
  )
}

export default ProductList