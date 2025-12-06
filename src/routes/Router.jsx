import { createBrowserRouter } from "react-router";
import Mainlayouts from "../layouts/Mainlayouts";
import Home from "../pages/Home";

export const router = createBrowserRouter([
    {
        path:'/',
        Component:Mainlayouts,
        children:[
            {
                index: true,
                Component:Home
            }
        ] 
    }
])