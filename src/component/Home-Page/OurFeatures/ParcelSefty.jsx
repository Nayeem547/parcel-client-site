

import useaxiosSecure from "../../Hook/useaxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";

const ParcelSefty = () => {
  const axiosSecure = useaxiosSecure();
  const { data: totalData = [] } = useQuery({
    queryKey: ["totalData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order/total");
      return res.data;
    },
  });
  return (
    <div className=" flex justify-center items-center text-center pt-56 ">
     

      <div>
        {totalData.map((item) => 
          <div key={item._id} className="  text-3xl md:text-8xl ">
            <h2 className=" pb-10 ">Total Order</h2>
            <CountUp className=" text-yellow-400 "  end={item.totalQuantity} duration={5} />
            
          </div>
        )}
      </div>
    </div>
  );
};

export default ParcelSefty;
