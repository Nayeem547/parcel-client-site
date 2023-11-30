import React from 'react';
import Banner from './Banner';
import OurFeatures from './OurFeatures/OurFeatures';
import Footer from './Footer';

const Home = () => {
    return (
        <div>
            <div>
            <Banner></Banner>
            </div>
            <div className=' items-center text-center flex justify-center mt-20 mb-20 '>
                <OurFeatures></OurFeatures>
            </div>
            <footer>
                <Footer></Footer>
            </footer>
            
        </div>
    );
};

export default Home;