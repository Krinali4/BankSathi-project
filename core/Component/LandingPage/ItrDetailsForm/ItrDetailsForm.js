import React from "react";
import CommonInputLabel from "../../Common/CommonInputComponents/CommonInputLabel";
import CommonNextButton from "../../Common/Button/Button";
import { useRouter } from "next/router";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";

const ItrDetailsForm = ({
  userInputData,
  handleChange,
  setDetailsFormStepper,
  setUserInputData,
}) => {
  const router = useRouter();

  return (
    <div>
      <div className="grid grid-cols-2 gap-[20.5px] max-[567px]:grid-cols-1 mt-[20px]">
        <div className="flex flex-col">
          <CommonInputLabel labelTitle={staticLabels?.annualGross} />
          <input
            className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]`}
            id="monthly_salary"
            name="monthly_salary"
            value={
              Math.floor(userInputData?.monthly_salary) === 0
                ? ""
                : userInputData?.monthly_salary
            }
            onChange={(e) => {
              handleChange(e);
            }}
            type="number"
            placeholder="908344"
          />
        </div>
        <div className="flex flex-col">
          <CommonInputLabel labelTitle={staticLabels?.totalExperience} />
          <input
            className={`shadow border rounded-lg w-[222px] py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]`}
            id="totalExperience"
            name="totalExperience"
            value={
              Math.floor(userInputData?.totalExperience) === 0
                ? ""
                : userInputData?.totalExperience
            }
            onChange={(e) => {
              handleChange(e);
            }}
            type="number"
            placeholder="3"
          />
        </div>
      </div>
      <div className="flex flex-col mt-[20px]">
        <CommonInputLabel labelTitle={staticLabels?.salaryAccount} />
        <input
          id="salary account"
          name="salaryAccount"
          type="text"
          required
          placeholder="Kotak Mahindra Bank"
          className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] 
              `}
          onChange={(e) =>
            setUserInputData({
              ...userInputData,
              salaryAccount: e?.target?.value,
            })
          }
          value={userInputData?.salaryAccount}
          maxLength={50}
        />
      </div>
      <div className="flex flex-col mt-[20px]">
        <CommonInputLabel labelTitle={staticLabels?.proofOfIncome} />
        <label
          for="dropzone-file"
          class="flex mt-[5px] flex-col items-end justify-center w-full h-[52px] border-2 border-gray-300 rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 mb-[3px]"
        >
          <input
            type="file"
            name="upload"
            id="upload"
            className="chooseOption"
            placeholder="Chhose file to upload"
            onChange={(e) => handleChange(e)}
            accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
        </label>
      </div>
      <CommonNextButton
        title="Submit"
        handleSubmit={() =>
          // to navigate to eligible products
          router?.push({ pathname: "/hdfc/eligible-products" })
        }
      />
    </div>
  );
};

export default ItrDetailsForm;
