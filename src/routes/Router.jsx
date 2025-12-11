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
import CreateClub from "../pages/dashboard/clubManager/CreateClub";
import MyClub from "../pages/dashboard/clubManager/MyClub";
import ClubDetails from "../pages/ClubDetails";
import ClubApprovalList from "../pages/dashboard/admin/ClubApprovalList";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import Clubs from "../pages/Clubs";

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
            },
            {
                path: '/clubs/:id',
                Component: ClubDetails
            },
            {
                path:'/clubs',
                Component: Clubs
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
            },
            {
                path:'create-club',
                Component: CreateClub
            },
            {
                path:'my-clubs',
                Component: MyClub
            },
            {
                path:'approve-clubs',
                Component: ClubApprovalList
            },
            {
                path: 'manage-users',
                Component: ManageUsers
            }
        ]
    }
])