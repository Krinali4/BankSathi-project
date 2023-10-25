import Image from "next/image";
import React, { useEffect } from "react";

const ThankYouModal = ({
  image,
  title,
  subTitle,
  buttonText,
  handleButtonClick,
  width,
}) => {
  return (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black opacity-60 transition-opacity"></div>
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="fixed inset-0 z-10 w-screen">
          <div className="flex min-h-full  items-center justify-center p-4 text-center max-sm:p-0">
            <div
              className={`${
                width || "w-[343px]"
              } h-auto py-[38px] bg-white flex items-center justify-center flex-col rounded-xl`}
            >
              <Image src={image} height={64} width={80} alt="modalimage" />
              <div className=" text-center text-neutral-800 text-lg font-semibold font-['Poppins'] mb-[5px] mt-[24px]">
                {title}
              </div>
              <div className="text-center text-black text-[13px] font-normal font-['Poppins'] leading-[20.80px] px-[45px]">
                {subTitle}
              </div>
              <div className="mt-[20px]">
                <button
                  onClick={handleButtonClick}
                  className="head-text font-[faktum] w-[160px] h-[48px] max-sm:w-[160px] rounded-lg text-center bg-[#49D49D] !text-[#212529] px-[24px] py-[18.5px] text-[15px] mx-auto flex items-center justify-center md:text-[12px]"
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouModal;
