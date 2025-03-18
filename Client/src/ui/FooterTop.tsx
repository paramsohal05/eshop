
import Container from './Container';
import exchange from '../assets/exchan.webp';
import freeShipping from '../assets/shiip.jpg';
import warrenty from '../assets/warrentii.jpg';


const incentives=[
  { id:1,
    image:freeShipping,
    name:"Free Shipping",
    description:"It's not actually free. We just price it into the products.Someone is paying for it & its not us."
  },
  { id:2,
    image:warrenty,
    name:"10-year warranty",
    description:"If it breaks in the first 10 years we'll replace it. After that you're on your own though."
  },
  { id:3,
    image:exchange,
    name:"Exchanges",
    description:"If you don't like it , trade it to one of your friends for something of theirs. Don't send it here though."
  },
]

const FooterTop = () => {
  return (
    <Container className='py-0'>
      <div className='rounded-2xl bg-[#dad8d8] px-6 py-16 sm:p-16 gap-6'>
        {/* top */}
        <div className='mx-automax-w-xl lg:max-w-none '>
          <div className='text-center'>
            <h2 className='text-xl sm:text-2xl font-bold tracking-tight text-gray-900'>We built our business on customer service</h2>
          </div>
        </div>
        {/* bottom */}
        <div className='flex flex-col lg:flex-row items-center justify-between py-8 gap-5'>
          {
            incentives.map(({name, description, image, id})=>(
            <div key={id} className='text-center sm:flex sm:text-left lg:items-center lg:block'>
                {/* image */}
                <div className='sm:flex-shrink-0'>
                  <div className='flex-root'>
                  <img src={image} alt='image'
                  className=' w-36 h-36 md:w-20 md:h-20 rounded-md mx-auto'/>
                  </div>
                </div>
                {/* name and description */}
                <div className='mt-3 sm:ml-6 lg:ml-0 sm:text-left lg:text-center'>
                  <h2 className='text-gray-950 font-semibold text-2xl lg:text-base'>{name}</h2>
                  <p className='text-gray-600 text-xl lg:text-sm mt-2'>{description}</p>
                </div>
              </div>
            ))

          }
        </div>
      </div>
    </Container>

  )
}

export default FooterTop