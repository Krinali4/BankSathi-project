import Image from "next/image";
import React from "react";

const HdfcHeader = () => {
  return (
    <div className="w-[100vw] bg-[#ffff] shadow-md mb-[24px] flex items-center h-[50px]">
      <div className="flex items-center container mx-auto ">
        <Image
          src="/assets/mobile-logo-sticky.svg"
          height={35}
          width={28}
          alt="logo"
          className="py-[10px] ml-[20px] mr-[15px]"
        />
        <Image src="/assets/HDFC.svg" height={27} width={111} alt="hdfc" />
      </div>
    </div>
  );
};

export default HdfcHeader;
