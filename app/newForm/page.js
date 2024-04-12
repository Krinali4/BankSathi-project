'use client'
import React, { useState } from 'react'

export default function page() {
    const [kycOtp, setOtpKyc] = useState([])
    const handlSubmitClick = () => {
        console.log("bank");
    }
  return (
    <div>
           <form id="hiddenForm" method="POST" target="_blank" name ="DigitalAadhaarRequest" >
                            <div className='w-full justify-center flex absolute  left-0' >
                                {/* <button type="button" className='rounded-lg	bg-[#49D49D]  w-fit justify-center flex items-center h-[48px] px-5 ' onClick={() => handlSubmitClick()}>
                                   Form
                                </button> */}

                                    <div className='grid gap-2 justify-center mt-7'>
                                        <h2 className='text-[20px] text-center'>Enter Form value</h2>
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
                                        {/* <button type="submit" className='mt-5'>Login</button> */}
                                          <button type="button" className='rounded-lg	bg-[#49D49D]  w-full justify-center flex items-center h-[48px] px-5 mt-5' onClick={() => handlSubmitClick()}>
                                   submit
                                </button>
                                        {/* </div> */}
                                    </div>
                            </div>
                        </form>
    </div>
  )
}
