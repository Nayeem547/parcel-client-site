import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Home-Page/Home";
import SignUp from "../AuthProvider/SignUp";
import Dashboard from "../Dashboard/Dashboard";
import BookParcelForm from "../Dashboard/BookParcelForm";
import MyParcel from "../Dashboard/MyParcel";
import MyProfile from "../Dashboard/MyProfile";
import AllParcel from "../Dashboard/AllParcel";
import AllUsers from "../Dashboard/AllUsers";
import ManageButton from "../Dashboard/ManageButton";
import Login from "../AuthProvider/Login";
import MyDeliveryList from "../Dashboard/MyDeliveryList";
import ParcelSefty from "../Home-Page/OurFeatures/ParcelSefty";
import DeliveredTotal from "../Home-Page/OurFeatures/DeliveredTotal";
import TotalUsers from "../Home-Page/OurFeatures/TotalUsers";
import ErrorPage from "../Home-Page/ErrorPage";
import AdminRout from "./AdminRout";
import DeliveryRoute from "./DeliveryRoute";



export const router = createBrowserRouter([ 
    {
        path: '/',
        element: <Layout></Layout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
               path: '/error',
               element: <ErrorPage></ErrorPage>
            },
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/parcelSefty',
                element: <ParcelSefty></ParcelSefty>
            },
            {
                path: '/totalDelivery',
                element: <DeliveredTotal></DeliveredTotal>
            },
            {
                path: '/totalUser',
                element: <TotalUsers></TotalUsers>
            }
        ]
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'booking',
                element: <BookParcelForm></BookParcelForm>
            },
            {
                path: 'myParcel',
                element: <MyParcel></MyParcel>
            },
            {
                path: 'myProfile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'allParcel',
                element: <AdminRout><AllParcel></AllParcel></AdminRout>
            },
            {
                path: 'allUsers',
                element: <AdminRout><AllUsers></AllUsers></AdminRout>
            },
            {
                path: 'manageButton',
                element: <ManageButton></ManageButton>
            },
            {
                path: 'myDeliveryList',
                element: <MyDeliveryList></MyDeliveryList>
            }
        ]
    }

]);