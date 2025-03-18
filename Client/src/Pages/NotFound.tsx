
import { useLocation } from 'react-router-dom'
import Container from '../ui/Container';
import { HiBookOpen, HiRss } from 'react-icons/hi';
import { HiBookmarkSquare, HiMiniQueueList } from 'react-icons/hi2';

import { LuChevronRight } from 'react-icons/lu';
import LinkButton from '../ui/LinkButton';
import { useEffect } from 'react';


const links=[
  {
    name:"Product",
    href:"/product",
    description:"You will find all available products here",
    icon:HiBookOpen
  },
  {
    name:"Shop",
    href:"/shop",
    description:"Maximum collection of shopping products",
    icon:HiMiniQueueList
  },
  {
    name:"My Account",
    href:"/profile",
    description:"Find your information here.",
    icon:HiBookmarkSquare
  },
  {
    name:"Blog",
    href:"/blog",
    description:"Read our latest news and articles on shopping.",
    icon:HiRss
  },

];


const NotFound = () => {
  const {pathname}=useLocation();
  const path=pathname.split("/")
  const userpath=path[1]

   useEffect(()=>{
        document.title='eShop-Page Not Found';
      },[])
 
  return (
    <Container>
        <div className='bg-white'> 
          <main className='px-6 pb-16 pt-10 sm:pb-24 lg:px-8'>
            {/* top text */}
            <div className='text-center'>
            <h1 className='text-skyText font-bold text-4xl leading-8'>404</h1>
            <h2 className='mt-2 text-darkText font-bold text-3xl tracking-tight'>
              <span className='text-redText underline underline-offset-2 decoration-[1px]'>
              {userpath} </span>
              does not exist
              </h2>
            <p className='mt-2 lg:text-base leading-7 text-gray-700 text-xl sm:mt-6 sm:leading-8 font-semibold'>
              Sorry, we could not find the {userpath} page you're looking for.</p>
            </div>
            {/* bottom list */}
            <div className='mx-auto mt-6 flow-root max-w-lg'>
              <h2 className='sr-only'>Popular Pages</h2>
              <ul role='list' className='divide-y-2   flex flex-col'>
                {
                  links.map((link, linkIdx)=>(
                    <li key={linkIdx} className='relative flex gap-x-6 py-4 px-4 items-center rounded-md hover:bg-skyText/20'>
                      {/* icon */}
                       <div className='text-center ring-1 ring-gray-300 rounded-sm px-2 py-2'>
                        <link.icon aria-hidden="true"
                        className=' text-sky-600 w-14 h-14 lg:w-6 lg:h-6'/>
                       </div>
                       {/* title/description */}
                       <div className='w-5/6 flex flex-col gap-3 py-1'>
                        {/* title */}
                         <h3>
                          <a href={link.href}>
                            <span className='text-gray-900 font-semibold text-xl lg:text-base' aria-hidden="true">{link.name}</span>
                          </a>
                         </h3>
                         {/* description */}
                         <p className='text-gray-700 lg:text-base text-xl'>{link.description}</p>
                       </div>
                       {/* arrow icon */}
                       <div>
                        <LuChevronRight  className='text-gray-500 w-8 h-8 lg:w-6 lg:h-6'
                        aria-hidden="true"/>
                       </div>
                    </li>
                  ))
                }
              </ul>
              {/* linkbutton */}
              <div className='mt-5 flex justify-center'>
                <LinkButton showButton={true} link={"/"}/>
              </div>
            </div>
          </main>
          
        </div>
    </Container>
  )
}

export default NotFound