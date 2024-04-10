'use client'
import { consentMessages } from '@/commonUtils/StaticContent/consentMessages';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import HdfcHeader from '../client/LandingPage/HdfcHeader/HdfcHeader';

export default function page() {
    const [additionalAgree, setAdditionalAgree] = useState(true);
const router = useRouter()
    const handleClick = (e) => {
        e.preventDefault()
        router.push("/IncomeVerification")
      }
  return (
    <>
    <HdfcHeader />
    <div className="px-4 flex flex-col items-center justify-center mt-10 md:mt-20">
    <div className="text-neutral-800 text-2xl font-semibold font-['Faktum'] leading-[28.80px]">
      We need additional details to provide you an offer
    </div>
    <div className="flex md:items-center items-start mt-[24px] max-sm:mt-[30px] gap-2">
      <input
        className="mr-1 w-4 h-4  max-sm:w-6 max-sm:h-6 text-white accent-[#49D49D] "
        type="checkbox"
        checked={additionalAgree}
        required
        onChange={(e) => setAdditionalAgree(e.target?.checked)}
      />
      <p className="text-[15px] text-[#212529] font-normal max-[479px]:text-[14px] max-[375px]:text-[13px]">
        {consentMessages?.additionalAgree}
      </p>
    </div>
    <div className="mt-[30px] max-sm:mb-4 text-left w-full md:w-[443px]">
      <button
        type="submit"
        onClick={handleClick}
        // onClick={() => setAdditionalDetailsStepper(1)}
        className={`w-full text-[15px]items-center cursor-pointer font-semibold font-['Faktum'] leading-normal text-neutral-800 max-[280px]:text-[15px] max-[771px]:text-[16px] px-5 py-[15px]  bg-[#49D49D] rounded-lg max-[771px]:px-3 `}
      >
        Continue
      </button>
    </div>
  </div>
  </>
  )
}
