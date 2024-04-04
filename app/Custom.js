'use client'
import axios from 'axios';
import Image from "next/image";
import React from "react";
import {
    getCookieValue
} from "@/commonUtils/util";
import { BASE_URL, USERINFO } from '@/commonUtils/ApiEndPoints/ApiEndPoints';

const CustomImageButton = ({ src, alt, width, height }) => {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    };
    const deviceId = getCookieValue("deviceId");
    const token = typeof window !== "undefined" && localStorage.getItem("token");
    const handleSubmitClick = async () => {
        // const datas = typeof window !== "undefined" ? localStorage.getItem("userPanData") : undefined;
        const UserPan = JSON.parse(typeof window !== "undefined" && localStorage.getItem("userPanData"));
        console.log(UserPan, "UserPanUserPan");
        const params = {
            pan_no: "AZVFX5739I",
            product_code: "string",
            mobile_no: UserPan?.mobile_no || "",
            device_id: deviceId,
            jwt_token: token
        }
        try {
            const response = await axios.post(BASE_URL + USERINFO.fetchAuthcodeIdcom, params, { headers: headers });
            console.log(response.data, "response");
            // setShowLoader(false);
        } catch (error) {
            console.log(error, "hey ")
            // setShowLoader(false);
            // toast.error(error?.message || error?.response?.data?.detail);
        }
    };
    const handleClick = () => {
        handleSubmitClick();
    };

    return (
        <>
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                // style={{ opacity: clicked ? 0.5 : 1 }}
                onClick={handleClick}
            />
        </>
    );
};
export default CustomImageButton