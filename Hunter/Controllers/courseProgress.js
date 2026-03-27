const mongoose= require("mongoose");
const Section= require("../Models/Section");
const SubSection= require("../Models/SubSection");
const CourseProgress=require("../Models/CourseProgress");
const Course=require("../Models/Course");

exports.updatedCourseProgress= async(req,res)=>{
    try{
        //fetch the data from the request body
        const {courseId, subsectionId}=req.body;
        const userId=req.user.id;
        //subsection ke database me findbyid se check karo subsection ki id present hai ya nhi
        const subsection= await SubSection.findById(subsectionId);
        // if subsection ki id present nhi hai toh invalid subsection hai
        if(!subsection){
            return res.status(404).json({
                error:"Invalid subsection"
            })
        }
        //courseProgress ke database me findone ke through course ki id ke andar user id present or not 
        let courseProgress= await CourseProgress.findOne({
            courseID:courseId,
            userId:userId
        })
        // if courseProgress ke andar present nhi hai toh return it response
        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Course progress Does Not Exist"
            })
        }
        else{
            //check courseprogress ke database ke andar completed video ke section me subsection ki id hai toh user already watched
            if(courseProgress.completedVideos.includes(subsectionId)){
                return res.status(400).json({error: "Subsection already completed"})
            }
            //else push back subsection id into completed videos section
            courseProgress.completedVideos.push(subsectionId)
        }
        //course progress ko save karlo
        await courseProgress.save();
        return res.status(200).json({
            message:"Course progress updated"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            error:"Internal server error"
        })
    }
}