import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineimg from '../../../assets/Images/TimelineImage.png'

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
    
  return (
    <div>
      <div className="flex flex-row gap-15 items-center">
        <div className="w-[45%] flex flex-col gap-5">
          {timeline.map((ele, idx) => (
            <div className="flex flex-row gap-10 mb-7" key={idx}>
              <div className="w-[50px] h-[50px] bg-white flex rounded-full justify-center items-center">
                <img src={ele.Logo} alt="" />
              </div>
              <div>
                <h2 className="font-semibold text-[18px]">{ele.heading}</h2>
                <h2>{ele.Description}</h2>
              </div>
            </div>
          ))}
        </div>
        <div className="relative">
          <img
            src={timelineimg}
            alt="timelineimg"
            className="shadow-white object-cover h-fit"
          />
          <div className="absolute bg-cyan-400 flex text-white uppercase py-7 left-[15%] translate-y-[-50%] rounded-2xl">
            <div className="flex gap-5 items-center border-r border-cyan-300 px-5">
              <p className="text-3xl font-bold">10</p>
              <p className="text-white text-sm w-28 text-center">
                Years of Experience
              </p>
            </div>
            <div className="flex gap-5 items-center px-7">
              <p className="text-3xl font-bold">250</p>
              <p className="text-white text-sm w-28 text-center ">
                Types of Courses
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineSection
