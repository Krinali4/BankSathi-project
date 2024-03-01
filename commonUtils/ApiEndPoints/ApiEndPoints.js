export const BASE_URL = "https://hdfcapi.banksathi.com/"; // process.env.NEXT_PUBLIC_BASE_URL;
export const BASE_URL_TRYMICRO = "https://trymicroapi.banksathi.com/";
export const BS_BASE_URL = "https://micro.banksathi.com/";
export const BS_BASE_TRYMICRO = "https://trymicroapi.banksathi.com/";
export const BS_BASE_URL_TRYACT = "https://tryact.banksathi.com/";

export const USERINFO = {
  panValidation: "api/v1/hdfc/pan_validation",
  otpGeneration: "api/v1/hdfc/otp_generation_cust_identification",
  otpValidation: "api/v1/hdfc/otp_validation_demo",
  executeDedupe: "api/v1/hdfc/execute_dedupe",
  executeInterface: "api/v1/hdfc/execute_interface",
  inPrincipleApproval: "api/v1/hdfc/in_principle_approval",
};
export const BS_COMMON = {
  panVerify: "api/v1/common/pan_verify",
  pinCodeVerify: "api/v1/common/get_pincode_list",
  panMobValidation: "api/v1/common/mobile_pan_relation",
};
export const INTERNAL_INITIATE_API = {
  initiate: "api/v1/hdfc/initiate_api",
};
