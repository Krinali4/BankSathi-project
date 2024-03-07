import React from "react";
import CommonInputLabel from "./CommonInputLabel";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";

const PincodeInput = ({
  onChange,
  labelTitle,
  value,
  disabled,
  placeholder,
  className,
  getData,
  handleChange,
  handlePincodeChange,
  defaultValue,
  onFocus,
  pinCodeError = false,
}) => {
  return (
    <>
      <CommonInputLabel labelTitle={labelTitle || staticLabels?.pinCode} />
      <input
        AutoComplete
        type="zipcode-number"
        id="pin_code"
        name="pin_code"
        maxLength={6}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={
          onChange
            ? onChange
            : (e) => {
                const cleanedValue = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 6);
                if (getData && cleanedValue.length > 3) {
                  getData(cleanedValue);
                }
                if (handleChange) {
                  handleChange(e);
                }
                if (handlePincodeChange) {
                  handlePincodeChange(e);
                }
              }
        }
        onFocus={onFocus}
        className={
          className
            ? className
            : `shadow border rounded-lg w-full py-4 px-4 text-[12px] text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 ${
                pinCodeError ? "border-[#FF000F]" : ""
              } border-[#C2CACF]`
        }
        placeholder={placeholder ? placeholder : "Pin Code"}
        autoComplete="off"
      />
      {pinCodeError && (
        <p className="text-[12px] text-[#FF000F] font-no mt-2">
          Please enter a valid pin code
        </p>
      )}
    </>
  );
};

export default PincodeInput;
