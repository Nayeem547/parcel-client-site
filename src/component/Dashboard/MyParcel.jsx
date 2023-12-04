import useCart from "../Hook/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosPublic from "../Hook/UseAxiosPublic";
import {   useState } from "react";
// import { AuthContext } from "../AuthProvider/AuthProvider";
// import { useForm } from "react-hook-form";
// import DynamicStarRating from "../ReactRating/DynamicStarRating";
import ReviewModal from "./RevieModal/ReviewModal";

const MyParcel = () => {
  const [cart, refetch] = useCart();
  const axiosPublic = UseAxiosPublic();
  const [filteredUsers, setFilteredUsers] = useState(cart);
  const [tempData, setTempData] = useState({}); 

  // const { user } = useContext(AuthContext);
  // const users = {
  //   name: user?.displayName,
  //   email: user?.email,
  //   userImage: user?.photoURL,
  // };

  // const { register, handleSubmit, setValue } = useForm();

  // const [rating, setRating] = useState(0);

  // const handleRatingChange = (newRating) => {
  //   setRating(newRating);
  // };

  // const onSubmit = async (data) => {
  //   console.log(data.feedbak);
  //   console.log(rating);
  //   console.log(users.userImage);

  //   const reviewItem = {
  //     name: users.name,
  //     email: users.email,
  //     GiverImage: users.userImage,
  //     feedback: data.feedbak,
  //     deliveryMan: data.deliveryman,
  //     ratings: parseFloat(rating),
  //     bookingDate: data.bookingDate ? data.bookingDate.toISOString() : null,
  //   };
  //   console.log(reviewItem);
  //   const reviewRes = await axiosPublic.post("/reviews", reviewItem, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (reviewRes.data.insertedId) {
  //     Swal.fire({
  //       icon: "success",
  //       title: `${users.name} is add to the menu`,
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   }

  //   console.log("with img url", data);
  // };

  // useEffect(() => {
  //   setValue("bookingDate", new Date());
  // }, [setValue]);

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

  // const filteredCart =
  //   selectedStatus === "all"
  //     ? cart
  //     : cart.filter((item) => item.status === selectedStatus);

  const handleFilter = (event) => {
    const value = event.target.value;
    // const filtered = cart.filter(item => item.status.includes(value));
    // setFilteredUsers(filtered);

    const filtered =
      value === "all" ? cart : cart.filter((item) => item.status === value);
    setFilteredUsers(filtered);
  };

  return (
    <div>
      <div className=" flex justify-evenly my-4 ">
        <h2 className="text-3xl">All Booking Parcel</h2>
        <h2 className="text-3xl">Total Parcel: {cart.length}</h2>
      </div>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className=" pl-5 mr-2 text-2xl font-semibold font-serif ">
          Filter by Status:
        </label>
        <select
          className=" font-semibold text-xl border-blue-900 border-[10px] "
          onChange={handleFilter}
        >
          <option value="all">All</option>
          <option value="pending">pending</option>
          <option value="Delivered">Delivered</option>
          <option value="On-The-Way">On-The-Way</option>
          <option value="Cancelled">Cancelled </option>
          {/* Add more options based on your status values */}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table text-center   table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="  ">index</th>
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
            {filteredUsers.map((item, index) => (
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
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn btn-neutral hover:bg-blue-900  hover:px-2"
                    onClick={() => {
                      setTempData(item);
                      document
                        .getElementById(`my_modal_${item._id}`)
                        .showModal();
                    }}
                  >
                    Review
                  </button>
                  <dialog id={`my_modal_${item._id}`} className="modal">
                    <div className="modal-box">
                      <ReviewModal item={item} ></ReviewModal>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
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
