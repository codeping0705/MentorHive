import React, { useState } from "react";
import auth from "../apiManager/auth"; // Use named import
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock, FaIdBadge } from "react-icons/fa";
import toast from "react-hot-toast";

const SignUp = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const heading =
    role === "mentor" ? "Sign Up as Mentor" : "Sign Up as Student";
  const alternateRole = role === "mentor" ? "student" : "mentor";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = { ...data, role };

    try {
      const response = await auth.signup(formData);
      console.log("response", response.data); // Use the named function
      reset();
      toast.success("Account Created Successfully!");
      navigate("/signin");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
    // console.log("formData :", formData);
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
          <div className="text-center mb-3">
            <span className="px-4 py-1 bg-blue-100 text-blue-700 font-semibold rounded-full text-sm">
              {role?.toUpperCase() || "USER"}
            </span>
          </div>

          <div className="text-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {heading}
            </h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Fill in the details below to create your account
            </p>
            <p
              className="text-sm mt-2 text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate(`/signup/${alternateRole}`)}
            >
              {role === "mentor"
                ? "Want to sign up as a Student? Click here"
                : "Want to sign up as a Mentor? Click here"}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: "Name is required!" })}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div className="relative">
              <FaIdBadge className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 4,
                    message: "Username must be at least 4 characters",
                  },
                })}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

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
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <NavLink
              to="/signin"
              className="text-blue-600 font-medium hover:underline"
            >
              Login here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
