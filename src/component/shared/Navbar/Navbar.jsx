import { Link } from "react-router-dom";

import logo from '../../../assets/Picsart_23-11-24_17-20-43-390.png'
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
const Navbar = () => {
    
    const { user, logOut } = useContext(AuthContext);
    
  
    const handleLogOut = () => {
      logOut()
        .then(() => {})
        .catch((error) => console.log(error));
    };

    const navOption = (
       

        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
    
          
          
    
          {user ? (
            <>
              <button onClick={handleLogOut} className=" btn btn-ghost ">
                logOut
              </button>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          <li>
            <Link to="/signUp">SignUp</Link>
          </li>
        </>
      );
    
      return (
        <div>
          <div className="navbar fixed z-10 bg-opacity-100 bg-blue-950 text-white max-w-screen-xl">
            <div className="navbar-start">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {navOption}
                </ul>
              </div>

              <div className=" md:pl-5 ">

              
              <img className=" w-14 " src={logo} alt="" />
              <div className=" flex flex-col " >

              
              <p> Delivery </p> <p className="  pl-6 " >Express</p>
              </div>
              </div>

            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navOption}</ul>
            </div>
            <div className="navbar-end">
             
              
            </div>
          </div>
        </div>
      );
};

export default Navbar;