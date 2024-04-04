import Image from "next/image";
import React from "react";

const HdfcHeader = () => {
  return (
    <div className="w-full bg-[#ffff] shadow-md mb-[24px] flex items-center h-[50px]">
      <div className="flex items-center container mx-auto justify-between	">
      <div className="flex">
      <Image
          src="/assets/mobile-logo-sticky.svg"
          height={35}
          width={28}
          alt="logo"
          className="py-[10px] ml-[20px] mr-[15px]"
        />
        <Image src="/assets/HDFC.svg" height={27} width={111} alt="hdfc" />
      </div>
      
      <div className="flex">
      <Image
          src="/assets/serachIcon.svg"
          height={35}
          width={28}
          alt="logo"
          className="py-[10px] mr-[10px] "
        />
         <Image
          src="/assets/userIcon.svg"
          height={35}
          width={28}
          alt="logo"
          className="py-[10px] mr-[15px] "
        />
      </div>
      </div>
    </div>
  );
};

export default HdfcHeader;
