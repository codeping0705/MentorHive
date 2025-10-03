import React from "react";
import Home from "../page/Home";
import SignIn from "../page/SignIN";

const routes = [
  { path: "/", element: <Home />, isProtected: false },
  { path: "/login", element: <SignIn />, isProtected: false },
];
export default routes;
