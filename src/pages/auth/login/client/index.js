"use client";
import Link from "next/link";
import { useEffect } from "react";
import useUiStore from "@/utils/store/ui/uiStore.js";
import useMspStore from "@/utils/store/auth/msp/mspStore";

const ClientLoginPage = () => {
  const { height, setHeight } = useUiStore();

  const {
    mspDomains,
    errorMessage,
    setLoginInputs,
    handleTechnicianCheck,
    clearMSPCredentials,
  } = useMspStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight);

      // let session_token = Cookie.get("session_token");
      // const client_id = Cookie.get("client_id");
      // if (session_token && client_id) {
      //   router.push(`/dashboard/${client_id}`);
      // }

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
          className="bg-gradient-to-b from-white via-white to-gray-400 h-full flex justify-center items-center"
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <form className="p-6 w-[450px] flex flex-col gap-10 items-start justify-center lg:shadow-lg  lg:rounded-lg lg:bg-white">
            <div className="text-black flex flex-col items-start">
              <h1 className="text-2xl font-bold text-black">
                Enter Your Client Details.
              </h1>
              {errorMessage?.emailCheck && (
                <p className="text-red-500">Email does not exist.</p>
              )}
              {errorMessage?.emptyFields && (
                <p className="text-red-500">Please fill out required field*.</p>
              )}
            </div>
            <div className="flex flex-col gap-4 w-full ">
              {mspDomains ? (
                <>
                  <h2 className="text-lg font-semibold text-black">
                    List of domains.
                  </h2>
                  {mspDomains.map((msp) => {
                    const { id, mspCustomDomain } = msp;
                    return (
                      <div key={id} className="rounded-lg shadow p-4">
                        <Link href={`/${mspCustomDomain}`}>
                          <h2 className="font-bold text-lg text-black">
                            {mspCustomDomain}
                          </h2>
                        </Link>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border border-gray-300 bg-white text-black"
                  />
                  <button
                    type="button"
                    className="hover:bg-blue-500 text-lg font-bold w-full rounded bg-blue-800 text-white py-4"
                  >
                    Continue
                  </button>
                </>
              )}
              <div className="flex flex-col gap-1">
                <Link href="/auth/login">
                  <span className="text-sm text-blue-800 font-semibold">
                    Back to login in
                  </span>
                </Link>
                <Link href="/auth/signup">
                  <span className="text-sm text-blue-800 font-semibold">
                    No Account? Sign up
                  </span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ClientLoginPage;
