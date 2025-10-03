import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const [isHamMenuOpen, setIsHamMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-200 shadow-md">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24">
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="inline-flex items-center">
            <span className="ml-2 text-2xl font-bold text-blue-700">
              Elevate Hub
            </span>
          </NavLink>

          {/* Hamburger Button (Mobile) */}
          <div className="lg:hidden flex items-center">
            <button
              className="text-gray-600 focus:outline-none"
              onClick={() => setIsHamMenuOpen(!isHamMenuOpen)}
            >
              <span className="text-3xl">&#9776;</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-6">
            <li>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition duration-300">
                Become A Mentor!
              </button>
            </li>
            <li>
              <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition duration-300">
                Sign in
              </button>
            </li>
            <li>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                Sign up
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu when its Open */}
        {isHamMenuOpen && (
          <ul className="lg:hidden mt-4 space-y-3">
            <li>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition duration-300">
                Become A Mentor!
              </button>
            </li>
            <li>
              <button className="w-full px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition duration-300">
                Sign in
              </button>
            </li>
            <li>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                Sign up
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Nav;
