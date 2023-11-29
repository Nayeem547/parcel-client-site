import { NavLink, Outlet } from "react-router-dom";
import {  FaAngleDoubleRight, FaBookOpen, FaBoxOpen, FaHome, FaShoppingBag, FaShoppingCart, FaUserCheck } from 'react-icons/fa';
const Dashboard = () => {
    return (
        
             <div className=' flex '>
            <div className=' w-64 min-h-screen bg-blue-950 text-white '>
              <ul className='menu p-4'>

              <li><NavLink  to="/dashboard/allParcel" > 
                <FaShoppingBag></FaShoppingBag> All Parcel
                </NavLink></li>

              

              <li><NavLink  to="/dashboard/allUsers" > 
                <FaHome></FaHome> All Users
                </NavLink></li>



                <div className="divider"></div>

              <li><NavLink  to="/dashboard/booking" > 
                <FaBookOpen></FaBookOpen> Book a Parcel
                </NavLink></li>

              <li><NavLink  to="/dashboard/myParcel" > 
                <FaShoppingCart></FaShoppingCart> My Parcel
                </NavLink></li>

              <li><NavLink  to="/dashboard/myProfile" > 
                <FaUserCheck></FaUserCheck> My Profile Menu
                </NavLink></li>

                <div className="divider" ></div>

                <li><NavLink  to="/" > 
                <FaHome></FaHome> Home
                </NavLink></li>

               
                <div className=" divider "></div>

                <li><NavLink  to="/dashboard/myDeliveryList" > 
                <FaAngleDoubleRight></FaAngleDoubleRight> My Delivery List
                </NavLink></li>


              </ul>
              </div>

             <div className=" flex justify-center items-center mx-auto w-full ">
                <Outlet></Outlet>
             </div>

              </div>
    
        
    );
};

export default Dashboard;