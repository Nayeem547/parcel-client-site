import React, { useContext } from "react";
import useaxiosSecure from "../Hook/useaxiosSecure";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";

const MyReview = () => {
  const axiosSecure = useaxiosSecure();
  const { user } = useContext(AuthContext);

  const {  data: reviews = [] } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user.email}`);
      return res.data;
    },
  });
  return (
    <div className=" flex justify-center flex-col space-y-14 mt-6 mb-40 ">
      <h2 className=" text-5xl  font-serif font-bold ">My Reviews</h2>

      <div className=" grid grid-cols-1 gap-10 " >
        {reviews.map((review) => (
          <div
            key={review._id}
            className="card  card-side w-[700px] bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className=" w-44 h-60 rounded-lg "
                src={review.GiverImage}
                alt=""
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-2xl font-mono ">
                {" "}
                name: {review.name}
              </h2>
              <p className=" text-2xl font-mono ">date: {review.bookingDate}</p>
              <p className=" text-xl font-mono text-yellow-800 flex gap-3 ">
                Ratings: {review.ratings}{" "}
                <FaStar className=" text-yellow-400 "></FaStar>{" "}
              </p>
              <p className=" text-xl font-mono ">Feedback: {review.feedback}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReview;
