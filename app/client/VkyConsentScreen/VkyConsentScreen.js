
'use client'

import Image from "next/image";
import React, { useState } from "react";
import CommonInputLabel from "../Common/CommonInputComponents/CommonInputLabel";
import { consentMessages } from "@/commonUtils/StaticContent/consentMessages";
import CommonCheckAgree from "../Common/CommonCheckAgree/CommonCheckAgree";
import CommonNextButton from "../Common/Button/Button";

const VkyConsentScreen = ({ data, handleSubmit }) => {
  const [aadharNumber, setAadharNumber] = useState("");
  const [error, setError] = useState("");
  const [isAgree, setIsAgree] = useState(true);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d{12}$/.test(inputValue)) {
      setAadharNumber(inputValue);
      setError("");
    } else {
      setError("Please enter a valid Aadhar number");
    }
  };
  console.log(data,"datadatatatt");
  return (
    <div className="container mx-auto md:px-12 px-4 flex flex-col gap-1 items-center justify-center mt-10 h-auto">
      <div className="md:text-center text-start text-neutral-800 text-2xl font-semibold font-['Faktum'] leading-[28.80px] md:w-auto w-full ">
        {/* {data?.heading}  */}
        VKY Consent & Next Steps
      </div>
    <div className="mt-5 md:w-auto w-full">
    <div className="text-[#000000] text-sm font-semibold ">Slot Time is :-  10 AM to 12 AM</div>
        <div className="text-[#000000] text-sm font-semibold ">on all days Except National Holidays </div>
    </div>
      <div className="h-[60px] w-[60px] bg-white relative z-50 top-[25px] flex items-center justify-center rounded-full p-[10px]">
        <Image
          src="/assets/ekyc.svg"
          height={40}
          width={40}
          className="rounded-full "
          alt="ekyc"
        />
      </div>
      <div className="min-[375px]:w-[350px] max-[320px]:w-[300px]   h-auto mt-[20px] flex flex-col items-center justify-center bg-[#fcfaf9] rounded-2xl p-10 relative bottom-7">
        <div className="text-center text-neutral-500 text-base font-semibold font-['Poppins'] leading-tight">
          To complete Your E-KYC Please ensure the followings:
        </div>
        <Image
          src="/assets/black-line.svg"
          width={148}
          height={4}
          alt="border"
          className="mt-[25px]"
        />
        <ul class="list-disc mt-[20px] w-[306px] flex flex-col items-start justify-start gap-[20px] md:px-0 px-5">
          {data?.list?.map((item) => {
            return (
              <li className="text-[#8b8a8a] text-base font-normal font-['Poppins'] leading-tight">
                {item?.title}
              </li>
            );
          })}
          <div className=" mx-5">
     <ul className="text-[#9E9E9E]">
        <li className="list-disc mt-1 text-base	">Presence in India</li>
        <li className="list-disc mt-1 text-base	">Availability of PAN Card</li>
        <li className="list-disc mt-1 text-base	">Video  Call enabled on Device</li>
        <li className="list-disc mt-1 text-base	">Enable GPS location on Device</li>
        <li className="list-disc mt-1 text-base	">Internet connectivity</li>
        <li className="list-disc mt-1 text-base	">Blank paper and pen</li>
     </ul>
          </div>
        </ul>
      </div>
      <div className="md:w-[400px] w-full max-[320px]:w-[300px] relative bottom-10">
        <CommonCheckAgree
          isAgree={isAgree}
          setIsAgree={setIsAgree}
          message={consentMessages?.kycAgree}
        />
        <div className="mt-[25px]">
          <CommonNextButton
            title="Start KYC"
            width=" w-full max-[320px]:w-[280px] max-sm:w-[343px]"
            handleSubmit={() => handleSubmit()}
          />
        </div>
      </div>
    </div>
  );
};

export default VkyConsentScreen;
