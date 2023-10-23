import React from "react";
import BankBanner from "../Common/BankBanner/BankBanner";
import HDFC from "../../../public/assets/HDFC.svg";
import EligibleProductCards from "../Common/EligibleProductCards/EligibleProductCards";

const HdfcEligibleProducts = () => {
  return (
    <div className="flex flex-col container mx-auto lg:mx-[80px] md:px-[8px]">
      <div className="max-sm:mx-[20px] md:mx-[12px]">
        <BankBanner bankImage={HDFC} />
        <div className="text-neutral-800 text-3xl max-sm:text-[24px] max-sm:leading-[28.8px] font-semibold font-['Faktum'] leading-9 mt-[18px]">
          You are eligible for these products
        </div>
      </div>
      <EligibleProductCards />
      <EligibleProductCards />
    </div>
  );
};

export default HdfcEligibleProducts;
