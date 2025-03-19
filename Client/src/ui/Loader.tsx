import { RotatingLines } from "react-loader-spinner"


const Loader = () => {
  return (
    <div className='bg-black/80 flex flex-col items-center
    justify-center gap-2 fixed left-0 right-0 top-0  z-20 h-screen no-doc-scroll'>
      <RotatingLines
          visible={true}
          strokeWidth="4"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"/>
      <p className="font-bold text-2xl text-white tracking-widest">Loading...</p>
    </div>
  )
}

export default Loader