import React from "react";
import { headers } from "next/headers";
import ApplicationForm from "../client/ApplicationForm/ApplicationForm";

const page = () => {
  const headersList = headers();
  const ipAddress = headersList?.get("x-forwarded-for")?.split(",")[0];
  return (
    <div>
      <ApplicationForm ipAddress={ipAddress} />
    </div>
  );
};

export default page;
