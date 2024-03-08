import { useRouter } from "next/navigation";
import React from "react";

const ApplyNowButton = ({ data, addMargin, productCode }) => {
  const router = useRouter();

  const handleApplyNow = () => {
    router.push(`/application-form?code=${productCode}`);
  };
  return (
    <div>
      <button
        key={data?.id}
        onClick={() => handleApplyNow()}
        className={`text-[#212529] px-4 cursor-pointer business-right-text py-3 w-full lg:w-[160px] md:w-full rounded-lg  bg-[#49D49D] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px] ${
          addMargin ? "mr-[12px]" : ""
        }`}
      >
        Apply now
      </button>
    </div>
  );
};

export default ApplyNowButton;
