import React, { useState } from "react";
import CommonEmailInput from "../../Common/CommonInputComponents/CommonEmailInput";
import CommonNextButton from "../../Common/Button/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";

const PersonalForm = ({
  userInputData,
  handleChange,
  setDetailsFormStepper,
}) => {
  const disable = false; // put condition here

  const [startDate, setStartDate] = useState(new Date());

  const handlePersonalSubmit = () => {
    setDetailsFormStepper(1);
  };
  return (
    <>
      <div className="mb-4">
        <p className="pt-[10px] text-[#212529]  max-[1200px]:!pt-0">
          {staticLabels?.gender}
        </p>
        <div className="flex pt-[10px] gap-4 ">
          <div>
            <label
              htmlFor="gender"
              className={`form-radio flex gap-2 items-center ${
                userInputData?.gender === "Male"
                  ? "text-[#212529]"
                  : "text-[#808080]"
              }`}
            >
              <input
                type="radio"
                name="gender"
                value={
                  userInputData?.gender === "Male"
                    ? userInputData?.gender === "Male"
                    : "Male"
                }
                checked={userInputData?.gender === "Male"}
                onChange={(e) => {
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
                userInputData?.gender === "Female"
                  ? "text-[#212529]"
                  : "text-[#808080]"
              }`}
            >
              <input
                type="radio"
                name="gender"
                value={
                  userInputData?.gender === "Female"
                    ? userInputData?.gender === "Female"
                    : "Female"
                }
                checked={userInputData?.gender === "Female"}
                onChange={(e) => {
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
                userInputData?.gender === "Other"
                  ? "text-[#212529]"
                  : "text-[#808080]"
              } `}
            >
              <input
                type="radio"
                name="gender"
                value={
                  userInputData?.gender === "Other"
                    ? userInputData?.gender === "Other"
                    : "Other"
                }
                checked={userInputData?.gender === "Other"}
                onChange={(e) => {
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
            className="shadow border rounded-lg w-full !py-4 px-4 text-[#212529] text-[14px] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              handleChange(date);
            }}
            maxDate={startDate}
            // value={userInputData?.dob ? formatDateTime : "DD/MM/YYYY"}
            required
            todayButton={"Today"}
            showIcon
          />
        </div>
      </div>
      <div className="">
        <CommonEmailInput
          value={userInputData?.email}
          handleChange={handleChange}
        />
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
