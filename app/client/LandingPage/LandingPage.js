"use client";
import React, { useEffect, useState } from "react";
import MobileInput from "../Common/CommonInputComponents/MobileInput";
import PanInput from "../Common/CommonInputComponents/PanInput";
import OTPInput from "react-otp-input";
import { consentMessages } from "@/commonUtils/StaticContent/consentMessages";
import {
  apiMessages,
  errorMessages,
  responses,
} from "@/commonUtils/StaticContent/errorMessages";
import CommonNextButton from "../Common/Button/Button";
import ThankYouModal from "../Common/Modal/ThankYouModal";
import thumbsUp from "../../../public/assets/thumbs-up.svg";
import NewFormsIcons from "../Common/NewFormsIcons/NewFormsIcons";
import PersonalForm from "./PersonalForm/PersonalForm";
import AddressForm from "./AddressForm/AddressForm";
import EmploymentInfoForm from "./EmploymentInfoForm/EmploymentInfoForm";
import ItrDetailsForm from "./ItrDetailsForm/ItrDetailsForm";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";
import {
  getCookieValue,
  getName,
  removeNonAlphaNumeric,
} from "@/commonUtils/util";
import {
  BASE_URL,
  INTERNAL_INITIATE_API,
  USERINFO,
} from "@/commonUtils/ApiEndPoints/ApiEndPoints";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../Common/Loader/Loader";
import QuestionModal from "../Common/Modal/QuestionModal";
import HdfcCheckAgree from "../Common/HdfcCheckAgree/HdfcCheckAgree";
import InfoModal from "../Common/Modal/InfoModal";
import IncomeVerification from "../IncomeVerification/IncomeVerification";
import EVerifyIncome from "../EVerifyIncome/EVerifyIncome";
import { DeviceUUID } from 'device-uuid';
import { useRouter } from "next/navigation";
import moment from "moment";
import { DatePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import CommonDatepicker from "@/app/CommonDatepicker";
import dayjs from 'dayjs';

export const ErrorComponent = ({ errorTitle }) => {
  return <p className="text-[12px] text-[#FF000F] font-no">{errorTitle}</p>;
};

const LandingPage = ({ ipAddress }) => {
  const [otpdata, setOtpdata] = useState([]);
  const [errOtp, setErrorOtp] = useState(false);
  const [mobile, setMobile] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [middleNameError, setMiddleNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [termsModal, setTermsModal] = useState(false);
  const [checkAgree, setCheckAgree] = useState(true);
  const [userInputData, setUserInputData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    aadharAddress: "Yes",
    occupationType: "Salaried",
    date_of_birth: null

  });
console.log("userInputData", userInputData);
  const date = userInputData?.date_of_birth;
  const dob = date ? moment(date).format("DD-MM-YYYY") : "";
  const [time, setTime] = useState(60);
  const [resendOtp, setResendOtp] = useState(false);
  const [loginStepper, setLoginStepper] = useState(0);
  const [detailsFormStepper, setDetailsFormStepper] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [showPanNotMatchModal, setShowPanNotMatchModal] = useState(false);
  const [etbCustomerData, setEtbCustomerData] = useState([]);
  const [epfNumber, setEpfNumber] = useState(null);
  const [applicationRefNo, setApplicationRefNo] = useState(null);
  const [panData, setPanData] = useState([]);
  const [showCongratScreen, setShowCongratsScreen] = useState(false);
  const [rejectionScreen, setRejectionScreen] = useState(false);
  const router = useRouter();
  const [startDate, setStartDate] = useState(null);
  const [additionalDetailsStepper, setAdditionalDetailsStepper] =
    useState(1000);
  const [additionalAgree, setAdditionalAgree] = useState(true);

  var du = new DeviceUUID().parse();
  var dua = [
    du.language,
    du.platform,
    du.os,
    du.cpuCores,
    du.isAuthoritative,
    du.silkAccelerated,
    du.isKindleFire,
    du.isDesktop,
    du.isMobile,
    du.isTablet,
    du.isWindows,
    du.isLinux,
    du.isLinux64,
    du.isMac,
    du.isiPad,
    du.isiPhone,
    du.isiPod,
    du.isSmartTV,
    du.pixelDepth,
    du.isTouchScreen
  ];
  var uuid = du.hashMD5(dua.join(':'));


  const deviceId = getCookieValue("deviceId");

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  // const date_obj = new Date();

  // const formatted_date_of_birth = `${date_obj.getDate()}/${date_obj.getMonth() + 1}/${date_obj.getFullYear()}`;

  // function formatDate(dateString) {
  //   const parts = dateString.split('-');
  //   const formattedDate = `${parts[0]}/${parts[1]}/${parts[2]}`;
  //   return formattedDate;
  // }
  // const dateOfBirth = "02-04-2024";
  // // const formattedDateOfBirth = formatDate(dateOfBirth);
  // const handleDateChange = (date) => {
  //   const dateConvert = moment(date).format("DD-MM-YYYY");
  //   if (dateConvert) {
  //     const isValid = dateFormatRegex.test(dateConvert);
  //     if (isValid) {
  //       setStartDate(date);
  //       setUserInputData({ ...userInputData, dob: date });
  //     }
  //   }
  // };
  const formatDate = (date) => {
    return date ? dayjs(date).format("DD-MM-YYYY") : "";
  };
  
  const handleDateChange = (event) => {
    const dayjsDate = dayjs(event.$d);
    setUserInputData({
      ...userInputData,
      date_of_birth: dayjsDate.isValid() ? dayjsDate : "",
    });
  };

  const formattedDateOfBirth = userInputData?.date_of_birth
    ? new Date(userInputData?.date_of_birth).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    : "";

  const initiateInternalApiCall = async () => {
    setShowLoader(true);
    const name = getName(userInputData);
    const params = {
      pan_no: userInputData?.pan_no?.toUpperCase(),
      full_name: name,
      mobile_no: String(userInputData?.mobile),
      device_id: uuid,
      date_of_birth: formattedDateOfBirth
    };
    await axios
      .post(BASE_URL + INTERNAL_INITIATE_API.initiate, params, {
        headers: headers,
      })
      .then((response) => {
        setPanData(response?.data?.data);
        localStorage.setItem("userPanData", JSON.stringify(response?.data?.data))
        setShowLoader(false);
        // CHECK ON the basis of responses
        if (response?.data?.data?.OTPSEND == true) {
          toast.success(response?.data?.message);
          setTime(60);
          setLoginStepper(1);
        }
        // toast.error(response?.data?.message);
        if (response?.data?.message === "failed")
          toast.error(response?.data?.message);
        if (response?.data?.data?.message === responses?.nameMatchFail) {
          setShowPanNotMatchModal(true);
        }
      })
      .catch((error) => {
        console.log("error log IN COMMON INITIATE API", error);
        setShowLoader(false);
        toast.error(response?.data?.message);
      });
  };
  // ------------------------------------------ GENERATE OTP CALL ----------------------------------//
  const generateOtpCall = async () => {
    setLoginStepper(1);
    const params = {
      pan_no: userInputData?.pan_no?.toUpperCase(),
      mobile_no: String(userInputData?.mobile),
      device_id: deviceId,
      existing_customer: "No", // by default to send No
    };
    setShowLoader(true);
    await axios
      .post(BASE_URL + USERINFO?.otpGeneration, params)
      .then((response) => {
        setShowLoader(false);
        if (
          response?.data?.data?.ERROR_MSG === "SUCCESS" &&
          response?.data?.data?.ERROR_CODE === "00000"
        ) {
          toast.success(apiMessages?.otpsentsuccessfully);
        } else {
          toast.error(apiMessages?.internalServerError);
        }
      })
      .catch((error) => {
        console.log("error log IN OTP GENERATION", error);
        setShowLoader(false);
        toast.error(apiMessages?.internalServerError);
        // add other condition
      });
  };

  // -------------------------------------- EXECUTE DEDUPE API CALL -------------------------------//
  const callExecuteDedupeApi = async () => {
    const params = {
      pan_no: userInputData?.pan_no?.toUpperCase(),
      mobile_no: String(userInputData?.mobile),
      device_id: uuid,
    };
    setShowLoader(true);
    await axios
      .post(BASE_URL + USERINFO?.executeDedupe, params)
      .then((response) => {
        setShowLoader(false);
        if (
          response?.data?.data?.executeDedupeRequestResponse
            ?.executeDedupeRequestReturn?.SOA_STATUS === "N"
        ) {
          // User has not applied so call generate otp api call
          // call GENERATE OTP API
          initiateInternalApiCall();
          // generateOtpCall();
        } else {
          // user has already applied -- show thank you screen
          setLoginStepper(2);
        }
      })
      .catch((error) => {
        console.log("error log IN EXECUTE DEDUPE API", error);
        setShowLoader(false);
        toast.error(response?.data?.message);
        // add other condition
      });
  };

  // -------------------------------------- VALIDATE OTP API CALL -------------------------------//
  const validateOtpCall = async (otp) => {
    const params = {
      pan_no: String(userInputData?.pan_no?.toUpperCase()),
      mobile_no: String(userInputData?.mobile),
      device_id: uuid,
      otp: otp,
      offer_available: "N",
      existing_customer: "N",
    };
    setShowLoader(true);
    await axios
      .post(BASE_URL + USERINFO?.otpValidation, params)
      .then((response) => {
        console.log(
          "customer",
          response?.data?.data?.FintechDemographicDetailsResponse
        );
        const etbRes =
          response?.data?.data?.FintechDemographicDetailsResponse
            ?.FintechDemographicDetails?.[0]?.CIFResponse;
        setEtbCustomerData(etbRes);
        console.log(etbRes, "responseresponseresponseresponse");
        if (typeof window !== "undefined") {
          if (etbRes)
            localStorage.setItem("etbCustomerData", JSON.stringify(etbRes));
          localStorage.setItem("customerData", JSON.stringify(userInputData));
          localStorage.setItem("token", response?.data?.data?.token);
        }
        setShowLoader(false);
        setTime(0);
        toast.success(response?.data?.message);
        if (
          response?.data?.data?.FintechDemographicDetailsResponse
            ?.CIF_RespDesc === "No Data Found"
        ) {
          setLoginStepper(2);
          // Then NTB  Journey will start
        } else {
          setLoginStepper(2);
          // ETB flow will start
        }
      })
      .catch((error) => {
        console.log("error log IN OTP VALIDATION", error);
        setShowLoader(false);
        toast.error(apiMessages?.internalServerError);
        // add other condition
      });
  };

  // *************  OTP CHANGE FUNCTION ************* //
  const handleOtpChange = (e) => {
    const valueotp = e;
    const extractedOtp = valueotp?.replace(/\D/g, "");
    setOtpdata(extractedOtp);
    if (extractedOtp?.length === 6) {
      // call VALIDATE OTP API
      validateOtpCall(extractedOtp);
      setErrorOtp(false);
    } else setErrorOtp(true);
  };

  // OTP PAGE
  const getOtpPage = () => {
    return (
      <div className="flex flex-col items-center justify-center w-[420px] max-sm:w-auto max-sm:px-[32px] mx-auto md:mt-[40px] mt-20">
        <div className="flex items-center flex-col m:mt-0">
          <div className=" text-center text-neutral-800 text-2xl font-medium font-['Poppins']">
            OTP Sent!
          </div>
          <p className=" py-1 text-[15px] max-[479px]:text-[13px] text-[#212529] max-[479px]:text-center pt-[10px] text-center">
            {consentMessages?.hdfcOtpEnterText}
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
  const formatDates = (date,event) => {
 console.log(event,"eventevent");
    if (!date || !(date instanceof Date)) return ''; // Check if date is provided and is a valid Date object
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  // Format the date of birth
  const formattedDateOfBirths = formatDates(userInputData?.date_of_birth);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  //   MOBILE PAGE -------------------- LANDING PAGE FORM
  const renderMainForm = () => {
    const handleSendOtp = () => {
      // FIRST CALL THE EXECUTE DEDUPE API
      callExecuteDedupeApi();
    };
    const disable =
      !userInputData?.firstName ||
      !userInputData?.lastName ||
      !userInputData?.mobile ||
      userInputData?.mobile?.length !== 10 ||
      !userInputData?.pan_no ||
      userInputData?.pan_no?.length !== 10
      // !userInputData?.date_of_birth;
      !formattedDateOfBirths;
    return (
      <>
        <div className="text-center text-neutral-800 text-[13px] font-semibold font-['Poppins'] leading-[20.80px] max-sm:mt-[10px]">
          Hey, Please enter your details to login
        </div>
        <div className="mt-[20px] max-sm:mt-[15px] w-[50vw] sm:w-full mb-[200px] max-sm:w-full">
          <form method="post" id="hdfcyForm" action="/" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-[20px]">
              <div className="mt-0">
                <label
                  className="text-[13px] font-normal text-[#212529] "
                  htmlFor="First name"
                >
                  {staticLabels?.firstName}
                </label>
                <div
                  className={
                    firstNameError
                      ? "flex items-center gap-[18px] py-[14px] px-4 text-[#212529] text-[12px] leading-tight  shadow h-[48px] bg-white rounded-lg border-[#FF000F]"
                      : "flex items-center gap-[18px] py-[14px] px-4 text-[#212529] text-[12px] leading-tight border-[#C2CACF] shadow h-[48px] bg-white rounded-lg border"
                  }
                >
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    required
                    pattern="[A-Za-z]+"
                    onInput={(e) => {
                      e.target.value = removeNonAlphaNumeric(e);
                    }}
                    className="text-[#212529] border-none  outline-none "
                    placeholder="First Name"
                    onChange={(e) => {
                      setUserInputData({
                        ...userInputData,
                        firstName: e?.target?.value,
                      });
                    }}
                    value={userInputData?.firstName}
                    maxLength={20}
                  />
                </div>
                {firstNameError && (
                  <ErrorComponent errorTitle="This Field is required" />
                )}
              </div>
              <div className="mt-0">
                <label
                  className="text-[13px] font-normal text-[#212529] "
                  htmlFor="Middle name"
                >
                  {staticLabels?.middleName}
                </label>
                <div
                  className={
                    middleNameError
                      ? "flex items-center gap-[18px] py-[14px] px-4 text-[#212529] text-[12px] leading-tight  shadow h-[48px] bg-white rounded-lg border-[#FF000F]"
                      : "flex items-center gap-[18px] py-[14px] px-4 text-[#212529] text-[12px] leading-tight border-[#C2CACF] shadow h-[48px] bg-white rounded-lg border"
                  }
                >
                  <input
                    id="middle_name"
                    name="middle_name"
                    type="text"
                    className="text-[#212529] border-none  outline-none "
                    placeholder="Middle Name"
                    pattern="[A-Za-z]+"
                    onInput={(e) => {
                      e.target.value = removeNonAlphaNumeric(e);
                    }}
                    onChange={(e) =>
                      setUserInputData({
                        ...userInputData,
                        middleName: e?.target?.value,
                      })
                    }
                    value={userInputData?.middleName}
                    maxLength={20}
                  />
                </div>
                {middleNameError && (
                  <ErrorComponent errorTitle="This Field is required" />
                )}
              </div>
              <div className="mt-0">
                <label
                  className="text-[13px] font-normal text-[#212529] "
                  htmlFor="First name"
                >
                  {staticLabels?.lastName}
                </label>
                <div
                  className={
                    lastNameError
                      ? "flex items-center gap-[18px] py-[14px] px-4 text-[#212529] text-[12px] leading-tight  shadow h-[48px] bg-white rounded-lg border-[#FF000F]"
                      : "flex items-center gap-[18px] py-[14px] px-4 text-[#212529] text-[12px] leading-tight border-[#C2CACF] shadow h-[48px] bg-white rounded-lg border"
                  }
                >
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    required
                    className="text-[#212529] border-none  outline-none "
                    placeholder="Last Name"
                    pattern="[A-Za-z]+"
                    onInput={(e) => {
                      e.target.value = removeNonAlphaNumeric(e);
                    }}
                    onChange={(e) =>
                      setUserInputData({
                        ...userInputData,
                        lastName: e?.target?.value,
                      })
                    }
                    value={userInputData?.lastName}
                    maxLength={20}
                  />
                </div>
                {lastNameError && (
                  <ErrorComponent errorTitle="This Field is required" />
                )}
              </div>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-[20px]">
              <div className="mt-[20px] max-sm:mt-[20px]">
                <MobileInput
                  mobile={mobile}
                  setMobile={setMobile}
                  setUserInputData={setUserInputData}
                  userInputData={userInputData}
                />
              </div>
              <div className="mt-[20px] max-sm:mt-[0px] max-sm:mb-[30px]">
                <PanInput
                  setUserInputData={setUserInputData}
                  userInputData={userInputData}
                  loginStepper={loginStepper}
                />
              </div>
              <div className="datepicker">
                {/* <label
                  className="text-[13px] font-normal text-[#212529] "
                  htmlFor="date"
                >
                  {staticLabels?.dob}
                </label> */}
                <div className="">
            

                  {/* <TextField
                    id="dob"
                    // label="dob"
                    variant="outlined"
                    // fullWidth
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: userInputData?.date_of_birth,
                    }}
                    className={`shadow rounded-lg w-full py-[14px] px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline ${userInputData?.date_of_birth
                      ? ""
                      : "bg-white text-[#212529]"
                      } bg-white `}
                    value={userInputData?.date_of_birth || ""}
                    onChange={(date) => {
                      handleDateChange(date);
                    }}
                  /> */}
                </div>
              </div>
            </div>
            <CommonDatepicker variant="outlined"  value={userInputData?.date_of_birth}  onChange={handleDateChange} className={`shadow rounded-lg w-full py-[14px] px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline ${userInputData?.date_of_birth
              ? ""
              : "bg-white text-[#212529]"
              } bg-white `} />

            <div className="text-black text-[13px] font-semibold font-['Faktum'] leading-[24px] mb-[18px] md:mt-[20px]">
              I provide my express consent to HDFC Bank Limited ("Bank") and
              BankSathi for collecting, disclosing, sharing, displaying and
              transferring my personal, demographic information for my credit
              card application. I authorize the Bank to approach me for
              providing information/services/ marketing offers and I am aware
              that this consent marketin overrides any registration for
              DNC/NDNC. override
            </div>
            <div className="mt-[24px] max-sm:mt-0">
              <HdfcCheckAgree
                checkAgree={checkAgree}
                setCheckAgree={setCheckAgree}
                setTermsModal={setTermsModal}
              />
            </div>
            <div className="mt-[20px] max-sm:mt-[30px]">
              <button
                disabled={disable}
                onClick={handleSendOtp}
                type="submit"
                className={`head-text cursor-pointer font-[faktum] w-[200px] max-sm:w-[160px] rounded-lg text-center ${disable ? "bg-[#E6ECF1]" : "bg-[#49D49D]"
                  } !text-[#212529] px-[24px] py-[14.5px] max-sm:py-[12px] text-[15px] mx-auto flex items-center justify-center md:text-[12px]`}
              >
                Send OTP
              </button>
            </div>
          </form >
        </div >
      </>
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
  const handleOTPSubmit = () => {
    // what to do when otp is validated will come here
    setLoginStepper(2);
  };

  const handleYes = () => {
    setShowPanNotMatchModal(false);
    setUserInputData({
      ...userInputData,
      firstName: "",
      middleName: "",
      lastName: "",
    });
  };
  const handleNo = () => {
    setShowPanNotMatchModal(false);
    setUserInputData({});
  };

  const handleClick = (e) => {
    e.preventDefault()
    router.push("/IncomeVerification")
  }
  // const additionalInfo = () => {
  //   return (
  //     <div className="px-4 flex flex-col items-center justify-center mt-10 md:mt-20">
  //       <div className="text-neutral-800 text-2xl font-semibold font-['Faktum'] leading-[28.80px]">
  //         We need additional details to provide you an offer
  //       </div>
  //       <div className="flex items-center mt-[24px] max-sm:mt-[30px] gap-2">
  //         <input
  //           className="mr-1 w-4 h-4  max-sm:w-8 max-sm:h-8 text-white accent-[#49D49D] "
  //           type="checkbox"
  //           checked={additionalAgree}
  //           required
  //           onChange={(e) => setAdditionalAgree(e.target?.checked)}
  //         />
  //         <p className="text-[15px] text-[#212529] font-normal max-[479px]:text-[14px] max-[375px]:text-[13px]">
  //           {consentMessages?.additionalAgree}
  //         </p>
  //       </div>
  //       <div className="mt-[30px] max-sm:mb-4 text-left w-full md:w-[443px]">
  //         <button
  //           type="submit"
  //           onClick={handleClick}
  //           // onClick={() => setAdditionalDetailsStepper(1)}
  //           className={`w-full text-[15px]items-center cursor-pointer font-semibold font-['Faktum'] leading-normal text-neutral-800 max-[280px]:text-[15px] max-[771px]:text-[16px] px-5 py-[15px]  bg-[#49D49D] rounded-lg max-[771px]:px-3 `}
  //         >
  //           Continue
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  useEffect(() => {
    if (loginStepper === 1) {
      if (time === 0) {
        setResendOtp(true);
      }
      if (time > 0) {
        const timer = setTimeout(() => {
          setTime(time - 1);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [time, loginStepper]);

  useEffect(() => {
    if (localStorage.getItem("etbCustomerData"))
      localStorage.removeItem("etbCustomerData");
    if (localStorage.getItem("customerData"))
      localStorage.removeItem("customerData");
    if (localStorage.getItem("token")) localStorage.removeItem("token");
  }, []);

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center h-full max-sm:w-full max-sm:px-[20px] container mx-auto w-full md:px-20 lg:px-14 ${loginStepper >= 2 ? "" : "md:mt-14"
          }`}
      >
        {showLoader && <Loader />}
        {showPanNotMatchModal && (
          <QuestionModal
            handleYes={handleYes}
            handleNo={handleNo}
            question="Entered Name doest not match with your Original PanCard Name"
            noText="No"
            yesText="Yes"
            message="Please Enter Correct Name."
          />
        )}
        {loginStepper === 0 && renderMainForm()}
        {loginStepper === 1 && getOtpPage()}
        {loginStepper === 3 && (
          <ThankYouModal
            title="Thank you!"
            subTitle="You have already applied for
       HDFC Credit Card"
            image={thumbsUp}
            buttonText="Okay"
            handleButtonClick={() => setLoginStepper(4)}
          />
        )}
        {loginStepper === 2 && (
          <div className="lg:w-[52vw] w-auto mx-auto h-auto bg-white rounded-[14px] shadow-sm max-[576px]:shadow-none mt-[60px] max-sm:mt-[20px] pt-[40px] px-[60px] pb-[40px] max-[1024px]:px-[50px] max-[834px]:p-[30px] max-[479px]:py-[20px] max-sm:px-[20px]">
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
                      loginStepper={loginStepper}
                      setUserInputData={setUserInputData}
                      handleChange={handleChange}
                      detailsFormStepper={detailsFormStepper}
                      setDetailsFormStepper={setDetailsFormStepper}
                      etbCustomerData={etbCustomerData}
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
                      etbCustomerData={etbCustomerData}
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
                      etbCustomerData={etbCustomerData}
                      setDetailsFormStepper={setDetailsFormStepper}
                      deviceId={uuid}
                      ipAddress={ipAddress}
                      setShowLoader={setShowLoader}
                      setEpfNumber={setEpfNumber}
                      setApplicationRefNo={setApplicationRefNo}
                      setRejectionScreen={setRejectionScreen}
                      setShowCongratsScreen={setShowCongratsScreen}
                      setLoginStepper={setLoginStepper}
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
      <div className="px-2">
        {(showCongratScreen || rejectionScreen) && (
          <>
          {/* additionalInfo() */}
          <InfoModal
            data={{
              title1: showCongratScreen
                ? "Congratulations Ameet!"
                : "Sorry Your Application Got Rejected",
              title2: showCongratScreen
                ? "Your credit card application is in process"
                : "",
              imageSrc: showCongratScreen
                ? "/assets/green-tick.svg"
                : "/assets/rejection-badge.svg",
              applicationRefNo: showCongratScreen
                ? "24A25D27654030W1"
                : "24A25D27654030W1",
              height: showCongratScreen ? 64 : 73,
              width: showCongratScreen ? 80 : 73,
              date: showCongratScreen ? "12-02-2024" : "12-02-2024",
              buttonTitle: "Thank You",
            }}
          />
          </>
        )}
      </div>
      {/* {additionalDetailsStepper === 0 && additionalInfo()} */}
      {/* {additionalDetailsStepper === 0 && additionalInfo()} */}
      {/* {additionalDetailsStepper === 1 && (
        <IncomeVerification
          setAdditionalDetailsStepper={setAdditionalDetailsStepper}
        />
      )}
      {additionalDetailsStepper === 2 && (
        <EVerifyIncome
          setAdditionalDetailsStepper={setAdditionalDetailsStepper}
          additionalDetailsStepper={additionalDetailsStepper}
        />
      )} */}
    </>
  );
};

export default LandingPage;
