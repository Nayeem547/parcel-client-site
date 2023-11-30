import React, { useContext } from "react";
import useCart from "../Hook/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosPublic from "../Hook/UseAxiosPublic";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from "../AuthProvider/AuthProvider";

const MyParcel = () => {
  const [cart, refetch] = useCart();
  const axiosPublic = UseAxiosPublic();
  const {user} = useContext(AuthContext);
  const users = {
    name: user?.displayName,
    email: user?.email,
  };
  
  const {  register, handleSubmit,  } = useForm();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //   Swal.fire({
        //     title: "Deleted!",
        //     text: "Your file has been deleted.",
        //     icon: "success"
        //   });
        axiosPublic.delete(`/order/${id}`).then((res) => {
          console.log(res);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };


  const onSubmit = async (data) => {
    console.log(data);
    

    const menuItem = {
      name: users.name,
      email: users.email,
      feedback: data.feedback,
      deliveryMan: data.deliveryman,
     
      
      
    };
    console.log(menuRes.data);
    const menuRes = await axiosPublic.post("/feedback", menuItem, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    
    if (menuRes.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: `${users.name} is add to the menu`,
        showConfirmButton: false,
        timer: 1500,
      });
    }

    console.log("with img url", data);
  };

  return (
    <div>
      <div className=" flex justify-evenly my-4 ">
        <h2 className="text-3xl">All Booking Parcel</h2>
        <h2 className="text-3xl">Total Parcel: {cart.length}</h2>
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
                <td> {item.bookingDate}</td>
                <td>{item.bookingDate}</td>
                <td>{item.deliveryMan}</td>
                <td>{item.status}</td>

                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-lg"
                  >
                    {" "}
                    <FaTrashAlt className="text-red-600 "></FaTrashAlt>{" "}
                  </button>
                </td>

                <td>
                  <button className="btn btn-ghost btn-lg">
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button
                      className="btn"
                      onClick={() =>
                        document.getElementById("my_modal_2").showModal()
                      }
                    >
                      open modal
                    </button>
                    <dialog id="my_modal_2" className="modal">
                      <div className="modal-box">
                        

         <form className=" p-3 grid grid-col-1 " onSubmit={handleSubmit(onSubmit)}>

         

          <div className="form-control  ">
            <label className="label">
              <span className="label-text">Feedback</span>
            </label>
            <input
              {...register("feedback")}
              type="text"
              
              placeholder="feedback"
              className="input input-bordered "
              
            />
          </div>


                      <div className="form-control  ">
            <label className="label">
              <span className="label-text">User name</span>
            </label>
            <input
              {...register("userName")}
              type="text"
              defaultValue={users?.name}
              placeholder=""
              className="input input-bordered "
              readOnly
            />
          </div>

                      <div className="form-control  ">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("useremail")}
              type="text"
              defaultValue={users?.email}
              className="input input-bordered "
              readOnly
            />
          </div>

                   
                      <div className="form-control  ">
            <label className="label">
              <span className="label-text">Delivery Man</span>
            </label>
            <input
              {...register("deliveryman")}
              type="text"
             defaultValue={item.deliveryMan}
              className="input input-bordered "
              readOnly
            />
          </div>
                      
          <div className=" flex justify-center  mb-36 ">
          <button className=" btn btn-neutral " type="  submit">
            Review
          </button>
        </div>


                      </form>

                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcel;
