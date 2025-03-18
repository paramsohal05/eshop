import { HiArrowLeft } from "react-icons/hi"


const customLeftArrow = ({onClick}:any) => {
  return (
    <button
        onClick={onClick}
        className='absolute left-0 top-5 m-auto h-10 w-10 flex items-center 
        justify-center rounded-full bg-gray-100 hover:bg-gray-950 
         hover:text-white duration-200 border-[1px] border-gray-200'
        aria-label="Previous">
          <HiArrowLeft/>
        </button>
  )
}

export default customLeftArrow