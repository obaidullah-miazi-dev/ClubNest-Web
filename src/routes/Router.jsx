import { createBrowserRouter } from "react-router";
import Mainlayouts from "../layouts/Mainlayouts";
import Home from "../pages/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";

export const router = createBrowserRouter([
    {
        path:'/',
        Component:Mainlayouts,
        children:[
            {
                index: true,
                Component:Home
            },
            {
                path:'/login',
                Component: Login
            },
            {
                path:'/register',
                Component: Register
            }
        ] 
    }
])