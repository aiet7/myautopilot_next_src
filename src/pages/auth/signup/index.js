"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { UsaStates } from "usa-states";
import useAuthStore from "@/utils/store/auth/authStore.js";
import useUiStore from "@/utils/store/ui/uiStore.js";
import { FaNetworkWired, FaBusinessTime, FaRegUser } from "react-icons/fa";

const SignupPage = () => {
  // const usStates = new UsaStates();
  const router = useRouter();
  const { height, setHeight } = useUiStore();

  // const {
  //   firstName,
  //   lastName,
  //   companyId,
  //   phoneNumber,
  //   companyAddress,
  //   errorMessage,
  //   showSignupForm,
  //   companies,
  //   setEmail,
  //   setPassword,
  //   setFirstName,
  //   setLastName,
  //   setCompanyId,
  //   setCompanyName,
  //   setPhoneNumber,
  //   setCompanyAddress,
  //   handleSignupEmailCheck,
  //   handleSignupCredentialsAuth,
  //   handleShowLogin,
  // } = useAuthStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight);

      const handleResize = () => setHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <>
      {height && (
        <div
          className="relative z-[99]  bg-gradient-to-b from-white via-white to-gray-400 h-full flex justify-center items-center"
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <div className="flex flex-col gap-6 p-4">
            <h1 className="text-4xl font-bold text-left lg:text-center">
              Sign up
            </h1>
            <div className="flex flex-col gap-6  items-center justify-center lg:flex-row">
              <Link href={"/auth/signup/msp"}>
                <div className="hover:shadow-blue-500  flex flex-col  justify-center items-center w-full shadow-xl rounded-lg  cursor-pointer lg:w-[275px]">
                  <h2 className="flex items-center justify-center text-2xl font-bold  bg-black/5 rounded-tr-lg rounded-tl-lg w-full p-3 lg:h-[100px]">
                    MSP
                  </h2>
                  <p className="text-lg text-black/60 py-2 px-4 h-[100px] lg:h-[175px]">
                    Ideal for IT service providers offering managed services.
                    Get tailored solutions to manage your clients IT
                    infrastructure efficiently.
                  </p>
                  <div className="p-2 h-full">
                    <FaNetworkWired size={25} />
                  </div>
                </div>
              </Link>
              <Link href={"/auth/signup/business"}>
                <div className="hover:shadow-blue-500 flex flex-col  justify-center items-center w-full shadow-xl rounded-lg  cursor-pointer lg:w-[275px]">
                  <h2 className="flex items-center justify-center text-2xl font-bold  bg-black/5 rounded-tr-lg rounded-tl-lg w-full p-3 lg:h-[100px]">
                    Businesses
                  </h2>
                  <p className="text-lg text-black/60 py-2 px-4 h-[100px] lg:h-[175px]">
                    Perfect for businesses of all sizes seeking robust IT
                    solutions. Enhance your operational efficiency and
                    streamline workflows.
                  </p>
                  <div className="flex p-2">
                    <FaBusinessTime size={25} />
                  </div>
                </div>
              </Link>
              <Link href={"/auth/signup/personal"}>
                <div className="hover:shadow-blue-500 flex flex-col justify-center items-center w-full shadow-xl rounded-lg cursor-pointer lg:w-[275px] ">
                  <h2 className="flex items-center justify-center text-2xl font-bold  bg-black/5 rounded-tr-lg rounded-tl-lg w-full p-3 lg:h-[100px]">
                    Personal
                  </h2>
                  <p className=" text-lg text-black/60 py-2 px-4 h-[100px] lg:h-[175px]">
                    Designed for individuals and freelancers needing reliable
                    and efficient IT tools for personal projects or home use.
                  </p>
                  <div className="p-2">
                    <FaRegUser size={25} />
                  </div>
                </div>
              </Link>
            </div>
            <Link href={"/auth/login"}>
              <span className="text-sm text-blue-800 font-semibold">
                Have an account? Login in
              </span>
            </Link>
          </div>

          {/* <form className="w-[300px] flex flex-col items-center gap-4">
            <Image
              priority={true}
              src="/images/etech7_logo_auth.webp"
              alt="Etech7_Signup_Logo"
              width={50}
              height={50}
            />
            <h1 className="text-xl font-bold text-black text-center">
              Create your account
            </h1>
            <p className="text-center text-black text-sm">
              Please note that all of the fields are required for account
              creation.
            </p>
            <p className="text-red-500 text-sm">{errorMessage}</p>

            {!showSignupForm && (
              <>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSignupEmailCheck();
                    }
                  }}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300  bg-white text-black"
                />
                <button
                  onClick={handleSignupEmailCheck}
                  type="button"
                  className="hover:bg-blue-500 w-full py-2 bg-[#00AEEE] text-white font-bold rounded-sm"
                >
                  Continue
                </button>
              </>
            )}
            {showSignupForm && (
              <>
                <select
                  onChange={(e) => {
                    const selectedCompany = companies.find(
                      (c) => c.companyName === e.target.value
                    );
                    if (selectedCompany) {
                      setFirstName(selectedCompany.firstName || "");
                      setLastName(selectedCompany.lastName || "");
                      setCompanyName(
                        selectedCompany.companyName ||
                          selectedCompany.company?.name ||
                          ""
                      );
                      setCompanyId(
                        selectedCompany.companyId ||
                          selectedCompany.company?.id ||
                          ""
                      );
                      setPhoneNumber(
                        selectedCompany.phoneNumber ||
                          selectedCompany.defaultPhoneNbr ||
                          ""
                      );
                      setCompanyAddress(
                        "street",
                        selectedCompany.companyAddress?.street || ""
                      );
                      setCompanyAddress(
                        "city",
                        selectedCompany.companyAddress?.city || ""
                      );
                      setCompanyAddress(
                        "state",
                        selectedCompany.companyAddress?.state || ""
                      );
                      setCompanyAddress(
                        "zipcode",
                        selectedCompany.companyAddress?.zipcode || ""
                      );
                    }
                  }}
                >
                  {Array.isArray(companies) &&
                    companies.map((company) => (
                      <option
                        key={company.companyId}
                        value={company.companyName}
                      >
                        {company.companyName}
                      </option>
                    ))}
                </select>

                <div className="flex gap-2">
                  <input
                    value={firstName || ""}
                    onChange={(e) => setFirstName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSignupCredentialsAuth(router.push);
                      }
                    }}
                    type="text"
                    placeholder="First name"
                    className="w-full p-2 border border-gray-300 bg-white text-black"
                  />
                  <input
                    value={lastName || ""}
                    onChange={(e) => setLastName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSignupCredentialsAuth(router.push);
                      }
                    }}
                    type="text"
                    placeholder="Last name"
                    className="w-full p-2 border border-gray-300 bg-white text-black"
                  />
                </div>
                <input
                  disabled
                  value={companyId || ""}
                  onChange={(e) => setCompanyId(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSignupCredentialsAuth(router.push);
                    }
                  }}
                  type="text"
                  placeholder="Company Id"
                  className="w-full p-2 border border-gray-300 bg-white text-black"
                />

                <div className="flex gap-2">
                  <input
                    value={companyAddress.street || ""}
                    onChange={(e) =>
                      setCompanyAddress("street", e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSignupCredentialsAuth(router.push);
                      }
                    }}
                    type="text"
                    placeholder="Street"
                    className="w-full p-2 border border-gray-300 bg-white text-black"
                  />

                  <input
                    value={companyAddress.city || ""}
                    onChange={(e) => setCompanyAddress("city", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSignupCredentialsAuth(router.push);
                      }
                    }}
                    type="text"
                    placeholder="City "
                    className="w-full p-2 border border-gray-300 bg-white text-black"
                  />
                </div>
                <div className="w-full flex gap-2">
                  <input
                    value={companyAddress.zipcode || ""}
                    maxLength={5}
                    onChange={(e) =>
                      setCompanyAddress("zipcode", e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSignupCredentialsAuth(router.push);
                      }
                    }}
                    type="text"
                    placeholder="Zipcode"
                    className="w-full p-2 border border-gray-300 bg-white text-black"
                  />
                  <select
                    value={companyAddress.state || ""}
                    onChange={(e) => setCompanyAddress("state", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSignupCredentialsAuth(router.push);
                      }
                    }}
                    className={`w-full p-2 border rounded-none border-gray-300  ${
                      companyAddress.state
                        ? "bg-white text-black"
                        : "bg-white text-gray-400"
                    }`}
                  >
                    <option value="">State</option>
                    {usStates.states.map((state) => (
                      <option
                        key={state.abbreviation}
                        value={state.abbreviation}
                      >
                        {state.abbreviation}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  value={phoneNumber || ""}
                  maxLength={10}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSignupCredentialsAuth(router.push);
                    }
                  }}
                  type="text"
                  placeholder="Phone number"
                  className="w-full p-2 border border-gray-300 bg-white text-black"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSignupCredentialsAuth(router.push);
                    }
                  }}
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 border border-gray-300 bg-white text-black"
                />
                <button
                  onClick={() => handleSignupCredentialsAuth(router.push)}
                  type="button"
                  className="hover:bg-blue-500 w-full  py-2 bg-[#00AEEE] text-white font-bold rounded-sm"
                >
                  Continue
                </button>
              </>
            )}
            <p className="w-full text-black">
              Already have an account?{" "}
              <span
                onClick={() => handleShowLogin(router.push)}
                className="text-[#00AEEE]  cursor-pointer"
              >
                Login
              </span>
            </p>
          </form> */}
        </div>
      )}
    </>
  );
};

export default SignupPage;
