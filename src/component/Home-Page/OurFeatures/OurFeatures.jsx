import React from "react";
import { FaClock, FaRunning, FaUnlockAlt } from "react-icons/fa";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const OurFeatures = () => {
  return (
    <div>
      <div className=" gap-20  grid md:grid-cols-3 grid-cols-1 ">
      <motion.div
      className="box"
      /**
       * Setting the initial keyframe to "null" will use
       * the current value to allow for interruptable keyframes.
       */
      whileHover={{ scale: [null, 1.2, 1.1] }}
      transition={{ duration: 0.3 }}
    >
        <Link to="/parcelSefty" >
        <div className=" rounded-2xl shadow-2xl p-4 bg-gray-50 border space-y-5 text-center flex flex-col justify-center items-center h-72 w-80 text-black ">
          <p>
            <FaUnlockAlt className=" text-5xl text-yellow-500 "></FaUnlockAlt>
          </p>
          <h2 className=" text-xl  md:text-3xl  font-serif font-medium ">
            Secure Parcel Handling
          </h2>
          <p className=" text-sm  ">
            Our top priority is the safety of your parcels. With
            state-of-the-art security measures, we ensure that your deliveries
            are handled with the utmost care and reach their destination
            securely.
          </p>
        </div> 

        </Link>
        </motion.div>


        <Link to="/totalDelivery" >

        <motion.div
      className="box"
      /**
       * Setting the initial keyframe to "null" will use
       * the current value to allow for interruptable keyframes.
       */
      whileHover={{ scale: [null, 1.2, 1.1] }}
      transition={{ duration: 0.3 }}
    >
        <div className=" rounded-2xl shadow-2xl p-4 bg-gray-50 border space-y-5 text-center flex flex-col justify-center items-center h-72 w-80 text-black ">
          <p>
            <FaClock className=" text-5xl text-rose-500 "></FaClock>
          </p>
          <h2 className=" text-xl  md:text-3xl  font-serif font-medium ">
            Real-Time Tracking
          </h2>
          <p>
            Stay in the loop with real-time parcel tracking. Our advanced
            tracking system allows you to monitor the status and location of
            your deliveries, providing you with peace of mind and control over
            your shipments.
          </p>
        </div> </motion.div>

        </Link>



          <Link to="/totalUser"  >

          <motion.div
      className="box"
      /**
       * Setting the initial keyframe to "null" will use
       * the current value to allow for interruptable keyframes.
       */
      whileHover={{ scale: [null, 1.2, 1.1] }}
      transition={{ duration: 0.3 }}
    >

        <div className=" rounded-2xl shadow-2xl p-4 bg-gray-50 border space-y-5 text-center flex flex-col justify-center items-center h-72 w-80 text-black">
          <p>
            <FaRunning className=" text-5xl text-sky-700 " ></FaRunning>
          </p>
          <h2 className=" text-xl  md:text-3xl  font-serif font-medium ">
            Lightning-Fast Delivery
          </h2>
          <p>
            {" "}
            Experience the speed of our super-fast delivery service. Whether
            it's a last-minute gift or an urgent document, we guarantee swift
            and efficient deliveries to meet your tight schedules.
          </p>
        </div> </motion.div>

          </Link>
        

      </div>
    </div>
  );
};

export default OurFeatures;
