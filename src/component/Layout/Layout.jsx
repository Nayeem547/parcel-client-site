import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import loadingImg from '../../assets/loading-icegif.gif'

const Layout = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simulate an API call with setTimeout
        setTimeout(() => {
          // Set data and mark loading as complete
          
          setIsLoading(false);
        }, 1000); // Simulated 2-second loading time
      }, []);
    return (

        
        <div>
            {isLoading ? (
        <div className=" justify-center text-center mx-auto flex items-center spinner"> 
           <img className=' w-[100%] ' src={loadingImg} alt="" />
         </div>
      ) : (
            <div>
<Navbar></Navbar>
            <Outlet></Outlet>
            </div>
      )}
        </div>
    );
};

export default Layout;