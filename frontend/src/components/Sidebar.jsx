import React from "react";
import { NavLink } from "react-router-dom";
import useUserStore from "../store/user";

const Sidebar = () => {
  const { user } = useUserStore();

  const navItemClass = ({ isActive }) =>
    `flex items-center px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
      isActive
        ? "bg-blue-100 text-blue-700 font-semibold shadow-md"
        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
    }`;

  return (
    <aside className="w-64 bg-white shadow-lg rounded-2xl p-6 flex flex-col h-full sticky top-5">
      {/* User Info */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={user.photoUrl || `https://ui-avatars.com/api/?name=${user?.name}`}
          alt={`${user?.name}'s avatar`}
          className="w-20 h-20 rounded-full mb-3 object-cover"
        />
        <h4 className="text-lg font-semibold text-gray-800">{user?.name}</h4>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard/profile" className={navItemClass}>
          Profile
        </NavLink>

        {user?.role === "mentor" && (
          <>
            <NavLink to="/dashboard/services" className={navItemClass}>
              Services
            </NavLink>
            <NavLink to="/dashboard/schedule" className={navItemClass}>
              Schedule
            </NavLink>
            <NavLink to="/dashboard/bookings" className={navItemClass}>
              Bookings
            </NavLink>
            <NavLink to="/dashboard/payment" className={navItemClass}>
              Payment
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
