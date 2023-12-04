// import { useQuery } from '@tanstack/react-query';
import React from 'react';
// import useaxiosSecure from '../../Hook/useaxiosSecure';
import CountUp from "react-countup";

const TotalUsers = () => {
    // const axiosSecure = useaxiosSecure();
  
  // const { data: TotalUsers = [] } = useQuery({
  //   queryKey: ["TotalUsers"],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get("/users/total-users");
  //     return res.data;
  //   },
  // });

    return (
        <div className=" flex justify-center items-center text-center pt-56 ">
     

      <div>
        
          <div className="  text-3xl md:text-8xl ">
            <h2 className=" pb-10 ">Total Delivered</h2>
            <CountUp className=" text-yellow-400 "  end={10} duration={2} />
            
          </div>
        
      </div>
    </div>
    );
};

export default TotalUsers;