
'use client'
import Image from "next/image";
import React, { useState } from "react";
import CommonInputLabel from "../Common/CommonInputComponents/CommonInputLabel";
import { consentMessages } from "@/commonUtils/StaticContent/consentMessages";
import CommonCheckAgree from "../Common/CommonCheckAgree/CommonCheckAgree";
import CommonNextButton from "../Common/Button/Button";
import { USERINFO } from "@/commonUtils/ApiEndPoints/ApiEndPoints";
import {
  getCookieValue,

} from "@/commonUtils/util";
const KycCommonScreen = ({ data, handleSubmit }) => {
  const [aadharNumber, setAadharNumber] = useState("");
  const [error, setError] = useState("");
  const [isAgree, setIsAgree] = useState(true);
  const deviceId = getCookieValue("deviceId");
  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d{12}$/.test(inputValue)) {
      setAadharNumber(inputValue);
      setError("");
    } else {
      setError("Please enter a valid Aadhar number");
    }
  };
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const handlSubmitClick = async () => {
    const UserPan = JSON.parse(localStorage.getItem("userPanData"));
    const params = {
      mobile_no: "7900445351",
      jwt_token: token,
      device_id: deviceId,
      kyc_type: "string"
    };
    await axios
      .post(BASE_URL + USERINFO.iniate_ekyc, params, {
        headers: headers,
      })
      .then((response) => {
        console.log(response, "responseresponse");
      })
      .catch((error) => {
        // toast.error(error?.message || error?.res?.data?.detail);
      });
  };
  return (
    <div className="container mx-auto md:px-12 px-4 flex flex-col gap-1 items-center justify-center mt-14 h-auto">
      <div className="text-center  text-neutral-800 text-2xl font-semibold font-['Faktum'] leading-[28.80px] md:w-auto w-full">
        {data?.heading}
        START YOUR Digital-KYC
      </div>
      <div className="h-[60px] w-[60px] bg-white relative top-[35px] flex items-center justify-center rounded-full p-[10px] z-50">
        <Image
          src="/assets/ekyc.svg"
          height={40}
          width={40}
          className="rounded-full "
          alt="ekyc"
        />
      </div>
      <div className="min-[375px]:w-[350px] max-[320px]:w-[300px] h-auto mt-[30px] flex flex-col items-center justify-center bg-[#fcfaf9] rounded-2xl p-10 relative bottom-7">
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
        <ul class="list-disc mt-[20px] w-[306px] flex flex-col items-start justify-start gap-[20px] md:p-0 p-5">
          {data?.list?.map((item) => {
            return (
              <li className="text-[#8b8a8a] text-base font-normal font-['Poppins'] leading-tight">
                {item?.title}
              </li>
            );
          })}
          <div className="mt-[25px]">
            <CommonInputLabel labelTitle="Enter Aadhar Card Number" />
            <input
              type="text"
              id="aadhar"
              name="aadhar"
              // value={aadharNumber}
              onChange={handleChange}
              placeholder="XXXX XXXX XXXX"
              className={`shadow border rounded-lg md:w-[306px] w-full py-4 px-4 text-[#212529] leading-tight text-[12px] focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]`}
            />
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>
        </ul>
      </div>
      <div className="md:w-[530px] w-full relative bottom-10">
        <CommonCheckAgree
          isAgree={isAgree}
          setIsAgree={setIsAgree}
          message={consentMessages?.kycAgree}
        />
        <div className="mt-[25px]">
          <CommonNextButton
            title="Continue"
            width="md:w-[32rem] w-full max-[320px]:w-[280px] max-sm:w-[343px]"
            handleSubmit={() => handlSubmitClick()}
          />
        </div>
      </div>
    </div>
  );
};

export default KycCommonScreen;
