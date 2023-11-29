import React from 'react';
import useaxiosSecure from '../Hook/useaxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllParcel = () => {
    
    

    const axiosSecure = useaxiosSecure();

    const { data: orders = []} = useQuery( {
        queryKey: ['orders'],
        queryFn: async () => {
          const res = await axiosSecure.get('/order/admin');
          return res.data;
        }
    } )
    

    const { refetch,  data: delivery = []  } = useQuery({
        queryKey: ['delivery-men'],
        queryFn: async () => {
          const res = await axiosSecure.get('/delivery-men');
          return res.data;
        },
      });
      console.log(delivery);


    //   const handleAssignDeliveryMan = async (item, deliveryManEmail) => {
    //     try {
    //       const res = await axiosSecure.patch(`/order/assign-delivery-man/${item._id}`, {
    //         deliveryManEmail,
    //       });
    
    //       console.log('Order assigned:', res.data);
    //       // Add any UI update logic or refetch data if needed
    //     } catch (error) {
    //       console.error('Error assigning delivery man:', error);
    //       // Handle error, show alert, etc.
    //     }
    //   };

      const handleAssignDeliveryMan = (item, deliveryMan) => {

        axiosSecure
          .patch(`/order/admin/${item._id}`, {
            deliveryMan,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                icon: 'success',
                title: `${item.userName} is an admin now!`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            console.error('Error assign deliveryMan:', error);
          });
      };

      
    

    return (
        <div>
            <div className=' flex justify-evenly my-4 ' >
                <h2 className="text-3xl">
                    All Users
                </h2>
                <h2 className="text-3xl">
                    Total Users: {orders.length}
                </h2>
                
            </div>


            <div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Number</th>
        <th>Booking-Date</th>
        <th>Requested-Date</th>
        <th>Cost</th>
        <th>Status</th>
        <th>Mange-Button</th>
      </tr>
    </thead>
    <tbody>
      {
        orders.map( (item, index) => <tr key={item._id} >
            <th> {index + 1} </th>
            <td>{item.name}</td>
            <td>{item.number}</td>
            <td>{item.bookingDate}</td>
            <td>{item.date}</td>
            <td>{item.price}</td>
            <th>{item.status}</th>
            
            <td>  {item.status === 'On-The-Way' ? 'Asign' : 
           <div>

           
   <button className="btn btn-primary bg-blue-950 text-white " onClick={()=>document.getElementById('my_modal_1').showModal()}>
    <FaExternalLinkAlt></FaExternalLinkAlt> Manage
     </button> 
      <dialog id="my_modal_1" className="modal">
     <div className="modal-box space-y-3 px-20">
     <div className=' mb-4 flex justify-center text-center text-2xl text-blue-950 font-serif font-semibold ' > <h2>Assign Delivery-Man</h2></div>

      <select id="deliveryManSelect" className='select select-primary w-full max-w-xs'>
                        {delivery.map((deliveryMan) => 
                          <option key={deliveryMan._id} value={deliveryMan.email}>
                            {deliveryMan.email}
                          </option>
                        )}
                        
                      </select>

                      <button
              className='btn bg-green-500 text-white'
              onClick={() => {
                // Replace 'selectedDeliveryManEmail' with the selected value from your select field
                const deliveryMan = document.getElementById('deliveryManSelect').value;
                handleAssignDeliveryMan(item, deliveryMan);
              }}
            >
              Assign
            </button>
  
    <div className="modal-action pt-4">
      <form method="dialog ">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn  ">Close</button>
      </form>
    </div>
  </div>
</dialog>  </div> } </td>
          </tr> )
      }
      
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllParcel;