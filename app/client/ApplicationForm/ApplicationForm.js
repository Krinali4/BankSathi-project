"use client";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";
import React, { useEffect, useRef, useState } from "react";
import CommonInputLabel from "../Common/CommonInputComponents/CommonInputLabel";
import { DropdownList } from "react-widgets";
import Image from "next/image";
import PincodeInput from "../Common/CommonInputComponents/PinCodeInput";
import {
  BASE_URL,
  BS_BASE_URL,
  BS_COMMON,
  USERINFO,
} from "@/commonUtils/ApiEndPoints/ApiEndPoints";
import CommonCheckAgree from "../Common/CommonCheckAgree/CommonCheckAgree";
import { consentMessages } from "@/commonUtils/StaticContent/consentMessages";
import CommonNextButton from "../Common/Button/Button";
import KycCommonScreen from "../KycCommonScreen/KycCommonScreen";
import { ekycList } from "@/commonUtils/staticInfos";
import OTPInput from "react-otp-input";
import { errorMessages } from "@/commonUtils/StaticContent/errorMessages";
import FullName from "../Common/CommonInputComponents/FullName";
import {
  getCookieValue,
  getName,
  removeSpecialCharacters,
} from "@/commonUtils/util";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Common/Loader/Loader";
import VkyConsentScreen from "../VkyConsentScreen/VkyConsentScreen";
import LoginOptions from "../LoginOptions/LoginOptions";
import { useRouter } from "next/navigation";

const ApplicationForm = ({ ipAddress }) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  const wrapperRef = useRef(null);
  const deviceId = getCookieValue("deviceId");

  const [activeBank, setActiveBank] = useState("HDFC Bank");
  const [banks, setBanks] = useState("Name on card");
  const [banksList, setBanksList] = useState(["HDFC", "ICICI"]);
  const [otpdata, setOtpdata] = useState([]);
  const [errOtp, setErrorOtp] = useState(false);
  const [pinCode, setPinCode] = useState([]);
  const [visible, setVisible] = useState(false);
  const [pinCodeError, setPinCodeError] = useState(false);
  const [customerData, setCustomerData] = useState({});
  const [isAgree, setIsAgree] = useState(true);
  const [screensStepper, setScreenStepper] = useState(0);
  const [time, setTime] = useState(60);
  const [resendOtp, setResendOtp] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [stateCity, setStateCity] = useState({ city: null, state: null });
  const [etbCustomerData, setEtbCustomerData] = useState({});

  // CONSTANTS
  const address1 = customerData?.office_address_line_1;
  const address2 = customerData?.office_address_line_2;
  const address3 = customerData?.office_address_line_3;
  const state = customerData?.office_address_state || stateCity?.state;
  const city = customerData?.office_address_city || stateCity?.city;
  const pincode = customerData?.office_address_pincode;
