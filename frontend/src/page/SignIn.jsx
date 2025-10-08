import React, { useState } from "react";
import auth from "../apiManager/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import useUserStore from "../store/user";
import { setToken } from "../helper/index";

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await auth.signin(data);
      console.log("response", response.data);
      reset();
      setUser(response.data.user);
      setToken(response.data.token);
      navigate("/"); // redirect after login
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel */}
      <div className="lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 p-6 lg:p-12">
        <img
          src="https://images.pexels.com/photos/3184290/pexels-photo-3184290.jpeg"
          alt="Illustration"
          className="w-full max-w-md rounded-xl shadow-2xl"
        />
      </div>

      {/* Right Panel */}
      <div className="lg:w-1/2 flex items-center justify-center bg-gray-50 p-6 lg:p-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <div className="text-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Sign In
            </h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: "Email is required!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don't have an account?{" "}
            <NavLink
              to="/signup/student"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </NavLink>
          </p>
          <p className="text-sm text-gray-500 text-center mt-3">
            Become a{" "}
            <NavLink
              to="/signup/mentor"
              className="text-blue-600 font-medium hover:underline"
            >
              Mentor
            </NavLink>{" "}
            with us
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
