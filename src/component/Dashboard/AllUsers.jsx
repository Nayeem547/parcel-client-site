// AllUsers.js
import React, { useContext, useState } from "react";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useaxiosSecure from "../Hook/useaxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useLoaderData } from "react-router-dom";

const AllUsers = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useaxiosSecure();

  const [currentPage, setCurrentPage] = useState(0); // Start from page 1
  // const itemsPerPage = 2;

  const [itemsPerPage, setItemsPerPage] = useState(2);
  const { count } = useLoaderData();
  const numberofPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberofPages).keys()];
  console.log(pages, count, numberofPages);

  // const [totalPages, setTotalPages] = useState();

  // const { refetch,  data: stats = []  } = useQuery({
  //   queryKey: ['users-stats'],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get('/users-stats');
  //     return res.data;
  //   },
  // });
  // console.log(stats);

  // pagination queary
  const { data: stats = [] } = useQuery({
    queryKey: ["/users-stats", currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users-stats?page=${currentPage}&size=${itemsPerPage}`
      );
      // setTotalPages(Math.ceil( res.data.count / itemsPerPage ));
      return res.data;
    },
  });

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(0);
  };

  const handlePrevousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleMakeAdmin = (state) => {
    axiosSecure
      .patch(`users/admin/${state.email}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: `${state.userName} is an admin now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error making admin:", error);
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
            icon: "success",
            title: `${state.userName} is an delivery-man now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error making Delivery-Man:", error);
      });
  };

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: </h2>
      </div>

      <div className=" text-2xl font-semibold mb-12 space-y-6 ">
        <p>Current Page : {currentPage}</p>

        <div className=" flex justify-center flex-wrap  gap-7 ">
          <button
            className=" bg-gray-900  rounded-lg text-white py-2 px-3 text-xl "
            onClick={handlePrevousPage}
          >
            prev
          </button>
          {pages.map(
            (page) =>
              page < pages.length - 1 && (
                <button
                  className={
                    currentPage === page
                      ? " text-xl bg-black  rounded-lg py-1 px-4  text-white "
                      : undefined
                  }
                  onClick={() => setCurrentPage(page)}
                  key={page}
                >
                  {page + 1}
                </button>
              )
          )}

          <button
            className=" bg-gray-900  rounded-lg text-white py-2 px-3 text-xl "
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>

        <select
          value={itemsPerPage}
          onChange={handleItemsPerPage}
          name=""
          id=""
        >
          {/* <option value="5">5</option> */}
          <option value="2">2</option>
          {/* <option value="20">20</option>
                    <option value="50">50</option> */}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
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
            {stats.map((state, index) => (
              <tr key={state._id}>
                <th> {index + 1} </th>

                <td>{state?.userName}</td>
                <td>{state?.phoneNumber}</td>
                <td>{state?.quantity}</td>
                <td>{state?.revenue}</td>

                <td>
                  {state.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(state)}
                      className="btn bg-orange-500 btn-lg"
                    >
                      {" "}
                      <FaUsers className="text-white"></FaUsers>
                    </button>
                  )}
                </td>

                <td>
                  {state.role === "deliveryMan" ? (
                    "Delivery-Man"
                  ) : (
                    <button
                      onClick={() => handleDeliveryMan(state)}
                      className="btn btn-primary btn-lg"
                    >
                      {" "}
                      <FaUsers className="text-white"></FaUsers>{" "}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
