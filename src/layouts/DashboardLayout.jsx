import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router";
import { AuthContext } from "../provider/authProvider";
import { ChevronDown, LayoutDashboard, LogOut, User } from "lucide-react";
import logo from '../assets/ClubNest-logo.png'

const DashboardLayout = () => {


 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);


const handleLogout = () => {
    alert('are you sure')
    logOut();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };
    const setMenuClose = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 flex justify-between items-center pr-10">
          <div className="flex justify-center items-center">
            <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4"><Link to='/'><img src={logo} alt="logo" className="w-20"/></Link></div>
          </div>

          <div>
            {user && <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 hover:bg-gray-100 rounded-full px-3 py-2 transition"
              >
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-main/20"
                />
                <span className="font-medium text-gray-800">
                  {user.displayName?.split(" ")[0]}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="py-2">
                    <Link
                      to="/myProfile"
                      onClick={setMenuClose}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-main/5 transition"
                    >
                      <User className="w-5 h-5" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={setMenuClose}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-main/5 transition"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Link>
                    <hr className="my-2 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600 w-full text-left transition"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>}
          </div>
        </nav>








        {/* Page content here */}
        <Outlet />

      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">



          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </button>
            </li>


            

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
