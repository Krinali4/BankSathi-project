import React from "react";
import CommonInputLabel from "./CommonInputLabel";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";

const PincodeInput = ({
  onChange,
  value,
  disabled,
  placeholder,
  className,
  getData,
  handleChange,
  handlePincodeChange,
  defaultValue,
  labelTitle,
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
                e.target.value = e.target.value.replace(/\D/g, "");
                if (e.target.value?.length > 3) {
                  getData(e?.target?.value);
                }
                handleChange(e);
                handlePincodeChange(e);
              }
        }
        className={
          className
            ? className
            : "shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]"
        }
        placeholder={placeholder ? placeholder : staticLabels?.pinCode}
        autoComplete="off"
      />
    </>
  );
};

export default PincodeInput;
