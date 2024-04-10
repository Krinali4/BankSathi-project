'use client'
import Image from "next/image";
import React, { useState } from "react";
import CommonNextButton from "../Common/Button/Button";
import { removeNonAlphaNumeric } from "@/commonUtils/util";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";
import CommonInputLabel from "../Common/CommonInputComponents/CommonInputLabel";

const EVerifyIncome = ({
  additionalDetailsStepper,
  setAdditionalDetailsStepper,
}) => {
  const account = "Account Aggregator";
  const netBanking = "Net Banking";

  const [selectedIncome, setSelectedIncome] = useState("");
  const [isBank, setIsBank] = useState(false);

  let isClicked = false;

  const handleClick = () => {
    isClicked === true;
    setIsBank(true);
  };
  const getAccountFields = () => {
    return (
      <div className="mt-4 w-full md:w-auto">
        <CommonInputLabel labelTitle={staticLabels?.selectedAggregator} />
        <div
          className={`shadow border rounded-lg md:w-[300px] w-full h-[50px] py-[14px] px-4 text-[12px] leading-tight border-[#C2CACF] focus:outline-none focus:shadow-outline bg-[#F4F8FB] text-[#212529] first-letter`}
        >
          <input
            id="account_aggregator"
            name="account_aggregator"
            type="text"
            required
            // pattern="[A-Za-z]+"
            onInput={(e) => {}}
            className="text-[#212529] border-none  outline-none bg-[#F4F8FB]"
            placeholder="First Name"
            onChange={(e) => {}}
            value={""}
            maxLength={20}
          />
        </div>
        <div className="mt-4">
          <CommonInputLabel labelTitle={staticLabels?.registeredNo} />
          <div
            className={`shadow border rounded-lg md:w-[300px] w-full h-[50px] py-[14px] px-4 text-[12px] leading-tight border-[#C2CACF] focus:outline-none focus:shadow-outline bg-[#F4F8FB] text-[#212529] first-letter`}
          >
            <input
              id="mobile_no"
              name="mobile_no"
              type="text"
              required
              // pattern="[A-Za-z]+"
              onInput={(e) => {}}
              className="text-[#212529] border-none  outline-none bg-[#F4F8FB]"
              placeholder="+91-9900141870"
              onChange={(e) => {}}
              value={""}
              maxLength={20}
            />
          </div>
        </div>
        <div className="flex items-center">
          <CommonNextButton
            title="Continue"
            width="md:w-[300px] max-[320px]:w-[280px] max-sm:w-[343px]"
            handleSubmit={() => () => {}}
          />
        </div>
      </div>
    );
  };

  const getNetBankingFields = () => {
    return (
      <div className="mt-4">
        <CommonInputLabel labelTitle={staticLabels?.customerId} />
        <div
          className={`shadow border rounded-lg w-full h-[50px] py-[14px] px-4 text-[12px] leading-tight border-[#C2CACF] focus:outline-none focus:shadow-outline bg-[#F4F8FB] text-[#212529] first-letter`}
        >
          <input
            id="customer_id"
            name="customer_id"
            type="text"
            required
            // pattern="[A-Za-z]+"
            onInput={(e) => {}}
            className="text-[#212529] border-none  outline-none bg-[#F4F8FB]"
            placeholder="customerid"
            onChange={(e) => {}}
            value={""}
            maxLength={20}
          />
        </div>
        <div className="mt-4">
          <CommonInputLabel labelTitle={staticLabels?.password} />
          <div
            className={`shadow border rounded-lg w-full h-[50px] py-[14px] px-4 text-[12px] leading-tight border-[#C2CACF] focus:outline-none focus:shadow-outline bg-[#F4F8FB] text-[#212529] first-letter`}
          >
            <input
              id="password"
              name="password"
              type="text"
              required
              // pattern="[A-Za-z]+"
              onInput={(e) => {}}
              className="text-[#212529] border-none  outline-none bg-[#F4F8FB]"
              placeholder="******"
              onChange={(e) => {}}
              value={""}
              maxLength={20}
            />
          </div>
        </div>
        <div className="flex items-center">
          <CommonNextButton
            title="Continue"
            width="md:w-[300px] max-[320px]:w-[280px] max-sm:w-[343px]"
            handleSubmit={() => () => {}}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto md:px-12 px-4">
      <div className="flex flex-col md:items-center items-center justify-center  ">
        <p className="text-neutral-800 text-2xl font-semibold font-['Faktum'] leading-[28.80px] sm:w-auto w-full">
          E-Verify Your Income
        </p>
        <p className="text-zinc-500 text-sm font-normal font-['Poppins'] mt-[20px] sm:w-auto w-full">
          Or from the option below
        </p>
        <div className="flex items-start flex-col sm:item-center w-full md:w-auto ">
          <div
            className="md:w-[300px] w-[142px] h-auto border border-neutral-300 rounded-md flex flex-col p-[13px] cursor-pointer mt-[20px] sm:w-auto "
            onClick={() => {}}
          >
            <div className="flex flex-row !justify-between">
              <Image
                src="/assets/hdfc-icon.svg"
                alt="bank icon"
                height={27}
                width={32}
              />
              <div>
                <Image
                  src={"/assets/edit.svg"}
                  alt="radio"
                  height={14}
                  width={14}
                  className=""
                />
              </div>
            </div>
            <div className="mt-[14px] text-black text-sm font-normal font-['Poppins']">
              HDFC Bank
            </div>
          </div>
          {!isBank && (
            <div className="md:w-[300px] text-black text-sm font-normal font-['Poppins'] mt-[15px] sm:text-center items-start">
              Please select one of the options available to proceed with your
              income verification
            </div>
          )}
        </div>
        {!isBank && (
          <>
            <div
              className="md:w-[343px] w-full  h-auto mt-[20px] bg-white rounded-lg border border-neutral-300 flex items-center gap-[20px] justify-center px-[15px] py-[30px] relative"
              onClick={() => setSelectedIncome(account)}
            >
              <Image
                src={
                  selectedIncome === account
                    ? "/assets/radio-button-fill.svg"
                    : "/assets/radio-button-gray.svg"
                }
                alt="radio"
                height={14}
                width={14}
                className=""
              />
              <div className="flex flex-col items-start justify-center">
                <div className="text-black text-base font-semibold font-['Poppins']">
                  {account}
                </div>
                <div className="text-black text-xs font-normal font-['Poppins'] mt-[5px]">
                  Share details using an RBI Licensed Process
                </div>
                <div className="text-blue-400 text-xs font-normal font-['Poppins'] mt-[2px]">
                  What is an account aggregator ?
                </div>
              </div>
            <Image
              src="/assets/recommended.svg"
              height={30}
              width={118}
              alt="recommended"
              className="absolute right-0 top-0"
            />
            </div>
            <div
              className="mt-[26px] md:w-[343px] w-full h-auto bg-white rounded-lg border border-neutral-300 flex items-center gap-[10px] justify-center px-[15px] py-[20px]"
              onClick={() => setSelectedIncome(netBanking)}
            >
              <Image
                src={
                  selectedIncome === netBanking
                    ? "/assets/radio-button-fill.svg"
                    : "/assets/radio-button-gray.svg"
                }
                alt="radio"
                height={14}
                width={14}
                className=""
              />
              <div className="flex flex-col items-start justify-center">
                <div className="text-black text-base font-semibold font-['Poppins']">
                  {netBanking}
                </div>
                <div className="text-black text-xs font-normal font-['Poppins'] mt-[5px]">
                  Share details using your banking credentials
                </div>
              </div>
            </div>
            <div className="mb-20 flex items-center">
              <CommonNextButton
                title="Continue"
                width="md:w-[343px] max-[320px]:w-[280px] max-sm:w-[343px]"
                handleSubmit={() => handleClick()}
                disable={selectedIncome === ""}
              />
            </div>
          </>
        )}
        {/* -------ONCE SELECTED SOMETHING----- */}
        {isBank && (
          <>
            {selectedIncome === account && getAccountFields()}
            {selectedIncome === netBanking && getNetBankingFields()}
          </>
        )}
      </div>
    </div>
  );
};

export default EVerifyIncome;
