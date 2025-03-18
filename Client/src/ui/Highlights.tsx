import { useEffect, useState } from 'react'
import Container from './Container'
import { config } from '../../config'
import { getData } from '../lib'
import { HighlightsType } from '../type'
import { Link } from 'react-router-dom'

const Highlights = () => {
  const [hightlightsData, setHighlightsData]=useState([])
  
  

  useEffect(()=>{
     const fetchData=async()=>{
       const endpoint=`${config?.baseUrl}/highlights`
       const data= await getData(endpoint)
       setHighlightsData(data)
     }
     fetchData()
  },[])

  return (
    <Container 
    className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 items-center'>
        {
          hightlightsData.map((item:HighlightsType)=>(
            <div key={item?._id}
            className={`bg-[${item?.color}] relative h-80 md:h-72  shadow-md rounded-lg cursor-pointer overflow-hidden group flex `}>
              <div className='absolute inset-0 rounded-lg transition-transform duration-300 group-hover:scale-100'
              style={{
                
                backgroundColor: item?.bgcolor
                }}>
              </div>
              <div className='relative p-4 z-20 w-2/5 flex flex-col justify-between h-full '>
                <div className=''>
                  <h2 className='text-2xl md:text-xl font-bold w-48'>{item?.name}</h2>
                  <p className='text-xl md:text-base mt-4'>{item?.title}</p>
                </div>
                <Link to={item?._base}
                className={`text-2xl md:text-xl font-bold w-48 text-gray-800`}
                style={{color:item?.color}}>{item?.buttonTitle}</Link>
              </div>
              <div className='relative w-3/5'>
                 <div className='absolute inset-2 bg-cover bg-center rounded-xl'
              style={{
                backgroundImage:`url(${item?.image})`
                }}>
                  </div>
              </div>
            </div>
          ))
        }
    </Container>
  )
}

export default Highlights