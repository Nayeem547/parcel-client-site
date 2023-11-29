// AllUsers.js
import React, { useContext } from 'react';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useaxiosSecure from '../Hook/useaxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../AuthProvider/AuthProvider';

const AllUsers = () => {
    const {user} = useContext(AuthContext);
  const axiosSecure = useaxiosSecure();

  const { refetch,  data: stats = []  } = useQuery({
    queryKey: ['users-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users-stats');
      return res.data;
    },
  });
  console.log(stats);

  const handleMakeAdmin = (state) => {
    axiosSecure
      .patch(`users/admin/${state.email}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: 'success',
            title: `${state.userName} is an admin now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error('Error making admin:', error);
      });
  };


  const handleDeliveryMan = (state) => {
    axiosSecure
      .patch(`users/deliveryMan/${state.email}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: 'success',
            title: `${state.userName} is an delivery-man now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error('Error making Delivery-Man:', error);
      });
  };

  

  return (
    <div>
      <div className='flex justify-evenly my-4'>
        <h2 className='text-3xl'>All Users</h2>
        <h2 className='text-3xl'>Total Users: </h2>
      </div>

      <div className='overflow-x-auto'>
        <table className='table table-zebra w-full'>
          {/* head */}
          <thead>
            <tr>
              <th>{stats.length}</th>
              <th> Users Name</th>
              <th>Phone Number</th>
              <th> Number of parcel Booked</th>
              <th>Total Spent Amount</th>
              <th>Make Delivery Men</th>
              <th>Make Admin Button</th>
            </tr>
          </thead>
          <tbody> 
           {stats.map((state, index) =>  <tr key={state._id} >
           <th> {index + 1} </th>
           
                <td>{state?.userName}</td>
                <td>{state?.phoneNumber}</td>
                <td>{state?.quantity}</td>
                <td>{state?.revenue}</td>
                <td>{state?.email}</td>
                 <td>
                  {state.role === 'admin' ? 'Admin' : (
                    <button onClick={() => handleMakeAdmin(state)} className='btn bg-orange-500 btn-lg'>
                      {' '}
                      <FaUsers className='text-white'></FaUsers>
                    </button>
                  )}
                </td>
                
                <td>

                {state.role === 'deliveryMan' ? 'Delivery-Man' : (
                    <button onClick={() => handleDeliveryMan(state)} className='btn btn-primary btn-lg'>
                    {' '}
                    <FaUsers className='text-white'></FaUsers>{' '}
                  </button>
                  )}

                  
                </td> 
              </tr> )}
             
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
