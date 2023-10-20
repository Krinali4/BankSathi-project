import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const TermsandConditionModal = ({ width, setShowTermsAndConditionModal }) => {
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
          <div className="flex min-h-full flex-col h-auto items-center justify-center p-4 text-center max-sm:p-0">
            <div
              className={`${
                width || "md:w-[550px]"
              } h-auto py-[38px] bg-white flex items-items justify-items flex-col rounded-xl px-[30px]`}
            >
              <div className="flex flex-start flex-col">
                <div className="text-neutral-800 text-left  text-2xl font-semibold font-['Faktum']">
                  Terms & Condition
                </div>
                <div className="mt-[15px] text-black text-left text-[15px] font-normal font-['Poppins'] leading-normal">
                  Please confirm that you are willing to authenticate with HDFC
                  Bank credentials for{" "}
                  <span className="text-indigo-600 text-[15px] font-normal font-['Poppins'] leading-normal">
                    <Link href="https://www.banksathi.com/">
                      www.banksathi.com
                    </Link>
                  </span>
                </div>
                <div className=" text-left mt-[16px] text-black text-[15px] font-normal font-['Poppins'] leading-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </div>
              </div>
              <div className="mt-[21px] flex flex-col !items-center !justify-center">
                <button
                  onClick={() => setShowTermsAndConditionModal(false)}
                  className="head-text font-[faktum] w-[300px] h-[48px] max-sm:w-[160px] rounded-lg text-center bg-[#49D49D] !text-[#212529] px-[24px] py-[18.5px] text-[15px] mx-auto flex items-center justify-center md:text-[12px]"
                >
                  I Agree
                </button>
                <div
                  onClick={() => setShowTermsAndConditionModal(false)}
                  className="text-center cursor-pointer text-emerald-400 text-[15px] font-semibold font-['Faktum'] leading-normal mt-[12px]"
                >
                  I Disagree
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsandConditionModal;
