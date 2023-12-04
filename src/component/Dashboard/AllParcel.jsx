import React, { useState } from "react";
import useaxiosSecure from "../Hook/useaxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaExternalLinkAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AllParcel = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ordersData, setOrdersData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const axiosSecure = useaxiosSecure();

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order/admin");
      setOrdersData(res.data);
      return res.data;
    },
  });

  const { data: delivery = [] } = useQuery({
    queryKey: ["delivery-men"],
    queryFn: async () => {
      const res = await axiosSecure.get("/delivery-men");
      return res.data;
    },
  });

  /*   const handleAssignDeliveryMan = async (item, deliveryManEmail) => {
        try {
          const res = await axiosSecure.patch(`/order/assign-delivery-man/${item._id}`, {
            deliveryManEmail,
          });
    
          console.log('Order assigned:', res.data);
          // Add any UI update logic or refetch data if needed
        } catch (error) {
          console.error('Error assigning delivery man:', error);
          // Handle error, show alert, etc.
        }
      }; */

  const handleAssignDeliveryMan = (item, deliveryMan, selectedDate) => {
    console.log(item._id, selectedDate);

    axiosSecure
      .patch(`/order/admin/${item._id}`, {
        deliveryMan,
        Aproxidate: selectedDate,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: `${item.userName} is an admin now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error assign deliveryMan:", error);
      });
  };

  const handleDateShorting = () => {
    // console.log(ordersData[0].date.split("T")[0] >= startDate.split("T")[0] && ordersData[0].date.split("T")[0] <= endDate.split("T")[0]);
    setOrdersData([]);
    const filteredData = ordersData.filter(
      (orderData) => orderData.date >= startDate && orderData.date <= endDate
    );
    setOrdersData(filteredData);
  };

  return (
    <div className=" mb-16  ">
      <div className=" flex justify-evenly my-4 ">
        <h2 className="text-3xl">All Parcel</h2>
        <h2 className="text-3xl">Total Parcel: {orders.length}</h2>
      </div>

      <div className="flex justify-end gap-5">
        <input
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
          className="input input-bordered"
        />

        <input
          type="date"
          onChange={(e) => setEndDate(e.target.value)}
          className="input input-bordered"
        />
        <button
          onClick={() => handleDateShorting()}
          className="btn btn-outline"
        >
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>index</th>
              <th>parcelID</th>
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
            {ordersData.map((item, index) => (
              <tr key={item._id}>
                <th> {index + 1} </th>
                <th>{item._id}</th>
                <td>{item.name}</td>
                <td>{item.number}</td>
                <td>{item.bookingDate}</td>
                <td>{item.date}</td>
                <td>{item.price}</td>
                <th>{item.status}</th>

                <td>
                  {" "}
                  {item.status === "On-The-Way" ? (
                    "Asign"
                  ) : (
                    <div>
                      <button
                        className="btn btn-primary   text-center bg-blue-950 text-white "
                        onClick={() =>
                          document.getElementById("my_modal_1").showModal()
                        }
                      >
                        <span className=" text-center flex gap-2 ">
                          <FaExternalLinkAlt></FaExternalLinkAlt> Manage
                        </span>
                      </button>
                      <dialog id="my_modal_1" className="modal">
                        <div className="modal-box space-y-3 px-20">
                          <div className=" mb-4 flex justify-center  text-center text-2xl text-blue-950 font-serif font-semibold ">
                            {" "}
                            <h2>Assign Delivery-Man</h2>
                          </div>

                          <div>
                            <h2 className=" text-2xl font-medium  ">
                              {" "}
                              Delivery Man{" "}
                            </h2>
                            <select
                              id="deliveryManSelect"
                              className="select select-primary w-full max-w-xs"
                            >
                              {delivery.map((deliveryMan) => (
                                <option
                                  key={deliveryMan._id}
                                  value={deliveryMan.email}
                                >
                                  {deliveryMan.email}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <h2 className=" text-2xl font-medium  ">
                              {" "}
                              Approximate delivery date
                            </h2>
                            <DatePicker
                              selected={selectedDate}
                              onChange={(date) => setSelectedDate(date)}
                              dateFormat="MMMM d, yyyy"
                              className="input input-bordered"
                            />
                          </div>

                          <button
                            className="btn bg-green-500 pt-4 text-white"
                            onClick={() => {
                              // Replace 'selectedDeliveryManEmail' with the selected value from your select field
                              const deliveryMan =
                                document.getElementById(
                                  "deliveryManSelect"
                                ).value;
                              handleAssignDeliveryMan(
                                item,
                                deliveryMan,
                                selectedDate
                              );
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
                      </dialog>{" "}
                    </div>
                  )}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllParcel;
