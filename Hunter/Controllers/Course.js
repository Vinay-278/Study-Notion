const Course = require("../Models/Course");
const Tag = require("../Models/Category");
const User = require("../Models/User");
const { uploadImageToCloudinary } = require("../Utils/imageUploader");
const SubSection = require("../Models/SubSection");
const CourseProgress = require("../Models/CourseProgress");

//createCourse handler function
exports.createCourse = async (req, res) => {
  try {
    // fetch data
    const { courseName, courseDescription, whatYouWillLearn, price, tag } =
      req.body;
    //get thumbnail
    const thumbnail = req.files.thumbnail;
    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail
    ) {     
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    console.log(whatYouWillLearn, thumbnail, tag, price);
    //check for instructor
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    console.log("Instructor Details: ", instructorDetails);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }
    // check given tag is valid or not
    const tagDetails = await Tag.findById(tag);
    if (!tagDetails) {
      return res.status(404).json({
        success: false,
        message: "Tag Details not found",
      });
    }
    //upload image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    //cerate an entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructior: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: tagDetails._id,
      thumbnail: thumbnail.secure_url,
    });
    console.log(newCourse);
    //add the new course to the user schema of instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          Courses: newCourse._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllCourses =async (req, res)=>{
    try{
      const allCourse =await Course.find(
        {status:"published"},
        {
          courseName:true,
          price:true,
          thumbnail:true,
          instructor:true,
          ratingAndReviews:true,
          studentsEnrolled:true,
        }
      ).populate("instructor").exec()
      return res.status(200).json({
        success:true,
        data:allCourse,
      })
    }
    catch(error){
      console.log(error);
      return res.status(404).json({
        success:false,
        message:"Can't Fetch Course Data",
        error:error.message,
      })
    }
}

exports.getCourseDetails = async (req, res) => {
  try {
    //get course id
    const { courseId } = req.body;
    //find course details
    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("Category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec();
    //validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with  ${courseId}`,
      });
    }
    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((SubSection) => {
        const timeDurationInSeconds = parseInt(SubSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });
    // return response
    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDurationInSeconds,
      },
      message: "Fetched course data successfully",
    });
  } catch (error) {
    console.log("Error while fetching course details");
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while fetching course details",
    });
  }
};

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });
    console.log("CourseProgressCount: ", courseProgressCount);
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id : ${courseId}`,
      });
    }
    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((SubSection) => {
        const timeDurationInSeconds = parseInt(SubSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });
    //error aah sakti he 
    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
