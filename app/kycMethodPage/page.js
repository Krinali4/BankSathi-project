'use client'
import axios from 'axios';
import { BASE_URL, USERINFO } from "@/commonUtils/ApiEndPoints/ApiEndPoints";
import Image from "next/image";
import React, { useState } from "react";
import {
    getCookieValue
} from "@/commonUtils/util";
import dynamic from 'next/dynamic';
import CustomImageButton from '@/app/Custom';
import HdfcHeader from '../client/LandingPage/HdfcHeader/HdfcHeader';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const kycMethodPage = () => {
    const [kycOtp, setOtpKyc] = useState([])
    const [formShown, setFormShown] = useState(false);

    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    };
    const deviceId = getCookieValue("deviceId");
    const router = useRouter();


    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //     const UserPan = JSON.parse(localStorage.getItem("customerData"));
    //     const params = {
    //         ReferenceNumber: "0000150527",
    //         PartnerCode: "apibanking",
    //         ProductCode: "CC",
    //         AuthType: "OTP",
    //         ResponseType: "1",
    //         LeadId: "",
    //         ReturnURL: "https://apibanking.com/ekyc/response",
    //         MobileNumber: UserPan?.mobile,
    //         ROUserName: "",
    //         filler1: "",
    //         filler2: "",
    //         filler3: "",
    //         filler4: "",
    //         filler5: ""
    //     };
    //     await axios
    //         .post("https://dapuat1.hdfcbank.com/HDFCDigitalAadhaar/AadhaarIntegration/InitiateRequest", params, {
    //             headers: headers,
    //         })
    //         .then((response) => {
    //             console.log(response, "responseresponse");
    //         })
    //         .catch((error) => {
    //             // toast.error(error?.message || error?.res?.data?.detail);
    //         });
    // };
    const token = typeof window !== "undefined" && localStorage.getItem("token");

    const handlSubmitClick = async (type) => {
        const UserPan = JSON.parse(localStorage.getItem("customerData"));
        const params = {
            mobile_no: UserPan?.mobile || "",
            jwt_token: token,
            device_id: deviceId,
            kyc_type: type
        };

        try {
            const response = await axios.post(BASE_URL + USERINFO.iniate_ekyc, params, {
                headers: headers,
            });
            if (type === "OTP" && response?.status === 200) {
                const otpValue = response?.data?.data;
                setOtpKyc(response?.data?.data);
                toast.success(response?.data.message);
                setFormShown(false);
                // if(response?.data.message == "success"){
                const form = document.getElementById("hiddenForm");
                form.action = "https://dapuat1.hdfcbank.com/HDFCDigitalAadhaar/AadhaarIntegration/InitiateRequest";
                form.submit();
                // }
            }
        } catch (error) {
            console.log(error, "errorerror");
            toast.error(error?.message);
        }
    };
