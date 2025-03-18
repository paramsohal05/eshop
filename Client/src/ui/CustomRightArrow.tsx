import { HiArrowRight } from "react-icons/hi"

const customRightArrow = ({onClick}:any) => {
  return (
    <button
    onClick={onClick}
    className='absolute right-0 top-5 m-auto h-10 w-10 flex items-center 
    justify-center rounded-full bg-gray-100 hover:bg-gray-950 
     hover:text-white duration-200 border-[1px] border-gray-200'
    aria-label="Next">
      <HiArrowRight/>
    </button>
  )
}

export default customRightArrow