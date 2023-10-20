import Image from "next/image";
import React, { useEffect, useState } from "react";
import banksathiLogo from "../../../public/assets/logo.svg";
import CheckAgree from "../Common/CheckAgree/CheckAgree";
import MobileInput from "../Common/CommonInputComponents/MobileInput";
import PanInput from "../Common/CommonInputComponents/PanInput";
import Link from "next/link";
import OTPInput from "react-otp-input";
import { consentMessages } from "@/commonUtils/StaticContent/consentMessages";
import { errorMessages } from "@/commonUtils/StaticContent/errorMessages";
import CommonNextButton from "../Common/Button/Button";
import ThankYouModal from "../Common/Modal/ThankYouModal";
import thumbsUp from "../../../public/assets/thumbs-up.svg";
import NewFormsIcons from "../Common/NewFormsIcons/NewFormsIcons";
import PersonalForm from "./PersonalForm/PersonalForm";
import AddressForm from "./AddressForm/AddressForm";
import EmploymentInfoForm from "./EmploymentInfoForm/EmploymentInfoForm";
import ItrDetailsForm from "./ItrDetailsForm/ItrDetailsForm";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";

export const ErrorComponent = ({ errorTitle }) => {
  return <p className="text-[12px] text-[#FF000F] font-no">{errorTitle}</p>;
};

