import { BASE_URL, COMMON } from "@/commonUtils/ApiEndPoints/ApiEndPoints";
import { errorMessages } from "@/commonUtils/StaticContent/errorMessages";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import panVerified from "../../../../public/assets/pan-verified.svg";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";

const PanInput = ({ setUserInputData, userInputData, headers }) => {
  const [pancardError, setPancardError] = useState();
  const [panVerifyCard, setPanVerifyCard] = useState(false);
  const [panVerifyName, setPanVerifyName] = useState();
  const [panStatus, setPanStatus] = useState(false);

  // PAN VERIFY API CALL
  const PanVerify = async () => {
    await axios
      .post(
        BASE_URL + COMMON?.panVerify,
        {
          pan_no: userInputData?.pan_no?.toUpperCase(),
        },
        { headers: headers }
      )
      .then((response) => {
        setIsLoadingCheck(false);
        if (response) {
          setPanVerifyCard(false);
          setPancardError(true);
        }
        if (response?.data?.message == "success") {
          setPanVerifyName(response?.data?.data?.name);
          setUserInputData({
            ...userInputData,
            full_name: response?.data?.data?.name,
          });
        }
        if (response?.data?.message == "success") {
          setIsLoadingCheck(true);
          setPanVerifyCard(true);
          setPancardError(true);
          setPanStatus(response?.data?.data?.pan_status);
        }
        if (response?.data?.message == "failed") {
          setPancardError(false);
          setIsLoadingCheck(false);
          setPanStatus(response?.data?.data?.pan_status);
          setPanVerifyName(response?.data?.data?.name);
          setPanVerifyCard(false);
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message == "failed") {
          setPanVerifyCard(false);
          toast.error(error?.response?.data?.reason);
        } else if (error?.response?.status === 422) {
          setPancardError(false);
          setPanVerifyCard(false);
        }
      });
  };

  const handleChange = (event) => {
    setUserInputData({
      ...userInputData,
      [event?.target?.name]: event?.target?.value,
    });
    if (event?.target?.name === "pan_no") {
      setPanVerifyCard(false);
      console.log(event?.target?.value);
      if (
        event?.target?.value?.length === 10 &&
        userInputData?.is_pan_verified !== "1"
      ) {
        PanVerify();
      }
    }
  };

  return (
    <div>
      <div>
        <label
          className="text-[13px] font-normal text-[#212529] "
          htmlFor="email"
        >
          {staticLabels?.panCard}
        </label>
        <input
          className={`shadow border rounded-lg w-full py-[14px] px-4 text-[#212529] text-[12px] leading-tight border-[#C2CACF] focus:outline-none focus:shadow-outline 
          ${
            pancardError === true || userInputData?.is_pan_verified === "1"
              ? "border-green-300"
              : "border-[#C2CACF]"
          }
          ${pancardError === false ? "border-red-500" : "border-[#C2CACF] "}`}
          id="pan_no"
          name="pan_no"
          type="text"
          value={userInputData?.pan_no}
          disabled={userInputData?.is_pan_verified === "1"}
          onChange={(e) => handleChange(e)}
          placeholder="Enter your PAN card number"
          required
          maxLength={10}
        />
        <Image
          src={panVerified}
          height={20}
          width={21}
          alt="pan-verified"
          className="relative bottom-[35px] left-[92%] max-sm:left-[90%]"
        />
      </div>
      {userInputData?.pan_no
        ? pancardError === false && (
            <p className="text-[12px] text-[#FF000F] font-no">
              {errorMessages?.pancardValidError}
            </p>
          )
        : ""}
    </div>
  );
};

export default PanInput;
