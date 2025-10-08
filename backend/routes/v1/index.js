const express=require('express');
const router=express.Router();
const authRoute=require('./auth.route');
const homeRoute=require("./home.route");
const mentorRoute=require("./mentor.route");
// const serviceRoute=require("./service.route");
// const paymentRoute=require("./payment.route");


const Routes=[
    {
        path:"/",
        route:homeRoute
    },
    {
        path:"/auth",
        route:authRoute
    },
    {
        path:"/mentor",
        route:mentorRoute
    },
    // {
    //     path:"/service",
    //     route:serviceRoute
    // },
    // {
    //     path:"/payment",
    //     route:paymentRoute
    // },
 
    
];
Routes.forEach((route)=>{
    router.use(route.path, route.route)
});

module.exports=router;
