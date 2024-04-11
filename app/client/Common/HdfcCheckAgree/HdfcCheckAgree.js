import { useRouter } from "next/navigation";
import { Router } from "next/router";
import React, { useState } from "react";

const HdfcCheckAgree = ({ setCheckAgree, checkAgree, setTermsModal }) => {
  const router = useRouter()
  const [termsModalVisible, setTermsModalVisible] = useState(false);

  const handleContentTerms = () => {
    // Navigate to terms and conditions page
    router.push("/consentConditions");
    // Open the modal
    setTermsModalVisible(true);
  };

  return (
    <div>
      <div className="flex items-start mt-[24px] max-sm:mt-0 gap-2">
        <input
          className="mr-1 mt-[5px]  w-5 h-5 max-md:min-w-4 max-md:min-h-4 max-lg:w-10 max-lg:min-h-10 	 text-white accent-[#49D49D] "
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
          {termsModalVisible && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => setTermsModalVisible(false)}>
                 
                </span>
                
              </div>
            </div>
          )}
          <span className="text-neutral-800 text-xs font-normal font-['Poppins'] underline leading-tight" onClick={handleContentTerms}>
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
