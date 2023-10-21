import React, { useMemo } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";

const QuestionModal = (props) => {
  const size = useWindowSize();

  const windowSize = useMemo(() => {
    return size?.width;
  }, [size?.width]);

  return (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 opacity-60 bg-black"></div>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center max-sm:p-0">
          <div className="relative transform overflow-hidden">
            <div className="lg:w-[40vw] max-sm:mx-6 w-auto flex items-center justify-center sm:flex sm:items-center bg-white rounded-2xl max-[767px]:pt-[35px] md:py-[35px] min-[1500px]:px-[45px] px-[30px]">
              <div className=" sm:mt-0">
                <p className=" py-1 text-[24px] max-smtext-[15px] font-semibold max-[479px]:text-[13px] text-[#212529] max-[479px]:text-center">
                  {props?.question}
                </p>
                <div className=" mt-[5px] text-center text-black text-[13px] font-normal font-['Poppins'] leading-[20.80px]">
                  {props?.message}
                </div>
                <div className="max-[479px]:text-center py-[40px] flex gap-[16px] items-center justify-center">
                  <button
                    onClick={() => {
                      props?.handleNo();
                    }}
                    className="text-[#212529] border w-[160px] font-semibold max-sm:w-[135px] max-[375px]:w-[120px] h-[48px] px-[24px] py-[14px] border-[#212529] rounded-md cursor-pointer ps-2 text-[15px] max-[479px]:text-[13px]"
                  >
                    {props?.noText}
                  </button>
                  <button
                    onClick={() => {
                      props?.handleYes();
                    }}
                    className="text-[#fff] bg-[#49D49D] w-[160px] font-semibold max-sm:w-[135px] max-[375px]:w-[120px] h-[48px] px-[24px] py-[14px] rounded-md cursor-pointer ps-2 text-[15px] max-[479px]:text-[13px]"
                  >
                    {props?.yesText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
