import React from "react";
import LandingPage from "./client/LandingPage/LandingPage";
import { headers } from "next/headers";
import HdfcHeader from "./client/LandingPage/HdfcHeader/HdfcHeader";

export default function Index() {
  const headersList = headers();
  const ipAddress = headersList?.get("x-forwarded-for")?.split(",")[0];
  return (
    <>
      {/* <div className="bg-[#844FCF]">
        <Header />
      </div> */}
      <div className="bg-[#F4F8FB]">
        <HdfcHeader />
        <LandingPage ipAddress={ipAddress} />
      </div>
    </>
  );
}
