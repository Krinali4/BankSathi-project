import React, { useEffect, useState } from "react";
import CommonEmailInput from "../../Common/CommonInputComponents/CommonEmailInput";
import CommonNextButton from "../../Common/Button/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";
import PanInput from "../../Common/CommonInputComponents/PanInput";
import FullName from "../../Common/CommonInputComponents/FullName";
import { dateFormatRegex, getName } from "@/commonUtils/util";
import moment from "moment";

const PersonalForm = ({
  userInputData,
  handleChange,
  setUserInputData,
  loginStepper,
  detailsFormStepper,
  setDetailsFormStepper,
  etbCustomerData,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [buttonDisable, setButtonDisable] = useState(true);

  const male =
    etbCustomerData?.V_D_CUST_GENDER === "M" ||
    userInputData?.gender === "Male";
  const female =
    etbCustomerData?.V_D_CUST_GENDER === "F" ||
    userInputData?.gender === "Female";
  const others =
    etbCustomerData?.V_D_CUST_GENDER === "O" ||
    userInputData?.gender === "Other";

  const hasGender = male || female || others;
  const hasNumber = userInputData?.mobile && userInputData?.mobile !== "";
  const date = etbCustomerData?.D_D_CUST_DATE_OF_BIRTH || userInputData?.dob;
  const dob = date ? moment(date).format("DD-MM-YYYY") : "";
  const name = getName(userInputData);

  const disable = !hasGender || !dob || !hasNumber || !name;

  const handlePersonalSubmit = () => {
    setDetailsFormStepper(1);
  };

  const handleDateChange = (date) => {
    const dateConvert = moment(date).format("DD-MM-YYYY");
    if (dateConvert) {
      const isValid = dateFormatRegex.test(dateConvert);
      if (isValid) {
        setStartDate(date);
        setUserInputData({ ...userInputData, dob: date });
      }
    }
  };

  useEffect(() => {
    if (male || female || others) {
      if (hasNumber && dob && name !== "") {
        setButtonDisable(false);
      }
    }
  }, [etbCustomerData, userInputData]);
  return (
    <>
      <div className="mb-4">
        <PanInput
          setUserInputData={setUserInputData}
          userInputData={userInputData}
          isPanVerified={!!userInputData?.pan_no}
          loginStepper={loginStepper}
        />
        <FullName
          setUserInputData={setUserInputData}
          userInputData={userInputData}
          hasFullName={name && name !== ""}
          fullName={name}
        />
        <p className="pt-[20px] text-[#212529]  max-[1200px]:!pt-4">
          {staticLabels?.gender}
        </p>
        <div className="flex pt-[10px] gap-4 ">
          <div>
            <label
              htmlFor="gender"
              className={`form-radio flex gap-2 items-center ${
                male ? "text-[#212529]" : "text-[#808080]"
              }`}
            >
              <input
                type="radio"
                name="gender"
                value={"Male"}
                checked={male}
                onChange={(e) => {
                  setUserInputData({
                    ...userInputData,
                    gender: e.target.value,
                  });
                  handleChange(e);
                }}
              />
              Male
            </label>
          </div>
          <div>
            <label
              htmlFor="gender"
              className={`form-radio flex gap-2 items-center  ${
                female ? "text-[#212529]" : "text-[#808080]"
              }`}
            >
              <input
                type="radio"
                name="gender"
                value={"Female"}
                checked={female}
                onChange={(e) => {
                  setUserInputData({
                    ...userInputData,
                    gender: e.target.value,
                  });
                  handleChange(e);
                }}
              />
              Female
            </label>
          </div>
          <div>
            <label
              htmlFor="gender"
              className={`form-radio flex gap-2 items-center ${
                others ? "text-[#212529]" : "text-[#808080]"
              } `}
            >
              <input
                type="radio"
                name="gender"
                value={"Other"}
                checked={others}
                onChange={(e) => {
                  setUserInputData({
                    ...userInputData,
                    gender: e.target.value,
                  });
                  handleChange(e);
                }}
              />
              Other
            </label>
          </div>
        </div>
      </div>
      <div className="datepicker mt-[20px]">
        <label
          className="text-[13px] font-normal text-[#212529] "
          htmlFor="date"
        >
          {staticLabels?.dob}
        </label>
        <div className="">
          <DatePicker
            type="text"
            showYearDropdown
            dropdownMode="select"
            dateFormat="dd-MM-yyyy"
            placeholderText="DD-MM-YYYY"
            name="dob"
            id="dob"
            className={`shadow border rounded-lg w-full h-[50px] py-[14px] px-4 text-[#212529] text-[12px] leading-tight border-[#C2CACF] focus:outline-none focus:shadow-outline ${
              dob
                ? "border-[#C2CACF] cursor-not-allowed bg-[#EFEFEF] text-[#8D9CA5]"
                : "bg-white text-[#212529]"
            }`}
            selected={startDate}
            onChange={(date) => {
              handleDateChange(date);
            }}
            // disabled={!!dob}
            maxDate={startDate}
            value={dob}
            required
            todayButton={"Today"}
            showIcon
          />
        </div>
      </div>
      <div className="">
        <CommonEmailInput
          value={etbCustomerData?.V_D_CUST_EMAIL_ADD}
          handleChange={handleChange}
          disabled={false}
        />
      </div>
      <div className="mt-[20px]">
        <label
          className="text-[13px] font-normal text-[#212529]"
          htmlFor="email"
        >
          {staticLabels?.mobileNumber}
        </label>
        <div
          className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] text-[12px] leading-tight border-[#C2CACF] flex items-center focus:outline-none focus:shadow-outline ${
            hasNumber
              ? "border-[#C2CACF] cursor-not-allowed bg-[#EFEFEF] text-[#8D9CA5]"
              : "bg-white text-[#212529]"
          }`}
        >
          <p className="text-[12px]">+91-</p>
          <input
            type="tel"
            name="mobile"
            id="mobile"
            pattern="[0-9]*"
            disabled={hasNumber}
            className="border-none text-[12px] outline-none"
            placeholder="Enter Your Number"
            onChange={(e) => handleChange(e)}
            value={userInputData?.mobile}
            required
            maxLength={10}
          />
        </div>
      </div>
      <CommonNextButton
        title="Next"
        handleSubmit={handlePersonalSubmit}
        disable={disable}
      />
    </>
  );
};

export default PersonalForm;
