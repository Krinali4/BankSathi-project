'use client'

import React, { useState } from "react";
import CommonInputLabel from "../Common/CommonInputComponents/CommonInputLabel";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";
import { DropdownList } from "react-widgets";
import Image from "next/image";
import CommonNextButton from "../Common/Button/Button";
import { useRouter } from "next/navigation";

export const mockBanks = [
  {
    id: "1",
    name: "HDFC Bank",
    image: "/assets/hdfc-icon.svg",
  },
  {
    id: "2",
    name: "Axis Bank",
    image: "",
  },
  {
    id: "3",
    name: "ICICI",
    image: "",
  },
  {
    id: "4",
    name: "KOTAK",
    image: "",
  },
  {
    id: "5",
    name: "Canara Bank",
    image: "",
  },
  {
    id: "6",
    name: "IDFC",
    image: "",
  },
];

const IncomeVerification = ({ setAdditionalDetailsStepper }) => {
  const [activeBank, setActiveBank] = useState("HDFC Bank");
  const [states, setStates] = useState("Hdfc");
  const [banksList, setBanksList] = useState(["HDFC", "ICICI"]);
const route = useRouter();
  const handleClick = (item) => {
    setActiveBank(item?.name);
  };
  const handleNextClick = () => {
  route.push("/eVerifyIncome")
  }
  return (
    <div className="container mx-auto md:px-12 px-4">
      <div className="flex flex-col md:items-center items-center justify-center">
        <p className="text-neutral-800 text-2xl font-semibold font-['Faktum'] leading-[28.80px]">
          Income Verification
        </p>
        <div className="md:w-[750px] w-full h-auto p-[25px] rounded-2xl mt-[20px] bg-white shadow-lg">
          <div className="flex flex-col">
            <CommonInputLabel labelTitle={staticLabels?.selectBank} />
            <div className="dropdown mt-[5px] shadow rounded-lg w-full text-[#212529] leading-tight focus:outline-none focus:shadow-outline border-[#C2CACF]">
              <DropdownList
                value={states}
                onChange={(nextValue) => setStates(nextValue)}
                data={banksList}
              />
            </div>
            <p className="text-zinc-500 text-sm font-normal font-['Poppins'] mt-[20px]">
              Or from the option below
            </p>
            <div className="mt-[20px] grid grid-cols-2 gap-[20px]">
              {mockBanks?.map((item) => {
                return (
                  <div
                    className="w-auto h-auto border border-neutral-300 rounded-md flex flex-col p-[13px] cursor-pointer"
                    onClick={() => handleClick(item)}
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
                          src={
                            activeBank === item?.name
                              ? "/assets/radio-button-fill.svg"
                              : "/assets/radio-button-gray.svg"
                          }
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
                );
              })}
            </div>
          </div>
        </div>
        <div className="mb-20 flex items-center">
          <CommonNextButton
            title="Continue"
            width="md:w-[550px] max-[320px]:w-[280px] max-sm:w-[343px]"
            handleSubmit={handleNextClick}
          />
        </div>
      </div>
    </div>
  );
};

export default IncomeVerification;
