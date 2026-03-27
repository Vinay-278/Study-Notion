import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import HighlightText from "../Components/Core/HomePage/HighlightText";
import CTAButton from "../Components/Core/HomePage/Button";
import Banner from "../assets/Images/banner1.mp4";
import CodeBlocks from "../Components/CodeBlocks";
import Footer from "../Components/Common/Footer";
import LearningLanguageSection from "../Components/Core/HomePage/LearningLanguageSection";
import TimelineSection from "../Components/Core/HomePage/TimelineSection";
import Instructor from "../Components/Core/HomePage/Instructor";
import Explore from "../Components/Core/HomePage/Explore";
//import Navbar from "../Components/Common/Navbar";
const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center justify-between gap-8 text-white">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1  mx-auto rounded-full bg-[#161D29] font-bold transition-all duration-200 hover:scale-95">
            <div className="flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-[#000814]">
              <p>Become an Instructor </p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={" Coding Skills"} />
        </div>
        <div className="mt-4 w-[90%] text-center text-lg font-bold text-[#838894]">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>
        <div className=" mx-3 my-7 shadow-[10px_-5px_40px_-5px_aqua]">
          <video src={Banner} loop muted autoPlay></video>
        </div>
        {/* codeSection1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="w-full text-4xl font-semibold lg:w-[50%]">
                Unlock your
                <HighlightText text={" coding potential "} />
                with our online courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-[aqua]"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroudGradient={<div className="codeblock1 absolute"></div>}
          />
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-full text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={" coding in seconds "} />
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-[aqua]"}
            codeblock={`import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nfrom sklearn.linear_model import LogisticRegression\n\nX = np.array([1,2,3,4,5])\nY = np.array([1,2,2,2,1])\n\nmodel = LogisticRegression()\nmodel.fit(X,Y)`}
            backgroudGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>
        <div className="mb-5">
          <Explore />
        </div>
      </div>
      {/* section 2 */}
      <div className="bg-gray-50 text-[#161D29] ">
        <div className="homepage_bg h-80">
          <div className="w-11/12 flex flex-col justify-between items-center gap-5 mx-auto">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div className="flex items-center gap-3">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex gap-5 mb-10 mt-[95px]">
            <div className="text-4xl font-semibold w-[45%]">
              Get the Skills you need for a
              <HighlightText text={" Job that is a demand"} />
            </div>
            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>
          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* section 3 */}
      <div className="w-11/12 mx-auto flex-col gap-8 bg-[#000814] text-white">
        <Instructor />
        <div className="text-center text-4xl font-semibold mt-10">
          Review from Others Learners
        </div>
      </div>

      {/* Footer */}
      {/* <div className="flex border w-11/12 mx-auto">
        <Footer />
      </div> */}
    </div>
  );
};

export default Home;