const handleformClick = () => {
    router.push("/newForm")
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
                <div className="">
                    <div className='relative' >
                        <div className="w-full h-[135px] mt-[24px] md:w-[400px] bg-white shadow-lg rounded-xl flex  px-[30px] py-[21px] gap-[18px] relative">
                            <Image
                                src="/assets/recommended.svg"
                                height={30}
                                width={118}
                                alt="recommended"
                                className="absolute left-[-10px] bottom-[7.5rem] z-40 rounded-2xl	"
                            />
                            <div className='bg-[#F3F7FA] rounded-[90px] text-xs h-5 absolute z-50 px-[10px] py-[2px] right-[10px] top-[12px]' >
                                3 to 5 Minutes
                            </div>
                            <Image
                                src="/assets/digitalKyc.svg"
                                alt="digitalKyci"
                                height={48}
                                width={48}
                            />
                            <div className="flex flex-col items-start justify-center" >
                                <div className="text-black text-[15px] font-semibold font-['Faktum']"  >
                                    Digital KYC
                                </div>
                                <div className="text-black text-xs font-normal font-['Poppins']" >
                                    Aadhar mobile number and
                                    OTP Required
                                </div>
                            </div>

                        <form id="hiddenForm" method="POST" target="_blank" name ="DigitalAadhaarRequest" >
                            <div className='w-full justify-center flex absolute top-[82%] left-0' >
                                <button type="button" className='rounded-lg	bg-[#49D49D]  w-fit justify-center flex items-center h-[48px] px-5 ' onClick={() => handlSubmitClick("OTP")}>
                                    E-KYC AADHAR VERIFICATION
                                </button>

                                {formShown && (
                                    <div className='grid gap-2 justify-center mt-7'>
                                        <label className='text-gray'> Id-token-jwt :</label>
                                        <input type="hidden" name="Id-token-jwt" placeholder="Enter Id-token-jwt" className='border border-gray-400 rounded-lg p-2' value={kycOtp['Id-token-jwt']} />
                                        <label className='text-gray'> OAuthTokenValue :</label>
                                        <input type="OAuthTokenValue" name="OAuthTokenValue" placeholder="Enter OAuthTokenValue" className='border border-gray-400 rounded-lg p-2' value={kycOtp?.OAuthTokenValue || ""} />
                                        <label className='text-gray'> Scope :</label>
                                        <input type="Scope" name="Scope" placeholder="Enter Scope" className='border border-gray-400 rounded-lg p-2' value={kycOtp?.Scope} />
                                        <label className='text-gray'> TransactionId :</label>
                                        <input type="TransactionId" name="TransactionId" placeholder="Enter TransactionId" className='border border-gray-400 rounded-lg p-2' value={kycOtp?.TransactionId} />
                                        <label className='text-gray'> encRequestData :</label>
                                        <input type="encRequestData" name="encRequestData" placeholder="Enter encRequestData" className='border border-gray-400 rounded-lg p-2' value={kycOtp?.encRequestData} />
                                        <label className='text-gray'> encSessionKey :</label>
                                        <input type="encSessionKey" name="encSessionKey" placeholder="Enter encSessionKey" className='border border-gray-400 rounded-lg p-2' value={kycOtp?.encSessionKey} />
                                        <label className='text-gray'> url :</label>
                                        <input type="url" name="url" placeholder="Enter url" className='border border-gray-400 rounded-lg p-2' value={kycOtp?.url} />

                                        {/* <div> */}
                                        <button type="submit" className='mt-5'>Login</button>
                                        {/* </div> */}
                                    </div>
                                )}
                            </div>
                        </form>
                        </div>
                    </div>
                    <div className='relative'>

                        <div className="mt-10 flex flex-row items-center justify-center gap-x-[10px]">
                            <Image src="/assets/line.svg" width={63} height={1} alt="border" />
                            <div className="text-zinc-950 text-[15px] font-normal font-['Poppins']">
                                OR
                            </div>
                            <Image src="/assets/line.svg" width={63} height={1} alt="border" />
                        </div>
                        <div className="w-full h-[115px] md:w-[400px] mt-[24px] bg-white shadow-lg rounded-xl flex  px-[30px] py-[21px] gap-[18px] relative" onClick={handleformClick}>
                            <div className='bg-[#F3F7FA] rounded-[90px] text-xs h-5 absolute z-50 px-[10px] py-[2px] right-[10px] top-[12px]'>
                                3 to 5 Minutes
                            </div>
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

                        </div>
                        <div className='w-full justify-center flex absolute  left-0 top-[86%]' >
                            <h2 className='rounded-lg	bg-[#49D49D]  w-fit justify-center flex items-center h-[48px] px-5' onClick={() => handlSubmitClick("BIOMETRIC")}>
                                Biometric KYC
                            </h2>
                        </div>
                    </div>



                </div>
            </div>
            {/* action="/https://dapuat1.hdfcbank.com/HDFCDigitalAadhaar/AadhaarIntegration/InitiateRequest" */}
            {/* {formShown && ( */}
            {/* <form id="hiddenForm" method="POST" target="_blank" action="https://dapuat1.hdfcbank.com/HDFCDigitalAadhaar/AadhaarIntegration/InitiateRequest" >

                <div className='grid gap-2 justify-center mt-7'>
                    <label className='text-gray'> Id-token-jwt :</label>
                    <input type="Id-token-jwt" name="Id-token-jwt" placeholder="Enter Id-token-jwt" className='border border-gray-400 rounded-lg p-2' value={kycOtp['Id-token-jwt']} />
                    <label className='text-gray'> OAuthTokenValue :</label>
                    <input type="OAuthTokenValue" name="OAuthTokenValue" placeholder="Enter OAuthTokenValue" className='border border-gray-400 rounded-lg p-2' value={kycOtp?.OAuthTokenValue || ""} />
                    <label className='text-gray'> RequestEncryptedValue :</label>
                    <input type="RequestEncryptedValue" name="RequestEncryptedValue" placeholder="Enter RequestEncryptedValue" className='border border-gray-400 rounded-lg p-2' value={kycOtp?.RequestEncryptedValue} />
                    <label className='text-gray'> Scope :</label>
                    <input type="Scope" name="Scope" placeholder="Enter Scope" className='border border-gray-400 rounded-lg p-2' value={kycOtp?.Scope} />
                    <label className='text-gray'> SymmetricKeyEncryptedValue :</label>
                    <input type="SymmetricKeyEncryptedValue" name="SymmetricKeyEncryptedValue" placeholder="Enter SymmetricKeyEncryptedValue" className='border border-gray-400 rounded-lg p-2' value={kycOtp?.SymmetricKeyEncryptedValue} />
                    <label className='text-gray'> TransactionId :</label>
                    <input type="TransactionId" name="TransactionId" placeholder="Enter TransactionId" className='border border-gray-400 rounded-lg p-2' value={kycOtp?.TransactionId} />
                    <label className='text-gray'> url :</label>
                    <input type="url" name="url" placeholder="Enter url" className='border border-gray-400 rounded-lg p-2' value={kycOtp?.url} />

                    <button type="submit" className='mt-5'>Login</button>
                </div>
            </form> */}
            {/* )} */}
        </>
    );
};

export default kycMethodPage;


