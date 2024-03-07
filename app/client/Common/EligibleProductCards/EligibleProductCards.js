import React, { useEffect } from "react";
import { mockData } from "../../HdfcEligibleProducts/data";
import Image from "next/image";
import ApplyNowButton from "../ApplyNowButton/ApplyNowButton";
import { useState } from "react";
import accordionArrow from "../../../../public/assets/accordion.svg";
import { useWindowSize } from "@/hooks/useWindowSize";
import { staticLabels } from "@/commonUtils/StaticContent/staticLabels";
import { getCookieValue } from "@/commonUtils/util";
import axios from "axios";
import { BASE_URL, USERINFO } from "@/commonUtils/ApiEndPoints/ApiEndPoints";

const EligibleProductCards = () => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  const deviceId = getCookieValue("deviceId");
  const ImageBaseUrl = "https://devcdn.banksathi.com";

  const [productInfo, setProductInfo] = useState({});
  const [productList, setProductList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [featuresAccordionOpen, setFeaturesAccordionOpen] = useState(true);
  const [welcomeOfferAccordionOpen, setWelcomOfferAccordionOpen] =
    useState(true);

  const size = useWindowSize();
  const isMobile = size?.width <= 567;

  const getFeatures = (item) => {
    return (
      featuresAccordionOpen && (
        <div
          className="list-disc space-y-2 text-[14px] cardsFeatures"
          dangerouslySetInnerHTML={{
            __html: `<div>${item?.features}</div>`,
          }}
        ></div>
      )
    );
  };

  const getWelcomeOffers = (item) => {
    return (
      welcomeOfferAccordionOpen && (
        <div
          className="list-disc space-y-2 text-[14px] cardsFeatures"
          dangerouslySetInnerHTML={{
            __html: `<div>${item?.welcome_offer}</div>`,
          }}
        ></div>
      )
    );
  };

  const fetchProductDetails = () => {
    setShowLoader(true);
    const params = {
      product_code: [productInfo?.productIds],
      device_id: deviceId,
    };
    axios
      .post(BASE_URL + USERINFO.productDetailsApi, params, {
        headers: headers,
      })
      .then((res) => {
        setShowLoader(false);
        if (res?.data?.message === "success") {
          setProductList(res?.data?.product_details);
        }
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };

  const getProductLimit = (i) => {
    console.log(productInfo?.creditLimits);
    if (Array.isArray(productInfo?.creditLimits)) {
      if (productInfo?.creditLimits?.length > 1)
        return productInfo?.creditLimits?.[i];
      else return productInfo?.creditLimits;
    } else return productInfo?.creditLimits;
  };

  useEffect(() => {
    if (productInfo && Object.keys(productInfo)?.length !== 0) {
      fetchProductDetails();
    }
  }, [productInfo]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const product = localStorage.getItem("productsInfo");
      if (product) {
        const productObj = JSON.parse(product);
        setProductInfo(productObj);
      }
    }
  }, []);

  console.log(productList);

  return (
    <>
      <div className="max-sm:mx-[20px] md:mx-[12px] text-neutral-800 text-3xl max-sm:text-[24px] max-sm:leading-[28.8px] font-semibold font-['Faktum'] leading-9 mt-[18px]">
        {productList?.length > 1
          ? "You are eligible for these products"
          : "You are eligible for this product"}
      </div>
      {productList &&
        productList?.length > 0 &&
        productList?.map((item, index) => {
          return (
            <div className="flex flex-col w-full h-auto bg-white rounded-3xl shadow border border-slate-200 py-[30px] mt-[30px] max-sm:ml-[8px] eligibleCards">
              <div className="flex flex-row justify-between px-[30px] max-sm:px-[15px] max-sm:flex-col max-sm:gap-[30px]">
                <div className="flex flex-row gap-[30px] max-sm:gap-[13px]">
                  <Image
                    src={`${ImageBaseUrl}/${item?.product_image}`}
                    height={152}
                    width={240}
                    alt="bank logo"
                    className="max-sm:w-[122px]"
                  />
                  <div className="flex flex-col">
                    <div className="text-neutral-800 text-lg max-sm:text-[15px] max-sm:leading-[21px] font-semibold font-['Poppins'] leading-[25.20px]">
                      {item?.product_title}
                    </div>
                    <div className="flex gap-[6px] items-center">
                      <div className="text-neutral-800 text-[12px] max-sm:text-[12px] max-sm:leading-[21px] font-semibold font-['Poppins'] leading-[25.20px]">
                        Credit Limit :{" "}
                      </div>
                      <div className="text-neutral-800 text-[13px] max-sm:text-[12px] max-sm:leading-[19.2px] font-normal font-['Poppins'] leading-[20.80px]">
                        {getProductLimit(index)}
                      </div>
                      {/* <div className="w-[3px] h-[3px] bg-zinc-300 rounded-full" />
                      <div className="text-neutral-800 text-[13px] max-sm:text-[12px] max-sm:leading-[19.2px] font-normal font-['Poppins'] leading-[20.80px]">
                        {mockData?.cardCategoryType2}
                      </div>
                      <div className="w-[3px] h-[3px] bg-zinc-300 rounded-full" />
                      <div className="text-neutral-800 text-[13px] max-sm:text-[12px] max-sm:leading-[19.2px] font-normal font-['Poppins'] leading-[20.80px]">
                        {mockData?.cardCategoryType3}
                      </div> */}
                    </div>
                  </div>
                </div>
                <div>
                  <ApplyNowButton />
                </div>
              </div>
              <div className="border border-gray-100 border-l-0 text-[#212529] mt-[30px]" />
              <div className="grid grid-cols-2">
                <div className="flex flex-col gap-[8px] border border-[gray-100] border-l-0 border-t-0 pt-[20px] pb-[24px] px-[30px] max-sm:px-[15px] text-[#212529]">
                  <div className="text-neutral-800 text-[13px] font-normal font-['Poppins'] leading-[18.20px]">
                    {staticLabels?.annualFee}
                  </div>
                  <div className="symbole-rupee text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-[21px]">
                    {item?.annual_fee === 0 ? "Free" : `₹ ${item?.annual_fee}`}
                  </div>
                </div>
                <div className="flex flex-col gap-[8px] border border-[gray-100] border-l-0 border-t-0 border-r-0 pt-[20px] pb-[24px] px-[30px] max-sm:px-[15px] text-[#212529]">
                  <div className="symbole-rupee text-neutral-800 text-[13px] font-normal font-['Poppins'] leading-[18.20px]">
                    {staticLabels?.joiningFee}
                  </div>
                  <div className="text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-[21px]">
                    {item?.joining_fee === 0
                      ? "Free"
                      : `₹ ${item?.joining_fee}`}
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-[10px] max-sm:flex-col">
                {isMobile ? (
                  <>
                    <div
                      id="accordionExample"
                      data-active-classes="bg-none"
                      data-inactive-classes="text-[#212529]"
                      className=""
                    >
                      <button
                        onClick={() =>
                          setFeaturesAccordionOpen(!featuresAccordionOpen)
                        }
                        type="button"
                        className="text-[#212529] gap-[16px] list-none font-semibold relative text-[15px] max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center max-sm:justify-between w-full text-left"
                        data-accordion-target="#accordion-flush-body-1"
                        aria-expanded="true"
                        aria-controls="accordion-flush-body-1"
                      >
                        <div className="flex flex-col w-full gap-[4px] mt-[16px] px-[30px] max-sm:px-[15px] max-sm:border max-sm:border-b-1 max-sm:border-t-0 max-sm:border-l-0 max-sm:pb-[10px]">
                          <div className="flex justify-between flex-row items-center">
                            <p className="text-[15px] font-semibold ">
                              Features
                            </p>
                            <Image
                              src={accordionArrow}
                              alt="down"
                              width={24}
                              height={24}
                              className={
                                featuresAccordionOpen
                                  ? "rotate-180 w-6 h-6 shrink-0"
                                  : "w-6 h-6 shrink-0"
                              }
                            />
                          </div>
                          {getFeatures(item)}
                        </div>
                      </button>
                      <button
                        onClick={() =>
                          setWelcomOfferAccordionOpen(
                            !welcomeOfferAccordionOpen
                          )
                        }
                        type="button"
                        className="text-[#212529] gap-[16px] list-none font-semibold relative text-[15px] max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center max-sm:justify-between w-full text-left"
                        data-accordion-target="#accordion-flush-body-1"
                        aria-expanded="true"
                        aria-controls="accordion-flush-body-1"
                      >
                        <div className="flex flex-col gap-[4px] mt-[16px] px-[30px] max-sm:px-[15px] w-full">
                          <div className="flex justify-between flex-row items-center">
                            <p className="text-[15px] font-semibold ">
                              Welcome Offer
                            </p>
                            <Image
                              src={accordionArrow}
                              alt="down"
                              width={24}
                              height={24}
                              className={
                                welcomeOfferAccordionOpen
                                  ? "rotate-180 w-6 h-6 shrink-0"
                                  : "w-6 h-6 shrink-0"
                              }
                            />
                          </div>
                          {getWelcomeOffers(item)}
                        </div>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-[4px] mt-[16px] px-[30px]">
                      <p className="text-[15px] font-semibold ">
                        {staticLabels?.features}
                      </p>
                      {getFeatures(item)}
                    </div>
                    <div className="flex flex-col gap-[4px] mt-[16px] px-[30px]">
                      <p className="text-[15px] font-semibold ">
                        {staticLabels?.welcome}
                      </p>
                      {getWelcomeOffers(item)}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default EligibleProductCards;
