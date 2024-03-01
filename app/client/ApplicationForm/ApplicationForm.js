import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";
import React, { useEffect, useRef, useState } from "react";
import CommonInputLabel from "../Common/CommonInputComponents/CommonInputLabel";
import { DropdownList } from "react-widgets";
import Image from "next/image";
import PincodeInput from "../Common/CommonInputComponents/PinCodeInput";
import {
  BS_BASE_URL,
  BS_COMMON,
} from "@/commonUtils/ApiEndPoints/ApiEndPoints";
import CommonCheckAgree from "../Common/CommonCheckAgree/CommonCheckAgree";
import { consentMessages } from "@/commonUtils/StaticContent/consentMessages";
import CommonNextButton from "../Common/Button/Button";
import KycCommonScreen from "../KycCommonScreen/KycCommonScreen";
import { ekycList } from "@/commonUtils/staticInfos";
import OTPInput from "react-otp-input";
import { errorMessages } from "@/commonUtils/StaticContent/errorMessages";
import LoginOptions from "./LoginOptions/LoginOptions";

const ApplicationForm = () => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const wrapperRef = useRef(null);

  const [activeBank, setActiveBank] = useState("HDFC Bank");
  const [banks, setBanks] = useState("Name on card");
  const [banksList, setBanksList] = useState(["HDFC", "ICICI"]);
  const [otpdata, setOtpdata] = useState([]);
  const [errOtp, setErrorOtp] = useState(false);
  const [pinCode, setPinCode] = useState([]);
  const [visible, setVisible] = useState(false);
  const [pinCodeError, setPinCodeError] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [isAgree, setIsAgree] = useState(true);
  const [screensStepper, setScreenStepper] = useState(0);
  const [time, setTime] = useState(60);
  const [resendOtp, setResendOtp] = useState(false);

  const handlePincodeChange = () => {
    setVisible(true);
  };

  const getPinCodes = async () => {
    let url = BS_BASE_URL + BS_COMMON.pinCodeVerify;
    await axios
      .post(
        url,
        {
          pin_code: userInfo?.pin_code,
        },
        { headers: headers }
      )
      .then((response) => {
        if (response?.data?.data?.pincode_data?.pincodes?.length <= 0) {
          setPinCode([]);
          setCity("");
          setVisible(false);
          setPinCodeError(true);
        } else {
          setCity(response?.data?.data?.pincode_data?.cities?.[0]);
          setPinCodeError(false);
          setPinCode(response.data.data.pincode_data?.pincodes);
        }
      })
      .catch((error) => {
        console.error(error);
        setPinCode([]);
        setCity("");
      });
  };

  const handleChange = () => {};

  const handleOtpChange = (e) => {
    const valueotp = e;
    const extractedOtp = valueotp?.replace(/\D/g, "");
    setOtpdata(extractedOtp);
    // if (extractedOtp?.length === 6) {
    //   // call VALIDATE OTP API
    //   validateOtpCall(extractedOtp);
    //   setErrorOtp(false);
    // } else setErrorOtp(true);
  };
  const handleOTPSubmit = () => {
    setScreenStepper(3);
  };

  const getOtpComp = () => {
    return (
      <div className="lg:mt-[6rem] flex flex-col items-center justify-center w-[420px] max-sm:w-auto max-sm:px-[32px] mx-auto md:mt-[40px]">
        <div className="flex items-center flex-col m:mt-0">
          <div className=" text-center text-neutral-800 text-2xl font-medium font-['Poppins']">
            OTP Sent!
          </div>
          <p className=" py-1 text-[15px] max-[479px]:text-[13px] text-[#212529] max-[479px]:text-center pt-[10px]">
            {consentMessages?.aadharOtp}
          </p>
        </div>
        <form>
          <div className="flex my-[30px] justify-center ">
            <div className="space-x-2 otp-data-box">
              <OTPInput
                value={otpdata}
                inputType="tel"
                onChange={(e) => handleOtpChange(e)}
                numInputs={6}
                autocomplete="one-time-code"
                name="otp"
                renderInput={(props) => (
                  <input {...props} className="text-[#212529]" />
                )}
              />
              {errOtp && (
                <p className="text-[12px] text-[#FF000F] font-no mt-2">
                  {errorMessages?.otpValidError}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="font-normal max-[479px]:text-center text-[#212529]">
              Resend OTP in 00:{time} Sec
            </p>
            <div className=" text-center">
              {resendOtp ? (
                <CommonNextButton
                  title="Resend"
                  // handleSubmit={LoginOtp}
                  handleSubmit={handleOTPSubmit}
                />
              ) : (
                <CommonNextButton
                  title="Verify"
                  // disable={otpdata.length < 4 || isLoadingOtp}
                  handleSubmit={handleOTPSubmit}
                />
              )}
            </div>
          </div>
        </form>
      </div>
    );
  };
  useEffect(() => {
    if (userInfo?.pin_code?.length === 6) {
      getPinCodes();
    }
  }, [userInfo?.pin_code?.length]);

  return (
    <>
      {screensStepper === 0 && (
        <div className="container mx-auto md:px-12 px-4 flex flex-col items-center justify-center mt-20">
          <div className="mt-10 bg-white lg:w-[40rem] px-[40px] h-auto p-[20px] !rounded-xl shadow-md flex items-center flex-col">
            <div className="flex flex-row !justify-between gap-4 lg:gap-40 items-center">
              <div className="text-neutral-700 text-base font-medium font-['Poppins'] leading-snug">
                Additional Details
              </div>
              <div className="text-emerald-400 text-base font-medium font-['Poppins'] leading-snug">
                Edit
              </div>
            </div>
            <div className="flex flex-col items-start justify-center mt-4 w-full">
              <CommonInputLabel labelTitle={staticLabels?.nameOnCard} />
              <div className="dropdown mt-[5px] shadow rounded-lg w-full text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline border-[#C2CACF]">
                <DropdownList
                  value={banks}
                  onChange={(nextValue) => setBanks(nextValue)}
                  data={banksList}
                />
              </div>
            </div>
            <div className="text-zinc-950 text-xs font-normal font-['Poppins'] mt-[19px]">
              limit exceed 19 Character
            </div>
            <div className="mt-[19px] flex flex-row items-center justify-center gap-x-[10px]">
              <Image
                src="/assets/line.svg"
                width={63}
                height={1}
                alt="border"
              />
              <div className="text-zinc-950 text-[15px] font-normal font-['Poppins']">
                Office Info
              </div>
              <Image
                src="/assets/line.svg"
                width={63}
                height={1}
                alt="border"
              />
            </div>
            <div className="w-full mt-[19px]">
              <CommonInputLabel labelTitle={staticLabels?.officeAddress} />
              <input
                id="officeAddress"
                name="officeAddress"
                type="text"
                required
                placeholder="officeAddress"
                className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] 
              `}
                onChange={(e) => () => {}}
                value={""}
                maxLength={20}
              />
            </div>
            <div className="mt-[1px] w-full grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="mt-[20px] ">
                <CommonInputLabel labelTitle={staticLabels?.address1} />
                <input
                  id="address1"
                  name="address1"
                  type="text"
                  required
                  placeholder="Enter your address #1"
                  className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]`}
                  onChange={(e) => () => {}}
                  value={""}
                  maxLength={20}
                />
              </div>
              <div className="mt-[20px] ">
                <CommonInputLabel labelTitle={staticLabels?.address2} />
                <input
                  id="address2"
                  name="address2"
                  type="text"
                  required
                  placeholder="Enter your address #2"
                  className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]`}
                  onChange={(e) => () => {}}
                  value={""}
                  maxLength={20}
                />
              </div>
            </div>
            <div className="mt-[19px] w-full grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="">
                <CommonInputLabel labelTitle={staticLabels?.address3} />
                <input
                  id="address2"
                  name="address2"
                  type="text"
                  required
                  placeholder="Enter your address #3"
                  className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]`}
                  onChange={(e) => () => {}}
                  value={""}
                  maxLength={20}
                />
              </div>
              <div className="relative ">
                <PincodeInput
                  value={pinCode}
                  getData={getPinCodes}
                  handleChange={handleChange}
                  handlePincodeChange={handlePincodeChange}
                />
                {visible && (
                  <ul
                    className="suggestions pin-suggestion top-[100%]"
                    ref={wrapperRef}
                  >
                    {pinCode?.map((i, v) => (
                      <li
                        className={""}
                        key={v}
                        onClick={() => {
                          setUserInfo({ ...userInfo, pin_code: i });
                          setVisible(!visible);
                        }}
                      >
                        {i}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="mt-[19px] w-full grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="flex flex-col">
                <CommonInputLabel labelTitle={staticLabels?.city} />
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  placeholder="bangalore"
                  className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight text-[12px] focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] 
              `}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      city: e?.target?.value,
                    })
                  }
                  value={userInfo?.city}
                  maxLength={20}
                />
              </div>
              <div className="flex flex-col">
                <CommonInputLabel labelTitle={staticLabels?.state} />
                <input
                  id="state"
                  name="state"
                  type="text"
                  required
                  placeholder="bangalore"
                  className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight text-[12px] focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] 
              `}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      state: e?.target?.value,
                    })
                  }
                  value={userInfo?.state}
                  maxLength={20}
                />
              </div>
            </div>
            <div className="mt-[19px]">
              <CommonCheckAgree
                isAgree={isAgree}
                setIsAgree={setIsAgree}
                message={consentMessages?.applicationAgree}
              />
            </div>
            <div className="">
              <CommonNextButton
                title="Continue to KYC"
                width="md:w-[26rem] w-full max-[320px]:w-[280px] max-sm:w-[343px]"
                handleSubmit={() => setScreenStepper(1)}
              />
            </div>
          </div>
        </div>
      )}
      {screensStepper === 1 && (
        <KycCommonScreen
          data={{ heading: "START YOUR Digital-KYC", list: ekycList }}
          handleSubmit={() => setScreenStepper(2)}
        />
      )}
      {screensStepper === 2 && getOtpComp()}
      {screensStepper === 3 && <LoginOptions />}
    </>
  );
};

export default ApplicationForm;
