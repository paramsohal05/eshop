
import Container from './Container'
import homeBanner from '../assets/homeBannner.jpg'
import LinkButton from './LinkButton'

const HomeBanner = () => {
  return (
    <Container className='py-5 relative overflow-hidden'>
      <div>
        <img
        src={homeBanner}
        alt='homeImage'
        className='w-svw md:w-full md:h-[80vh] h-80 rounded-md  object-fill '/>
        <div className='w-full h-full absolute top-0 left-0 bg-black/10'/>
      </div>
      <div className='absolute inset-0 flex flex-col justify-center px-10'>
        <h1 className='text-3xl md:text-4xl  text-whiteText font-bold uppercase'>Mi Air Purifier</h1>
        <p className='text-xl md:text-xl font-semibold text-darkText max-w-[290px]'>The new tech gift your are wishing for right here</p>
        <LinkButton className='w-44 md:w-48 flex items-center justify-center mt-4 bg-whiteText 
        text-darkText hover:bg-darkText hover:text-whiteText text-lg md:text-xl font-medium'/>
      </div>
    </Container>
  )
}

export default HomeBanner