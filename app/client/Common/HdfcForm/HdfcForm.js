import React, { useEffect, useState } from "react";
import BankBanner from "../BankBanner/BankBanner";
import HDFC from "../../../../public/assets/HDFC.svg";
import CommonInputLabel from "../CommonInputComponents/CommonInputLabel";
import CommonEmailInput from "../CommonInputComponents/CommonEmailInput";
import PincodeInput from "../CommonInputComponents/PinCodeInput";
import { DropdownList } from "react-widgets";
import CommonNextButton from "../Button/Button";
import CongratulationsScreen from "../CongratulationsScreen/CongratulationsScreen";
import Image from "next/image";
import QuestionModal from "../Modal/QuestionModal";
import PhysicalKycComp from "../../PhysicalKycComp/PhysicalKycComp";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";

const HdfcForm = () => {
  const [formStepper, setFormStepper] = useState(0);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [formInputData, setFormInputData] = useState({});
  const [states, setStates] = useState("Bangalore");
  const [stateList, setStateList] = useState(["M.P", "U.P"]);
  const [imagesList, setImagesList] = useState([]);

  const getFormTitle = () => {
    if (formStepper === 0) {
      return "Provide your Office Address";
    }
    if (formStepper === 1) {
      return "Upload Documents";
    }
  };

  const handleChange = (event) => {
    if (event?.target?.name === "aadhar-upload") {
      setFormInputData({
        ...formInputData,
        aadharImage: event?.target?.files[0],
      });
    } else
      setFormInputData({
        ...formInputData,
        [event?.target?.name]: event?.target?.value,
      });
  };

  // useEffect(() => {
  //   if (formInputData?.aadharImage) {
  //     console.log("hshjsjh");
  //     const newImageUrls = [];
  //     const imageUrl = URL.createObjectURL(formInputData?.aadharImage);
  //     console.log(imageUrl, "ss");
  //   }
  // }, [formInputData?.aadharImage]);

  const getHDFCKycInfoComp = () => {
    return (
      <div className="w-full lg:w-[500px] h-[227px] mt-[120px] bg-white rounded-xl shadow flex items-center justify-center flex-col">
        <div className="text-center text-black text-base font-medium font-['Poppins']">
          Digital e-KYC will be done by
        </div>
        <Image
          src={HDFC}
          height={188}
          width={40}
          alt="bank logo"
          className="w-[188px]"
        />
      </div>
    );
  };
  const handleYes = () => {
    setShowQuestionModal(false);
    setFormStepper(4);
  };
  const handleNo = () => {
    setShowQuestionModal(false);
  };

  return (
    <div className="container mx-auto mt-[24px] flex flex-col items-center">
      {formStepper <= 1 && (
        <div className="flex flex-col justify-start gap-[18px] px-20 max-sm:px-2">
          <BankBanner bankImage={HDFC} />
          <div className="flex flex-col lg:w-[50vw] bg-white rounded-xl px-[60px] py-[40px] max-sm:w-[90vw] max-sm:px-[20px]">
            {formStepper === 0 && (
              <>
                <div className="text-center  max-sm:pt-[20px]text-neutral-800 text-2xl font-medium font-['Poppins'] mb-[20px] max-sm:mb-0 max-sm:text-[18px]">
                  {getFormTitle()}
                </div>
                <div className="flex flex-col">
                  <CommonInputLabel labelTitle={staticLabels?.officeAddress} />
                  <input
                    id="officeAddress"
                    name="officeAddress"
                    type="text"
                    required
                    placeholder="officeAddress"
                    className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] 
              `}
                    onChange={(e) =>
                      setFormInputData({
                        ...formInputData,
                        officeAddress: e?.target?.value,
                      })
                    }
                    value={formInputData?.officeAddress}
                    maxLength={20}
                  />
                </div>
                <div className="grid grid-cols-2 gap-[20px] mt-[20px] max-sm:grid-cols-1">
                  <CommonEmailInput
                    value={formInputData?.email}
                    handleChange={handleChange}
                  />
                  <div className="relative">
                    <PincodeInput
                      value={formInputData?.pin_code}
                      // getData={getPinCodeList}
                      handleChange={handleChange}
                      // handlePincodeChange={handlePincodeChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[20px] mt-[20px] max-sm:grid-cols-1">
                  <div className=" flex flex-col">
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
                        setFormInputData({
                          ...formInputData,
                          city: e?.target?.value,
                        })
                      }
                      value={formInputData?.city}
                      maxLength={20}
                    />
                  </div>
                  <div className="flex flex-col">
                    <CommonInputLabel labelTitle={staticLabels?.state} />
                    <div className="dropdown mt-[5px] shadow rounded-lg w-full text-[#212529] leading-tight focus:outline-none focus:shadow-outline border-[#C2CACF]">
                      <DropdownList
                        value={states}
                        onChange={(nextValue) => setStates(nextValue)}
                        data={stateList}
                      />
                    </div>
                  </div>
                </div>
                <CommonNextButton
                  title="Submit"
                  handleSubmit={() => setFormStepper(1)}
                />
              </>
            )}
            {formStepper === 1 && (
              <>
                <div className="text-center  max-sm:pt-[20px]text-neutral-800 text-2xl font-medium font-['Poppins'] mb-[20px] max-sm:mb-0 max-sm:text-[18px]">
                  {getFormTitle()}
                </div>
                <div className="flex flex-col mt-[20px]">
                  <CommonInputLabel labelTitle={staticLabels?.aadharCard} />
                  <label
                    for="dropzone-file"
                    class="flex mt-[5px] flex-col items-end justify-center w-full h-[52px] border-2 border-gray-300 rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 mb-[3px]"
                  >
                    <input
                      input
                      id="dropzone-file"
                      type="file"
                      // class="hidden"
                      name="aadhar-upload"
                      className="aadharUpload"
                      placeholder="Chhose file to upload"
                      onChange={(e) => handleChange(e)}
                      accept="image/*"
                      // accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    />
                  </label>
                </div>
                <div className="flex flex-col mt-[20px]">
                  <CommonInputLabel labelTitle={staticLabels?.panCard} />
                  <label
                    for="dropzone-file"
                    class="flex mt-[5px] flex-col items-end justify-center w-full h-[52px] border-2 border-gray-300 rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 mb-[3px]"
                  >
                    <input
                      type="file"
                      name="pan-upload"
                      id="upload"
                      className="aadharUpload"
                      placeholder="Chhose file to upload"
                      onChange={(e) => handleChange(e)}
                      accept="image/*"
                      // accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    />
                  </label>
                </div>
                <CommonNextButton
                  title="Submit"
                  handleSubmit={() => setFormStepper(2)}
                />
              </>
            )}
          </div>
        </div>
      )}
      {formStepper === 2 && (
        <>
          <CongratulationsScreen
            formStepper={formStepper}
            setFormStepper={setFormStepper}
            setShowQuestionModal={setShowQuestionModal}
          />
        </>
      )}
      {formStepper === 3 && getHDFCKycInfoComp()}
      {showQuestionModal && (
        <QuestionModal
          handleYes={handleYes}
          handleNo={handleNo}
          question="Are you sure you want to proceed
            to doorstep verification?"
          noText="No"
          yesText="Yes"
          message="This takes upto 5 days longer and requires physical documents to be submitted."
        />
      )}
      {formStepper === 4 && <PhysicalKycComp />}
    </div>
  );
};

export default HdfcForm;
