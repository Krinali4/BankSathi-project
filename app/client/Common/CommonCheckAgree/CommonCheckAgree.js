import React from "react";

const CommonCheckAgree = ({ isAgree, setIsAgree, message }) => {
  return (
    <div className="flex items-start mt-[24px]  gap-2 max-sm:px-0 px-5">
      <input
        className="mr-1  mt-1 w-4 h-4  max-sm:w-8 max-sm:h-4 text-white accent-[#49D49D] "
        type="checkbox"
        checked={isAgree}
        required
        onChange={(e) => {
          setIsAgree(e.target?.checked);
        }}
      />
      <p className="text-[14px] text-[#212529]  font-normal max-[479px]:text-[14px] sm:px-0 sm:mt-0  max-[375px]:text-[13px]">
        {message}
        <span className=""></span>
      </p>
    </div>
  );
};

export default CommonCheckAgree;
