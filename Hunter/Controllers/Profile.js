const Profile=require("../Models/Profile");
const User=require("../Models/User");
const Course= require("../Models/Course");
const CourseProgress= require("../Models/CourseProgress");
const {uploadImageToCloudinary} =require("../Utils/imageUploader")
const mongoose= require("mongoose");
// const {con} =require("../Utils/secToDuration");

exports.updatedProfile=async (req,res)=>{
    try{
        //get data
        const {dateOfBirth="",about="",contactNumber="",gender=""}=req.body;
        //get userid
        const id=req.user.id;
        //validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        //find profile
        const userDetails= await User.findById(id);
        const profileId=userDetails.additionalDetails;
        const profileDetails= await Profile.findByIdAndUpdate(
            profileId,
            {
                dateOfBirth,
                about,
                gender,
                contactNumber
            },
            {new: true}
        )
        await profileDetails.save();
        //update profile
        //return response
        return res.status(200).json({
            success:true,
            message:"Profile updated Successfully",
            profileDetails,
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            error:error.message,
        })
    }
}

//deleteAccount
//Explore =>how can we schedule the deletion operation
exports.deleteAccount= async (req,res)=>{
    try{
        //get id
        const id=req.user.id;
        //validation
        const userDetails= await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //Todo:Hw unenroll user from all enrolled courses 
        //delete user
        await User.findByIdAndDelete({_id:id});
        //return response
        return res.status(200).json({
            success:true,
            message:"User Deleted Successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User cannot be deleted successfully",
        })
    }
}

exports.getAllUserDetails= async(req,res)=>{
    try {
        // fetch data from it req body
        const id=req.user.id;
        // validates the user id
        if(!id){
            return res.status(400).json({
              success:false,
              message:"User id is not found",
            })
        }
        // get all user details through user ki id
        const userDetails= await User.findById(id).populate("additionalDetails").exec();
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"user details are not found",
            })
        }
        return res.status(200).json({
            success:true,
            message:"User Data Fetched Successfully",
            data:userDetails
        })
    } 
    catch (error) {
      return res.status(500).json({
        success: false,
        message: "User cannot be deleted successfully",
      });
    }
}

exports.updateDisplayPicture = async (req, res) => {
  try {
    // valitdate that user image send or not
    if (!req.files || !req.files.displayPicture) {
      return res.status(400).json({
        success: false,
        message: "Display picture is required",
      });
    }
    // fetch the image, user id
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    // upload image into cloudinary using env folder
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    // update profile from a user data base
    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { image: image.secure_url },
      { new: true }
    );
    // return it response when it successfully
    return res.staus(200).json({
      success: true,
      message: "Image Updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEnrolledCourses =async(req,res)=>{
  try{
    const userId=req.user.id;
    let userDetails= await User.findOne({
      _id:userId,
    }).populate({
      path:"courses",
      populate:{
        path:"courseContent",
        populate:{
          path:"subSection",
        },
      },
    }).exec()
    userDetails=userDetails.toObject();
    var SubsectionLength=0
    for(var i=0; i<userDetails.Courses.length; i++){
      let totalDurationInSeconds=0
      SubsectionLength =0
      for(var j=0; j<userDetails.Courses[i].courseContent.length; j++){
        totalDurationInSeconds+=userDetails.Courses[i].courseContent[j].subSection.reduce((acc,curr)=> acc+parseInt(curr.timeDuration),0);
        userDetails.Courses[i].totalDuration =convertSecondsToDuration(
          totalDurationInSeconds
        )
      }
      SubsectionLength+=userDetails.Courses[i].coursesContent[j].subSection.length
    }
    let courseProgressCount = await CourseProgress.findOne({
      courseID:userDetails.Courses[i]._id,
      userId:userId,
    })
    courseProgressCount= courseProgressCount?.completedVideos.length
    if(SubsectionLength===0){
        userDetails.Courses[i].progressPercentage=100
    }
    else{
      //to make it up to 2 decimal place
      const multiplier= Math.pow(10,2);
      userDetails.Courses[i].progressPercentage= Math.round(
       (courseProgressCount/SubsectionLength)*100*multiplier
      )
    }
    if(!userDetails){
        return res.status(400).json({
          success:false,
          message:`Could not find user with id ${userDetails}`
        })
    }
    return res.status(200).json({
      success:true,
      data:userDetails.Courses,
    })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}

exports.instructorDashboard = async(req,res)=>{
  try{
    const courseDetails= await Course.find({instructor:req.user.id})
    const coursesData =courseDetails.map((course)=>{
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated= totalStudentsEnrolled*course.price
      //create a new object with the additional fields
      const courseDatawithStats={
        _id:course._id,
        courseName:course.courseName,
        courseDescription:course.courseDescription,
        //Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated
      }
      return courseDatawithStats
    })
    res.status(200).json({
      courses:coursesData
    })
    }
  catch(error){
    console.log(error.message);
    return res.status(500).json({
      message:"Server Error"
    })
  }
}
