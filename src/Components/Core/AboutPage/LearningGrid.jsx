import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import CTAButton from '../../../Components/core/HomePage/Button'

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Our learning method combines flexible and practical approaches to ensure a comprehensive and engaging educational experience.",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion provides industry-recognized certification to validate your new skills and enhance your career prospects.",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion’s auto-grading feature provides instant, objective feedback to help learners assess their understanding and progress efficiently.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion equips learners with job-ready skills, preparing them to excel in the workforce.",
  },
];

const LearningGrid = () => ( 
    <div className='grid mx-auto w-full max-w-screen grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mb-12 p-4'>
    {
      LearningGridArray.map((card,i)=>{
        const isHighlightedCard = card.order <0;
        const cardBgClass =
          card.order % 2 === 1
            ? "bg-[#424854]"
            : card.order % 2 === 0
            ? "bg-[#161D29]"
            : "bg-transparent";
        const cardHeightClass = "h-[320px]";
        const colSpanClass = i===0 ?"xl:col-span-2":"";
        const colStartClass = card.order === 3? "xl:col-start-2":"";
        return (
          <div
            key={i}
            className={`${colSpanClass} ${colStartClass} ${cardBgClass} ${cardHeightClass}`}
          >
            {isHighlightedCard ? (
              <div className="flex flex-col gap-3 pb-10 xl:pb-0 sm:pb-20">
                <div className="text-4xl font-bold text-center">
                  {card.heading} <HighlightText text={card.highlightText} />
                </div>
                <p className="text-[#838894] font-medium  sm:text-base">
                  {card.description}
                </p>
                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-7 flex flex-col sm:gap-8">
                <h1 className="text-[#F1F2FF] text-lg sm:text-xl text-center font-bold">
                  {card.heading}
                </h1>
                <p className="text-[#838894] font-medium text-sm sm:text-base px-2">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      
      })
    }
    
    </div>
   
)

export default LearningGrid
