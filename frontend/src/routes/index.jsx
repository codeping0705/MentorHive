import React from "react";
import Home from "../page/Home";
import SignIn from "../page/SignIn";
import SignUp from "../page/SignUp";
import Profile from "../page/dashboard/Profile";
import Pricing from "../page/pricing/Pricing";
import Service from "../page/dashboard/Service";
import Payment from "../page/dashboard/Payment";
import Booking from "../page/dashboard/Bookings";
import Schedule from "../page/dashboard/Schedule";

const routes = [
  { path: "/", element: <Home />, isProtected: false },
  { path: "/pricing", element: <Pricing />, isProtected: false },
  { path: "/signin", element: <SignIn />, isProtected: false },
  { path: "/signup/:role", element: <SignUp />, isProtected: false },
  { path: "/dashboard/profile", element: <Profile />, isProtected: true },
  { path: "/dashboard/services", element: <Service />, isProtected: true },
  { path: "/dashboard/bookings", element: <Booking />, isProtected: true },
  { path: "/dashboard/payment", element: <Payment />, isProtected: true },
  { path: "/dashboard/schedule", element: <Schedule />, isProtected: true },

];
export default routes;

