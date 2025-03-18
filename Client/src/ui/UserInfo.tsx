import toast from "react-hot-toast"
import { auth } from "../lib/firebase"
import { UserType } from "../lib/store"
import Container from "./Container"
import { useNavigate } from "react-router-dom"

import { IoArrowBack } from "react-icons/io5";


const UserInfo = ({currentUser}:{currentUser:UserType}) => {
  const navigate=useNavigate();
  
  return (
    <>
    <button onClick={()=>navigate(-1)} className="bg-gray-900  
      rounded-md p-2 flex items-center gap-2 my-1 hover:bg-black text-white">
        <IoArrowBack />
        <span>Back to previous page</span>
      </button>
      <Container className="py-5 text-white ">
      
      {/* row 1 */}
      <div className="relative isolate bg-gray-900  px-6 sm:px-16 overflow-hidden py-24 sm:rounded-3xl shadow-2xl">
        <div className="flex flex-col items-start sm:flex-row sm:items-center gap-5 sm:gap-10">
          {/* user image */}
          <img src={currentUser?.avatar? currentUser?.avatar
            :"https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"} 
            alt="userImage"
            className="h-40 w-40 rounded-full object-cover border border-gray-700 p-1"/>
            {/* user info */}
            <div className="text-start flex-1">
              <h1 className="text-xl sm:text-4xl font-bold tracking-tight">Welcome back, dear {""}
                <span className="underline underline-offset-2 decoration-[1px] font-medium">{currentUser?.firstName } {currentUser?.lastName}</span>
              </h1>
              <p className="text-base text-gray-300 *:mt-6 mt-3 leading-6 max-w-3xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis dignissimos, in nemo ad dolore amet. Mollitia, iure reiciendis ea culpa nobis ipsa voluptatum assumenda enim esse recusandae a facere soluta?
              Ipsa reiciendis minima voluptate, vero quae provident, sapiente nemo debitis numquam tenetur nihil nisi neque? Exercitationem ipsa provident qui commodi laborum, minima iure, necessitatibus architecto praesentium repellendus, numquam quod ad.
              olorum.</p>
            </div>
        </div>
        {/* buttons  row 2*/}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-y-3 sm:gap-y-0 sm:gap-x-5 px-6 ">
          <button onClick={()=>toast.error("Edit profile option available to pro version! ")} 
            className="bg-white w-40 sm:w-fit rounded-md px-8 py-2.5 font-semibold text-sm text-gray-900 hover:bg-gray-100
            focus-visible:ouline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
            Edit profile
          </button>

          <button onClick={()=>toast.error("Add address option available to pro version! ")} 
            className="bg-white rounded-md w-40 sm:w-fit px-8 py-2.5 font-semibold text-sm text-gray-900 hover:bg-gray-100
            focus-visible:ouline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
            Add Address
          </button>

          <button onClick={()=>auth.signOut()} 
            className="bg-white rounded-md w-40 sm:w-fit px-8 py-2.5 font-semibold text-sm text-gray-900 hover:bg-gray-100
            focus-visible:ouline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
            Log Out
          </button>
          
        </div>
      </div>
    </Container>
    </>
   
  )
}

export default UserInfo