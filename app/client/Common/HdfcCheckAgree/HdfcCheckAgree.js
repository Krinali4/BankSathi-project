import React from "react";

const HdfcCheckAgree = ({ setCheckAgree, checkAgree, setTermsModal }) => {
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
        <div className="">
          <span className="text-neutral-800 text-xs font-normal font-['Poppins'] leading-tight">
            By clicking on submit, I am agreeing to{" "}
          </span>
          <span className="text-neutral-800 text-xs font-normal font-['Poppins'] underline leading-tight">
            Consent Terms and General Terms & Conditions
          </span>
          <span className="text-neutral-800 text-xs font-normal font-['Poppins'] leading-tight">
            , Most Important{" "}
          </span>
          <span className="text-neutral-800 text-xs font-normal font-['Poppins'] underline leading-tight">
            Terms and Conditions
          </span>
          <span className="text-neutral-800 text-xs font-normal font-['Poppins'] leading-tight">
            ,{" "}
          </span>
          <span className="text-neutral-800 text-xs font-normal font-['Poppins'] underline leading-tight">
            Card Member
            <br className="md:hidden" />
            Agreement and Special Terms and Conditions
          </span>
          <span className="text-neutral-800 text-xs font-normal font-['Poppins'] leading-tight">
            ,<br className="md:hidden" />
            Key Fact Statement of HDFC Bank Ltd.
          </span>
        </div>
      </div>
    </div>
  );
};

export default HdfcCheckAgree;
