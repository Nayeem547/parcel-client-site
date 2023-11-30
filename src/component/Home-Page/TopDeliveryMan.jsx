import React from "react";

import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img2.jpg'
import img3 from '../../assets/img3jpg.jpg'
import img4 from '../../assets/img4jpg.jpg'
import img5 from '../../assets/img6.jpg'

const TopDeliveryMan = () => {
  return (
    <div className=" my-16 flex flex-col justify-center items-center " >
        <div>
            <h2 className=" text-xl mb-10 md:text-4xl font-bold  " > Top Delivery Man</h2>
        </div>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-16  ">

        <div>
        <div className="card w-96 h-[500px] bg-base-100 shadow-xl">
       <figure><img src={img1} /></figure>
     <div className="card-body">
     <h2 className="card-title text-2xl ">Shakib</h2>
      <p>Number of parcel Delivered: 10</p>
      <p>Average Ratings: 4</p>
    
     </div>
     </div>

        </div>


        <div>
        <div className="card w-96 h-[500px] bg-base-100 shadow-xl">
       <figure><img src={img5} /></figure>
     <div className="card-body">
     <h2 className="card-title">Niloy</h2>
      <p>Number of parcel Delivered: 9</p>
      <p>Average Ratings: 5</p>
     </div>
     </div>
     
        </div>


        <div>
        <div className="card w-96 h-[500px] bg-base-100 shadow-xl">
       <figure><img src={img2} /></figure>
     <div className="card-body">
     <h2 className="card-title">Shajin</h2>
      <p>Number of parcel Delivered: 8</p>
      <p>Average Ratings: 4</p>
     </div>
     </div>
     
        </div>



        <div>
        <div className="card w-96 h-[500px] bg-base-100 shadow-xl">
       <figure><img src={img3} /></figure>
     <div className="card-body">
     <h2 className="card-title">Jisan</h2>
      <p>Number of parcel Delivered: 7</p>
      <p>Average Ratings: 5</p>
     </div>
     </div>
     
        </div>



        <div>
        <div className="card w-96 h-[500px] bg-base-100 shadow-xl">
       <figure><img src={img4} /></figure>
     <div className="card-body">
     <h2 className="card-title">Akash</h2>
      <p>Number of parcel Delivered: 6</p>
      <p>Average Ratings: 4</p>
     </div>
     </div>
     
        </div>


      </div>
    </div>
  );
};

export default TopDeliveryMan;
