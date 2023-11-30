import { useQuery } from '@tanstack/react-query';
import React from 'react';


import CountUp from "react-countup";
import useaxiosSecure from '../../Hook/useaxiosSecure';

const DeliveredTotal = () => {

    const axiosSecure = useaxiosSecure();
  
  const { data: deliveredTotal = [] } = useQuery({
    queryKey: ["deliveredTotal"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order/delivered-total");
      return res.data;
    },
  });

    return (
        <div className=" flex justify-center items-center text-center pt-56 ">
     

      <div>
        {deliveredTotal.map((item) => 
          <div key={item._id} className="  text-3xl md:text-8xl ">
            <h2 className=" pb-10 ">Total Delivered</h2>
            <CountUp className=" text-yellow-400 "  end={item.totalDelivered} duration={5} />
            
          </div>
        )}
      </div>
    </div>
    );
};

export default DeliveredTotal;