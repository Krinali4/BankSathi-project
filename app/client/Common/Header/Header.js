"use-client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import User from "../../../../public/assets/user.svg";
import UserScroll from "../../../../public/assets/user-logo-new.svg";
import LogoWhite from "../../../../public/assets/BankSathi-Logo-white.svg";
import logoMobile from "../../../../public/assets/header-logo-mobile.svg";
import logoSticky from "../../../../public/assets/logo-sticky.svg";
import mobileLogoSticky from "../../../../public/assets/mobile-logo-sticky.svg";
import SearchIcon from "../../../../public/assets/searchIcon.svg";
import SearchIconWhite from "../../../../public/assets/searchiconwhite.svg";
import accordionArrowall from "../../../../public/assets/accordion-down.svg";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { SEARCH_TABS } from "@/commonUtils/StaticContent/searchFile";
import { useRouter } from "next/navigation";
// import jwt from "jwt-decode";
// import { handleRemoveLocalstorage } from "@/utils/util";

// const LoginModalProfile = dynamic(() => import("../LoginModalProfile"), {
//   ssr: false,
// });
export const COMMON = {
  registerDevice: "api/v1/common/registerdevice",
  commonGetTopMenu: "api/v1/common/get_top_menu",
  commonSearch: "api/v1/common/search",
  panVerify: "api/v1/common/pan_verify",
  pinCodeVerify: "api/v1/common/get_pincode_list",
};

