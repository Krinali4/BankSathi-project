import React from "react";
import BankBanner from "../Common/BankBanner/BankBanner";
import HDFC from "../../../public/assets/HDFC.svg";
import EligibleProductCards from "../Common/EligibleProductCards/EligibleProductCards";

const HdfcEligibleProducts = () => {
  return (
    <div className="flex flex-col container mx-auto lg:px-10 md:px-[8px] mb-4">
      <div className="max-sm:mx-[20px] md:mx-[12px]">
        <BankBanner bankImage={HDFC} />
      </div>
      <EligibleProductCards />
    </div>
  );
};

export default HdfcEligibleProducts;
