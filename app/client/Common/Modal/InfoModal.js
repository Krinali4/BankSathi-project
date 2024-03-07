import Image from "next/image";
import React from "react";

const InfoModal = ({ data }) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <Image
        src={data?.imageSrc}
        alt="image"
        height={data?.height}
        width={data?.width}
        className="mt-10 md:mt-10"
      />
      {data?.title1 && (
        <div className="text-center text-neutral-800 text-xl font-semibold font-['Faktum'] md:mt-[35px] mt-[10px]">
          {data?.title1}
        </div>
      )}
      {data?.title2 && (
        <div className="text-center text-neutral-800 text-[13px] font-normal font-['Poppins'] leading-[20.80px] md:mt-[10px] mt-[10px]">
          {data?.title2}
        </div>
      )}
      <div className="md:mt-[30px] mt-[24px] shadow-md bg-white rounded-xl h-auto md:w-[443px] w-full flex flex-col md:p-[30px] p-[20px]">
        <div className="text-neutral-700 text-sm font-medium font-['Poppins'] leading-tight">
          Application Reference
        </div>
        <div className="text-gray-400 text-[13px] font-normal font-['Poppins'] mt-[22px]">
          Application Reference No
        </div>
        {data?.applicationRefNo && (
          <div className="text-black text-[15px] font-normal font-['Poppins']">
            {data?.applicationRefNo}
          </div>
        )}
        <div className="text-gray-400 text-[13px] font-normal font-['Poppins'] mt-[22px]">
          Date
        </div>
        {data?.date && (
          <div className="text-black text-[15px] font-normal font-['Poppins']">
            {data?.date}
          </div>
        )}
      </div>
      <div className="mt-[30px] max-sm:mb-4 text-left w-full md:w-[443px]">
        <button
          type="submit"
          onClick={data?.handleClick}
          className={`w-full text-[15px]items-center cursor-pointer font-semibold font-['Faktum'] leading-normal text-neutral-800 max-[280px]:text-[15px] max-[771px]:text-[16px] px-5 py-[15px]  bg-[#49D49D] rounded-lg max-[771px]:px-3 `}
        >
          {data?.buttonTitle}
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
