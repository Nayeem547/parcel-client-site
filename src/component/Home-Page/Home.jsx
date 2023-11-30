import React from 'react';
import Banner from './Banner';
import OurFeatures from './OurFeatures/OurFeatures';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import TopDeliveryMan from './TopDeliveryMan';

const Home = () => {
    return (
        <div>
            <Helmet>
             <title>Delivery-Express | Home</title>
           </Helmet>
            <div className=' pt-26 '>
            <Banner></Banner>
            </div>
            <div className=' items-center text-center flex justify-center mt-20 mb-20 '>
                <OurFeatures></OurFeatures>
            </div>
            <div >
                <TopDeliveryMan></TopDeliveryMan>
            </div>
            <footer>
                <Footer></Footer>
            </footer>
            
        </div>
    );
};

export default Home;