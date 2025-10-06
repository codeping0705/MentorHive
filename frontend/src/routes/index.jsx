import React from "react";
import Home from "../page/Home";
import SignIn from "../page/SignIn";
import SignUp from "../page/SignUp";

const routes = [
  { path: "/", element: <Home />, isProtected: false },
  { path: "/signin", element: <SignIn />, isProtected: false },
  { path: "/signup/:role", element: <SignUp />, isProtected: false },
];
export default routes;
