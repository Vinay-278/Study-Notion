import React from 'react'
import ContactFormSection from '../Components/Core/AboutPage/ContactFormSection'
import LearningGrid from '../Components/Core/AboutPage/LearningGrid'
import Quote from '../Components/Core/AboutPage/Quote'
import Stats from '../Components/Core/AboutPage/Stats'
import HighlightText from '../Components/Core/HomePage/HighlightText'
import ReviewSlider from '../Components/Common/ReviewSlider'
import Footer from '../Components/Common/Footer'
import AboutImg1 from '../assets/Images/aboutus1.webp'
import AboutImg2 from '../assets/Images/aboutus2.webp'
import AboutImg3 from '../assets/Images/aboutus3.webp'
import AboutImg4 from '../assets/Images/FoundingStory.png'


const About = () => {
  return (
    <div>
      <div className="bg-[#2C333F]">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <header className="mx-auto py-20 text-4xl font-bold lg:w-[70%]">
            Driving Innovation in Online Education for a
            <br />
            <HighlightText text={" Brighter Future"} />
            <p className="mx-auto mt-3 text-center text-[19px] font-bold text-[#838894] lg:w-[95%]">
              Studynotion is at the forefront of driving Innovation in Online
              Education. we're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0  w-[100%] left-[50%] grid translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img src={AboutImg1} alt="" />
            <img src={AboutImg2} alt="" />
            <img src={AboutImg3} alt="" />
          </div>
        </div>
      </div>
      <section className="border-b border-[#2C333F]">
        <div className=" flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-[#585D69]">
          <div className="h-[100px]"></div>
          <Quote />
        </div>
      </section>
      <section>
        <div className="mx-auto flex w-11/12 max-w-maxConntent flex-col justify-between gap-10 text-[#585D69]">
          <div className="flex flex-col items-center gap-5 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[50%] flex-col gap-10">
              <h1 className="bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]">
                Our Founding Story
              </h1>
              <p className="font-medium text-[#838894] lg:w-[95%]">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="font-medium text-[#838894] lg:w-[95%]">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            <div>
              <img
                src={AboutImg4}
                alt=""
                className="shadow-[0_0_20px_0] shadow-[#fc6767]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center lg:gap-5 lg:flex-row justify-between">
          <div className="px-12 my-24 flex lg:w-[40%]  flex-col gap-10">
            <h1 className="bg-gradient-to-b from-[#ff512f] to-[#f09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]">
              Our Vision
            </h1>
            <p className="font-medium text-[#838894] lg:w-[95%]">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>
          <div className="my-24 px-12 flex lg:w-[40%] flex-col gap-10">
            <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%]">
              Our Mission
            </h1>
            <p className="font-medium text-[#838894] lg:w-[95%]">
              Our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and
              we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </p>
          </div>
        </div>
      </section>
      <Stats />
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <LearningGrid />
        <ContactFormSection />
      </section>
      <div className="realative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-[#000814] text-white">
        <ReviewSlider />
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default About
