import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { FaRegSmile, FaSurprise, FaTags, FaTrashAlt } from 'react-icons/fa';
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

    axiosSecure
      .patch(`/order/deliveryMan/${orderId}`)
      
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: 'success',
            title: `${delivery.bookUsername} parcel is an cancelled now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error('Error cancelled deliveryMan:', error);
      });
     
  };

  const handleDeliverParcel = (orderId) => {
    console.log(orderId);

    axiosSecure
      .patch(`/order/delivered/${orderId}`)
      
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
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

      

      <table className="table table-zebra w-full mx-auto">
        <thead>
          <tr>
            <th  >OrderId</th>
            <th>Booked User's Name</th>
            <th>Receivers Name</th>
            <th>Booked User's Phone</th>
            <th>Requested Delivery Date</th>
            
            <th>Receivers Phone Number</th>
            <th>Receivers Address</th>
            <th>Cancel and Delivery </th>
            
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery._id}>
                <td >{delivery.orderIds}</td>
              <td>{delivery.bookUsername}</td>
              <td>{delivery.receiverName}</td>
              <td>{delivery.bookPhoneNumber}</td>
              <td>{delivery.requestedDeliveryDate}</td>
              
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