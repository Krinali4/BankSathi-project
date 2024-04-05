import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";
import { removeNonAlphaNumeric } from "@/commonUtils/util";
import React from "react";

const FullName = ({userInputData, userInfo, hasFullName, fullName }) => {
  console.log("userInputDatauserInputData",userInputData);
  return (
    <div className="mt-[20px]">
      <label
        className="text-[13px] font-normal text-[#212529] "
        htmlFor="full_name"
      >
        {staticLabels?.firstName}
      </label>
      <div
        className={`shadow border rounded-lg w-full h-[50px] py-[14px] px-4 text-[#212529] text-[12px] leading-tight border-[#C2CACF] focus:outline-none focus:shadow-outline ${
          hasFullName
            ? "border-[#C2CACF] cursor-not-allowed bg-[#EFEFEF] text-[#8D9CA5]"
            : "bg-white text-[#212529]"
        }`}
      >
        <input
          id="full_name"
          name="full_name"
          type="text"
          disabled={hasFullName}
          placeholder="Enter your name"
          className="border-none outline-none"
          pattern="^[A-Za-z]+(?: [A-Za-z]+)*$"
          value={`${userInputData?.firstName} ${userInputData?.middleName} ${userInputData?.lastName}`}
          onInput={(e) => {
            e.target.value = removeNonAlphaNumeric(e);
          }}
        />
      </div>
    </div>
  );
};

export default FullName;
