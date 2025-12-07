import { createBrowserRouter } from "react-router";
import Mainlayouts from "../layouts/Mainlayouts";
import Home from "../pages/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import MyProfile from "../pages/MyProfile";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import BecomeClubManager from "../pages/BecomeClubManager";
import ClubManagerApproval from "../pages/dashboard/admin/ClubManagerApproval";

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
            },
            {
                path:'/myProfile',
                Component: MyProfile
            },
            {
                path: '/becomeClubManager',
                Component: BecomeClubManager
            }
        ] 
    },
    {
        path: '/dashboard',
        Component: DashboardLayout,
        children:[
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'approve-club-manager',
                Component: ClubManagerApproval
            }
        ]
    }
])