import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";
import React from "react";
import { useState } from "react";

const MobileInput = ({
  mobile,
  setMobile,
  setUserInputData,
  userInputData,
}) => {
  const [errMsg, setErrorMsg] = useState(false);
  const [zeroNumberValidation, setZeroNumberValidation] = useState(false);

  const handleChangeNumber = (e) => {
    const inputValue = e?.target?.value;
    const extractedNumber = inputValue?.replace(/\D/g, "");
    setUserInputData({ ...userInputData, mobile: mobile });
    if (extractedNumber?.length === 10) {
      setMobile(extractedNumber);
      setErrorMsg(false);
    }
    if (extractedNumber?.length < 10) {
      setErrorMsg(true);
      setMobile(extractedNumber);
    }
    if (extractedNumber == "0000000000") {
      setZeroNumberValidation(true);
    }
    if (extractedNumber !== "0000000000") {
      setZeroNumberValidation(false);
    }
    setUserInputData({
      ...userInputData,
      [e?.target?.name]: e?.target?.value,
    });
  };

  return (
    <div>
      <label
        className="text-[13px] font-normal text-[#212529] "
        htmlFor="email"
      >
       {staticLabels?.mobileNumber}
      </label>
      <div
        className={
          errMsg || zeroNumberValidation
            ? "flex items-center gap-[18px] h-[45px] bg-white rounded-lg border border-[#FF000F] mt-[3px]"
            : "flex items-center gap-[18px] h-[45px] bg-white rounded-lg border border-neutral-300 mt-[3px]"
        }
      >
        <div>
          <p className="pl-[20px] text-[15px] text-[#212529]">+91</p>
        </div>
        <input
          type="tel"
          name="mobile"
          id="mobile"
          pattern="[0-9]*"
          className="text-[#212529] border-none text-[12px] outline-none "
          placeholder="Enter Your Number"
          onChange={(e) => handleChangeNumber(e)}
          value={mobile || userInputData?.mobile}
          required
          maxLength={10}
        />
      </div>
    </div>
  );
};

export default MobileInput;
