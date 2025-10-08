import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useUserStore from "../store/user";
import { Dropdown } from "antd";
import { removeToken, getToken } from "../helper";

const Nav = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const [isHamMenuOpen, setIsHamMenuOpen] = useState(false);

  // Restore user from localStorage on page reload
  useEffect(() => {
    const token = getToken();
    if (token && !user) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    }
  }, [setUser, user]);

  const onLogoutButtonClick = () => {
    removeToken();
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const menuItems = [
    {
      key: "dashboard",
      label: (
        <NavLink
          to="/dashboard/profile"
          className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded"
        >
          Dashboard
        </NavLink>
      ),
    },
    {
      key: "logout",
      label: (
        <button
          onClick={onLogoutButtonClick}
          className="w-full text-left px-4 py-2 text-red-600 font-semibold hover:bg-red-100 rounded"
        >
          Logout
        </button>
      ),
    },
  ];

  const signUpMentorBtnClick = () => {
    setIsHamMenuOpen(false);
    navigate("/signup/mentor");
  };

  const signUpStudentBtnClick = () => {
    setIsHamMenuOpen(false);
    navigate("/signup/student");
  };

  const signInBtnClick = () => {
    setIsHamMenuOpen(false);
    navigate("/signin");
  };

  return (
    <nav className="bg-blue-200 shadow-md">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="inline-flex items-center">
          <span className="ml-2 text-2xl font-bold text-blue-700">
            Elevate Hub
          </span>
        </NavLink>

        {/* Hamburger Button (Mobile) */}
        {!user && (
          <div className="lg:hidden flex items-center">
            <button
              className="text-gray-600 focus:outline-none text-3xl"
              onClick={() => setIsHamMenuOpen(!isHamMenuOpen)}
            >
              &#9776;
            </button>
          </div>
        )}

        {/* Desktop Navigation */}
        {!user ? (
          <ul className="hidden lg:flex items-center space-x-6">
            <li>
              <button
                onClick={signUpMentorBtnClick}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition duration-300"
              >
                Become A Mentor!
              </button>
            </li>
            <li>
              <button
                onClick={signInBtnClick}
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition duration-300"
              >
                Sign in
              </button>
            </li>
            <li>
              <button
                onClick={signUpStudentBtnClick}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Sign up
              </button>
            </li>
          </ul>
        ) : (
          <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold hover:bg-blue-600 transition duration-300">
              {user.name.charAt(0).toUpperCase()}
            </button>
          </Dropdown>
        )}
      </div>

      {/* Mobile Menu */}
      {!user && isHamMenuOpen && (
        <ul className="lg:hidden mt-4 space-y-3">
          <li>
            <button
              onClick={signUpMentorBtnClick}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition duration-300"
            >
              Become A Mentor!
            </button>
          </li>
          <li>
            <button
              onClick={signInBtnClick}
              className="w-full px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition duration-300"
            >
              Sign in
            </button>
          </li>
          <li>
            <button
              onClick={signUpStudentBtnClick}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign up
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
