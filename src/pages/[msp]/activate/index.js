"use client";
import useMspStore from "@/utils/store/auth/msp/mspStore";
import useUiStore from "@/utils/store/ui/uiStore.js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ActivatePage = () => {
  const router = useRouter();

  const { msp } = router.query;
  const { height, setHeight } = useUiStore();
  const {
    userType,
    selectedTechnician,
    selectedClient,
    technicianList,
    clientList,
    setSignupInputs,
    setSelectedClient,
    setSelectedTechnician,
    handleActiveTechnicianTab,
    handleActiveClientTab,
    handleActivateTechnicianCheck,
    handleActivateClientCheck,
    handleActivateTechnician,
    handleActivateClient,
    initializeUserType,
  } = useMspStore();

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

  useEffect(() => {
    initializeUserType();
  }, []);

  return (
    <>
      {height && (
        <div
          className="relative z-[99]  bg-gradient-to-b from-white via-white to-gray-400 h-full flex justify-center items-center"
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <div className="p-4 flex flex-col items-center w-full justify-center h-full ">
            <form className="p-6 w-[450px]  flex flex-col gap-10 items-start justify-center lg:shadow-lg  lg:rounded-lg lg:bg-white ">
              {!technicianList && !clientList && (
                <div className="dark:bg-black dark:text-white dark:shadow-white/40 flex items-center gap-2 w-full rounded-lg bg-white p-1 shadow-lg ">
                  <button
                    type="button"
                    onClick={handleActiveTechnicianTab}
                    className={`${
                      userType === "tech" && "bg-blue-800 text-white"
                    } font-bold w-full rounded-lg py-4`}
                  >
                    Technician
                  </button>
                  <button
                    type="button"
                    onClick={handleActiveClientTab}
                    className={`${
                      userType === "client" && "bg-blue-800 text-white"
                    } font-bold w-full rounded-lg py-4`}
                  >
                    Client
                  </button>
                </div>
              )}

              {selectedTechnician || selectedClient ? (
                <div className="flex flex-col gap-4 w-full">
                  <h1 className="text-2xl font-bold ">Activate Your Account</h1>
                  <p className="font-bold text-lg text-black">
                    {selectedTechnician && selectedTechnician?.primaryEmail}
                    {selectedClient && selectedClient?.primaryEmail}
                  </p>
                  <input
                    onChange={(e) =>
                      selectedTechnician
                        ? setSignupInputs(
                            "techInfo",
                            "password",
                            e.target.value
                          )
                        : setSignupInputs(
                            "clientInfo",
                            "password",
                            e.target.value
                          )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (selectedTechnician) {
                          handleActivateTechnician(router.push, msp);
                        } else {
                          handleActivateClient(router.push, msp);
                        }
                      }
                    }}
                    type="password"
                    placeholder="Password"
                    className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      selectedTechnician
                        ? handleActivateTechnician(router.push, msp)
                        : handleActivateClient(router.push, msp)
                    }
                    className="hover:bg-blue-500 text-lg font-bold w-full rounded bg-blue-800 text-white py-4"
                  >
                    Activate
                  </button>
                </div>
              ) : (
                <>
                  {technicianList || clientList ? (
                    <div className="flex flex-col gap-2 w-full">
                      {userType === "tech" && (
                        <>
                          {technicianList.map((technician) => {
                            const { id, firstName, lastName, primaryEmail } =
                              technician;
                            return (
                              <div
                                onClick={() =>
                                  setSelectedTechnician(technician)
                                }
                                key={id}
                                className="cursor-pointer rounded-lg shadow p-4"
                              >
                                <p className="font-bold text-lg text-black">
                                  {firstName}
                                  {lastName ? ` ${lastName}` : ""}
                                </p>
                                <p>{primaryEmail}</p>
                              </div>
                            );
                          })}
                        </>
                      )}
                      {userType === "client" && (
                        <>
                            {clientList.map((client) => {
                            const {
                              id,
                              firstName,
                              lastName,
                              connectWiseEmailId,
                            } = client;
                            return (
                              <div
                                onClick={() => setSelectedClient(client)}
                                key={id}
                                className="cursor-pointer rounded-lg shadow p-4"
                              >
                                <p className="font-bold text-lg text-black">
                                  {firstName}
                                  {lastName ? ` ${lastName}` : ""}
                                </p>
                                <p>{connectWiseEmailId}</p>
                              </div>
                            );
                          })}
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="text-black flex flex-col items-start">
                        <h1 className="text-2xl font-bold ">
                          {userType === "tech"
                            ? "Enter Your Technician Details."
                            : "Enter Your Client Details."}
                        </h1>
                        <p className="text-black/60">
                          Please fill out all of the required fields*
                        </p>
                      </div>
                      <input
                        onChange={(e) =>
                          userType === "tech"
                            ? setSignupInputs(
                                "techInfo",
                                "email",
                                e.target.value
                              )
                            : setSignupInputs(
                                "clientInfo",
                                "email",
                                e.target.value
                              )
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();

                            if (userType === "tech") {
                              handleActivateTechnicianCheck(msp);
                            } else {
                              handleActivateClientCheck(msp);
                            }
                          }
                        }}
                        type="email"
                        placeholder="Email address"
                        className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                      />

                      <button
                        type="button"
                        onClick={(e) => {
                          if (userType === "tech") {
                            handleActivateTechnicianCheck(msp);
                          } else {
                            handleActivateClientCheck(msp);
                          }
                        }}
                        className="hover:bg-blue-500 text-lg font-bold w-full rounded bg-blue-800 text-white py-4"
                      >
                        Continue
                      </button>
                    </>
                  )}
                </>
              )}
              <div className="flex flex-col gap-1">
                <Link href={"/auth/signup"}>
                  <span className="text-sm text-blue-800 font-semibold">
                    Back to sign up
                  </span>
                </Link>
                <Link href={`/${msp}`}>
                  <span className="text-sm text-blue-800 font-semibold">
                    Have An Account? Log in
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivatePage;
