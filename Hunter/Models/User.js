//import the mongoose library
const mongoose=require("mongoose");

//Define the user schema using the Mongoose Schema constructor
const userSchema= new mongoose.Schema({
    //Define the name field with type string ,required, and trimmed
    firstname:{
        type:String,
        required:true,
        trim:true,
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
    },
    //Define the email fields with type String ,required, and trimmed
    email:{
        type:String,
        required:true,
        trim:true,
    },
    //Define the password field with type String and required
    password:{
        type:String,
        required:true,
        trim:true,
    },
    //Define the role field with type string and enum values of "Admin","Students" or "Visitors"
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true,
    },
    active:{
        type:Boolean,
        default:true,
    },
    approved:{
        type:Boolean,
        default:true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile",
    },
    Courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        }
    ],
    image:{
        type:String,
        //at registration image cannot be uploaded
        required:true,
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress",
        }
    ],    
},
{timestamps:true}
)

//Export the Mongoose model for the user schema , using the name "user"
module.exports=mongoose.model("User",userSchema)