import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../helper";
import useUserStore from "../store/user";
import { FiLogOut, FiMenu } from "react-icons/fi";

const DashboardNavbar = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const onButtonClick = () => {
    removeToken();
    setUser(null);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md rounded-b-2xl">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-10 py-3">
        {/* Left section */}
        <div className="flex items-center gap-3">
          {/* Hamburger icon for mobile */}
          <button
            onClick={onMenuToggle}
            className="md:hidden text-2xl text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            <FiMenu />
          </button>

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <p className="text-2xl sm:text-3xl font-extrabold tracking-wide text-blue-600 hover:text-blue-700 transition-colors">
              Elevate Hub
            </p>
          </NavLink>
        </div>

        {/* Logout Button */}
        <button
          onClick={onButtonClick}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 transition-all duration-200 text-sm sm:text-base"
        >
          <span>Logout</span>
          <FiLogOut className="text-lg" />
        </button>
      </div>
    </header>
  );
};

export default DashboardNavbar;
