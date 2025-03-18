import Container from "./Container"
import FooterTop from "./FooterTop";
import PaymentMethods from "./PaymentMethods";



const Footer = () => {
  return (
    <div className="mt-10 mb-4">
      <FooterTop/>
        <Container className="flex flex-col md:flex-row items-center gap-y-8 md:justify-between">
          <p className="text-xl md:text-base text-gray-800 font-semibold flex flex-col md:flex-row text-center">@2024 E-commerce solutions. <span>All rights reserved.</span></p>
          <PaymentMethods/>
        </Container>
        
        <p className="text-center text-sm text-gray-700 font-semibold">
          Website developed by {""}
          <span className="font-bold">Param Sohal</span></p>
    </div>
  )
}

export default Footer