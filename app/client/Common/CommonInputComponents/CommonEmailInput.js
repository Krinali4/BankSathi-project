import { errorMessages } from "@/commonUtils/StaticContent/errorMessages";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";
import React, { useState } from "react";

const CommonEmailInput = ({
  handleChange,
  disabled,
  value,
  alt,
  className,
  errorHrefEmail,
  hideLabel = false,
}) => {
  const [errorEmail, setErrorEmail] = useState(false);

  const handleEmailChange = (event) => {
    const emailErr = event?.target?.value.replace(
      /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/g,
      ""
    );
    if (!emailErr) {
      setErrorEmail(false);
    } else {
      setErrorEmail(true);
    }
  };

  return (
    <>
      <div>
        {!hideLabel && (
          <label
            className="text-[13px] font-normal text-[#212529]  max-[768px]:text-[12px]"
            htmlFor="email"
          >
            {staticLabels?.email}
          </label>
        )}
        <input
          className={
            className
              ? className
              : `shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF] text-[12px] ${
                  disabled
                    ? "border-[#C2CACF] cursor-not-allowed bg-[#EFEFEF] text-[#8D9CA5]"
                    : "text-[#212529]"
                }`
          }
          alt={alt}
          id="email"
          name="email"
          type="email"
          placeholder="Valid email address"
          required
          value={value}
          onChange={(e) => {
            handleEmailChange(e);
            handleChange(e);
          }}
        />
        {errorHrefEmail && (
          <p className="text-[12px] text-[#FF000F] font-no mt-2">
            {errorMessages?.linkError}
          </p>
        )}
        {errorEmail && (
          <p className="text-[12px] text-[#FF000F] font-no">
            {errorMessages?.EmailValidError}
          </p>
        )}
      </div>
    </>
  );
};

export default CommonEmailInput;
