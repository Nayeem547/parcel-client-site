import React from 'react';
import useaxiosSecure from '../Hook/useaxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllDeliveryMan = () => {

    const axiosSecure = useaxiosSecure();
    const {   data: allDelivery = []  } = useQuery({
        queryKey: ['all-delivery-man'],
        queryFn: async () => {
          const res = await axiosSecure.get('/all-delivery-man');
          return res.data;
        },
      });
      console.log(allDelivery);
    return (
        <div className=' mb-24  ' >
            <div className=' space-y-14 ' >
      <div className='flex justify-evenly '>
        <h2 className='text-5xl'>All Delivery-Man</h2>
        <h2 className='text-5xl'>Total Delivery-Man: {allDelivery?.length} </h2>
      </div>

      <div className='overflow-x-auto'>
        <table className='table table-zebra w-full'>
          {/* head */}
          <thead className='text-center font-semibold text-2xl' >
            <tr>
              <th > index </th>
              <th> Delivery-Man Name</th>
              <th>Phone Number</th>
              <th> Number of parcel Delivered</th>
              <th>Avg Rating</th>
              
            </tr>
          </thead>
          <tbody className=' text-center font-semibold text-2xl ' > 
           {allDelivery.map((state, index) =>  <tr key={state._id} >
           <th  > {index + 1} </th>
           
                <td>{state?.userName}</td>
                <td>{state?.DeliveryNumber}</td>
                <td>{state?.quantity}</td>
                <td>4</td>
                 
              </tr> )}
             
            
          </tbody>
        </table>
      </div>
    </div>
        </div>
    );
};

export default AllDeliveryMan;