import CommonInputLabel from "@/app/client/Common/CommonInputComponents/CommonInputLabel";
import PincodeInput from "@/app/client/Common/CommonInputComponents/PinCodeInput";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";
import React from "react";

const ResidencyAddressForm = ({
  userInputData,
  handleChange,
  setDetailsFormStepper,
  setUserInputData,
  etbCustomerData,
  getPinCodeList,
  handlePincodeChange,
  pinCodeList,
  setVisibility,
  visibility,
}) => {
  return (
    <div>
      <div className="mt-[20px]">
        <CommonInputLabel labelTitle={staticLabels?.address1} />
        <input
          id="residencyAddress1"
          name="residencyAddress1"
          type="text"
          required
          placeholder="Enter your address #1"
          className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]`}
          onChange={(e) =>
            setUserInputData({
              ...userInputData,
              residencyAddress1: e?.target?.value,
            })
          }
          value={userInputData?.residencyAddress1}
          maxLength={20}
        />
      </div>
      <div className="mt-[20px]">
        <CommonInputLabel labelTitle={staticLabels?.address2} />
        <input
          id="residencyAddress2"
          name="residencyAddress2"
          type="text"
          required
          placeholder="Enter your address #2"
          className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]`}
          onChange={(e) =>
            setUserInputData({
              ...userInputData,
              residencyAddress2: e?.target?.value,
            })
          }
          value={userInputData?.residencyAddress2}
          maxLength={20}
        />
      </div>
      <div className="mt-[20px]">
        <CommonInputLabel labelTitle={staticLabels?.address3} />
        <input
          id="residencyAddress3"
          name="residencyAddress3"
          type="text"
          required
          placeholder="Enter your address #3"
          className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] text-[12px] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]`}
          onChange={(e) =>
            setUserInputData({
              ...userInputData,
              residencyAddress3: e?.target?.value,
            })
          }
          value={userInputData?.residencyAddress3}
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
          value={userInputData?.residency_pin_code}
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
                  setUserInputData({ ...userInputData, residency_pin_code: i });
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
          id="residencyState"
          name="residencyState"
          type="text"
          required
          placeholder="State"
          className={`text-[12px] shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]
               `}
          onChange={(e) =>
            setUserInputData({
              ...userInputData,
              residencyState: e?.target?.value,
            })
          }
          value={userInputData?.residencyState}
          maxLength={20}
        />
      </div>
      <div className="mt-[20px]">
        <CommonInputLabel labelTitle={staticLabels?.city} />
        <input
          id="residencyCity"
          name="residencyCity"
          type="text"
          required
          placeholder="City"
          className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] text-[12px]`}
          onChange={(e) =>
            setUserInputData({
              ...userInputData,
              residencyCity: e?.target?.value,
            })
          }
          value={userInputData?.residencyCity}
          maxLength={20}
        />
      </div>
      <p className="pt-[20px] text-[#212529] text-[13px]">
        <span className="text-[#49D49D]">Note ** </span>
        {staticLabels?.note}
      </p>
      <div className="flex pt-[10px] gap-4"></div>
    </div>
  );
};

export default ResidencyAddressForm;
