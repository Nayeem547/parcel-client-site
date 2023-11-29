import React from 'react';

const MyDeliveryList = () => {
    return (
        <div>
      <h2 className="text-3xl">My Delivery List</h2>

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Booked User's Name</th>
            <th>Receivers Name</th>
            <th>Booked User's Phone</th>
            <th>Requested Delivery Date</th>
            <th>Approximate Delivery Date</th>
            <th>Receivers Phone Number</th>
            <th>Receivers Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery._id}>
              <td>{delivery.bookedUserName}</td>
              <td>{delivery.receiversName}</td>
              <td>{delivery.bookedUserPhone}</td>
              <td>{delivery.requestedDeliveryDate}</td>
              <td>{delivery.approximateDeliveryDate}</td>
              <td>{delivery.receiversPhoneNumber}</td>
              <td>{delivery.receiversAddress}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleCancelDelivery(delivery._id)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleDeliverParcel(delivery._id)}
                >
                  Deliver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

export default MyDeliveryList;