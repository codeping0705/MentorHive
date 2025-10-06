const userService = require("../services/auth.service");
const httpStatus = require("../utils/httpStatus");
const tokenService = require("../services/token.service");

const signUp = async (req, res) => {
    const{name,username,email,password,role}=req.body;
    const user=await userService.createUser({
        name,username,email,password,role
    })
    
    user.password=undefined;

    return res.status(httpStatus.created).json({
        message:"Account created Successfully!",user
    })
};

// const signIn = async  (req, res) {

// };

module.exports = {  signUp };
