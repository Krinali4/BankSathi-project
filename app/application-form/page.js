import React from "react";
import { headers } from "next/headers";
import ApplicationForm from "../client/ApplicationForm/ApplicationForm";
import HdfcHeader from "../client/LandingPage/HdfcHeader/HdfcHeader";

const page = () => {
  const headersList = headers();
  const ipAddress = headersList?.get("x-forwarded-for")?.split(",")[0];
  return (
    <div>
      <HdfcHeader/>
      <ApplicationForm ipAddress={ipAddress} />
    </div>
  );
};

export default page;
