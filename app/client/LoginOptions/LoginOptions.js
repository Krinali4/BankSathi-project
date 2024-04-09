import axios from 'axios';
import { BASE_URL, USERINFO } from "@/commonUtils/ApiEndPoints/ApiEndPoints";
import Image from "next/image";
import React from "react";
import {
    getCookieValue
} from "@/commonUtils/util";
import dynamic from 'next/dynamic';
import CustomImageButton from '@/app/Custom';


const LoginOptions = () => {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    };
    const deviceId = getCookieValue("deviceId");
    const token = typeof window !== "undefined" && localStorage.getItem("token");
    // const handleSubmitClick = async () => {
    //     console.log("dasdasd")
    //     const datas = typeof window !== "undefined" ? localStorage.getItem("userPanData") : undefined;
    //     console.log("datas::", datas)
    //     const UserPan = JSON.parse(typeof window !== "undefined" && localStorage.getItem("userPanData"));
    //     console.log(UserPan, "UserPanUserPan");
    //     const params = {
    //         pan_no: "AZVFX5739I",
    //         product_code: "string",
    //         mobile_no: UserPan?.mobile_no,
    //         device_id: deviceId,
    //         jwt_token: token
    //     }
    //     try {
    //         const response = await axios.post(BASE_URL + USERINFO.fetchAuthcodeIdcom, params, { headers: headers });
    //         console.log(response.data, "response");
    //         // setShowLoader(false);
    //     } catch (error) {
    //         console.log(error, "hey ")
    //         // setShowLoader(false);
    //         // toast.error(error?.message || error?.response?.data?.detail);
    //     }
    // };


    //  async function handleSubmitClick () {
    //   console.log("dasdasd")
    //   const UserPan = JSON.parse(localStorage.getItem("userPanData"));
    //   console.log(UserPan?.mobile_no,"UserPanUserPan");
    //   const params = {
    //     pan_no: "AZVFX5739I",
    //     product_code: "string",
    //     mobile_no: "7854108786",
    //     device_id: deviceId,
    //     jwt_token: token
    //   }
    //   try {
    //     const response = await axios.post(BASE_URL + USERINFO.fetchAuthcodeIdcom, params, { headers: headers });
    //     console.log(response.data, "response");
    //     // setShowLoader(false);
    //   } catch (error) {
    //     // setShowLoader(false);
    //     toast.error(error?.message || error?.response?.data?.detail);
    //   }
    // };


    function handleclick() {
        console.log('first')
    }

    return (
        <div className="mt-5 container mx-auto px-4 xl:px-12 flex flex-col items-center justify-center" >
            <div className="w-full sm:w-[385px] text-neutral-800 text-2xl font-semibold font-['Faktum'] leading-[28.80px] max-sm:text-start text-start">
                Login
                <br className="" />
                to HDFC Banks
            </div>
            <div className="mt-10">
                <div className="w-full md:w-[400px] bg-white shadow-lg rounded-xl h-[103px] flex  px-[35px] py-[21px] gap-[18px]">
                    <Image
                        src="/assets/netbanking.svg"
                        alt="netbanking"
                        height={48}
                        width={48}
                    />
                    <div className="flex flex-col items-start justify-center">
                        <div className="text-black text-[15px] font-semibold font-['Faktum']" >
                            Net Banking
                        </div>
                        <div className="text-black text-xs font-normal font-['Poppins']">
                            Login using your customer  ID & Password
                        </div>
                    </div>
                    {/* <div  onClick={handleSubmitClick()}> */}
                    <CustomImageButton
                        src="/assets/right_arrow.svg"
                        alt="arrow"
                        width={24}
                        height={24}
                    />
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
                <div className="mt-[19px] flex flex-row items-center justify-center gap-x-[10px]">
                    <Image src="/assets/line.svg" width={63} height={1} alt="border" />
                    <div className="text-zinc-950 text-[15px] font-normal font-['Poppins']">
                        OR
                    </div>
                    <Image src="/assets/line.svg" width={63} height={1} alt="border" />
                </div>
                <div className="w-full md:w-[400px] bg-white shadow-lg rounded-xl h-[103px] flex  px-[35px] py-[21px] gap-[18px]">
                    <Image
                        src="/assets/debit.svg"
                        alt="netbanking"
                        height={48}
                        width={48}
                    />
                    <div className="flex flex-col items-start justify-center">
                        <div className="text-black text-[15px] font-semibold font-['Faktum']">
                            Debit / ATM Card
                        </div>
                        <div className="text-black text-xs font-normal font-['Poppins']">
                            Keep your credit card details handy
                        </div>
                    </div>
                    <Image
                        src="/assets/right_arrow.svg"
                        alt="arrow"
                        height={24}
                        width={24}
                        className="md:ml-10"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginOptions;


