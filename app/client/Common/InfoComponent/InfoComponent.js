import React from "react";
import infoIcon from "../../../../public/assets/ri-information-fill.svg";
import Image from "next/image";

const InfoComponent = ({ informationText }) => {
  return (
    <div className="w-[495px] h-auto px-[18px] py-[10px] bg-[#ECDEFF] rounded justify-start items-start gap-2.5 flex max-sm:w-full">
      <Image src={infoIcon} height={18} width={18} alt="riInfoFill" />
      <div className="text-neutral-800 text-[13px] font-normal font-['Poppins']">
        {informationText}
      </div>
    </div>
  );
};

export default InfoComponent;