export default function Header({
  businessCategorydata,
  commongettopmenu,
  showFull = true,
  showCreditScore = true,
}) {
  const [scrollY, setScrollY] = useState(0);
  const [searchmodal, setSearchmodal] = useState(false);
  const [search, setSearch] = useState(null);
  const [category, setCategory] = useState(null);
  const [hoverclose, sethoverClose] = useState(false);
  const [loginmodal, setLoginModal] = useState(false);
  const [profileactive, setProfileactive] = useState(false);
  const [SuggestionsSearch, setSuggestionsSearch] = useState();
  const [items, setItems] = useState([]);

  const starCount = 5;

  const profileshow = () => {
    setProfileactive(!profileactive);
  };
  const handleShowSearch = () => {
    setSearchmodal(!searchmodal);
    // GetSearchdata();
  };

  useEffect(() => {
    if (searchmodal || profileactive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [searchmodal, profileactive]);
  const router = useRouter();

  const handleLogin = () => {
    setLoginModal(!loginmodal);
  };

  //   function fetchSuggestions(query) {
  //     if (query) {
  //       const filteredSuggestions = items?.searched_item?.filter((suggestion) => {
  //         return suggestion.url_slug == query;
  //       });
  //       setSuggestionsSearch(filteredSuggestions);
  //     } else {
  //       setSuggestionsSearch(items?.searched_item);
  //     }
  //   }

  useEffect(() => {
    const close = (e) => {
      if (e?.keyCode === 27) {
        setSearchmodal(false);
        setSearch(null);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  //   useEffect(() => {
  //     if (router.query.term) {
  //       fetchSuggestions(router.query.term);
  //     }
  //   }, []);

  //   useEffect(() => {
  //     getUsers(items);
  //   }, []);

  //   const getUsers = (userList) => {
  //     setItems(userList);
  //   };

  const byCategory = (user, category) => {
    if (category) {
      return user.category === category;
    } else return user;
  };
  const bySearch = (user, search) => {
    if (search) {
      return user?.title?.toLowerCase()?.includes(search?.toLowerCase());
    } else return user;
  };

  // const filteredList = (users, category, search) => {
  //   return users?.searched_item?.filter((user) => byCategory(user, category)).filter((user) => bySearch(user, search))
  // }
  const filteredList = (items, category, search) => {
    return items?.searched_item
      ?.filter((user) => byCategory(user, category))
      ?.filter((user) => bySearch(user, search));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ============ Compare Cards ============

  const { query } = useRouter();

  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL;

  const size = useWindowSize();

  const token = typeof window !== "undefined" && localStorage.getItem("token");

  //   useEffect(() => {
  //     if (token) {
  //       const decordtoken = jwt(token);

  //       const timecurrrunt = Date.now();
  //       const timestampexp = decordtoken?.exp;

  //       const CurruntTime = new Intl.DateTimeFormat("en-US", {
  //         year: "numeric",
  //         month: "2-digit",
  //         day: "2-digit",
  //         hour: "2-digit",
  //         minute: "2-digit",
  //         second: "2-digit",
  //       }).format(timecurrrunt);

  //       function formatUnixTimestamp(timestampexp) {
  //         const dateObj = new Date(timestampexp * 1000);
  //         const month = dateObj.getMonth() + 1;
  //         const day = dateObj.getDate();
  //         const year = dateObj.getFullYear();
  //         const hours = dateObj.getHours();
  //         const minutes = dateObj.getMinutes();
  //         const seconds = dateObj.getSeconds();
  //         const ampm = hours >= 12 ? "PM" : "AM";
  //         const formattedDate = `${month}/${day}/${year}, ${formatTimeexp(
  //           hours
  //         )}:${formatTimeexp(minutes)}:${formatTimeexp(seconds)} ${ampm}`;
  //         return formattedDate;
  //       }

  //       function formatTimeexp(time) {
  //         return time < 10 ? "0" + time : time;
  //       }

  //       const formattedDateExp = formatUnixTimestamp(timestampexp);

  //       if (CurruntTime === formattedDateExp) {
  //         router.push("/login");
  //         handleRemoveLocalstorage();
  //       }
  //     }
  //   }, []);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref?.current && !ref.current.contains(event.target)) {
          setProfileactive(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  //===============added prev changes
  const lang_id = 1;
  const url_slug = "";

  const req = {
    search_string: url_slug,
    lang_id: lang_id,
  };

  //   const GetSearchdata = (e) => {
  //     axios
  //       .post(BASE_URL + COMMON?.commonSearch, req)
  //       .then((response) => {
  //         setItems(response?.data);
  //       })
  //       .catch((error) => {
  //         if (error?.response?.data?.message == "failed") {
  //           toast.error(error?.response?.data?.reason);
  //         } else if (error?.response?.status == 403) {
  //         }
  //       });
  //   };

  return (
    <>
      <Toaster />
      {searchmodal || scrollY > 0 ? (
        <>
          <div
            ref={wrapperRef}
            className={`text-gray-600 body-font bg-white fixed top-0 z-[50] ${
              showFull ? "w-full" : "w-fit"
            } duration-300 shadow-lg scroll-header-hover`}
          >
            {showCreditScore && (
              <div className="container max-[991px]:max-w-full h-[52px] py-[12px] mx-auto  max-[1024px]:px-8  flex justify-between max-[767px]:!py-4 items-center max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 header ">
                <div className="w-[16%] py-3 max-[1440px]:w-[18%] max-[1200px]:w-[20%] max-[820px]:w-[18%] max-[771px]:w-[20%]">
                  <Link
                    href="/"
                    className="flex md:block hidden title-font font-medium  text-gray-900 md:mb-0  mt-0  w-full items-center focus:outline-none destop-logo-head"
                    prefetch={false}
                  >
                    <Image src={logoSticky} alt="img_text" className="w-full" />
                  </Link>
                  <Link
                    href=""
                    className="flex max-md:block hidden title-font font-medium items-center text-gray-900 md:mb-0  mt-0  w-full  focus:outline-none mobile-logo-head"
                    prefetch={false}
                  >
                    <Image
                      src={mobileLogoSticky}
                      alt="img_text"
                      className="w-3/6 max-[834px]:w-2/5 max-[479px]:w-[50%]"
                    />
                  </Link>
                </div>
                <div>
                  <nav className="md:ml-auto md:flex items-center text-base justify-center hidden gap-5 max-[820px]:gap-4 menu-mobile">
                    <ul className="nav__menu flex gap-5 mb-0">
                      <li className="nav__menu-item">
                        <Link
                          href="#"
                          onMouseOver={() => sethoverClose(false)}
                          className="head-text font-[faktum] max-[1600px]:text-[16px] !text-[#212529] hover:!text-[#212529] no-underline font-semibold text-lg max-[820px]:text-[15px] max-[834px]:text-[15px] head-menu"
                          prefetch={false}
                        >
                          All Products
                        </Link>
                        {/* <CreditSubmenu
                          commongettopmenu={commongettopmenu}
                          sethoverClose={sethoverClose}
                          hoverclose={hoverclose}
                        /> */}
                      </li>

                      <li className="nav__menu-item">
                        <Link
                          href="#"
                          className="head-text font-[faktum] max-[1600px]:text-[16px]  !text-[#212529] hover:!text-[#212529] no-underline font-semibold text-lg max-[820px]:text-[15px] max-[834px]:text-[15px] head-menu"
                          prefetch={false}
                        >
                          Resources
                        </Link>
                        {/* <ResourceSubmenu
                          businessCategorydata={businessCategorydata}
                          commongettopmenu={commongettopmenu}
                          sethoverClose={sethoverClose}
                          hoverclose={hoverclose}
                        /> */}
                      </li>
                      <li className="nav__menu-item">
                        <Link
                          href="#"
                          className="head-text font-[faktum] max-[1600px]:text-[16px]  !text-[#212529] hover:!text-[#212529] no-underline font-semibold text-lg max-[820px]:text-[15px] max-[834px]:text-[15px] head-menu"
                          prefetch={false}
                        >
                          Tools
                          {/* <ToolsSubmenu
                            commongettopmenu={commongettopmenu}
                            sethoverClose={sethoverClose}
                            hoverclose={hoverclose}
                          /> */}
                        </Link>
                      </li>
                      <li className="  max-[771px]:py-6 about-head">
                        <Link
                          href="/about-us"
                          onMouseOver={() => sethoverClose(false)}
                          className="head-text font-[faktum] max-[1600px]:text-[16px]  !text-[#212529] hover:!text-[#212529] no-underline font-semibold text-lg max-[820px]:text-[15px] max-[834px]:text-[15px] head-menu"
                          prefetch={false}
                        >
                          About Us
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="flex items-center relative">
                  {!searchmodal && (
                    <div
                      className="relative "
                      onClick={(e) => handleShowSearch(e)}
                    >
                      <div className="inset-y-0 h-[36px] w-[36px] justify-center  max-[771px]:py-2 max-[834px]:h-[36px] max-[834px]:w-[36px] flex items-center mr-3 cursor-pointer  max-[479px]:p-[8px]  border border-black rounded-lg  max-[767px]:h-full max-[767px]:w-auto head-search-bar">
                        <Image
                          src={SearchIcon}
                          alt="search"
                          className="w-[16px] h-[16px] max-[479px]:w-4 max-[479px]:h-4"
                        />
                      </div>
                    </div>
                  )}
                  {token ? (
                    <>
                      <Image
                        src={UserScroll}
                        onClick={() => profileshow()}
                        className="max-[768px]:p-[0px] max-[476px]:p-0 cursor-pointer max-[479px]:w-[36px] max-[479px]:h-[36px]"
                        width={40}
                        height={40}
                        alt="user"
                      />
                      {/* {profileactive ? <LoginModalProfile /> : ""} */}
                      <div className="" onClick={() => profileshow()}>
                        {profileactive ? (
                          <Image
                            src={accordionArrowall}
                            alt="up"
                            width={20}
                            height={20}
                            className="rotate-180 cursor-pointer w-6 h-6 shrink-0 ml-1 relative"
                          />
                        ) : (
                          <Image
                            src={accordionArrowall}
                            alt="up"
                            width={20}
                            height={20}
                            className=" w-6 cursor-pointer h-6 shrink-0 ml-1 relative "
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="!text-white"
                      prefetch={false}
                    >
                      <button
                        onClick={(e) => handleLogin(e)}
                        className={
                          searchmodal
                            ? `head-text font-[faktum] cursor-pointer hidden md:block h-[36px] inline-flex max-[820px]:text-[14px] !text-[#212529] font-semibold max-[771px]:text-[12px] items-center bg-[#49D49D]  border-0  px-3 focus:outline-none  rounded-lg text-base max-[991px]:text-sm md:mt-0  head-login-btn`
                            : `head-text font-[faktum] cursor-pointer hidden md:block h-[36px] inline-flex max-[820px]:text-[14px] text-[#212529] font-semibold max-[771px]:text-[12px] items-center  bg-[#49D49D] border-0  px-3 focus:outline-none  rounded-lg text-base max-[991px]:text-sm md:mt-0  head-login-btn`
                        }
                      >
                        Login or Sign up
                      </button>
                    </Link>
                  )}

                  {!token && (
                    <Link
                      href="/login"
                      className="text-[#212529]"
                      prefetch={false}
                    >
                      <button className=" block cursor-pointer md:hidden bg-[#49D49D] h-[36px] w-[36px]   max-[834px]:w-[36px] max-[834px]:h-[36px] rounded-full max-[479px]:p-0 login-icon  max-[479px]:w-[36px] max-[479px]:h-[36px] ">
                        <Image src={UserScroll} className="" alt="user" />
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div
            ref={wrapperRef}
            className="text-gray-600 body-font  z-[100] hover-header-hidden"
          >
            <div className="container h-[52px] py-[12px] max-[991px]:max-w-full mx-auto  max-[1024px]:px-8  max-[767px]:!py-4  flex justify-between items-center  max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 header relative">
              <div className="w-[16%] items-center py-3 max-[1440px]:w-[18%] max-[1200px]:w-[20%] max-[820px]:w-[18%] max-[771px]:w-[20%] ">
                <Link
                  href="/"
                  className="flex md:block hidden title-font font-medium  text-gray-900 md:mb-0  mt-0  items-center focus:outline-none destop-logo-head"
                  prefetch={false}
                >
                  <Image src={LogoWhite} alt="BankSathi" className="w-full " />
                </Link>

                <Link
                  href="/"
                  className="flex hidden max-md:block title-font font-medium items-center text-gray-900 md:mb-0  mt-0   focus:outline-none mobile-logo-head"
                  prefetch={false}
                >
                  <Image
                    src={logoMobile}
                    alt="BankSathi"
                    className="w-3/6 max-[834px]:w-2/5 max-[479px]:w-[50%]  "
                  />
                </Link>
              </div>
              <div>
                <nav className="md:ml-auto md:flex items-center text-base justify-center hidden gap-5 max-[820px]:gap-4 menu-mobile">
                  <ul className="nav__menu flex gap-5 mb-0">
                    <li className="nav__menu-item py-5">
                      <Link
                        href="#"
                        onMouseOver={() => sethoverClose(false)}
                        className=" head-text font-[faktum] max-[1600px]:text-[18px] !text-white hover:!text-white  font-semibold text-lg max-[820px]:text-[14px] max-[771px]:text-[15px] head-menu"
                        prefetch={false}
                      >
                        All Products
                      </Link>
                      {/* <CreditSubmenu
                        commongettopmenu={commongettopmenu}
                        sethoverClose={sethoverClose}
                        hoverclose={hoverclose}
                      /> */}
                    </li>
                    <li className="nav__menu-item py-5">
                      <Link
                        href="#"
                        className=" head-text font-[faktum] max-[1600px]:text-[18px] !text-white hover:!text-white font-semibold text-lg max-[820px]:text-[14px] max-[771px]:text-[15px] head-menu"
                        prefetch={false}
                      >
                        Resources
                      </Link>
                      {/* <ResourceSubmenu
                        businessCategorydata={businessCategorydata}
                        commongettopmenu={commongettopmenu}
                        sethoverClose={sethoverClose}
                        hoverclose={hoverclose}
                      /> */}
                    </li>
                    <li className="nav__menu-item py-5">
                      <Link
                        href="#"
                        className=" head-text font-[faktum] max-[1600px]:text-[18px] !text-white hover:!text-white  font-semibold text-lg max-[820px]:text-[14px] max-[771px]:text-[15px] head-menu"
                        prefetch={false}
                      >
                        Tools
                      </Link>
                      {/* <ToolsSubmenu
                        commongettopmenu={commongettopmenu}
                        sethoverClose={sethoverClose}
                        hoverclose={hoverclose}
                      /> */}
                    </li>
                    <li className=" max-[771px]:py-6 about-head">
                      <Link
                        href="/about-us"
                        className=" head-text font-[faktum] max-[1600px]:text-[18px] !text-white hover:!text-white  font-semibold text-lg max-[820px]:text-[14px] max-[771px]:text-[15px] head-menu"
                        prefetch={false}
                      >
                        About Us
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="flex items-center relative">
                {!searchmodal && (
                  <div
                    className="relative"
                    onClick={(e) => handleShowSearch(e)}
                  >
                    <div className="inset-y-0 h-[36px] w-[36px] max-[771px]:py-2 justify-center  flex items-center mr-3 cursor-pointer  max-[479px]:p-[8px] border border-white rounded-lg  max-[767px]:h-full max-[767px]:w-auto  head-search-bar">
                      <Image
                        src={SearchIconWhite}
                        alt="search"
                        className="w-4 h-4 max-[479px]:w-4 max-[479px]:h-4"
                      />
                    </div>
                  </div>
                )}
                {token ? (
                  <>
                    <Image
                      src={User}
                      onClick={() => profileshow()}
                      className="mx-auto bg-white cursor-pointer flex items-center justify-center p-2 rounded-full max-[576px]:p-[8px] w-[40px] h-[40px] max-[576px]:w-auto max-[576px]:h-auto  head-user-icon"
                      alt="user"
                    />
                    {/* {profileactive ? <LoginModalProfile /> : ""} */}
                    {/* </button> */}
                    {/* {size.width < 577 && */}
                    <div className="" onClick={() => profileshow()}>
                      {profileactive ? (
                        <Image
                          src={accordionArrowall}
                          alt="up"
                          width={20}
                          height={20}
                          className="rotate-180 cursor-pointer w-5 h-5 shrink-0 ml-1 relative"
                        />
                      ) : (
                        <Image
                          src={accordionArrowall}
                          alt="up"
                          width={20}
                          height={20}
                          className=" w-5 cursor-pointer h-5 shrink-0 ml-1 relative "
                        />
                      )}
                    </div>
                    {/* } */}
                  </>
                ) : (
                  <Link href="/login" className="!text-[#212529]">
                    <button className="!text-[#212529] h-[36px] cursor-pointer head-text font-[faktum] hidden md:block  inline-flex max-[820px]:text-[14px] max-[771px]:text-[12px]  bg-gray-100 border-0  items-center px-[10px] focus:outline-none hover:bg-gray-200 rounded-lg text-base max-[991px]:text-sm md:mt-0 head-login-btn">
                      Login or Sign up
                    </button>
                  </Link>
                )}

                {token ? (
                  ""
                ) : (
                  <>
                    <Link href="/login" className="!text-[#212529]">
                      <button className=" bg-white cursor-pointer  h-[36px] w-[36px] md:hidden flex justify-center rounded-full max-[479px]:p-[8px] login-icon">
                        <Image
                          src={User}
                          className="justify-center relative flex md:left-[22%]"
                          alt="user"
                        />
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {searchmodal ? (
        <div
          className="fixed z-50 overflow-y-auto top-[3.2rem] max-[820px]:top-[3.2rem] max-[479px]:top-[2.9rem] w-full left-0 search-popup-resolution  "
          id="modal"
        >
          <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity ">
              <div className="fixed inset-0 bg-gray-900 top-[3.2rem] max-[820px]:top-[3.2rem] max-[479px]:top-[2.9rem] opacity-75" />
            </div>
            <p className="sm:inline-block sm:align-middle sm:h-screen  h-[100vh] max-[479px]:h-[82vh] search-mobile"></p>
            <div
              className={`${
                scrollY > 0
                  ? "inline-block align-center  bg-[#fff] text-left border-t border-[#E6ECF1] w-full absolute top-0 max-[576px]:top-0 left-0 overflow-hidden shadow-xl transform transition-all  sm:align-middle"
                  : "inline-block align-center bg-[#fff] text-left border-t border-[#E6ECF1] w-full absolute top-0 max-[576px]:top-0 left-0 overflow-hidden shadow-xl transform transition-all  sm:align-middle"
              } `}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div
                className={`${
                  scrollY > 0
                    ? " container mx-auto 2xl:px-40 xl:px-30 xl:pb-12 xl:pt-5 xl:px-40 lg:px-20 md:px-16  p-4 py-8  relative"
                    : " container  mx-auto 2xl:px-40 xl:px-30 xl:pb-12 xl:pt-5 xl:px-40 lg:px-20 md:px-16  p-4 py-8  relative"
                } `}
              >
                <div className="flex gap-5 items-center">
                  <div className="relative flex items-center max-[320px]:flex-col w-full">
                    <label
                      htmlFor="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>

                    <div className="relative max-[320px]:text-[12px]  w-full p-4 text-sm text-gray-900 border border-black bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none flex items-center gap-3 rounded-lg">
                      <input
                        type=""
                        className="w-full mr-[2.8rem] bg-transparent focus:outline-none"
                        placeholder="What can we help you find?"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div className="absolute right-0 p-5 inset-y-0  flex items-center  cursor-pointer max-[320px]:h-full max-[320px]:p-4 bg-[#49D49D] rounded-br-lg rounded-tr-lg">
                      <Image src={SearchIcon} alt="" className="w-5 h-5" />
                    </div>
                  </div>

                  {scrollY > 0 ? (
                    <button
                      type="button"
                      className={`text-[#212529] cursor-pointer rounded mr-2  z-10 right-0 top-0 xl:right-16 lg:left-[13%] relative ${
                        size?.width === 1024 && "!left-[1%]"
                      } `}
                      onClick={(e) => {
                        setSearch(null);
                        setSearchmodal(false);
                      }}
                    >
                      <i className="fas fa-times"></i>{" "}
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        className={`text-[#212529] cursor-pointer rounded mr-2  z-10 right-0 top-0 xl:right-16 lg:left-[13%] relative ${
                          size?.width === 1024 && "!left-[1%]"
                        }`}
                        onClick={(e) => {
                          setSearch(null);
                          setSearchmodal(false);
                        }}
                      >
                        <i className="fas fa-times"></i>{" "}
                      </button>
                    </>
                  )}
                </div>
                <div className="pb-[30px] pt-5 max-[576px]:hidden">
                  <p
                    className={`${
                      scrollY > 0
                        ? "text-[16px] font-semibold text-[#212529] max-[360px]:text-[15px] uppercase"
                        : "text-[16px] font-semibold text-[#212529] max-[360px]:text-[15px] uppercase"
                    }`}
                  >
                    Popular Searches
                  </p>
                  <div className="flex items-center flex-wrap mt-[10px]  gap-[15px]">
                    {SEARCH_TABS?.map((searchpopular, index) => {
                      return (
                        <>
                          <div
                            onClick={() => {
                              setSearch(searchpopular?.popularTitle);
                            }}
                            className="bg-[#E6ECF1] px-4 py-[7.5px] rounded-lg w-auto text-center cursor-pointer"
                          >
                            <p className="textr-[15px] font-normal text-[#212529]">
                              {searchpopular?.popularTitle}
                            </p>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
                {search?.length ? (
                  <>
                    <div className="pb-4 max-[479px]:py-4">
                      <p
                        className={`${
                          scrollY > 0
                            ? "text-[16px] font-semibold text-[#212529] max-[360px]:text-[15px] uppercase"
                            : "text-[16px] font-semibold text-[#212529] max-[360px]:text-[15px] uppercase"
                        }`}
                      >
                        Search Results
                      </p>
                      {filteredList(items, category, search)?.map(
                        (user, index) => (
                          <li
                            key={index}
                            className={`${
                              scrollY > 0
                                ? "text-[18px] text-[#212529] cursor-default select-none relative py-2  pr-9 list-none"
                                : "text-[18px] text-[#212529] cursor-default select-none relative py-2  pr-9 list-none"
                            }`}
                            id="headlessui-listbox-option-7"
                            role="option"
                            tabindex="-1"
                            aria-selected="true"
                          >
                            <div className="flex items-center">
                              <div className="w-full">
                                <Link
                                  className="text-[#212529] hover:!text-[#212529]"
                                  href={`/${user?.url_slug}`}
                                  onClick={() => {
                                    setSearchmodal(false);
                                    setSearch(null);
                                  }}
                                >
                                  <span className="font-semibold flex items-center block search-result">
                                    {" "}
                                    {user?.title}
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </li>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
