import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import {  FaTags, FaTrashAlt } from 'react-icons/fa';
import UseAxiosPublic from '../Hook/UseAxiosPublic';

const MyDeliveryList = () => {
    const {user} = useContext(AuthContext);
    
const axiosPublic = UseAxiosPublic();
  const { refetch, data: deliveries = [] } = useQuery({
    queryKey: ['delivery-stats'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/delivery-stats/${user?.email}`); // Replace with your API endpoint to fetch deliveries assigned to the logged-in delivery man
      return res.data;
    },
  });

  const handleCancelDelivery = (orderId) => {
    console.log(orderId);

    axiosPublic
      .patch(`/order/deliveryMan/${orderId}`)
      
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
        }
      })
      .catch((error) => {
        console.error('Error cancelled deliveryMan:', error);
      });
     
  };

  const handleDeliverParcel = (orderId) => {
    console.log(orderId);

    axiosPublic
      .patch(`/order/delivered/${orderId}`)
      
      .then((res) => {
        refetch();
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          
          Swal.fire({
            icon: 'success',
            title: `${delivery.bookUsername} parcel is an cancelled now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error('Error parcel delivered:', error);
      });
     
  };
    return (
        <div className=' overflow-x-auto flex flex-col items-center  ' >
      <h2 className="text-3xl font-semibold pb-20 ">My Delivery List</h2>

      <div className='   ' >

      

      <table className="table text-center table-zebra w-full mx-auto">
        <thead>
          <tr>
            <th className='  text-center'>index</th>
            <th  >OrderId</th>
            <th>Booked User's Name</th>
            <th>Receivers Name</th>
            <th>Booked User's Phone</th>
            <th>Requested Delivery Date</th>
            <th>AproxiMate Delivery Date</th>
            
            <th>Receivers Phone Number</th>
            <th>Receivers Address</th>
            <th>Cancel and Delivery </th>
            
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery, index) => (
            <tr key={delivery._id}>
              <td className=' text-center font-bold pl-10 '>{index + 1}</td>
                <td >{delivery.orderIds}</td>
              <td>{delivery.bookUsername}</td>
              <td>{delivery.receiverName}</td>
              <td>{delivery.bookPhoneNumber}</td>
              <td>{delivery.requestedDeliveryDate}</td>
              <td>{delivery.Aproxidate}</td>
              
              <td>{delivery.receiversNumber}</td>
              <td>{delivery.reciverAddress}</td>
              <td className=' space-y-2 space-x-2 flex text-center items-center text-xl  ' >

              {
                delivery.status === 'Cancelled' || delivery.status === 'Delivered' ? (
              <span><FaTags></FaTags></span>
             ) : (
                <button
                className="btn btn-danger  "
                onClick={() => handleCancelDelivery(delivery.orderIds)}
              >
                <FaTrashAlt className="text-red-600 "></FaTrashAlt>
               
              </button>
            )
           }


    

                {
                delivery.status === 'Cancelled' || delivery.status === 'Delivered' ? (
              <span>{delivery.status}</span>
             ) : (
            <button
           className="btn btn-success"
           onClick={() => handleDeliverParcel(delivery.orderIds)}
           >
            Deliver
        </button>
  )
}
</td>
               


              
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </div>
    );
};

export default MyDeliveryList;