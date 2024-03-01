import React from "react";

const CommonCheckAgree = ({ isAgree, setIsAgree, message }) => {
  return (
    <div className="flex items-center mt-[24px] max-sm:mt-0 gap-2">
      <input
        className="mr-1  w-4 h-4  max-sm:w-8 max-sm:h-8 text-white accent-[#49D49D] "
        type="checkbox"
        checked={isAgree}
        required
        onChange={(e) => {
          setIsAgree(e.target?.checked);
        }}
      />
      <p className="text-[15px] text-[#212529] font-normal max-[479px]:text-[14px] max-[375px]:text-[13px]">
        {message}
        <span className=""></span>
      </p>
    </div>
  );
};

export default CommonCheckAgree;
