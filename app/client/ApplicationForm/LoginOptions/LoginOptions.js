import Image from "next/image";
import React from "react";

const LoginOptions = () => {
  return (
    <div className="mt-20 container mx-auto px-4 xl:px-12 flex flex-col items-center justify-center">
      <div className="w-[340px] text-neutral-800 text-2xl font-semibold font-['Faktum'] leading-[28.80px] max-sm:text-center">
        Login
        <br className="max-sm:hidden" />
        to HDFC Banks
      </div>
      <div className="mt-10">
        <div className="min-[325px]:w-[320px] md:w-[400px] bg-white shadow-lg rounded-xl h-[103px] flex  px-[35px] py-[21px] gap-[18px]">
          <Image
            src="/assets/netbanking.svg"
            alt="netbanking"
            height={48}
            width={48}
          />
          <div className="flex flex-col items-start justify-center">
            <div className="text-black text-[15px] font-semibold font-['Faktum']">
              Net Banking
            </div>
            <div className="text-black text-xs font-normal font-['Poppins']">
              Login using your customer
              <br />
              ID & Password
            </div>
          </div>
          <Image
            src="/assets/right_arrow.svg"
            alt="arrow"
            height={24}
            width={24}
            className="md:ml-10"
          />
        </div>
        <div className="mt-[19px] flex flex-row items-center justify-center gap-x-[10px]">
          <Image src="/assets/line.svg" width={63} height={1} alt="border" />
          <div className="text-zinc-950 text-[15px] font-normal font-['Poppins']">
            OR
          </div>
          <Image src="/assets/line.svg" width={63} height={1} alt="border" />
        </div>
        <div className="min-[325px]:w-[250px] md:w-[400px] bg-white shadow-lg rounded-xl h-[103px] flex  px-[35px] py-[21px] gap-[18px]">
          <Image
            src="/assets/debit.svg"
            alt="netbanking"
            height={48}
            width={48}
          />
          <div className="flex flex-col items-start justify-center">
            <div className="text-black text-[15px] font-semibold font-['Faktum']">
              Debit / ATM Card
            </div>
            <div className="text-black text-xs font-normal font-['Poppins']">
              Keep your credit card details handy
            </div>
          </div>
          <Image
            src="/assets/right_arrow.svg"
            alt="arrow"
            height={24}
            width={24}
            className="md:ml-10"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginOptions;
