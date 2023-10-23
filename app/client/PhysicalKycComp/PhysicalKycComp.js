import React from "react";
import greenAuth from "../../../public/assets/green-tick.svg";
import Image from "next/image";
import pointer1 from "../../../public/assets/pointer1.svg";
import pointer2 from "../../../public/assets/pointer2.svg";
import pointer3 from "../../../public/assets/pointer3.svg";
import statusCompleted from "../../../public/assets/statusGreenIcon.svg";
import statusPending from "../../../public/assets/statusPending.svg";
import greenBorder from "../../../public/assets/greenBorder.svg";
import grayBorder from "../../../public/assets/grayBorder.svg";
import faqIcon from "../../../public/assets/faq-circle.svg";
import rightArrow from "../../../public/assets/right-arrow.svg";
import helpIcon from "../../../public/assets/help-circle.svg";

const PhysicalKycComp = () => {
  return (
    <div className="flex flex-col items-start justify-start mt-[40px] max-[768px]:px-[20px]">
      <div className="flex flex-row gap-[5px] items-center ">
        <Image
          src={greenAuth}
          height={60}
          width={60}
          alt="green logo"
          className="relative md:right-3"
        />
        <div className="text-black text-2xl font-semibold font-['Faktum'] max-sm:text-[20px]">
          Physical KYC
        </div>
      </div>
      <div className="mt-[12px] text-black text-base font-normal font-['Poppins'] leading-snug max-sm:text-[16px]">
        Keep the following things ready for the collection & verification{" "}
      </div>
      <div className="mt-[20px] flex flex-row items-baseline gap-[10px] max-[768px]:flex-col">
        <div className="flex items-start gap-[10px]">
          <Image src={pointer1} height={30} width={30} alt="pointer" />
          <div className="flex flex-col items-start gap-[3px]">
            <div className=" text-black text-sm font-semibold font-['Poppins'] leading-tight max-sm:text-[14px]">
              Original Address Proof
            </div>
            <div className="lg:w-[11.8vw] text-gray-500 text-xs font-normal font-['Poppins'] leading-none max-sm:text-[12px]">
              You can show your Aadhaar card, Water Bill, Permanent Driving
              Licence, Passbook etc.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[10px]">
          <Image src={pointer2} height={30} width={30} alt="pointer" />
          <div className=" text-black text-sm font-semibold font-['Poppins'] leading-tight max-sm:text-[14px]">
            Copy of Aadhaar Card
          </div>
        </div>
        <div className="flex items-center gap-[10px]">
          <Image src={pointer3} height={30} width={30} alt="pointer" />
          <div className=" text-black text-sm font-semibold font-['Poppins'] leading-tight max-sm:text-[14px]">
            Copy of PAN Card
          </div>
        </div>
      </div>
      <div className="border border-[#DDDDDD] py-[16px] px-[16px] text-[#212529] mt-[30px] flex flex-col gap-[5px] lg:w-[50vw]">
        <div className="text-black text-sm font-medium font-['Poppins'] leading-tight">
          We will reach out to you to schedule a slot for your document
          verification
        </div>
        <div className="text-gray-500 text-xs font-normal font-['Poppins'] leading-none">
          Our partner, bank’s agent will call you to get a date, time & address
          for <br></br> document review & collection.
        </div>
      </div>
      <div className="mt-[30px] text-black text-base font-semibold font-['Poppins'] leading-snug max-sm:text-[14px]">
        Track your card issuance status
      </div>
      <div className="mt-[1px] text-gray-500 text-[15px] font-normal font-['Poppins'] leading-[21px]">
        Application ID : HDFC145778784
      </div>
      <div className="flex flex-row items-start gap-[11px] mt-[12px]">
        <div className="text-gray-500 text-[13px] font-normal font-['Poppins'] leading-[18.20px]">
          16 Oct, 06:30 PM
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={statusCompleted}
            height={24}
            width={24}
            alt="green logo"
            // className="relative md:right-3"
          />
          <Image
            src={greenBorder}
            height={38}
            width={0}
            alt="green logo"
            className="relative md:bottom-1"
          />
          <Image
            src={statusPending}
            height={16}
            width={16}
            alt="green logo"
            className="relative md:bottom-1"
          />
          <Image
            src={grayBorder}
            height={42}
            width={0}
            alt="green logo"
            className="relative md:bottom-1"
          />
          <Image
            src={statusPending}
            height={16}
            width={16}
            alt="green logo"
            className="relative md:bottom-1"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-black text-[15px] font-medium font-['Poppins'] leading-[21px] mb-[30px] max-sm:text-[12px]">
            Card Offer
          </div>
          <div className="flex flex-col gap-[1px]">
            <div className="text-black text-[15px] font-medium font-['Poppins'] leading-[21px] max-sm:text-[12px]">
              Verification in process
            </div>
            <div className="text-gray-500 text-[13px] font-normal font-['Poppins'] leading-[18.20px] max-sm:text-[12px]">
              Takes upto 3-5 business days
            </div>
          </div>
          <div className="text-black text-[15px] font-medium font-['Poppins'] leading-[21px] mt-[16px] max-sm:text-[12px]">
            Card Issued
          </div>
        </div>
      </div>
      <div className="border border-[#DDDDDD]  px-[20px] text-[#212529] mt-[30px] flex flex-row gap-[5px] max-[766px]:flex-col">
        <div className="flex flex-row items-center gap-[20px] py-[18px]">
          <Image
            src={faqIcon}
            height={40}
            width={40}
            alt="help icon"
            // className="relative md:right-3"
          />
          <div className="flex flex-col gap-[2px]">
            <div className="text-black text-sm max-sm:text-[14px] font-semibold font-['Poppins'] leading-tight">
              FAQs
            </div>
            <div className="text-gray-500 text-xs max-sm:text-[14px] font-normal font-['Poppins'] leading-none">
              Frequently Asked Questions
            </div>
          </div>
          <div className="cursor-pointer">
            <Image
              src={rightArrow}
              height={6}
              width={8}
              alt="right icon"
              className="relative lg:left-[21%] max-sm:left-[16%]"
            />
          </div>
        </div>
        <div className="border border-1 border-l-0 border-t-0 md:border-b-0 px-[40px]"></div>
        <div className="flex flex-row items-center gap-[20px] py-[18px] md:ml-6">
          <Image
            src={helpIcon}
            height={40}
            width={40}
            alt="help icon"
            // className="relative md:right-3"
          />
          <div className="flex flex-col gap-[2px]">
            <div className="text-black text-sm font-semibold font-['Poppins'] leading-tight">
              Help & Support
            </div>
            <div className="text-gray-500 text-xs font-normal font-['Poppins'] leading-none">
              24x7 assistance for your queries and support
            </div>
          </div>
          <div className="cursor-pointer">
            <Image
              src={rightArrow}
              height={6}
              width={8}
              alt="right icon"
              // className="lg:relative lg:21%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalKycComp;
