import React from "react";

const CommonNextButton = ({
  title,
  handleSubmit,
  disable,
  width,
  mobileWidth,
}) => {
  return (
    <div className="mt-[30px] max-sm:mb-4 text-center w-full">
      <button
        type="submit"
        disabled={disable}
        onClick={handleSubmit}
        className={
          disable
            ? `text-[15px] ${
                width ? width : "w-[200px]"
              } items-center cursor-pointer font-semibold font-['Faktum'] leading-normal text-neutral-800 max-[280px]:text-[15px] max-[771px]:text-[16px] px-5 py-[15px]  bg-[#E6ECF1] rounded-lg max-[771px]:px-3 ${
                mobileWidth || "max-sm:w-[160px]"
              }`
            : `text-[15px] ${
                width ? width : "w-[200px]"
              } items-center cursor-pointer font-semibold font-['Faktum'] leading-normal text-neutral-800 max-[280px]:text-[15px] max-[771px]:text-[16px] px-5 py-[15px]  bg-[#49D49D] rounded-lg max-[771px]:px-3 ${
                mobileWidth || "max-sm:w-[160px]"
              }`
        }
      >
        {title}
      </button>
    </div>
  );
};
export default CommonNextButton;
