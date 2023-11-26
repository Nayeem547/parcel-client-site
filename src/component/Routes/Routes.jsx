import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Home-Page/Home";
import SignUp from "../AuthProvider/SignUp";
import Dashboard from "../Dashboard/Dashboard";
import BookParcelForm from "../Dashboard/BookParcelForm";
import MyParcel from "../Dashboard/MyParcel";



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
            }
        ]
    }

]);