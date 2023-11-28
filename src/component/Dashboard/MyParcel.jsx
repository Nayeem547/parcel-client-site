import React from 'react';
import useCart from '../Hook/useCart';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import UseAxiosPublic from '../Hook/UseAxiosPublic';

const MyParcel = () => {
    const [cart, refetch] = useCart();
    const axiosPublic = UseAxiosPublic();


    const handleDelete = id => {
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
            //   Swal.fire({
            //     title: "Deleted!",
            //     text: "Your file has been deleted.",
            //     icon: "success"
            //   });
            axiosPublic.delete(`/order/${id}`)
            .then(res => {
                console.log(res);
                if(res.data.deletedCount > 0 ){
                    refetch();
                    Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                }
            })
            }
          });
    
      }
    
    
    return (
        <div>
            <div className=' flex justify-evenly my-4 ' >
                <h2 className="text-3xl">
                    All Booking Parcel
                </h2>
                <h2 className="text-3xl">
                    Total Parcel: {cart.length} 
                </h2>
            </div>


            <div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Parcel Type</th>
        <th>Requested Delivery Date</th>
        <th>Approximate Delivery Date</th>
        <th>Booking Date</th>
        <th>Delivery Men ID</th>
        <th>Booking Status</th>
        <th>Update and Cancel</th>
        <th>Review Button</th>
      </tr>
    </thead>
    <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <th> {index + 1} </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="">
                      <div className=" w-12 h-12">
                      
                        <p>{item.parcelType}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.date}</td>
                <td> $</td>
                <td>{item.bookingDate}</td>
                <th>
                 
                 
                  <button  onClick={() => handleDelete(item._id)}  className="btn btn-ghost btn-lg">
                    {" "}
                    <FaTrashAlt  className="text-red-600 "></FaTrashAlt>{" "}
                  </button>
                  
                 
                </th>
              </tr>
            ))}
          </tbody>
  </table>
</div>
        </div>
    );
};

export default MyParcel;