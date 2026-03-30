const SubSection=require("../Models/SubSection");
const Section=require("../Models/Section");
const {uploadImageToColoudinary}= require("../Utils/imageUploader");

//create Section
exports.createSubSection =async(req,res)=>{
    try{
        //fetch data from the request body
        const {SectionId,title,timeDuration,description}=req.body;
        //extract file/video
        const video= req.files.videoUrl;
        //validation
        if(!SectionId || !timeDuration || !description || !video || !title){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        //upload video to cloudinary
        const uploadDetails= await uploadImageToColoudinary(video,process.env.FOLDER_NAME);
        //create a subsection
        // title kaise aya hai
        const SubsectionDetails= await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        //update section with this sub section Object id
        const updatedSection= await Section.findByIdAndUpdate({_id:SectionId},
            {
                $push:{
                    SubSection:SubsectionDetails._id,
                }
            },
            {new:true}
        );
        return res.status(200).json({
            success:true,
            message:"Subsection created successfully",
            data:updatedSection
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"internal Server Error ",
            message:error.message,
        })
    }
}

exports.updateSubSection = async (req, res) => {
  try {
    const { SectionId, SubSectionId, title, description } = req.body;

    if (!SectionId || !SubSectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const subSection = await SubSection.findById(SubSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    if (title) subSection.title = title;
    if (description) subSection.description = description;

    if (req.files?.video) {
      const video = req.files.video;

      const uploadDetails = await uploadImageToColoudinary(
        video,
        process.env.FOLDER_NAME,
      );

      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = uploadDetails.duration;
    }

    await subSection.save();

    const updatedSection =
      await Section.findById(SectionId).populate("subSection");

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    });
  }
};

exports.deleteSubSection =async (req, res)=>{
    try{
        const {SubSectionId, SectionId}= req.body;
        await Section.findByIdAndUpdate(
            {_id:SectionId},
            {
                $pull:{
                    subSection:SubSectionId,
                },
            }
        )
        const subSection = await SubSection.findByIdAndDelete({_id:SubSectionId});
        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"SubSection not Found"
            })
        }
        //find updated section and return it 
        const updatedSection= await Section.findById(SectionId).populate(
            "subSection"
        )
        return res.status(200).json({
            success:true,
            message:"SubSection deleted successfully",
            data:updatedSection,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"An error occured while deleting the subsection"
        })
    }
}