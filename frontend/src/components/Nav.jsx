import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useUserStore from "../store/user";
import { Dropdown } from "antd";
import { removeToken, getToken } from "../helper";

const Nav = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const [isHamMenuOpen, setIsHamMenuOpen] = useState(false);

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

  const navigateTo = (path) => {
    setIsHamMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="bg-white shadow-md shadow-gray-200 sticky top-0 z-50 rounded-b-2xl">
      <div className="container mx-auto flex items-center justify-between px-6 py-4 md:px-12">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src="https://img.icons8.com/?size=40&id=50532&format=png"
            alt="Logo"
            className="w-8 h-8"
          />
          <span className=" text-2xl font-bold block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            MentorHive
          </span>
        </NavLink>

        {/* Desktop Menu */}
        {!user ? (
          <ul className="hidden lg:flex items-center space-x-5">
            <li>
              <button
                onClick={() => navigateTo("/signup/mentor")}
                className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition duration-300"
              >
                Become a Mentor
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("/signin")}
                className="px-5 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition duration-300"
              >
                Sign in
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("/signup/student")}
                className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Sign up
              </button>
            </li>
          </ul>
        ) : (
          <Dropdown
            menu={{ items: menuItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600 transition duration-300">
              {user.name.charAt(0).toUpperCase()}
            </button>
          </Dropdown>
        )}

        {/* Hamburger Menu */}
        {!user && (
          <button
            className="lg:hidden text-3xl text-gray-600 focus:outline-none"
            onClick={() => setIsHamMenuOpen(!isHamMenuOpen)}
          >
            &#9776;
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {!user && isHamMenuOpen && (
        <ul className="lg:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-3 shadow-md rounded-b-2xl">
          <li>
            <button
              onClick={() => navigateTo("/signup/mentor")}
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition duration-300"
            >
              Become a Mentor
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo("/signin")}
              className="w-full py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition duration-300"
            >
              Sign in
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo("/signup/student")}
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
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