console.log(customerData?.office_address_pincode,'customerData?.office_address_pincode')
  const buttonDisable =
    !address1 || !address2 || !address3 || !state || !city || !pinCode;

  const name = getName(customerData);

  const handlePincodeChange = () => {
    setVisible(true);
  };

  const getPinCodes = async () => {
    let url = BS_BASE_URL + BS_COMMON.pinCodeVerify;
    await axios
      .post(
        url,
        {
          pin_code:
            customerData?.pin_code || etbCustomerData?.V_D_CUST_ZIP_CODE,
        },
        { headers: headers }
      )
      .then((response) => {
        if (response?.data?.message == "success") {
          setStateCity({
            city: response?.data?.data?.pincode_data?.cities?.[0],
            state: response?.data?.data?.pincode_data?.states?.[0],
          });
          setPinCodeError(false);
          setPinCode(response.data.data.pincode_data?.pincodes);
        }
      })
      .catch((error) => {
        setPinCode([]);
      });
  };

  const handleChange = (event) => {
    setCustomerData({
      ...customerData,
      [event?.target?.name]: event?.target?.value,
    });
  };

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
  const handleOTPSubmit = () => setScreenStepper(3);

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

  const UserPan = JSON.parse(localStorage.getItem("customerData"));
   
  const formattedDateOfBirth = UserPan?.date_of_birth
  ? new Date(UserPan?.date_of_birth).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  : "";
  const router = useRouter()
  const newPincode = pincode !== undefined ? pincode.toString() : '';
  const handlSubmitClick = async () => {
    setShowLoader(true);
    // const UserPan = JSON.parse(localStorage.getItem("customerData"));
    console.log(UserPan,"UserPanUserPan");
    const params = {
      bank_account_number: String(etbCustomerData?.FW_ACCNT_NUM),
      adress_edit_flag: "N",
      customer_id: etbCustomerData?.CUSTOMER_ID || customerData?.customer_id || "",
      auth_mode: etbCustomerData?.CUSTOMER_ID ? "IDCOM" : "OTP",
      address_line_1:
        removeSpecialCharacters(etbCustomerData?.V_D_CUST_ADD1) ||
        customerData?.address1 || "",
      address_line_2:
        removeSpecialCharacters(etbCustomerData?.V_D_CUST_ADD2) ||
        customerData?.address2 || "",
      address_line_3:
        removeSpecialCharacters(etbCustomerData?.V_D_CUST_ADD3) ||
        customerData?.address3 || "",
      city: etbCustomerData?.V_D_CUST_CITY || customerData?.city || "",
      mobile_no: customerData?.mobile || UserPan?.mobile || "",
      dob: etbCustomerData?.D_D_CUST_DATE_OF_BIRTH  ||formattedDateOfBirth || "",
      name: name || "",
      ip: ipAddress || "",
      email: etbCustomerData?.V_D_CUST_EMAIL_ADD || customerData?.email || "",
      pincode: etbCustomerData?.V_D_CUST_ZIP_CODE || customerData?.pin_code || "",
      company_name: customerData?.companyName || "",
      pan_no: etbCustomerData?.V_D_CUST_IT_NBR || customerData?.pan_no ||UserPan?.pan_no|| "",
      device_id: deviceId,
      jwt_token: token || '',
      office_address_line_1: address1,
      office_address_line_2: address2,
      office_address_line_3: address3,
      office_address_city: city,
      office_address_state: state,
      office_address_pincode: newPincode,
      office_address_email: customerData?.office_email_address,
      pan_name_match_flag: "",
      pan_dob_match_flag: "",
      product_code:""
    };
    await axios
      .post(BASE_URL + USERINFO.executeInterface, params, {
        headers: headers,
      })
      .then((response) => {
        if(response?.status == 200) {
          toast.success(response?.data?.message)
          setShowLoader(false);
          // setScreenStepper(1);
          router.push("/kycMethodPage")
        }
        
      })
      .catch((error) => {
        setShowLoader(false);
        toast.error(response?.data?.message);
      });
  };

  useEffect(() => {
    if (customerData?.pin_code?.length === 6) {
      getPinCodes();
    }
  }, [customerData?.pin_code?.length]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const etb = localStorage.getItem("etbCustomerData")
        ? JSON.parse(localStorage.getItem("etbCustomerData"))
        : null;
      const user = localStorage.getItem("customerData")
        ? JSON.parse(localStorage.getItem("customerData"))
        : null;
      if (etb) setEtbCustomerData(etb);
      if (user) setCustomerData(user);
    }
  }, []);

  return (
    <>
      {showLoader && <Loader />}
      {screensStepper === 0 && (
        <div className="container mx-auto md:px-12 px-4 flex flex-col items-center justify-center mt-8">
          <div className=" bg-white lg:w-[48rem] md:w-[40rem] w-full px-[40px] h-auto p-[20px] !rounded-xl shadow-md flex items-center flex-col">
            <div className="flex flex-row !justify-between gap-4 lg:gap-40 items-center w-full">
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
              <div className="mt-[19px] w-full grid grid-cols-1 gap-4">
                <FullName
                  setUserInputData={setCustomerData}
                  userInputData={customerData}
                  hasFullName={name && name !== ""}
                  fullName={name}
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
                id="office_email_address"
                name="office_email_address"
                type="email"
                required
                placeholder="office email address"
                className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] 
              `}
                onChange={(e) => {
                  setCustomerData({
                    ...customerData,
                    office_email_address: e?.target?.value,
                  });
                }}
                value={customerData?.office_email_address}
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
                  // disabled={etbCustomerData?.V_D_CUST_ADD1}
                  className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]`}
                  onChange={(e) => {
                    setCustomerData({
                      ...customerData,
                      office_address_line_1: e?.target?.value,
                    });
                  }}
                  value={address1}
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
                  onChange={(e) => {
                    setCustomerData({
                      ...customerData,
                      office_address_line_2: e?.target?.value,
                    });
                  }}
                  value={address2}
                  maxLength={20}
                />
              </div>
            </div>
            <div className="mt-[19px] w-full grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="">
                <CommonInputLabel labelTitle={staticLabels?.address3} />
                <input
                  id="address3"
                  name="address3"
                  type="text"
                  required
                  placeholder="Enter your address #3"
                  className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]`}
                  onChange={(e) => {
                    setCustomerData({
                      ...customerData,
                      office_address_line_3: e?.target?.value,
                    });
                  }}
                  value={address3}
                  maxLength={20}
                />
              </div>
              <div className="relative ">
                <PincodeInput
                  value={pincode || customerData?.pin_code}
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
                          setCustomerData({
                            ...customerData,
                            office_address_pincode: i,
                          });
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
                    setCustomerData({
                      ...customerData,
                      office_address_city: e?.target?.value,
                    })
                  }
                  value={city}
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
                    setCustomerData({
                      ...customerData,
                      office_address_state: e?.target?.value,
                    })
                  }
                  value={state}
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
                disable={buttonDisable}
                width="md:w-[26rem] w-full max-[320px]:w-[280px] max-sm:w-[343px]"
                handleSubmit={() => handlSubmitClick()}
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
      {screensStepper === 4 && <VkyConsentScreen  data={{ heading: "VKY Consent & Next Steps", list: ekycList }}
          handleSubmit={() => setScreenStepper(3)}/>}
    </>
  );
};

export default ApplicationForm;
