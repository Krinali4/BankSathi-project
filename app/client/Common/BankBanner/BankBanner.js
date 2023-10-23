import Image from "next/image";
import React from "react";

const BankBanner = ({ bankImage }) => {
  return (
    <div className="mt-[44px] flex">
      <Image
        src={bankImage}
        height={188}
        width={40}
        alt="bank logo"
        className="w-[188px]"
      />
    </div>
  );
};

export default BankBanner;
