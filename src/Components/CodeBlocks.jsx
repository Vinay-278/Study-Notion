import React from "react";
import CTAButton from "../Components/Core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2, 
  codeColor,
  codeblock
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      {/* section1 */}
      <div className="w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-[#838894] font-bold">{subheading}</div>
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>
      {/* Section2 */}
      <div className="h-fit flex flex-row text-[12px] py-3 sm:text-sm leading-[18px] sm:leading-6 relative w-full lg:w-[470px]">
        <div className="text-center flex flex-col w-[10%] text-[#6E727F] font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>
        <div
          className={`w-[90%] flex flex-col font-bold gap-2 ${codeColor} pr-1`}
        >
          <TypeAnimation
            sequence={[codeblock, 500, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
