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



export const router = createBrowserRouter([ 
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
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
                element: <AllParcel></AllParcel>
            },
            {
                path: 'allUsers',
                element: <AllUsers></AllUsers>
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