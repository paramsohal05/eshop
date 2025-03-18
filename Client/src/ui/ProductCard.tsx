
import { MdStarOutline } from 'react-icons/md';
import { ProductType } from '../type'
import AddToCartBtn from './AddToCartBtn';
import { useState } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import FormattedPrice from './FormattedPrice';
import ProductCardSideNav from './ProductCardSideNav';
import { useNavigate } from 'react-router-dom';

interface Props{
  item:ProductType;
  setSearchText?:any;
}

const ProductCard = ({item, setSearchText}:Props) => {
  const [isOpen, setIsOpen]=useState(false)
  const navigate=useNavigate();
  
  const open=()=>{
    setIsOpen(true)
  }

  const close=()=>{
    setIsOpen(false)
  }

  const handleProduct=()=>{
   navigate(`/product/${item?._id}`)
   setSearchText && setSearchText("")
  }

  const percentage=((item?.regularPrice-item?.discountedPrice)/item?.regularPrice)*100
  return (
    <div className='h-fit border border-gary-200 hover:border-black duration-200 
    rounded-lg overflow-hidden cursor-pointer group'>
      <div className='w-full h-60 sm:h-56 relative'>
        <span onClick={open} className='absolute left-0 px-2 py-1 bg-darkText text-skyText
        rounded-md z-10 text-lg md:text-base mt-1 ml-1'>Save {percentage.toFixed(0)}%</span>
       <img 
       onClick={handleProduct}
       src={item?.images[0]} 
       alt='ProductImage'
       className='w-full h-full rounded-t-lg'/>
       {/* sidenavbar */}
       <ProductCardSideNav product={item}/>
      </div>
      <div className='flex flex-col gap-2 pb-2 px-1'>
        <h3 className='text-sm md:text-xs  font-semibold text-lightText uppercase'>
          {item?.overView}
        </h3>
        <h2 className='text-base font-bold line-clamp-2 tracking-tight'>
          {item?.name}
        </h2>
        <div className='flex text-base text-gray-500'>
          <MdStarOutline/>
          <MdStarOutline/>
          <MdStarOutline/>
          <MdStarOutline/>
          <MdStarOutline/>
        </div>
        {/* cart btn */}
        <AddToCartBtn title='Add to cart' product={item} />
      </div>
      {/* pop up */}
        <Transition 
        appear
        show={isOpen}>
          <Dialog
           as='div' 
           className='relative z-10 focus:outline-none '
           onClose={close}>
            <div className='fixed inset-0 z-10 w-screen overflow-y-auto  backdrop-blur-sm'>
              <div className='flex min-h-full items-center justify-center p-4 '>
              <TransitionChild
              enter='ease-out duration-300'
              enterFrom='opacity-0 transform-[scale(95%)]'
              enterTo='opacity-100 transform-[scale(100%)]'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 transform-[scale(100%)]'
              leaveTo='opacity-0 transform-[scale(95%)]'>
                <DialogPanel className='w-full max-w-md  bg-black z-50 p-6 rounded-xl '>
                  <DialogTitle as='h3' className='text-base/7 font-semibold 
                  text-white '>
                    Hurry up!
                  </DialogTitle>
                  <p className='mt-2 text-sm/6 text-white/50 '>
                    You are going to save {''}
                    <span className='text-skyText'>
                      <FormattedPrice amount={item?.regularPrice-item?.discountedPrice}/>
                    </span> {''}
                    from this product
                  </p>
                  <p className='text-sm/6 text-whiteText/50'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Eveniet ipsum cupiditate totam soluta. Voluptatem omnis molestiae maiores?
                  </p>
                  <div className='mt-4'>
                    <Button className='text-white bg-gray-700 px-3 py-1.5 rounded-md
                    inline-flex items-center gap-2 shadow-inner shadow-white/20 
                    focus:outline-none data-[hover]:bg-slate-600 data-[open]:bg-gray-700
                    data-[focus]:outline-1 data-[focus]:outline-white'
                    onClick={close}>
                      Got it, thanks
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>

    </div>
  )
}

export default ProductCard