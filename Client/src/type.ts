export interface CategoryProps{
  _id:number;
  image:string;
  name:string;
  _base:string;
  description:string
}

export interface HighlightsType{
    _id:number;
    name:string;
    title:string;
    buttonTitle:string;
    image:string;
    _base:string;
    color:string;
    bgcolor:string
}

export interface ProductType{
  _id:number;
  name:string;
  _base: string;
  reviews:number;
  images:[string];
  description:string;
  regularPrice:number;
  discountedPrice:number;
  quantity:number;
  rating:number;
  category:string;
  colors:[string];
  brand:string;
  isStock:boolean;
  overView:string;
  isNew:boolean;


}

export interface BlogsType{
  _id:number;
  image:string;
  title:string;
  _base:string;
  description:string

}

export interface orderItemsType{
  productId:number;
  description:string;
  image:string;
  name:string;
  price:number;
  quantity:number;
  totalPrice:number;

}

export interface orderPaymentInfo{
   
paymentId:string;
payment_status:string;
payment_method_type:[string];

}


export interface OrderType{
  orderItems:[orderItemsType];
  paymentInfo:orderPaymentInfo
  paymentMethod:string;
  userEmail:string;
  userId:string;
  totalAmount:number;
  itemsPrice:number;
  shippinshippingOptionCharge:any
  
}