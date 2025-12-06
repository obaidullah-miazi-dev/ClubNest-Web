import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/shared/Navbar';

const Mainlayouts = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Mainlayouts;