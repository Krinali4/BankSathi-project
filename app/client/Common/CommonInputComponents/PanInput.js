import React, { useState } from "react";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";

const PanInput = ({ setUserInputData, userInputData, loginStepper }) => {
  const handleChange = (event) => {
    setUserInputData({
      ...userInputData,
      [event.target.name]: event?.target?.value,
    });
  };
  const hasPan =
    loginStepper > 1 &&
    userInputData?.pan_no &&
    userInputData?.pan_no !== "" &&
    userInputData?.pan_no?.length === 10
      ? true
      : false;

  return (
    <>
      <div>
        <label
          className="text-[13px] font-normal text-[#212529] "
          htmlFor="email"
        >
          {staticLabels?.panCard}
        </label>
        <div
          className={`shadow border rounded-lg w-full h-[50px] py-[14px] px-4 text-[#212529] text-[12px] leading-tight border-[#C2CACF] focus:outline-none focus:shadow-outline 
          ${
            hasPan
              ? "border-[#C2CACF] cursor-not-allowed bg-[#EFEFEF] text-[#8D9CA5]"
              : "bg-white text-[#212529]"
          }
          `}
        >
          <input
            id="pan_no"
            name="pan_no"
            type="text"
            pattern="^[A-Z]{5}[0-9]{4}[A-Z]$"
            className="border-none outline-none"
            value={userInputData?.pan_no}
            disabled={hasPan}
            onChange={(e) => handleChange(e)}
            placeholder="Enter your PAN card number"
            required
            maxLength={10}
          />
        </div>
        {/* {isPanVerified && (
          <Image
            src={panVerified}
            height={20}
            width={21}
            alt="pan-verified"
            className="relative bottom-[35px] left-[92%] max-sm:left-[90%]"
          />
        )} */}
      </div>
    </>
  );
};

export default PanInput;
