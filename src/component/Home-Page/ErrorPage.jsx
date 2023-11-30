import React from 'react';

import errorimg from '../../assets/errorimage.jpg'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className=' flex justify-center flex-col items-center '>
        <div className=' flex justify-center items-center ' >
            <img src={errorimg} alt="" />
        </div>
         <Link to="/">
        <button className=' text-2xl font-medium py-3 px-4 bg-red-600 hover:bg-red-900 rounded-lg text-white '>Back To Home</button>
         </Link>
       
    </div>
    );
};

export default ErrorPage;