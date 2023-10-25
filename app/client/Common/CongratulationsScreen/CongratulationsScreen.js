import Image from "next/image";
import React, { useState } from "react";
import greenTick from "../../../../public/assets/green-tick.svg";
import accordionArrow from "../../../../public/assets/accordion.svg";
import CommonNextButton from "../Button/Button";
import QuestionModal from "../Modal/QuestionModal";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";
import TermsandConditionModal from "../Modal/TermsandConditionModal";

const CongratulationsScreen = ({
  setFormStepper,
  formStepper,
  setShowQuestionModal,
}) => {
  const [personalAccordionOpen, setPersonalAccordionOpen] = useState(false);
  const [officeDetailsAccordion, setOfficeDetailsAccordion] = useState(false);
  const [showTermsAndCondtionModal, setShowTermsAndConditionModal] =
    useState(false);

  const congratulationScreenbutton = (title, bg) => {
    return (
      <button
        onClick={() => {
          setShowTermsAndConditionModal(true);
        }}
        className={`flex items-center max-sm:w-full lg:w-[350px] h-[48px] mt-[28px] justify-center text-[#212529] px-[20px] cursor-pointer business-right-text py-3 w-full md:w-full rounded-lg font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px] ${
          bg ? "bg-none" : "bg-[#49D49D]"
        }`}
      >
        {title}
      </button>
    );
  };
  console.log(showTermsAndCondtionModal);
  return (
    <>
      <div className="mt-[40px] flex flex-col justify-center items-center">
        <Image src={greenTick} height={64} width={80} alt="modalimage" />
        <div className=" text-center text-neutral-800 text-2xl font-medium font-['Poppins'] mt-[18px]">
          Congratulations Ameet!
        </div>
        <div className="text-center text-neutral-800 text-[15px] font-normal font-['Poppins'] mt-[5px]">
          Your credit card is ready
        </div>
        <div className="max-[768px]:w-[90vw]">
          <div className="flex flex-col lg:w-[45vw] bg-white rounded-xl mt-[15px] p-[20px] pt-[2px]">
            <div
              id="accordionExample"
              data-active-classes="bg-none"
              data-inactive-classes="text-[#212529]"
              className=""
            >
              <button
                onClick={() => {
                  setPersonalAccordionOpen(!personalAccordionOpen);
                }}
                type="button"
                className="text-[#212529] gap-[16px] list-none font-semibold relative text-[15px] max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center max-sm:justify-between w-full text-left"
                data-accordion-target="#accordion-flush-body-1"
                aria-expanded="true"
                aria-controls="accordion-flush-body-1"
              >
                <div className="flex flex-col w-full gap-[4px] mt-[16px] px-[30px] max-sm:px-[15px] max-sm:border max-sm:border-b-1 max-sm:border-t-0 max-sm:border-l-0 max-sm:pb-[10px]">
                  <div className="flex justify-between flex-row items-center">
                    <div className=" text-neutral-800 text-[15px] font-medium font-['Poppins'] leading-[21px]">
                      {staticLabels?.personalDetails}
                    </div>
                    <Image
                      src={accordionArrow}
                      alt="down"
                      width={24}
                      height={24}
                      className={
                        personalAccordionOpen
                          ? "rotate-180 w-6 h-6 shrink-0"
                          : "w-6 h-6 shrink-0"
                      }
                    />
                  </div>
                  {personalAccordionOpen && <>personal details</>}
                </div>
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:w-[45vw] bg-white rounded-xl mt-[15px] p-[20px] pt-[2px]">
            <div
              id="accordionExample"
              data-active-classes="bg-none"
              data-inactive-classes="text-[#212529]"
              className=""
            >
              <button
                onClick={() =>
                  setOfficeDetailsAccordion(!officeDetailsAccordion)
                }
                type="button"
                className="text-[#212529] gap-[16px] list-none font-semibold relative text-[15px] max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center max-sm:justify-between w-full text-left"
                data-accordion-target="#accordion-flush-body-1"
                aria-expanded="true"
                aria-controls="accordion-flush-body-1"
              >
                <div className="flex flex-col w-full gap-[4px] mt-[16px] px-[30px] max-sm:px-[15px] max-sm:border max-sm:border-b-1 max-sm:border-t-0 max-sm:border-l-0 max-sm:pb-[10px]">
                  <div className="flex justify-between flex-row items-center">
                    <div className=" text-neutral-800 text-[15px] font-medium font-['Poppins'] leading-[21px]">
                      {staticLabels?.officeDetails}
                    </div>
                    <Image
                      src={accordionArrow}
                      alt="down"
                      width={24}
                      height={24}
                      className={
                        personalAccordionOpen
                          ? "rotate-180 w-6 h-6 shrink-0"
                          : "w-6 h-6 shrink-0"
                      }
                    />
                  </div>
                  {officeDetailsAccordion && (
                    <div className="flex flex-col mt-[15px]">
                      <div className="flex flex-col">
                        <div className="text-gray-400 text-xs font-normal font-['Poppins']">
                          {staticLabels?.occupationType}
                        </div>
                        <div className="text-neutral-800 text-[15px] font-normal font-['Poppins']">
                          Salaried
                        </div>
                      </div>
                      <div className="flex flex-col mt-[12px]">
                        <div className="text-gray-400 text-xs font-normal font-['Poppins']">
                          {staticLabels?.companyName}
                        </div>
                        <div className="text-neutral-800 text-[15px] font-normal font-['Poppins']">
                          Orion Digital Pvt. Ltd.
                        </div>
                      </div>
                      <div className="flex flex-col mt-[12px]">
                        <div className="text-gray-400 text-xs font-normal font-['Poppins']">
                          Designation
                        </div>
                        <div className="text-neutral-800 text-[15px] font-normal font-['Poppins']">
                          Sr. Accountant
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
        {congratulationScreenbutton("Start My Digital Verification")}
        <div className="mt-[5px] text-center text-neutral-800 text-xs font-medium font-['Poppins'] leading-none">
          Take less than 5 mins
        </div>
        <div className="mt-[15px] text-center text-neutral-800 text-xs font-medium font-['Poppins'] leading-none">
          OR
        </div>
        <button
          onClick={() => {
            setFormStepper(3);
            setShowTermsAndConditionModal(true);
          }}
          className={`flex items-center max-sm:w-full  border border-neutral-800 lg:w-[350px] h-[48px] mt-[10px] justify-center text-[#212529] px-[20px] cursor-pointer business-right-text py-[18px] w-full md:w-full rounded-lg font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px] ${"bg-none"}`}
        >
          Mobile number not linked with Aadhaar
        </button>
        <div
          className="mt-[4px] text-center text-neutral-800 text-xs font-medium font-['Poppins'] leading-none cursor-pointer"
          onClick={() => setShowQuestionModal(true)}
        >
          Proceed with doorstep verification - Takes upto 5 days
        </div>
      </div>
      {showTermsAndCondtionModal && (
        <TermsandConditionModal
          setShowTermsAndConditionModal={setShowTermsAndConditionModal}
        />
      )}
    </>
  );
};

export default CongratulationsScreen;
