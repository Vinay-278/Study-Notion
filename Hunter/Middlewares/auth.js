//Import jwt for token verification
const jwt= require("jsonwebtoken");
//Load environment variables from .env file
require("dotenv").config();
//Import User model
const User= require("../Models/User");

//-------- AUTH MIDDLEWARE-------//
//This middleware checks if the user is authenticated
exports.auth= async (req, res, next) =>{
    try{
        //extract token from cookies, request body, or authoriztion header
        const token = req.cookies.token || req.body.token || req.header("Authorisation");
        //if token missing,then return unauthorized
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            });
        }
        //verify the token
        try{
            //decode token using JWT_SECRET
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            // for debugging: prints decoded payload
            console.log(decode);
            //Attach decoded user info to request object
            req.user = decode;
        }
        catch(err){
            //If token is invalid or expired
            return res.status(401).json({
                success:false,
                message:"token is invalid",
            });
        }
        next();
    }
    catch(error){
        //Any other error
        console.log(error);
        res.status(401).json({
            success:false,
            message:"jwt token are not created",
        })
    }
}

//------STUDENT ROLE CHECK -------//
// This middleware ensures only Students can access the route
exports.isStudent= async (req,res,next) =>{
    try{
        if(req.user.accountType !=="Students"){
            return res.status(402).json({
                success:false,
                message:"This is protected route for Students only",
            });
        }
        next();//proceed if user is a student
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
        })
    }
}

// ------Instructor Role Check------//
//This middleware ensures only instructor can acccess the route

exports.isInstructor= async(req, res, next)=>{
    try{
        if(req.user.accountType !=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructor only",
            })
        }
        next();//Procceed if user is an Instructor
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again",
        })
    }
}

//-------ADMIN Role check -------
// This middleware ensures only Admins can access the route

exports.isAdmin= async( req, res, next)=>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(400).json({
                success:false,
                message:"This is a protected route for Admin only",
            })
        }
        next(); //Pocceed if user is an admin
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again",
        })
    }
}