import toast from "react-hot-toast";
import { ApiMessage } from "./alljsonfile/apimessage";
const HOSTNAME = process.env.NEXT_PUBLIC_WEBSITE_URL;

export const getRandomColor = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
export const getDeviceIdCookie = (cookies) => {
  for (let i = 0; i < cookies?.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${"deviceId"}=`)) {
      return cookie.substring("deviceId".length + 1);
    }
  }
  return null;
};
const getInitials = (name) => {
  let initials;
  const nameSplit = name.split(" ");
  const nameLength = nameSplit.length;
  if (nameLength > 1) {
    initials =
      nameSplit[0].substring(0, 1) + nameSplit[nameLength - 1].substring(0, 1);
  } else if (nameLength === 1) {
    initials = nameSplit[0].substring(0, 1);
  } else return;

  return initials.toUpperCase();
};

export const createImageFromInitials = (size, name, color) => {
  if (name == null) return;
  name = getInitials(name);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = canvas.height = size;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, size, size);

  context.fillStyle = `${color}50`;
  context.fillRect(0, 0, size, size);

  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.font = `${size / 2}px Roboto`;
  context.fillText(name, size / 2, size / 2);

  return canvas.toDataURL();
};

export const handleRemoveLocalstorage = () => {
  localStorage.removeItem("token");
};

export const removeNonAlphaNumeric = (e) => {
  return e?.target?.value.replace(/[^A-Za-z ]+/g, "");
};
export const removeDuplicates = (arr) => {
  let unique = [];
  arr?.forEach((element) => {
    if (!unique?.includes(element)) {
      unique?.push(element);
    }
  });
  return unique;
};
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const errorHandling = (error) => {
  if (error?.response?.data?.message == "failed") {
    toast.error(error?.response?.data?.reason);
  } else if (error?.response?.status === 422) {
    toast.error(error?.response?.data?.detail[0]?.msg);
    if (error?.response?.data?.message?.fullName) {
      toast.error(error?.response?.data?.message?.fullName[0]);
    }
    if (error?.response?.data?.message?.panNo) {
      toast.error(error?.response?.data?.message?.panNo[0]);
    }
  } else if (error?.response?.status == 500) {
    toast.error(ApiMessage?.internalServerError);
  }
};

export const getLink = (url) => {
  return `${HOSTNAME}${url}`;
};

export const token =
  typeof window !== "undefined" && localStorage?.getItem("token");
export const leadId =
  typeof window !== "undefined" && localStorage?.getItem("leadprofileid");
export const localUserData =
  typeof window !== "undefined" && localStorage?.getItem("userData");

export const setHash = (h) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem("h", h);
  }
};
export const getHash = () => {
  if (typeof window !== "undefined") {
    const h = localStorage.getItem("h");
    return h;
  }
};
export const checkIfHasAllMandatoryFields = (params) => {
  const {
    url_slug,
    gender,
    mobile_no,
    pan,
    pin_code,
    full_name,
    dob,
    email,
    occupation,
    terms,
    company_name,
    monthly_salary,
  } = params;
  const fieldMandatory =
    url_slug &&
    gender &&
    mobile_no &&
    pan &&
    pin_code &&
    full_name &&
    dob &&
    email &&
    occupation &&
    terms &&
    company_name &&
    monthly_salary;
  return !!fieldMandatory;
};
