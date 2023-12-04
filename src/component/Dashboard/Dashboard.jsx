import { NavLink, Outlet } from "react-router-dom";
import {
  FaAngleDoubleRight,
  FaBookOpen,
  FaBoxOpen,
  FaHome,
  FaPaperclip,
  FaRainbow,
  FaRegUserCircle,
  FaShoppingBag,
  FaShoppingCart,
  FaUser,
  FaUserAlt,
  FaUserAltSlash,
  FaUserAstronaut,
  FaUserCheck,
  FaUserCircle,
  FaUserFriends,
} from "react-icons/fa";
import UseAdmin from "../Hook/UseAdmin";
import { Helmet } from "react-helmet";
import UseDeliveryMan from "../Hook/UseDeliveryMan";

const Dashboard = () => {
  const { role } = UseAdmin();

  console.log(role);

  return (
    <div>
      <Helmet>
        <title>Delivery-Express | Dashboard</title>
      </Helmet>

      <div className=" flex ">
        <div className=" w-64 min-h-screen bg-blue-950 text-white ">
          <ul className="menu p-4">
            <li>
              <NavLink to="/dashboard/myProfile">
                <FaUserCheck></FaUserCheck> My Profile Menu
              </NavLink>
            </li>

            {role?.admin && (
              <>
                <div className="divider"></div>
                <h2 className=" text-xl ">Admin</h2>

                <li>
                  <NavLink to="/dashboard/allParcel">
                    <FaShoppingBag></FaShoppingBag> All Parcel
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/allUsers">
                    <FaUser></FaUser> All Users
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/allDeliveryMan">
                    <FaUserFriends></FaUserFriends> All Delivery-Man
                  </NavLink>
                </li>

                <div className="divider"></div>
              </>
            )}

            <div className="divider"></div>

            <li>
              <NavLink to="/">
                <FaHome></FaHome> Home
              </NavLink>
            </li>

            {role?.deliveryMan && (
              <>
                <div className=" divider "></div>
                <h2 className=" text-xl ">Delivery man</h2>

                <li>
                  <NavLink to="/dashboard/myDeliveryList">
                    <FaAngleDoubleRight></FaAngleDoubleRight> My Delivery List
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/myReviews">
                    <FaRainbow></FaRainbow> My Reviews
                  </NavLink>
                </li>

                <div className="divider"></div>
              </>
            )}

            {role?.admin === false && role?.deliveryMan === false && (
              <>
                <div className="divider"></div>
                <h2 className=" text-xl "> Booking </h2>
                <li>
                  <NavLink to="/dashboard/booking">
                    <FaBookOpen></FaBookOpen> Book a Parcel
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/myParcel">
                    <FaShoppingCart></FaShoppingCart> My Parcel
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className=" flex justify-center items-center mx-auto w-full ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
