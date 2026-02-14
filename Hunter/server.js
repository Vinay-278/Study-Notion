//import the express
const express=require("express");
//app banaya jo hamara server represent karega
const app=express();

//Different routes(alag-alag features ke liye routes import ho rahe hain)

//User releated routes 
const userRoutes=require('./Routes/User');
//Profile releated routes
const profileRoutes=require('./Routes/Profile');
//Payement releated routes
const PayementRoutes=require('./Routes/Payment');
// course releated routes
const CourseRoutes=require('./Routes/Course');
//contact form releated routes
const ContactUsRoute=require('./Routes/Contact');

//config files
// Isse project ka database connection centralized ho jata hai.
// Agar project me kahi bhi database use karna hai to baar-baar connection code likhne ki zarurat nahi — sirf database.Connect() call karna hai.

//Database connection file
const database=require('./Config/database');
//cookies ko parse karne ke liye
const cookieParser=require('cookie-parser');
//Cross-Origin requests allow karne ke liye
const cors=require('cors');

//Cloudinary connection
// Cloudinary ek service hai jisme hum images, videos ya files ko upload karte he .
//Ye file basically Cloudinary ke sath authentication aur connection establish karti hai.
const {cloudinaryConnect}=require("./Config/cloudinary");
//File upload handle karne ke liye
const fileUpload=require("express-fileupload");
//.env file se envivorment variables load karne ke liye
// Ye ek hidden file hoti hai jisme hum sensitive info rakhte ho (jise github pe push nahi karna chahiye).
//Security: Password/code direct codebase me nahi hota.
// Flexibility: Alag-alag environment (development, testing, production) ke liye alag .env use kar sakte ho.
const dotenv=require("dotenv");

//Environment variables load karna
dotenv.config();
//Port set karna
const PORT= process.env.PORT || 4000;

//database connect
database.Connect();

//middlewares

//incoming request ka data json format me read kar sake 
app.use(express.json());
//URL encoded data ko parse karne ke liye(postman me form-data ya x-www-form-unlencoded ke liye)
app.use(express.urlencoded({extended:true}))//for using the postman
//cookies ko easily access karne ke liye
app.use(cookieParser());
//CORS(cross-origin resource sharing ) enable karna
//iska matlab backend (4000) aur frontend (3000) apas me communicated kar sake
app.use(
    cors({
        origin:"http://localhost:5173",//frontend ka origin
        credentials:true,//cookies/auth header send karne ki permission
    })  
)

//file upload handle karna(temporary folder me file store karna)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/",
    })
)
//cloudinary connection
//Cloudinary ke sath connection establish karna(images/videos ko cloud me store karna ke liye)
cloudinaryConnect();

//routes
// /api/v1/auth->user releated routes
app.use("/api/v1/auth",userRoutes);
// /api/v1/auth->profile releated routes
app.use("/api/v1/profile", profileRoutes);
// /api/v1/auth->course releated routes
app.use("/api/v1/course", CourseRoutes);
// /api/v1/auth->payement releated routes
app.use("/api/v1/payment", PayementRoutes);
// /api/v1/auth->Contact us form ke routes
app.use("/api/v1/reach",ContactUsRoute);

//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"your server is up and running ... "
    })
});

//Server listen karega (Port pe run karega)
app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})

// Config/database.js → Database se connect karne ke liye.
// Config/cloudinary.js → Cloudinary service setup ke liye.
// .env → Secrets aur config values store karne ke liye.