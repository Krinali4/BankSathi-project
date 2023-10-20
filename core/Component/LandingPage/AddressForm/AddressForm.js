import React, { useRef, useState } from "react";
import InfoComponent from "../../Common/InfoComponent/InfoComponent";
import DropdownList from "react-widgets/DropdownList";
import PincodeInput from "../../Common/CommonInputComponents/PinCodeInput";
import CommonNextButton from "../../Common/Button/Button";
import CommonInputLabel from "../../Common/CommonInputComponents/CommonInputLabel";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";

const AddressForm = ({
  userInputData,
  handleChange,
  setDetailsFormStepper,
  setUserInputData,
}) => {
  const wrapperRef = useRef(null);

  const [errorPincode, setErrorPinCode] = useState(false);
  const [pincodeNumber, setPincodeNumber] = useState();
  const [pinCodeList, setPinCodeList] = useState([]);
  const [visibility, setVisibility] = useState(false);

  const [residenceAddress, setResidenceAddress] = useState("Family Owned");
  const [residenceAddressList, setResidenceAddressList] = useState([
    "Self owned",
  ]);

  const getAadharAddressComponent = () => {
    //PINCODE
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

    const getPinCodeList = () => {
      // api call here
    };

    // useOutsideAlerter(wrapperRef);
    return (
      <>
        <div className="grid grid-cols-2 gap-[20.5px] max-[567px]:grid-cols-1 mt-[20px]">
          <div>
            <CommonInputLabel labelTitle={staticLabels?.residenceType} />
            <div className="dropdown mt-[5px] shadow rounded-lg w-full text-[#212529] leading-tight focus:outline-none focus:shadow-outline border-[#C2CACF]">
              <DropdownList
                value={residenceAddress}
                onChange={(nextValue) => setResidenceAddress(nextValue)}
                data={residenceAddressList}
              />
            </div>
          </div>
          <div className="relative">
            <PincodeInput
              value={userInputData?.pin_code}
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
        </div>
        <div className="grid grid-cols-2 gap-[20.5px] max-[567px]:grid-cols-1 mt-[20px]">
          <div className="flex flex-col gap-[5px]">
            <CommonInputLabel labelTitle={staticLabels?.flatHouseAppartment} />
            <input
              id="flataddress"
              name="flataddress"
              type="text"
              required
              placeholder="111"
              className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] 
              `}
              onChange={(e) =>
                setUserInputData({
                  ...userInputData,
                  flatNo: e?.target?.value,
                })
              }
              value={userInputData?.flatNo}
              maxLength={20}
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <CommonInputLabel labelTitle={staticLabels?.localitySociety} />
            <input
              id="locality"
              name="locality"
              type="text"
              required
              placeholder="jayanagar"
              className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] 
              `}
              onChange={(e) =>
                setUserInputData({
                  ...userInputData,
                  locality: e?.target?.value,
                })
              }
              value={userInputData?.flatNo}
              maxLength={20}
            />
          </div>
        </div>
        <div className="flex flex-col gap-[5px] mt-[20px]">
          <CommonInputLabel labelTitle=" Landmark" />
          <input
            id="landmark"
            name="landmark"
            type="text"
            required
            placeholder="near cred office"
            className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] 
              `}
            onChange={(e) =>
              setUserInputData({
                ...userInputData,
                landmark: e?.target?.value,
              })
            }
            value={userInputData?.landmark}
            maxLength={50}
          />
        </div>
        <div className="grid grid-cols-2 gap-[20.5px] max-[567px]:grid-cols-1 mt-[20px]">
          <div className="flex flex-col gap-[5px]">
            <CommonInputLabel labelTitle={staticLabels?.state} />
            <input
              id="state"
              name="state"
              type="text"
              required
              placeholder="karnataka"
              className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] 
              `}
              onChange={(e) =>
                setUserInputData({
                  ...userInputData,
                  state: e?.target?.value,
                })
              }
              value={userInputData?.state}
              maxLength={20}
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <CommonInputLabel labelTitle={staticLabels?.city} />
            <input
              id="city"
              name="city"
              type="text"
              required
              placeholder="bangalore"
              className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] 
              `}
              onChange={(e) =>
                setUserInputData({
                  ...userInputData,
                  city: e?.target?.value,
                })
              }
              value={userInputData?.city}
              maxLength={20}
            />
          </div>
        </div>
        <div className="mt-[30px]">
          <CommonNextButton
            title="Save Aadhaar Address"
            width="w-[222px]"
            mobileWidth="max-sm:w-full"
            handleSubmit={() => setDetailsFormStepper(2)}
          />
        </div>
      </>
    );
  };

  return (
    <div>
      <p className="pt-[10px] text-[#212529] text-[13px]  max-[1200px]:!pt-0">
        {staticLabels?.aadharQuestion}
      </p>
      <div className="flex pt-[10px] gap-4 ">
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
                handleChange(e);
              }}
            />
            No
          </label>
        </div>
      </div>
      <div className="mt-[20px]">
        <InfoComponent
          informationText="Your card will be delivered at your address. Incomplete address may lead
        to rejection of application."
        />
        <div className="text-gray-400 text-[13px] font-normal font-['Poppins'] mt-[20px]">
          I hereby self declare my current address as stated below.
        </div>
      </div>
      {userInputData?.aadharAddress && getAadharAddressComponent()}
    </div>
  );
};

export default AddressForm;
