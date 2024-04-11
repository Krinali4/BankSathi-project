import React, { useEffect, useRef, useState } from "react";
import PincodeInput from "../../Common/CommonInputComponents/PinCodeInput";
import CommonNextButton from "../../Common/Button/Button";
import CommonInputLabel from "../../Common/CommonInputComponents/CommonInputLabel";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";
import ResidencyAddressForm from "./ResidencyAddressForm/ResidencyAddressForm";
import {
  BS_BASE_URL,
  BS_COMMON,
} from "@/commonUtils/ApiEndPoints/ApiEndPoints";
import axios from "axios";

const AddressForm = ({
  userInputData,
  handleChange,
  setDetailsFormStepper,
  setUserInputData,
  etbCustomerData,
}) => {
  const wrapperRef = useRef(null);

  const [errorPincode, setErrorPinCode] = useState(false);
  const [pincodeNumber, setPincodeNumber] = useState();
  const [stateCity, setStateCity] = useState({ city: null, state: null });
  const [pinCodeList, setPinCodeList] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [pinCodeError, setPinCodeError] = useState(false);
  const [isAadharAddress, setIsAadharAddress] = useState(true);
  const [residenceAddress, setResidenceAddress] = useState("Family Owned");
  const [residenceAddressList, setResidenceAddressList] = useState([
    "Self owned",
  ]);
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  // const getAadharAddressComponent = () => {
  //   //PINCODE

  const handlePincodeChange = () => {
    setVisibility(true);
  };

  const getPinCodeList = async (searchPin) => {
    let url = BS_BASE_URL + BS_COMMON.pinCodeVerify;
    await axios
      .post(
        url,
        {
          pin_code: searchPin,
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
          setPinCodeList(response.data.data.pincode_data?.pincodes);
        }
      })
      .catch((error) => {
        setPinCodeList([]);
      });
  };

  const address1 = etbCustomerData?.V_D_CUST_ADD1 || userInputData?.address1;
  const address2 = etbCustomerData?.V_D_CUST_ADD2 || userInputData?.address2;
  const address3 = etbCustomerData?.V_D_CUST_ADD3 || userInputData?.address3;
  const state =
    etbCustomerData?.V_D_CUST_STATE || userInputData?.state || stateCity?.state;
  const city =
    etbCustomerData?.V_D_CUST_CITY || userInputData?.city || stateCity?.city;
  const pincode = etbCustomerData?.V_D_CUST_ZIP_CODE || userInputData?.pin_code;

  const addressDisable =
  (!address1 || !address2 || !address3 || !state || !city || !pincode) &&
  (!userInputData.residencyAddress1 ||
  !userInputData.residencyAddress2 ||
  !userInputData.residencyAddress3 ||
  !userInputData.residencyState ||
  !userInputData.residencyCity ||
  !userInputData.residency_pin_code);
  console.log(userInputData,"userInputData.residencyAddress1");
    useEffect(() => {
    if (userInputData?.pin_code?.length === 6) {
      getPinCodeList();
    }
  }, [userInputData?.pin_code?.length]);

  return (
    <div>
      {isAadharAddress ? (
        <>
          <div className="mt-[20px]">
            <CommonInputLabel labelTitle={staticLabels?.address1} />
            <input
              id="address1"
              name="address1"
              type="text"
              required
              placeholder="Enter your address #1"
              className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]`}
              onChange={(e) =>
                setUserInputData({
                  ...userInputData,
                  address1: e?.target?.value,
                })
              }
              value={address1}
              maxLength={20}
            />
          </div>
          <div className="mt-[20px]">
            <CommonInputLabel labelTitle={staticLabels?.address2} />
            <input
              id="address2"
              name="address2"
              type="text"
              required
              placeholder="Enter your address #2"
              className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]`}
              onChange={(e) =>
                setUserInputData({
                  ...userInputData,
                  address2: e?.target?.value,
                })
              }
              value={address2}
              maxLength={20}
            />
          </div>
          <div className="mt-[20px]">
            <CommonInputLabel labelTitle={staticLabels?.address3} />
            <input
              id="address3"
              name="address3"
              type="text"
              required
              placeholder="Enter your address #3"
              className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]`}
              onChange={(e) =>
                setUserInputData({
                  ...userInputData,
                  address3: e?.target?.value,
                })
              }
              value={address3}
              maxLength={20}
            />
          </div>
          <div className="mt-[20px]">
            <CommonInputLabel labelTitle={staticLabels?.landMark} />
            <input
              id="landMark"
              name="landMark"
              type="text"
              required
              placeholder="Enter your landmark"
              className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]`}
              onChange={(e) =>
                setUserInputData({
                  ...userInputData,
                  landMark: e?.target?.value,
                })
              }
              value={userInputData?.landMark}
              maxLength={20}
            />
          </div>
          <div className="relative mt-[20px]">
            <PincodeInput
              value={
                etbCustomerData?.V_D_CUST_ZIP_CODE || userInputData?.pin_code
              }
              getData={getPinCodeList}
              defaultValue={
                etbCustomerData?.V_D_CUST_ZIP_CODE || userInputData?.pin_code
              }
              handleChange={handleChange}
              handlePincodeChange={handlePincodeChange}
              pinCodeError={pinCodeError}
            />
            {visibility && (
              <ul
                className="suggestions pin-suggestion top-[100%]"
                ref={wrapperRef}
              >
                {pinCodeList?.map((i, v) => (
                  <li
                    className={""}
                    key={v}
                    onClick={() => {
                      setUserInputData({ ...userInputData, pin_code: i });
                      setVisibility(!visibility);
                    }}
                  >
                    {i}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-[20px]">
            <CommonInputLabel labelTitle={staticLabels?.state} />
            <input
              id="state"
              name="state"
              type="text"
              required
              placeholder="State"
              className={`text-[12px] shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]
               `}
              onChange={(e) =>
                setUserInputData({
                  ...userInputData,
                  state: e?.target?.value,
                })
              }
              value={state || stateCity?.state}
              maxLength={20}
            />
          </div>
          <div className="mt-[20px]">
            <CommonInputLabel labelTitle={staticLabels?.city} />
            <input
              id="city"
              name="city"
              type="text"
              required
              placeholder="City"
              className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] text-[12px]`}
              onChange={(e) =>
                setUserInputData({
                  ...userInputData,
                  city: e?.target?.value,
                })
              }
              value={city || stateCity?.city}
              maxLength={20}
            />
          </div>
          <p className="pt-[20px] text-[#212529] text-[13px]">
            {staticLabels?.aadharQuestion}
          </p>
          <div className="flex flex-col pt-[10px] gap-2">
            <div>
              <label
                htmlFor="adhar-address"
                className={`form-radio text-[14px] flex gap-2 items-center ${
                  userInputData?.aadharAddress === "Yes"
                    ? "text-[#212529]"
                    : "text-[#212529]"
                }`}
              >
                <input
                  type="radio"
                  name="aadharAddress"
                  className="text-[14px] form-radio flex gap-2 items-center text-[#212529]"
                  value={
                    userInputData?.aadharAddress === "Yes"
                      ? userInputData?.aadharAddress === "Yes"
                      : "Yes"
                  }
                  checked={userInputData?.aadharAddress === "Yes"}
                  onChange={(e) => {
                    setIsAadharAddress(true);
                    handleChange(e);
                  }}
                />
                Yes, My Current Address is same as permanent address
              </label>
            </div>
            <div>
              <label
                htmlFor="adhar-address"
                className={`form-radio text-[14px] flex gap-2 items-center  ${
                  userInputData?.aadharAddress === "No"
                    ? "text-[#212529]"
                    : "text-[#212529]"
                }`}
              >
                <input
                  type="radio"
                  name="aadharAddress"
                  className="text-[14px] form-radio flex gap-2 items-center text-[#212529] w-[288px]"
                  value={
                    userInputData?.aadharAddress === "No"
                      ? userInputData?.aadharAddress === "No"
                      : "No"
                  }
                  checked={userInputData?.aadharAddress === "No"}
                  onChange={(e) => {
                    setIsAadharAddress(false);
                    handleChange(e);
                  }}
                />
                No, My Current Address is different from the Aadhar Address, And
                I Here by Self-Declare my current as Stated as below
              </label>
            </div>
          </div>
        </>
      ) : (
        <>
          <ResidencyAddressForm
            userInputData={userInputData}
            setUserInputData={setUserInputData}
            handleChange={handleChange}
            setDetailsFormStepper={setDetailsFormStepper}
            etbCustomerData={etbCustomerData}
            getPinCodeList={getPinCodeList}
            handlePincodeChange={handlePincodeChange}
            pinCodeList={pinCodeList}
            setVisibility={setVisibility}
            visibility={visibility}
            wrapperRef={wrapperRef}
          />
        </>
      )}
      <div className="mt-[30px]">
        <CommonNextButton
          title="Continue"
          width="w-[222px]"
          mobileWidth="max-sm:w-full"
          disable={addressDisable}
          handleSubmit={() => setDetailsFormStepper(2)}
        />
      </div>
    </div>
  );
};

export default AddressForm;
