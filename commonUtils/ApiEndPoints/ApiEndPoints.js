export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const BASE_URL_TRYMICRO = "https://trymicroapi.banksathi.com/";
export const BASE_URL_TRYACT = "https://tryact.banksathi.com/";

export const USERSET = {
  getusersetup: "api/v1/user/get_user_profile",
  updateusersetup: "api/v1/user/update_user_profile",
  enquirycibil: "api/v1/user/get_enquiry_for_cibil",
  creditscorehistory: "api/v1/user/get_credit_score_history",
  paymenthistory: "api/v1/user/get_payment_history",
  creditage: "api/v1/user/get_credit_age",
  creditutilisation: "api/v1/user/get_credit_card_utilisation",
  totalaccount: "api/v1/user/get_total_accounts",
  leadmyapplication: "api/v1/user/get_lead_application_status",
  leadapplog: "api/v1/user/get_lead_application_log",
};
