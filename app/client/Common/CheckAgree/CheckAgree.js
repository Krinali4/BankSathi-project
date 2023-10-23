import { consentMessages } from "@/commonUtils/StaticContent/consentMessages";
import Link from "next/link";
import React from "react";

const CheckAgree = ({ setCheckAgree, checkAgree, setTermsModal }) => {
  return (
    <div>
      <div className="flex items-center mt-[24px] max-sm:mt-0 gap-2">
        <input
          className="mr-1  w-4 h-4  max-sm:w-8 max-sm:h-8 text-white accent-[#49D49D] "
          type="checkbox"
          checked={checkAgree}
          required
          onChange={(e) => {
            setCheckAgree(e.target?.checked);
            if (
              checkAgree === false ||
              checkAgree === null ||
              checkAgree === undefined
            ) {
              setTermsModal(true);
            }
          }}
        />
        <p className="text-[15px] text-[#212529] font-normal max-[479px]:text-[14px] max-[375px]:text-[13px]">
          {consentMessages?.checkAgree}
          <Link
            href="https://www.banksathi.com/terms-use"
            className="!underline pl-2 !font-medium text-[#212529]"
            onClick={() => setTermsModal(true)}
          >
            terms and conditions.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckAgree;
