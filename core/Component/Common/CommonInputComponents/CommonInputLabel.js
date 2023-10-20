import React from "react";

const CommonInputLabel = ({ labelTitle }) => {
  return (
    <div>
      <label
        className="text-neutral-800 text-[13px] font-normal font-['Poppins']"
        htmlFor={labelTitle}
      >
        {labelTitle}
      </label>
    </div>
  );
};

export default CommonInputLabel;
