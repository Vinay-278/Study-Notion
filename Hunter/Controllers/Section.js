const Section= require("../Models/Section");
const Course= require("../Models/Course");

exports.createSection = async (req, res)=>{
    try{
        //data fetch
        const {sectionName, courseId}= req.body;
        //data validate
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            });
        }
        console.log(sectionName)
        //create section
        const newSection = await Section.create({sectionName});
        console.log(newSection)
        //update course with section object id
        const updatedCourseDetails= await Course.findByIdAndUpdate(
            courseId,{$push:{
                courseContent:newSection._id,
            }},{new:true}
        )
        //Hw : use populate to replace section/ sub section both in the updatedCourseDetails
        //return res 
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails,
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create section, please try again",
            error:error.message,
        })
    }
}

exports.updateSection= async (req,res)=>{
    try{
        //data input
        const {sectionName,sectionId}= req.body;
        //data validate
        if(!sectionName || ! sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            })
        }
        //update data
        const section= await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        //return res
        return res.status(200).json({
            success:true,
            message:"Section updated successfully"
        })
    }
    catch(error){
        return res.status(500).json({
          success: false,
          message: "Unable to create section, please try again",
          error: error.message,
        });
    }
}

exports.deleteSection= async (req,res) =>{
    try{
        //get id -assuming that we are sending id in params
        const {sectionId}=req.params
        //use findBydelete
        await Section.findByIdAndDelete(sectionId);
        //todo:do we need to delete the entry from the course schema ??
        //return res
        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully"
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section, please try agaian",
            error:error.message,
        })
    }
}