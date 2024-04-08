'use client'
import axios from 'axios';
import { BASE_URL, USERINFO } from "@/commonUtils/ApiEndPoints/ApiEndPoints";
import Image from "next/image";
import React from "react";
import {
    getCookieValue
} from "@/commonUtils/util";
import dynamic from 'next/dynamic';
import CustomImageButton from '@/app/Custom';
import HdfcHeader from '../client/LandingPage/HdfcHeader/HdfcHeader';


const kycMethodPage = () => {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    };
    const deviceId = getCookieValue("deviceId");
   
      const token = typeof window !== "undefined" && localStorage.getItem("token");
      const handlSubmitClick = async () => {
        const UserPan = JSON.parse(localStorage.getItem("customerData"));
        const params = {
          mobile_no: UserPan?.mobile || "",
          jwt_token: token,
          device_id: deviceId,
          kyc_type: "BIOMETRIC"
        };
        await axios
          .post(BASE_URL + USERINFO.iniate_ekyc, params, {
            headers: headers,
          })
          .then((response) => {
            console.log(response, "responseresponse");
          })
          .catch((error) => {
            // toast.error(error?.message || error?.res?.data?.detail);
          });
      };


    function handleclick() {
        console.log('first')
    }

    return (
        <>
            <HdfcHeader />
            <div className="mt-5 container mx-auto px-4 xl:px-12 flex flex-col items-center justify-center" >
                <div className="w-full sm:w-[385px] text-neutral-800 text-2xl font-semibold font-['Faktum'] leading-[28.80px] max-sm:text-start text-start">
                    Select your preferred


                    <br className="" />
                    KYC Method
                </div>
                <div className="mt-10">
                <div className='relative'>
                <div className='bg-[#F3F7FA] rounded-[90px] text-xs h-5 absolute z-50 top-[19%] left-[69%] px-3'>
                        3 to 5 Minutes
                    </div>
                    <div className="w-full h-[115px] md:w-[400px] bg-white shadow-lg rounded-xl flex  px-[30px] py-[21px] gap-[18px] relative">
                        <Image
                            src="/assets/digitalKyc.svg"
                            alt="digitalKyci"
                            height={48}
                            width={48}
                        />
                        <div className="flex flex-col items-start justify-center">
                            <div className="text-black text-[15px] font-semibold font-['Faktum']" >
                                Digital KYC
                            </div>
                            <div className="text-black text-xs font-normal font-['Poppins']">
                                Aadhar mobile number and
                                OTP Required
                            </div>
                        </div>
                        {/* <div  onClick={handleSubmitClick()}> */}
                        {/* <CustomImageButton
                            src="/assets/right_arrow.svg"
                            alt="arrow"
                            width={24}
                            height={24}
                        /> */}


                        {/* <Image
                        src="/assets/right_arrow.svg"
                        alt="arrow"
                        height={24}
                        width={24}
                        className="md:ml-10"
                        onClick={handleSubmitClick}
                    /> */}
                        {/* </div> */}
                    </div>
                    <div className='w-full justify-center flex absolute top-[76%] left-0' >
                        <h2 className='rounded-lg	bg-[#49D49D]  w-fit justify-center flex items-center h-[48px] px-5' onClick={handlSubmitClick}>
                            E-KYC AADHAR VERIFICATION
                        </h2>
                    </div>
                </div>
                    <div className='relative'>

                        <div className="my-10 flex flex-row items-center justify-center gap-x-[10px]">
                        <Image src="/assets/line.svg" width={63} height={1} alt="border" />
                        <div className="text-zinc-950 text-[15px] font-normal font-['Poppins']">
                            OR
                        </div>
                        <Image src="/assets/line.svg" width={63} height={1} alt="border" />
                    </div>
                    <div className='bg-[#F3F7FA] rounded-[90px] text-xs h-5 absolute z-50 left-[70%] top-[45%] px-3'>
                        3 to 5 Minutes
                    </div>
                    <div className="w-full h-[115px] md:w-[400px] bg-white shadow-lg rounded-xl flex  px-[30px] py-[21px] gap-[18px] relative">
                        <Image
                            src="/assets/BiomatriKyc.svg"
                            alt="BiomatriKyc"
                            height={48}
                            width={48}
                        />
                        <div className="flex flex-col items-start justify-center">
                            <div className="text-black text-[15px] font-semibold font-['Faktum']" >
                            Biometric KYC
                            </div>
                            <div className="text-black text-xs font-normal font-['Poppins']">
                            HDFC Bank Executive will visit your location for documents
                            </div>
                        </div>
                        {/* <div  onClick={handleSubmitClick()}> */}
                        {/* <CustomImageButton
                            src="/assets/right_arrow.svg"
                            alt="arrow"
                            width={24}
                            height={24}
                        /> */}


                        {/* <Image
                        src="/assets/right_arrow.svg"
                        alt="arrow"
                        height={24}
                        width={24}
                        className="md:ml-10"
                        onClick={handleSubmitClick}
                    /> */}
                        {/* </div> */}
                    </div>
                    <div className='w-full justify-center flex absolute  left-0 top-[86%]' >
                        <h2 className='rounded-lg	bg-[#49D49D]  w-fit justify-center flex items-center h-[48px] px-5'>
                        Biometric KYC
                        </h2>
                    </div>
                    </div>
               


                </div>
            </div>
        </>
    );
};

export default kycMethodPage;


