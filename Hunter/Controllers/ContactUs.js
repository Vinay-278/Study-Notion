const {contactUsEmail} =require('../templates/contactForm');
const mailSender= require("../Utils/mailSender");

exports.contactUsController =async(req,res)=>{
    try{
        //fetch the data from the request body 
        const {email, firstname, lastname, message, phoneNo}=req.body;
        //validation of data
        if(!email || !firstname || !lastname || !message || !phoneNo){
            return res.status(400).json({
                success:false,
                message:"All field are required please filled the entry"
            })
        }
        // sending mail to user
        const emailRes= await mailSender(
            email,
            "Your Data send successfully",
            contactUsEmail(email,firstname,lastname,message,phoneNo)
        )
        console.log("Email res: ",emailRes);
        //return response
        return res.status(200).json({
            success:true,
            message:"Email send successfully"
        })
    }
    catch(error){
        console.log("error message: ", error.message)
        return res.json({
            success:false,
            message:"Somethig went wrong..."
        })
    }
}