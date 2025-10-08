import React from "react";
import { NavLink } from "react-router-dom";
import useUserStore from "../store/user";

const Sidebar = () => {
  const { user } = useUserStore();

  const navItemStyle = ({ isActive }) => {
    if (isActive) {
      return "flex items-center px-5 py-3 mb-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 transform bg-green-100 text-green-700 shadow-md scale-105";
    }
    return "flex items-center px-5 py-3 mb-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 transform text-gray-600 hover:bg-green-50 hover:text-green-600 hover:shadow-sm hover:scale-105";
  };

  return (
    <aside className="flex flex-col w-64 h-full px-4 py-6 rounded-2xl mt-5 overflow-y-auto bg-white shadow-lg">
      {/* User Info */}
      <div className="flex flex-col items-center mt-4 mb-8 text-center">
        <img
          className="w-20 h-20 rounded-full shadow-lg object-cover transition-transform duration-300 hover:scale-105"
          src={user.photoUrl || `https://ui-avatars.com/api?name=${user?.name}`}
          alt={`${user?.name}'s avatar`}
        />
        <h4 className="mt-3 text-lg font-semibold text-gray-800">{user?.name}</h4>
        <p className="text-sm text-gray-500 break-words px-2">{user?.email}</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col flex-1 space-y-2">
        <NavLink to="/dashboard/profile" className={navItemStyle}>
          Profile
        </NavLink>

        {user?.role === "mentor" && (
          <>
            <NavLink to="/dashboard/services" className={navItemStyle}>
              Services
            </NavLink>
            <NavLink to="/dashboard/schedule" className={navItemStyle}>
              Schedule
            </NavLink>
            <NavLink to="/dashboard/bookings" className={navItemStyle}>
              Bookings
            </NavLink>
            <NavLink to="/dashboard/payment" className={navItemStyle}>
              Payment
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
