import React, { useRef, useState } from "react";
import InfoComponent from "../../Common/InfoComponent/InfoComponent";
import DropdownList from "react-widgets/DropdownList";
import PincodeInput from "../../Common/CommonInputComponents/PinCodeInput";
import CommonNextButton from "../../Common/Button/Button";
import CommonInputLabel from "../../Common/CommonInputComponents/CommonInputLabel";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";
import ResidencyAddressForm from "./ResidencyAddressForm/ResidencyAddressForm";

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
  const [pinCodeList, setPinCodeList] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [isAadharAddress, setIsAadharAddress] = useState(true);

  const [residenceAddress, setResidenceAddress] = useState("Family Owned");
  const [residenceAddressList, setResidenceAddressList] = useState([
    "Self owned",
  ]);

  // const getAadharAddressComponent = () => {
  //   //PINCODE
  const handlePincodeChange = (event) => {
    setVisibility(true);
    const PincodeErr = event?.target?.value.replace(
      /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/g,
      ""
    );
    if (!PincodeErr) {
      setErrorPinCode(false);
    } else {
      setErrorPinCode(true);
    }
  };

  const getPinCodeList = () => {};

  const address1 = etbCustomerData?.V_D_CUST_ADD1 || userInputData?.address1;
  const address2 = etbCustomerData?.V_D_CUST_ADD2 || userInputData?.address2;
  const address3 = etbCustomerData?.V_D_CUST_ADD3 || userInputData?.address3;
  const state = etbCustomerData?.V_D_CUST_STATE || userInputData?.state;
  const city = etbCustomerData?.V_D_CUST_CITY || userInputData?.city;
  const pincode = etbCustomerData?.V_D_CUST_ZIP_CODE || userInputData?.pin_code;

  const addressDisable =
    !address1 || !address2 || !address3 || !state || !city || !pincode;

  console.log(addressDisable);
  
  return (
    <div>
      {/* <div className="mt-[20px]">
        <InfoComponent
          informationText="Your card will be delivered at your address. Incomplete address may lead
        to rejection of application."
        />
        <div className="text-gray-400 text-[13px] font-normal font-['Poppins'] mt-[20px]">
          I hereby self declare my current address as stated below.
        </div>
      </div> */}
      {/* {getAadharAddressComponent()} */}
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
              id="address2"
              name="address2"
              type="text"
              required
              placeholder="Enter your address #3"
              className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]`}
              onChange={(e) =>
                setUserInputData({
                  ...userInputData,
                  address2: e?.target?.value,
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
              value={pincode}
              getData={getPinCodeList}
              handleChange={handleChange}
              handlePincodeChange={handlePincodeChange}
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
                      setVisibility(!visible);
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
              value={state}
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
              value={city}
              maxLength={20}
            />
          </div>
          <p className="pt-[20px] text-[#212529] text-[13px]">
            {staticLabels?.aadharQuestion}
          </p>
          <div className="flex pt-[10px] gap-4">
            <div>
              <label
                htmlFor="adhar-address"
                className={`form-radio flex gap-2 items-center ${
                  userInputData?.aadharAddress === "Yes"
                    ? "text-[#212529]"
                    : "text-[#808080]"
                }`}
              >
                <input
                  type="radio"
                  name="aadharAddress"
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
                Yes
              </label>
            </div>
            <div>
              <label
                htmlFor="adhar-address"
                className={`form-radio flex gap-2 items-center  ${
                  userInputData?.aadharAddress === "No"
                    ? "text-[#212529]"
                    : "text-[#808080]"
                }`}
              >
                <input
                  type="radio"
                  name="aadharAddress"
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
                No
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
          title="Save Aadhaar Address"
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
