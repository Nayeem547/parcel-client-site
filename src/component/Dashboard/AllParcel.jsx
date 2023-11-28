import React from 'react';
import useaxiosSecure from '../Hook/useaxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaExternalLinkAlt, FaTrashAlt } from 'react-icons/fa';

const AllParcel = () => {
    
    

    const axiosSecure = useaxiosSecure();

    const {data: orders = []} = useQuery( {
        queryKey: ['orders'],
        queryFn: async () => {
          const res = await axiosSecure.get('/order/admin');
          return res.data;
        }
    } )
    console.log(orders);

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
            
            <td>   {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn btn-primary bg-blue-950 text-white " onClick={()=>document.getElementById('my_modal_1').showModal()}>
    <FaExternalLinkAlt></FaExternalLinkAlt> Manage
</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
  
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog> </td>
          </tr> )
      }
      
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllParcel;