import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import DynamicStarRating from '../../ReactRating/DynamicStarRating';
import UseAxiosPublic from '../../Hook/UseAxiosPublic';
import Swal from 'sweetalert2';

const ReviewModal = ({item}) => {
    

    const axiosPublic = UseAxiosPublic();

    const { user } = useContext(AuthContext);
    const users = {
      name: user?.displayName,
      email: user?.email,
      userImage: user?.photoURL,
    };
    
  
    const { register, handleSubmit, setValue } = useForm();
  
    const [rating, setRating] = useState(0);
  
    const handleRatingChange = (newRating) => {
      setRating(newRating);
    };

    const onSubmit = async (data) => {
        console.log(data.feedbak);
        console.log(rating);
        console.log( users.userImage);
        console.log(item?.deliveryMan);
        
    
        const reviewItem = {
          name: users.name,
          email: users.email,
          GiverImage: users.userImage,
          feedback: data.feedbak,
          deliveryMan: data.deliveryman,
          ratings : parseFloat(rating),
          bookingDate: data.bookingDate ? data.bookingDate.toISOString() : null,
        };
        console.log(reviewItem);
        const reviewRes = await axiosPublic.post("/reviews", reviewItem, {
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (reviewRes.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: `${users.name} is add to the menu`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
    
        console.log("with img url", data);
      };
    
      useEffect(() => {
        setValue("bookingDate", new Date());
      }, [setValue]);
    
    return (
        <div>
            
            <form
                          className=" space-y-4 p-3 grid grid-col-1 "
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <h2 className=" text-3xl font-semibold font-mono ">
                            Review
                          </h2>

                          <div className="form-control  ">
                            <label className="label">
                              <span className="label-text">Feedback</span>
                            </label>
                            <input
                              {...register("feedbak")}
                              name="feedbak"
                              type="text"
                              placeholder="write"
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
                              <span className="label-text">Review date</span>
                            </label>
                            <input
                              {...register("bookingDate")}
                              type="text"
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
                              defaultValue={ item?.deliveryMan }
                              className="input input-bordered "
                              readOnly
                            />
                          </div>

                          <div className=" py-5 space-y-5 text-center flex flex-col justify-center items-center " >
                            
                            <DynamicStarRating
                              rating={rating}
                              onRatingChange={handleRatingChange}
                            />
                            <p>Selected Rating: {rating}</p>
                          </div>

                          <div className=" flex justify-center mt-10  mb-4 ">
                            <button
                              className=" btn btn-neutral hover:bg-blue-900  hover:px-7 "
                              type="  submit"
                            >
                              Review
                            </button>
                          </div>

                          


                        </form>
        </div>
    );
};

export default ReviewModal;