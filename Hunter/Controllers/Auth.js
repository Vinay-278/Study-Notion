//Import required modules
const User= require("../Models/User"); //user model
const OTP= require("../Models/OTP"); //otp model
const bcrypt=require("bcrypt"); // for hashing password
const otpgenerator= require("otp-generator"); // to genrate random otp
const jwt= require("jsonwebtoken"); //for authentication tokens
const mailSender= require("../Utils/mailSender"); //Utility to send emails
const {passwordUpdated}=require("../Models/Profile"); //profile schema function
require("dotenv").config(); //load environment variables
const profile=require("../Models/Profile")

//send otp for Email Verification
exports.sendotp= async(req, res)=>{
    try{
        const {email}= req.body; // fetch email from req body
        const checkUserPresent= await User.findOne({email});
        //if user already exist then return a response
        if(checkUserPresent){
            return res.status(400).json({
                success:true,
                message:"User already registered",
            })
        }
        // Generate a 6 -digit OTP(only numbers)
        var otp= otpgenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
        console.log("otp genrates ",otp);
        //Ensures OTP is unique(not already in db)
        const result= await OTP.findOne({OTP:otp});
        while(result){
            otp=otpgenerator(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false, 
            });
            result = await OTP.findOne({ OTP: otp });
        }
        //Save OTP in database with email
        const otpPayload = {email, otp};
        const otpBody = await OTP.create(otpPayload);
        // await mailSender(email, "Verification mail ",otp);
        console.log(otpBody);

        //return response successful
        res.status(200).json({
            success:true,
            message:"OTP Sent Successfully",
            otp, //(In production, don't send OTP in response)
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//sign up
exports.signUp= async(req,res) =>{
    try{
            //data fetch from request ki body
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp,
    } =req.body;
    //validate krlo
    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
        return res.status(403).json({
            success:false,
            message:"All information are required",
        })
    }
    console.log(otp)
    //2 password match krlo
    if(password!=confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password and ConfirmPassword value does not match, please try again"
        })
    }
    //check user already exist or not
     const existingUser= await User.findOne({email});
     if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User is already registered",
        })
     }
    //find most recent otp stored for the user 
    const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
    console.log(recentOtp);
    //validate otp
    if(recentOtp.length==0){
        return res.status(400).json({
            success:false,
            message:"OTP not found"
        })
    }else if(otp!==recentOtp[0].otp){
        return res.status(400).json({
            success:false,
            message:"Invalid OTP"
        })
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password,10);
    //entry create in db
    const profileDetails= await profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null,
    })

    const user= await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedPassword,
        accountType,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,

    })
    //return res
        return res.status(200).json({
            success:true,
            message:"User is successfully registered",
            user,
        })    
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered, please try again"
        })
    }
}

//login
exports.login= async (req,res) =>{
    try{
      //get data from req body
      const { email, password } = req.body;
      //validation of data
      if (!email || !password) {
        return res.status(403).json({
          success: false,
          message: "All fields are required, please try again",
        });
      }
      // user check exist or not
      const user = await User.findOne({ email }).populate("additionalDetails");
      // console.log(user)
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User is not registered, please signup first",
        });
      }
      //generate jwt, after password matching
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        const payload = {
          email: user.email,
          id: user._id,
          accountType: user.accountType,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        user.token = token;
        user.password = undefined;
        //create cookie and send response into db
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          user,
          message: "Logged in Successfully",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "password is incorrect",
        });
      }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"login failure try again"
        });
    }
};

//change password
exports.changePassword= async (req,res) =>{
    try{
      //get data from req body
      const {email, password, changePassword, confirmPassword}= req.body;
      // get old passowrd, newpassword, confirmpassword
      const user=await User.findOne({email});
      if(!user){
            return res.status(500).json({
                success:false,
                message:"User email is not valid"
            })
      }
      if(await bcrypt.compare(password, user.password)){
            if(changePassword == confirmPassword){
                const hashedPassword=await bcrypt.hash(changePassword,10);
                user.password=hashedPassword;
                await user.save();
            }
            else{
                return res.status(500).json({
                    success:false,
                    message:"ChangePassword is not match with ConfirmPassword ", 
                })
            }
      }
      else{
            return res.status(500).json({
                success:false,
                message:"Password is not matched with hashed password",
            })
      }
      //validation
      //update pwd in db
      //send email - password update
      //return response
      return res.status(200).json({
            success:true,
            message:"Successfully Password are updated"
      })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Password is not change"
        })
    }

}