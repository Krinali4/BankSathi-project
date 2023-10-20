import React, { useState } from "react";
import CommonNextButton from "../../Common/Button/Button";
import ThankYouModal from "../../Common/Modal/ThankYouModal";
import loaderLogoGif from "../../../../public/assets/logo-loader.gif";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";

const EmploymentInfoForm = ({
  userInputData,
  handleChange,
  setDetailsFormStepper,
  setUserInputData,
}) => {
  const isSalaried = userInputData?.occupationType === "Salaried";
  const [showLoaderModal, setShowLoaderModal] = useState(false);

  return (
    <>
      <div>
        <label
          className="text-neutral-800 text-[13px] font-normal font-['Poppins']"
          htmlFor="occupation-type"
        >
          {staticLabels?.occupationType}
        </label>
        <div className="flex pt-[10px] gap-4 ">
          <div>
            <label
              htmlFor="salaried"
              className={`form-radio flex gap-2 items-center ${
                userInputData?.occupationType === "Salaried"
                  ? "text-[#212529]"
                  : "text-[#808080]"
              }`}
            >
              <input
                type="radio"
                name="occupationType"
                value={
                  userInputData?.occupationType === "Salaried"
                    ? userInputData?.occupationType === "Salaried"
                    : "Salaried"
                }
                checked={userInputData?.occupationType === "Salaried"}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              Salaried
            </label>
          </div>
          <div>
            <label
              htmlFor="self employed"
              className={`form-radio flex gap-2 items-center  ${
                userInputData?.occupationType === "Self employed"
                  ? "text-[#212529]"
                  : "text-[#808080]"
              }`}
            >
              <input
                type="radio"
                name="occupationType"
                value={
                  userInputData?.occupationType === "Self employed"
                    ? userInputData?.occupationType === "Self employed"
                    : "Self employed"
                }
                checked={userInputData?.occupationType === "Self employed"}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              Self employed
            </label>
          </div>
        </div>
        {userInputData?.occupationType && (
          <>
            <div className="flex flex-col gap-[2px] mt-[20px]">
              <label
                className="text-neutral-800 text-[13px] font-normal font-['Poppins']"
                htmlFor="employment company name"
              >
                {isSalaried
                  ? staticLabels?.companyName
                  : staticLabels?.businessName}
              </label>
              <input
                id="company name"
                name="company name"
                type="text"
                required
                placeholder={
                  isSalaried
                    ? staticLabels?.companyName
                    : staticLabels?.businessProfession
                }
                className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] 
              `}
                onChange={(e) =>
                  isSalaried
                    ? setUserInputData({
                        ...userInputData,
                        companyName: e?.target?.value,
                      })
                    : setUserInputData({
                        ...userInputData,
                        businessName: e?.target?.value,
                      })
                }
                value={
                  isSalaried
                    ? userInputData?.companyName
                    : userInputData?.businessName
                }
                maxLength={50}
              />
            </div>
            <div className="flex flex-col gap-[2px] mt-[20px]">
              <label
                className="text-neutral-800 text-[13px] font-normal font-['Poppins']"
                htmlFor="Designation"
              >
                {isSalaried
                  ? staticLabels?.designation
                  : staticLabels?.businessProfession}
              </label>
              <input
                id="Designation"
                name="Designation"
                type="text"
                required
                placeholder={
                  isSalaried
                    ? "Add your designation"
                    : "Profession or Designation"
                }
                className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] 
              `}
                onChange={(e) =>
                  isSalaried
                    ? setUserInputData({
                        ...userInputData,
                        designation: e?.target?.value,
                      })
                    : setUserInputData({
                        ...userInputData,
                        businessDesignation: e?.target?.value,
                      })
                }
                value={
                  isSalaried
                    ? userInputData?.designation
                    : userInputData?.businessDesignation
                }
                maxLength={50}
              />
            </div>
            <CommonNextButton
              title="Submit"
              handleSubmit={() => setShowLoaderModal(true)}
            />
          </>
        )}
      </div>
      <div>
        {showLoaderModal && (
          <ThankYouModal
            title="Please Wait as it may take 
            upto 60 seconds"
            subTitle="We are submitting your details to our co-brand credit card partner."
            image={loaderLogoGif}
            buttonText="Okay"
            width="w-[460px] max-sm:w-[343px]"
            handleButtonClick={() => setDetailsFormStepper(4)}
          />
        )}
      </div>
    </>
  );
};

export default EmploymentInfoForm;
