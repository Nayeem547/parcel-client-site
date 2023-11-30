import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Map, Marker } from "pigeon-maps";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import UseAxiosPublic from "../Hook/UseAxiosPublic";

const BookParcelForm = () => {
  const { control, register, handleSubmit, setValue } = useForm();
  const { user } = useContext(AuthContext);
  const axiosPublic = UseAxiosPublic();

  const [formData, setFormData] = useState({
    // Auto-filled from the logged-in user
    // Auto-filled from the logged-in user
    parcelWeight: "",
    deliveryAddressLatitude: 50.879,
    deliveryAddressLongitude: 4.6997,
    // Auto-calculated based on parcel weight
  });

  //   const handleMapClick = ({ latLng }) => {
  //     const { lat, lng } = latLng;
  //     setFormData({
  //       ...formData,
  //       deliveryAddressLatitude: lat,
  //       deliveryAddressLongitude: lng,
  //     });

  //     // Set the form values using React Hook Form setValue
  //     setValue('deliveryAddressLatitude', lat);
  //     setValue('deliveryAddressLongitude', lng);
  //   };

  //   const onSubmit = async (data) => {

  //     const {data} = await axiosSecure.post('/order', {
  //                      name: userName,
  //                      email: email,
  //                      number: number,
  //                      parcelType: parcelType,
  //                      receiverName: receiverName,
  //                      receiversNumber: receiversNumber,
  //                      parcelAdress: parcelAdress,
  //                      date: datePicker ,
  //                  weight: weight,
  //                      latitude: latitude,
  //              longitude: longitude,
  //                      price: parseFloat(price),
  //      }, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   }
  // )
  //   console.log(data);
  //   }
  

  const users = {
    name: user?.displayName,
    email: user?.email,
  };

  const calculatePrice = (weight) => {
    if (weight === 1) {
      return 50;
    } else if (weight === 2) {
      return 100;
    } else if (weight <= 0) {
      return 0;
    } else if (weight >= 3) {
      return 150;
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    // const imagefile = {image: data.image[0]};
    // const res = await axiosPublic.post(image_hosting_api, imagefile, {
    //     headers: {
    //         'content-type' : 'multipart/form-data'
    //     }
    // } );
    // const price = {Price};

    const menuItem = {
      name: users.name,
      email: users.email,
      number: data.number,
      parcelType: data.parcelType,
      receiverName: data.receiverName,
      receiversNumber: data.receiversNumber,
      parcelAdress: data.parcelAdress,
      date: data.date ? data.date.toISOString() : null,
      bookingDate: data.bookingDate ? data.bookingDate.toISOString() : null,
      weight: parseFloat(data.weight),
      latitude: data.latitude,
      longitude: data.longitude,
      price: parseFloat(data.price),
      status: "pending",
      
    };

    const menuRes = await axiosPublic.post("/order", menuItem, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log(menuRes.data);
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

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   };

  //   const getCoordinatesFromAddress = async () => {
  //     try {
  //       // ... (existing code to fetch coordinates)

  //       if (data.results.length > 0) {
  //         const location = data.results[0].geometry.location;
  //         setFormData({
  //           ...formData,
  //           deliveryAddressLatitude: location.lat,
  //           deliveryAddressLongitude: location.lng,
  //         });
  //       } else {
  //         throw new Error('No results found for the address');
  //       }
  //     } catch (error) {
  //       console.error('Error:', error.message);
  //     }
  //   };

    //  const [Price, setPrice] = useState(0);

    //  const [weight, setWeight] = useState(0);

    // const handleParcelWeightChange = (e) => {
    //   const weight = parseFloat(e.target.value);
    //   setFormData({
    //     ...formData,
    //     parcelWeight: weight,

    //   });
    //   setPrice(calculatePrice(weight));

    // };

    // const calculatePrice = (weight) => {
    //   if (weight === 1) {
    //     return 50;
    //   } else if (weight === 2) {
    //     return 100;
    //   } else if(weight <= 0){
    //       return 0;
    //   }
    //    else if(weight >= 3) {
    //     return 150;
    //   }
    // };

  //Date Picker
  //   const [startDate, setStartDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

  //   const handleSubmits = (e) => {
  //     e.preventDefault();
  //     // Add logic to handle form submission (e.g., send data to the server)
  //     console.log('Form data submitted:', formData);
  //   };

  // const [selectedDate, setSelectedDate] = useState(null);

  //       const handleDateChange = (date) => {
  //         setSelectedDate(date);
  //       };

  useEffect(() => {
    setValue("bookingDate", new Date());
  }, [setValue]);

  return (
    <div className=" border  shadow-2xl flex flex-col justify-center items-center mx-auto  overflow-x-auto w  ">
        <h2 className=" text-4xl font-semibold text-blue-950 py-10 " >Book parcel</h2>
      <form className=" p-3 grid grid-col-1 " onSubmit={handleSubmit(onSubmit)}>
        {/* Render your form fields here */}
        <div className=" flex flex-col md:flex-row gap-6 p-6  ">
          <div className="form-control   ">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("userName")}
              type="text"
              defaultValue={user?.displayName}
              placeholder="name"
              className="input input-bordered "
            />
          </div>
          <div className="form-control  ">
            <label className="label">
              <span className="label-text">Recipe Email*</span>
            </label>
            <input
              {...register("email")}
              defaultValue={user?.email}
              type="text"
              placeholder="email"
              className="input input-bordered "
            />
          </div>

          <div className="form-control  ">
            <label className="label">
              <span className="label-text">Phone-Number</span>
            </label>
            <input
              {...register("number")}
              type="text"
              placeholder="Phone Number"
              className="input input-bordered "
            />
          </div>
        </div>

        <div className=" flex flex-col md:flex-row gap-6 p-6  ">
          <div className="form-control  ">
            <label className="label">
              <span className="label-text">Parcel Type</span>
            </label>
            <input
              {...register("parcelType")}
              type="text"
              placeholder="parcelType "
              className="input input-bordered "
            />
          </div>

          <div className="form-control  ">
            <label className="label">
              <span className="label-text">Receivers Name</span>
            </label>
            <input
              {...register("receiverName")}
              type="text"
              placeholder="receiverName "
              className="input input-bordered "
            />
          </div>

          <div className="form-control  ">
            <label className="label">
              <span className="label-text">Receivers Phone Number</span>
            </label>
            <input
              {...register("receiversNumber")}
              type="text"
              placeholder="receiversNumber "
              className="input input-bordered "
            />
          </div>

          <div className="form-control  ">
            <label className="label">
              <span className="label-text">Receivers Phone Number</span>
            </label>
            <input {...register("bookingDate")}  type="text" readOnly />
          </div>


        </div>

        <div className=" flex gap-6 p-6 ">
          <div className="form-control  ">
            <label className="label">
              <span className="label-text">Parcel Delivery Adress</span>
            </label>
            <input
              {...register("parcelAdress")}
              type="text"
              placeholder="parceladress "
              className="input input-bordered "
            />
          </div>

          <div className="form-control  ">
            {/* <div className="App">
      <h1>Date Picker</h1>
      <DatePicker {...register("datePicker")} type="text"  selected={startDate} onChange={(date) => setStartDate(date)} />
      
    </div> */}{" "}
          </div>

          {/* <div className="App">
      <h1>Date Picker</h1>
      <DatePicker {...register("date")} placeholder="selecDate"  selected={selectedDate} onChange={handleDateChange} />
      
    </div> */}

          <div className="form-control  ">
            <label>Date:</label>
            <Controller
              placeholder="date"
              className=" input input-bordered "
              name="date" // This should match your data object key
              control={control}
              defaultValue={null} // Set the default value (use null if no default)
              render={({ field }) => (
                <DatePicker
                  {...field}
                  placeholder="date"
                  className=" input input-bordered "
                  selected={field.value} // For controlling the selected date
                  onChange={(date) => field.onChange(date)} // Important: propagate the change event to react-hook-form
                  dateFormat="yyyy-MM-dd" // You can customize the date format
                />
              )}
            />
          </div>

          {/* Add the rest of your form fields */}

          {/* Example: Parcel Weight with auto-calculated Price */}
          {/* <label>
        Parcel Weight (kg):
        <input
          type="number"
          name="parcelWeight"
          value={formData.parcelWeight}
          onChange={handleParcelWeightChange}
        />
      </label> */}
           <div className="form-control">
        <label className="label">
          <span className="label-text">Parcel Weight (kg):</span>
        </label>
        <input
          {...register('weight')}
          type="number"
          name="parcelWeight"
          placeholder="weight"

        />
      </div>

      <div className="form-control flex flex-row">
        <label className="label">
          <span className="label-text text-xl"> Price: $ </span>
        </label>
        <input
          {...register('price')}
          type="number"
          name="price"
          placeholder="price"
          className="text-red-600"
          
        />
      </div>
        {/* Display Map */}

        </div>

        <div className=" flex flex-col  space-y-5 w-96  ">
          {formData.deliveryAddressLatitude &&
            formData.deliveryAddressLongitude && (
              <Map
                height={200}
                defaultCenter={[
                  parseFloat(formData.deliveryAddressLatitude),
                  parseFloat(formData.deliveryAddressLongitude),
                ]}
                defaultZoom={11}
              >
                <Marker
                  width={1000}
                  anchor={[
                    parseFloat(formData.deliveryAddressLatitude),
                    parseFloat(formData.deliveryAddressLongitude),
                  ]}
                />
              </Map>
            )}

          <div className="form-control flex flex-row  ">
            <label className="label">
              <span className="label-text"> Delivery Address Latitude: </span>
            </label>

            <input
              {...register("latitude")}
              type="number"
              value={formData.deliveryAddressLatitude}
              className=" "
              readOnly
            />
          </div>

          <div className="form-control flex flex-row  ">
            <label className="label">
              <span className="label-text"> Delivery Address Latitude: </span>
            </label>

            <input
              {...register("longitude")}
              type="number"
              value={formData.deliveryAddressLongitude}
              className=" "
              readOnly
            />
          </div>

          {/* Input fields for latitude and longitude */}
          {/* <label>Delivery Address Latitude:</label>
      <input
        type="number"
        name="deliveryAddressLatitude"
        ref={register}
        value={formData.deliveryAddressLatitude}
        readOnly
      /> */}

          {/* <label>Delivery Address Longitude:</label>
      <input
        type="number"
        name="deliveryAddressLongitude"
        ref={register}
        
        readOnly
      /> */}

          {/* ... (other form fields) */}

          {/* Button to get coordinates (optional, you can click on the map directly) */}
          {/* <div>
      <button  className=' btn btn-neutral mb-4 ' type="submit " onClick={getCoordinatesFromAddress}>
        Get Coordinates
      </button> 
      </div> */}
        </div>

        {/* <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
      <Marker width={50} anchor={[50.879, 4.6997]} />
    </Map> */}

        {/* Submit Button */}
        <div className=" flex justify-center  mb-36 ">
          <button className=" btn btn-neutral " type="  submit">
            Book Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookParcelForm;
