// crypto is used to verify Razorpay signature (security purpose)
const crypto = require("crypto");

// Razorpay instance (configured separately)
const { instance } = require("../Config/razorpay");

// Database models
const Course = require("../Models/Course");
const User = require("../Models/User");
const CourseProgress = require("../Models/CourseProgress");

// Utility functions
const mailSender = require("../Utils/mailSender");

// Email templates
const courseEnrollmentEmail  = require("../templates/courseEnrollment");
const payementSuccessEmail = require("../templates/paymentSuccess");

const mongoose = require("mongoose");

// ================== STEP 1: CREATE ORDER ==================
exports.capturePayement = async (req, res) => {
  // course = array of course IDs
  const { course } = req.body;

  // logged-in user id
  const userId = req.user.id;

  // check if courses exist
  if (course.length === 0) {
    return res.status(400).json({
      success: false,
      message: "please provide Course id",
    });
  }

  let totalAmount = 0;

  // loop through each course
  for (const course_id of course) {
    let courses;
    try {
      // find course in DB
      courses = await Course.findById(course_id);

      if (!courses) {
        return res.status(200).json({
          success: false,
          message: "Could not find the course",
        });
      }

      // convert userId to ObjectId
      const uid = new mongoose.Types.ObjectId(userId);

      // check if user already enrolled
      if (courses.studentsEnrolled.includes(uid)) {
        return res.status(200).json({
          success: false,
          message: "Student is already enrolled",
        });
      }

      // add course price to total
      totalAmount += courses.price;
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Razorpay works in paise (₹1 = 100 paise)
  const currency = "INR";

  const options = {
    amount: totalAmount * 100, // convert to paise
    currency,
    receipt: Math.random(Date.now().toString()), // random receipt id
  };

  try {
    // create order in Razorpay
    const payementResponse = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      message: payementResponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "could not initate the order",
    });
  }
};

// ================== STEP 2: VERIFY PAYMENT ==================
exports.verifyPayement = async (req, res) => {
  // data sent by Razorpay after payment
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payement_id = req.body?.razorpay_payement_id;
  const razorpay_signature = req.body?.razorpay_signature;

  const course = req.body?.course;
  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payement_id ||
    !razorpay_signature ||
    !course ||
    !userId
  ) {
    return res.status(200).json({
      success: false,
      message: "Payement Failed",
    });
    
  }

  // create body for signature verification
  let body = razorpay_order_id + "|" + razorpay_payement_id;

  // generate expected signature using secret key
  //HMAC => hash based message authentication code
  // sha256 => hashing algorithm
  //razorpay_secret => secret key 
  
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  // compare signatures
  if (expectedSignature === razorpay_signature) {
    // if matched → enroll student
    await enrollStudents(course, userId, res);

    return res.status(200).json({
      success: true,
      message: "Payement Verified",
    });
  }

  return res.status(200).json({
    success: false,
    message: "payement failed",
  });
};

// ================== STEP 3: ENROLL STUDENT ==================
const enrollStudents = async (courses, userid, res) => {
  // validation
  if (!courses || !userid) {
    return res.status(400).json({
      sucecss: false,
      message: "please provide data for Courses or UserId",
    });
  }

  // loop through courses
  for (const course_id of courses) {
    try {
      // add user to course
      const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: course_id },
        { $push: { studentsEnrolled: userid } },
        { new: true },
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "course not found",
        });
      }

      // create course progress
      const courseProgress = await CourseProgress.create({
        courseID: course_id,
        userId: userid,
        completedVideos: [],
      });

      // add course to user
      const enrolledStudent = await User.findByIdAndUpdate(
        userid,
        {
          $push: {
            courses: course_id,
            courseProgress: courseProgress._id,
          },
        },
        { new: true },
      );

      // send email
      await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled`,
        courseEnrollmentEmail(
          enrolledStudent.firstName,
          enrolledCourse.courseName,
        ),
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

// ================== STEP 4: PAYMENT SUCCESS EMAIL ==================
exports.sendPayementSuccessEmail = async (req, res) => {
  const { orderId, payementId, amount } = req.body;
  const userId = req.user.id;

  // validation
  if (!orderId || !payementId || !amount || !userId) {
    return res.status(400).json({
      success: false,
      message: "please provide all the fields",
    });
  }

  try {
    // find user
    const enrolledStudent = await User.findById(userId);

    // send email
    await mailSender(
      enrolledStudent.email,
      `Payement Recieved`,
      payementSuccessEmail(
        enrolledStudent.firstName,
        amount / 100,
        orderId,
        payementId,
      ),
    );
    return res.status(200).json({
        success:true,
        message:"payment success email sent successfully"
    })
  } catch (error) {
    console.log("Error in sending mail", error);
    return res.status(500).json({
      success: false,
      message: "Could not send email",
    });
  }
};
