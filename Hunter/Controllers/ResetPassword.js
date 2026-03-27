const User= require("../Models/User");
const mailSender= require("../Utils/mailSender");
const bcrypt= require("bcrypt")
//resetPasswordToken

exports.resetPasswordToken= async(req, res)=>{
    try{
        //get email form req body 
    const email =req.body.email;
    //check user from this email, email validation
    const user= await User.findOne({email:email});
    if(!user){
        return res.status(402).json({
            success:false,
            message:"your email is not registered with us"
        })
    }
    //generate tokenss
    const token= crypto.randomUUID();
    //update user by adding token and expiration time
    const updatedDetails= await User.findOneAndUpdate(
        {email:email},
        {
            token:token,
            resetPasswordExpires:Date.now()+5*60*1000,
        },
        {new:true}
    );
    //create url
    const url= `https://localhost:3000/update-password/${token}`;
    //send email
    await mailSender(email,"Password Reset Link",`Password Reset Link ${url}`);
    //return response 
    return res.status(200).json({
        success:true,
        message:"Email sent successfully"
    })
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"Something went wrong while sending reset password"
        })
    }
}

//reset password

exports.resetPassword = async(req,res) =>{
    try{
        //data fetch 
        const {password, confirmPassword, token} = req.body;
        //validation
        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password not matching",
            })
        }
        //get usedetails form db using token
        const userDetails= await User.findOne({token:token});
        //if no entry - invalid token
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
            })
        }
        // token time check kar lo
        if(userDetails.resetPasswordExpires< Date.now()){
            return res.status(402).json({
                success:false,
                message:"Token is expired, please regenrate your token",
            });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password,10);
        //password update
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        )
        //return response
        return res.status(200).json({
            success:true,
            message:"password reset successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Something went wrong while sending reset pwd mail"
        })
    }
}