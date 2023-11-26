import { NavLink, Outlet } from "react-router-dom";
import {  FaBookOpen, FaHome } from 'react-icons/fa';
const Dashboard = () => {
    return (
        
             <div className=' flex '>
            <div className=' w-64 min-h-screen bg-orange-400 '>
              <ul className='menu p-4'>

              <li><NavLink  to="/dashboard/adminHome" > 
                <FaHome></FaHome> Admin Home
                </NavLink></li>

              <li><NavLink  to="/dashboard/booking" > 
                <FaBookOpen></FaBookOpen> Book a Parcel
                </NavLink></li>

              <li><NavLink  to="/dashboard/myParcel" > 
                <FaBookOpen></FaBookOpen> My Parcel
                </NavLink></li>

              <li><NavLink  to="/dashboard/myProfile" > 
                <FaBookOpen></FaBookOpen> My Profile Menu
                </NavLink></li>

                <div className="divider" ></div>


              </ul>
              </div>

             <div className=" flex justify-center items-center mx-auto w-full ">
                <Outlet></Outlet>
             </div>

              </div>
    
        
    );
};

export default Dashboard;