const LandingPage = () => {
  const [otpdata, setOtpdata] = useState([]);
  const [errMsg, setErrorMsg] = useState(false);
  const [errOtp, setErrorOtp] = useState(false);
  const [mobile, setMobile] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [transactionid, setTransactionId] = useState([]);
  const [otpmessage, setotpMessage] = useState([]);
  const [messagetype, setMessageType] = useState([]);
  const [istempotp, setTempOtp] = useState([]);
  const [tokentype, setTokenType] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isLoadingOtp, setLoadingOtp] = useState(false);
  const [termsModal, setTermsModal] = useState(false);
  const [checkAgree, setCheckAgree] = useState(true);
  const [userInputData, setUserInputData] = useState({});
  const [firstNameError, setFirstNameError] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [time, setTime] = useState(60);
  const [IstimeActive, setIsTimeActive] = useState(true);
  const [resendOtp, setResendOtp] = useState(false);
  const [zeroNumberValidation, setZeroNumberValidation] = useState(false);
  const [loginStepper, setLoginStepper] = useState(0);
  const [detailsFormStepper, setDetailsFormStepper] = useState(0);

  //CONST
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const handleNumberEdit = () => {
    setLoginStepper(0);
  };

  // MOBILE PAGE
  const renderMainForm = () => {
    const handleSendOtp = () => setLoginStepper(1);
    return (
      <>
        <div className="mt-[30px]">
          <Image src={banksathiLogo} height={150} width={90} alt="logo" />
        </div>
        <div className="text-center text-neutral-800 text-2xl font-medium font-['Poppins']">
          Hello!
        </div>
        <div className="text-center text-neutral-800 text-[15px] font-normal font-['Poppins'] mt-[20px]">
          Hey, Please enter your details to login
        </div>
        <div className="mt-[30px] w-[620px] mb-[200px] max-sm:w-full">
          <form onSubmit={() => {}}>
            <div className="lg:grid lg:grid-cols-3 lg:gap-[20px]">
              <div className="mt-0">
                <label
                  className="text-[13px] font-normal text-[#212529] "
                  htmlFor="firstName"
                >
                  {staticLabels?.firstName}
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  placeholder="First Name"
                  className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 ${
                    firstNameError ? "border-red-500" : "border-neutral-300"
                  }`}
                  onChange={(e) =>
                    setUserInputData({
                      ...userInputData,
                      firstName: e?.target?.value,
                    })
                  }
                  value={userInputData?.firstName}
                  maxLength={20}
                />
                {firstNameError && (
                  <ErrorComponent errorTitle="This Field is required" />
                )}
              </div>
              <div className="max-[768px]:mt-[20px]">
                <label
                  className="text-[13px] font-normal text-[#212529] "
                  htmlFor="firstName"
                >
                  {staticLabels?.middleName}
                </label>
                <input
                  id="middleName"
                  name="middleName"
                  type="text"
                  required
                  placeholder="Middle Name"
                  className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 ${
                    firstNameError ? "border-red-500" : "border-neutral-300"
                  }`}
                  onChange={(e) =>
                    setUserInputData({
                      ...userInputData,
                      middleName: e?.target?.value,
                    })
                  }
                  value={userInputData?.middleName}
                  maxLength={20}
                />
                {firstNameError && (
                  <ErrorComponent errorTitle="This Field is required" />
                )}
              </div>
              <div className="max-[768px]:mt-[20px]">
                <label
                  className="text-[13px] font-normal text-[#212529] "
                  htmlFor="firstName"
                >
                  {staticLabels?.lastName}
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  placeholder="Last Name"
                  className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 ${
                    firstNameError ? "border-red-500" : "border-neutral-300"
                  }`}
                  onChange={(e) =>
                    setUserInputData({
                      ...userInputData,
                      firstName: e?.target?.value,
                    })
                  }
                  value={userInputData?.firstName}
                  maxLength={20}
                />
                {firstNameError && (
                  <ErrorComponent errorTitle="This Field is required" />
                )}
              </div>
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-[20px]">
              <div className="mt-[20px]">
                <MobileInput
                  mobile={mobile}
                  setMobile={setMobile}
                  setUserInputData={setUserInputData}
                  userInputData={userInputData}
                />
              </div>
              <div className="mt-[20px]">
                <PanInput
                  setUserInputData={setUserInputData}
                  userInputData={userInputData}
                  headers={headers}
                />
              </div>
            </div>
            <div className="mt-[24px]">
              <CheckAgree
                checkAgree={checkAgree}
                setCheckAgree={setCheckAgree}
                setTermsModal={setTermsModal}
              />
            </div>
            <div className="mt-[30px]">
              <button
                onClick={() => {
                  handleSendOtp();
                }}
                className="head-text font-[faktum] w-[200px] max-sm:w-[160px] rounded-lg text-center bg-[#49D49D] !text-[#212529] px-[24px] py-[18.5px] text-[15px] mx-auto flex items-center justify-center md:text-[12px]"
              >
                Send OTP
              </button>
            </div>
          </form>
        </div>
      </>
    );
  };

  const handleOTPSubmit = () => {
    setLoginStepper(2);
  };

  //OTP PAGE
  const getOtpPage = () => {
    return (
      <div className="flex flex-col items-center justify-center w-[420px] max-sm:w-auto max-sm:px-[32px] mx-auto mt-[40px] h-[100vh]">
        <div className="flex items-center flex-col m:mt-0">
          <div className=" text-center text-neutral-800 text-2xl font-medium font-['Poppins']">
            OTP Sent!
          </div>
          <p className=" py-1 text-[15px] max-[479px]:text-[13px] text-[#212529] max-[479px]:text-center pt-[10px]">
            {consentMessages?.otpEnter}
          </p>
          <div className="text-center">
            <span className=" py-1 text-[15px] max-[479px]:text-[13px] text-[#212529] ">
              +91 {mobile}
            </span>{" "}
            <button
              onClick={handleNumberEdit}
              className="text-[#49D49D] cursor-pointer ps-2 text-[15px] max-[479px]:text-[13px]"
            >
              Edit Number
            </button>
          </div>
        </div>
        <form>
          <div className="flex my-[30px] justify-center ">
            <div className="space-x-2 otp-data-box">
              <OTPInput
                value={otpdata}
                inputType="tel"
                onChange={(e) => handleOtpChange(e)}
                numInputs={4}
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
                  disable={otpdata.length < 4 || isLoadingOtp}
                  // handleSubmit={LoginOtp}
                />
              ) : (
                <CommonNextButton
                  title="Submit"
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

  // ------------------------------------------------------  FORMS  -------------------------------------------------- //
  const getFormTitle = () => {
    if (detailsFormStepper === 0) {
      return "Enter your Personal Details";
    }
    if (detailsFormStepper === 1) {
      return "Enter your Address Details";
    }
    if (detailsFormStepper === 2) {
      return "Enter your Employment Details";
    }
    if (detailsFormStepper === 5) {
      return "Provide your ITR Details";
    }
  };

  const handleChange = (event) => {
    setUserInputData({
      ...userInputData,
      [event?.target?.name]: event?.target?.value,
    });
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined" && loginStepper === 2) {
  //     document.body.style.overflow = "hidden";
  //   }
  // }, [loginStepper]);

  console.log(userInputData);

  return (
    <div className="flex flex-col items-center justify-center h-full max-sm:w-auto max-sm:px-[32px] mx-auto">
      {loginStepper === 0 && renderMainForm()}
      {loginStepper === 1 && getOtpPage()}
      {loginStepper === 2 && (
        <ThankYouModal
          title="Thank you!"
          subTitle="You have already applied for
       HDFC Credit Card"
          image={thumbsUp}
          buttonText="Okay"
          handleButtonClick={() => setLoginStepper(3)}
        />
      )}
      {loginStepper === 3 && (
        <div className="w-auto mx-auto h-auto bg-white rounded-[14px] shadow-sm max-[576px]:shadow-none mt-[60px] pt-[40px] px-[60px] pb-[40px] max-[1024px]:px-[50px] max-[834px]:p-[30px] max-[479px]:py-[20px] max-sm:px-[20px]">
          <div className="flex flex-col">
            <div className="text-center max-sm:pt-[20px]text-neutral-800 text-2xl font-medium font-['Poppins'] mb-[20px] max-sm:mb-0 max-sm:text-[18px]">
              {getFormTitle()}
            </div>
            {detailsFormStepper <= 4 && (
              <NewFormsIcons
                stepperData={{
                  firstTtitle: "Personal Info",
                  secondTitle: "Address Info",
                  thirdTitle: "Employment Info",
                  modalStepper: detailsFormStepper,
                }}
              />
            )}
            <>
              {detailsFormStepper === 0 && (
                <div className="mt-[30px]">
                  <PersonalForm
                    userInputData={userInputData}
                    setUserInputData={setUserInputData}
                    handleChange={handleChange}
                    detailsFormStepper={detailsFormStepper}
                    setDetailsFormStepper={setDetailsFormStepper}
                  />
                </div>
              )}
              {detailsFormStepper === 1 && (
                <div className="mt-[30px]">
                  <AddressForm
                    userInputData={userInputData}
                    setUserInputData={setUserInputData}
                    handleChange={handleChange}
                    detailsFormStepper={detailsFormStepper}
                    setDetailsFormStepper={setDetailsFormStepper}
                  />
                </div>
              )}
              {detailsFormStepper === 2 && (
                <div className="mt-[30px]">
                  <EmploymentInfoForm
                    userInputData={userInputData}
                    setUserInputData={setUserInputData}
                    handleChange={handleChange}
                    detailsFormStepper={detailsFormStepper}
                    setDetailsFormStepper={setDetailsFormStepper}
                  />
                </div>
              )}
              {detailsFormStepper === 4 && (
                <div className="mt-[30px]">
                  <ThankYouModal
                    title="Thank you!"
                    subTitle="Currently we don't have any suitable card for you!"
                    image={thumbsUp}
                    buttonText="Okay"
                    handleButtonClick={() => setDetailsFormStepper(5)}
                  />
                </div>
              )}
            </>
            {detailsFormStepper === 5 && (
              <div className="mt-[30px]">
                <ItrDetailsForm
                  userInputData={userInputData}
                  setUserInputData={setUserInputData}
                  handleChange={handleChange}
                  detailsFormStepper={detailsFormStepper}
                  setDetailsFormStepper={setDetailsFormStepper}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
