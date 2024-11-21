"use client";

import { AiFillEdit } from "react-icons/ai";
import { IoMdFingerPrint } from "react-icons/io";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BsQrCodeScan } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";

import useUserStore from "@/utils/store/user/userStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useMspStore from "@/utils/store/auth/msp/mspStore";

const Account = ({}) => {
  const { openNav } = useUiStore();
  const {
    user,
    userInputs,
    editing,
    errorMessage,
    userPasswords,
    passwordError,
    handleStartEdit,
    handleEditOnChange,
    handlePasswordChange,
    handleResetPassword,
    handleSaveChanges,
    handleCancelEdit,
  } = useUserStore();

  const {
    authError,
    setAuthError,
    authCard,
    setAuthCard,
    authToken,
    setAuthToken,
    authPopup,
    authUpdatedPopup,
    setAuthPopup,
    successMessage,
    setSuccessMessage,
    handleSendEmailToken,
    handleTokenVerification,
    userType,
  } = useMspStore();

  return (
    <div
      className={`relative flex flex-col h-full w-full text-sm  ${
        openNav && "lg:opacity-100 opacity-5 xl:ml-[250px]"
      } dark:bg-black bg-white transition-all duration-300 ease`}
    >
      <div
        className={`flex-grow overflow-auto scrollbar-thin transition-all duration-300 ${
          authCard && "filter blur-sm"
        }`}
      >
        <div className="px-4 py-4 w-full">
          <div className="max-w-[1250px] flex flex-col  gap-4 mx-auto">
            <div className="flex flex-col items-center  text-center">
              <h1 className="text-xl">Personal Info</h1>
              <h2>Info about you and your preferences</h2>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col gap-8 ">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-2xl">Your profile info at</p>
                    <p className="text-5xl font-bold">
                      {user?.mspCustomDomain}
                    </p>
                  </div>
                  <IoMdFingerPrint size={75} />
                </div>
                <p>
                  Personal info and options to manage it. You can make some of
                  this info, like your contact details, visible to others so
                  they can reach you easily. You can also see a summary of your
                  profiles.
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full border dark:border-white/40 rounded-md p-5 gap-6">
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
              <p className="text-2xl">Basic Info</p>
              <div className="flex items-center justify-between h-[20px]">
                <p className="w-18">First Name</p>
                {editing?.["firstName"] ? (
                  <div className="flex items-center gap-4">
                    {userInputs?.firstName == "" && (
                      <label className="text-xs text-red-500">
                        Input can't be blank
                      </label>
                    )}
                    <input
                      className={`px-1 w-40 border bg-white text-black ${
                        userInputs?.firstName == "" &&
                        "border-red-500 border-2 rounded-md focus:outline-none"
                      }`}
                      value={userInputs?.["firstName"]}
                      onChange={(e) =>
                        handleEditOnChange("firstName", e.target.value)
                      }
                      placeholder="First name"
                    />
                    <AiOutlineCheck
                      className="cursor-pointer"
                      onClick={() => {
                        userInputs.firstName != "" &&
                          handleSaveChanges(
                            "firstName",
                            userInputs?.["firstName"]
                          );
                      }}
                    />

                    <AiOutlineClose
                      className="cursor-pointer"
                      onClick={() => handleCancelEdit("firstName")}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <p>{userInputs?.["firstName"]}</p>
                    <AiFillEdit
                      size={25}
                      className="cursor-pointer"
                      onClick={() => handleStartEdit("firstName")}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between h-[20px] ">
                <p className="w-18">Last Name</p>
                {editing?.["lastName"] ? (
                  <div className="flex items-center gap-4">
                    {userInputs?.lastName == "" && (
                      <label className="text-xs text-red-500">
                        Input can't be blank
                      </label>
                    )}
                    <input
                      className={`px-1 w-40 border bg-white text-black ${
                        userInputs?.lastName == "" &&
                        "border-red-500 border-2 rounded-md focus:outline-none"
                      }`}
                      value={userInputs?.["lastName"]}
                      onChange={(e) =>
                        handleEditOnChange("lastName", e.target.value)
                      }
                      placeholder="Last name"
                    />
                    <AiOutlineCheck
                      className="cursor-pointer"
                      onClick={() => {
                        {
                          userInputs?.lastName != "" &&
                            handleSaveChanges(
                              "lastName",
                              userInputs?.["lastName"]
                            );
                        }
                      }}
                    />

                    <AiOutlineClose
                      className="cursor-pointer"
                      onClick={() => handleCancelEdit("lastName")}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <p>{userInputs?.["lastName"]}</p>
                    <AiFillEdit
                      size={25}
                      className="cursor-pointer"
                      onClick={() => handleStartEdit("lastName")}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between h-[20px]">
                <p className="w-18">Company Name</p>
                {editing?.["mspCustomDomain"] ? (
                  <div className="flex items-center gap-4">
                    {userInputs?.mspCustomDomain == "" && (
                      <label className="text-xs text-red-500">
                        Input can't be blank
                      </label>
                    )}
                    <input
                      className={`px-1 w-40 border bg-white text-black ${
                        userInputs?.mspCustomDomain == "" &&
                        "border-red-500 border-2 rounded-md focus:outline-none"
                      }`}
                      value={userInputs?.["mspCustomDomain"]}
                      onChange={(e) =>
                        handleEditOnChange("mspCustomDomain", e.target.value)
                      }
                      placeholder="Company name"
                    />
                    <AiOutlineCheck
                      className="cursor-pointer"
                      onClick={() => {
                        {
                          userInputs?.mspCustomDomain != "" &&
                            handleSaveChanges(
                              "mspCustomDomain",
                              userInputs?.["mspCustomDomain"]
                            );
                        }
                      }}
                    />

                    <AiOutlineClose
                      className="cursor-pointer"
                      onClick={() => handleCancelEdit("mspCustomDomain")}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <p>{userInputs?.["mspCustomDomain"]}</p>
                    <AiFillEdit
                      size={25}
                      className="cursor-pointer"
                      onClick={() => handleStartEdit("mspCustomDomain")}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full border dark:border-white/40 rounded-md p-5 gap-6">
              <p className="text-2xl">Contact Info</p>
              <div className="flex items-center justify-between h-[20px]">
                <p className="w-18">Email</p>
                <p>{user?.email}</p>
              </div>
              <div className="flex items-center justify-between h-[20px]">
                <p className="w-18">Phone</p>
                {editing?.["phoneNumber"] ? (
                  <div className="flex items-center gap-4">
                    {userInputs?.phoneNumber == "" && (
                      <label className="text-xs text-red-500">
                        Input can't be blank
                      </label>
                    )}
                    <input
                      maxLength={10}
                      className={`px-1 w-40 border bg-white text-black ${
                        userInputs?.phoneNumber == "" &&
                        "border-red-500 border-2 rounded-md focus:outline-none"
                      }`}
                      value={userInputs?.["phoneNumber"]}
                      onChange={(e) =>
                        handleEditOnChange("phoneNumber", e.target.value)
                      }
                      placeholder="Business phone"
                    />
                    <AiOutlineCheck
                      className="cursor-pointer"
                      onClick={() => {
                        {
                          userInputs?.phoneNumber != "" &&
                            handleSaveChanges(
                              "phoneNumber",
                              userInputs?.["phoneNumber"]
                            );
                        }
                      }}
                    />
                    <AiOutlineClose
                      className="cursor-pointer"
                      onClick={() => handleCancelEdit("phoneNumber")}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <p>{userInputs?.["phoneNumber"]}</p>
                    <AiFillEdit
                      size={25}
                      className="cursor-pointer"
                      onClick={() => handleStartEdit("phoneNumber")}
                    />
                  </div>
                )}
              </div>
            </div>
            {userType === "client" && (
              <div className="flex flex-col w-full border dark:border-white/40 rounded-md p-5 gap-6">
                <p className="text-2xl">Address</p>

                <div className="flex items-center justify-between h-[20px]">
                  <p className="w-18">Street</p>
                  {editing?.["street"] ? (
                    <div className="flex items-center gap-4">
                      {userInputs?.street == "" && (
                        <label className="text-xs text-red-500">
                          Input can't be blank
                        </label>
                      )}
                      <input
                        className={`px-1 w-40 border bg-white text-black ${
                          userInputs?.street == "" &&
                          "border-red-500 border-2 rounded-md focus:outline-none"
                        }`}
                        value={userInputs?.companyAddress?.["street"]}
                        onChange={(e) =>
                          handleEditOnChange("street", e.target.value)
                        }
                        placeholder="Street"
                      />
                      <AiOutlineCheck
                        className="cursor-pointer"
                        onClick={() => {
                          {
                            userInputs?.street != "" &&
                              handleSaveChanges(
                                "street",
                                userInputs?.companyAddress?.["street"]
                              );
                          }
                        }}
                      />
                      <AiOutlineClose
                        className="cursor-pointer"
                        onClick={() => handleCancelEdit("street")}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <p>{userInputs?.["street"]}</p>
                      <AiFillEdit
                        size={25}
                        className="cursor-pointer"
                        onClick={() => handleStartEdit("street")}
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between h-[20px]">
                  <p className="w-18">City</p>
                  {editing?.["city"] ? (
                    <div className="flex items-center gap-4">
                      {userInputs?.city == "" && (
                        <label className="text-xs text-red-500">
                          Input can't be blank
                        </label>
                      )}
                      <input
                        className={`px-1 w-40 border bg-white text-black ${
                          userInputs?.city == "" &&
                          "border-red-500 border-2 rounded-md focus:outline-none"
                        }`}
                        value={userInputs?.["city"]}
                        onChange={(e) =>
                          handleEditOnChange("city", e.target.value)
                        }
                        placeholder="City"
                      />
                      <AiOutlineCheck
                        className="cursor-pointer"
                        onClick={() => {
                          {
                            userInputs?.city != "" &&
                              handleSaveChanges(
                                "city",
                                userInputs?.["city"]
                              );
                          }
                        }}
                      />
                      <AiOutlineClose
                        className="cursor-pointer"
                        onClick={() => handleCancelEdit("city")}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <p>{userInputs?.["city"]}</p>
                      <AiFillEdit
                        size={25}
                        className="cursor-pointer"
                        onClick={() => handleStartEdit("city")}
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between h-[20px]">
                  <p className="w-18">Zipcode</p>
                  {editing?.["zipcode"] ? (
                    <div className="flex items-center gap-4">
                      {userInputs?.zipcode == "" && (
                        <label className="text-xs text-red-500">
                          Input can't be blank
                        </label>
                      )}
                      <input
                        maxLength={5}
                        className={`px-1 w-40 border bg-white text-black ${
                          userInputs?.zipcode == "" &&
                          "border-red-500 border-2 rounded-md focus:outline-none"
                        }`}
                        value={userInputs?.["zipcode"]}
                        onChange={(e) =>
                          handleEditOnChange("zipcode", e.target.value)
                        }
                        placeholder="Zipcode"
                      />
                      <AiOutlineCheck
                        className="cursor-pointer"
                        onClick={() => {
                          {
                            userInputs?.zipcode != "" &&
                              handleSaveChanges(
                                "zipcode",
                                userInputs?.["zipcode"]
                              );
                          }
                        }}
                      />
                      <AiOutlineClose
                        className="cursor-pointer"
                        onClick={() => handleCancelEdit("zipcode")}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <p>{userInputs?.["zipcode"]}</p>
                      <AiFillEdit
                        size={25}
                        className="cursor-pointer"
                        onClick={() => handleStartEdit("zipcode")}
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between h-[20px]">
                  <p className="w-18">State</p>
                  {editing?.["state"] ? (
                    <div className="flex items-center gap-4">
                      {userInputs?.state == "" && (
                        <label className="text-xs text-red-500">
                          Input can't be blank
                        </label>
                      )}
                      <input
                        maxLength={2}
                        className={`px-1 w-40 border bg-white text-black ${
                          userInputs?.state == "" &&
                          "border-red-500 border-2 rounded-md focus:outline-none"
                        }`}
                        value={userInputs.companyAddress?.["state"]}
                        onChange={(e) =>
                          handleEditOnChange("state", e.target.value)
                        }
                        placeholder="State"
                      />
                      <AiOutlineCheck
                        className="cursor-pointer"
                        onClick={() => {
                          {
                            userInputs?.state != "" &&
                              handleSaveChanges(
                                "state",
                                userInputs?.companyAddress?.["state"]
                              );
                          }
                        }}
                      />
                      <AiOutlineClose
                        className="cursor-pointer"
                        onClick={() => handleCancelEdit("state")}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <p>{userInputs?.companyAddress?.["state"]}</p>
                      <AiFillEdit
                        size={25}
                        className="cursor-pointer"
                        onClick={() => handleStartEdit("state")}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
            {userType === "tech" && (
              <div className="flex flex-col w-full border dark:border-white/40 rounded-md p-5">
                <p className="text-2xl pb-6">Security Settings</p>
                <div
                  className="flex items-center justify-between h-[20px] cursor-pointer hover:bg-gray-100 p-5"
                  onClick={() => setAuthCard(true)}
                >
                  <p className="w-18">2-Step verification setup</p>
                  <p className="font-bold text-lg">{">"}</p>
                </div>
              </div>
            )}
            <>
              {/* {userInputs?.password !== null && (
              <div className="flex flex-col w-full border dark:border-white/40 rounded-md p-5 gap-6">
              <div className="flex items-center justify-between h-[40px]">
              <p className="w-18">Password</p>
              {editing?.["password"] ? (
                <div className="flex items-center gap-4">
                {passwordError && (
                  <p className="text-red-500 text-sm">
                  Incorrect password
                  </p>
                  )}
                  <div className="flex flex-col gap-1">
                  <input
                  className="px-1 w-40 border bg-white text-black "
                  type="password"
                  value={userPasswords?.oldPassword}
                  onChange={(e) =>
                            handlePasswordChange("oldPassword", e.target.value)
                          }
                          placeholder="Old password"
                        />
                        <input
                          className="px-1 w-40 border bg-white text-black "
                          type="password"
                          value={userPasswords?.newPassword}
                          onChange={(e) =>
                            handlePasswordChange("newPassword", e.target.value)
                          }
                          placeholder="New password"
                        />
                      </div>
                      <AiOutlineCheck
                        onClick={handleResetPassword}
                        className="cursor-pointer"
                      />
                      <AiOutlineClose
                        className="cursor-pointer"
                        onClick={() => handleCancelEdit("password")}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <AiFillEdit
                        size={25}
                        className="cursor-pointer"
                        onClick={() => handleStartEdit("password")}
                      />
                    </div>
                  )}
                </div>
              </div>
            )} */}
            </>
          </div>
        </div>
      </div>
      {authCard && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="items-center flex-col absolute p-2 rounded-lg shadow-lg w-[300px] sm:w-[450px] h-[500px]"
            style={{ backgroundColor: "rgb(236, 236, 236)" }}
          >
            {authPopup == "closed" && (
              <>
                <h2 className="text-xl font-semibold mb-4 dark:text-black text-center p-10">
                  Select 2FA Method
                </h2>
                <div
                  className="flex items-center justify-between h-[80px] cursor-pointer hover:bg-gray-100 p-5"
                  onClick={() => setAuthPopup("qrOpen")}
                >
                  <BsQrCodeScan className="w-7 h-7 flex-shrink-0 mr-4" />
                  <div className="flex flex-col flex-grow">
                    <h2 className="font-semibold">App Authentication</h2>
                    <p className="text-sm text-gray-500">
                      Use a mobile app to authenticate.
                    </p>
                  </div>
                  <p className="font-bold text-lg">{">"}</p>
                </div>
                <div
                  className="flex items-center justify-between h-[80px] cursor-pointer hover:bg-gray-100 p-5"
                  onClick={() => setAuthPopup("emailOpen")}
                >
                  <TfiEmail className="w-7 h-7 flex-shrink-0 mr-4" />
                  <div className="flex flex-col flex-grow">
                    <h2 className="font-semibold">Email Authentication</h2>
                    <p className="text-sm text-gray-500">
                      Receive an email with an authentication code.
                    </p>
                  </div>
                  <p className="font-bold text-lg">{">"}</p>
                </div>
                <p className="bottom-7 absolute left-7">
                  Current method: {user?.authPreference}
                </p>
              </>
            )}
            {authPopup == "qrOpen" && (
              <>
                <h2 className="text-xl font-semibold dark:text-black text-center p-10">
                  Set up authenticator app
                </h2>
                <ul className="list-disc mb-4 dark:text-black pb-[30px] pl-10">
                  <li>Open your authentication app</li>
                  <li>Scan the QR code below</li>
                </ul>
                <img
                  className="mx-auto sm:w-[150px] h-auto w-3/5"
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=otpauth://totp/${user?.mspCustomDomain}:${user?.email}?secret=${user?.secret}&issuer=${user?.mspCustomDomain}`}
                />
                <button
                  className="mx-auto mt-4 text-blue-500 hover:text-gray-700 font-semibold block"
                  onClick={() => setAuthPopup("manualQr")}
                >
                  Can't scan?
                </button>
                <button
                  className="text-blue-500 hover:text-gray-700 font-semibold absolute bottom-7 left-7 flex space-x-4"
                  onClick={() => setAuthPopup("closed")}
                >
                  Back
                </button>
                <button
                  className="text-blue-500 hover:text-gray-700 font-semibold absolute bottom-7 right-7 space-x-4"
                  onClick={() => setAuthPopup("qrValidate")}
                >
                  Next
                </button>
              </>
            )}
            {authPopup == "manualQr" && (
              <>
                <ol className="list-decimal mb-4 dark:text-black p-10">
                  <li>In the Authenticator app enter account details</li>
                  <li>
                    Account name: <strong>{user?.mspCustomDomain}</strong>
                  </li>
                  <li>
                    Secret key: <strong>{user?.secret}</strong>
                  </li>
                </ol>
                <button
                  className="text-blue-500 hover:text-gray-700 font-semibold absolute bottom-7 left-7 flex space-x-4"
                  onClick={() => setAuthPopup("qrOpen")}
                >
                  Back
                </button>
                <button
                  className="text-blue-500 hover:text-gray-700 font-semibold absolute bottom-7 right-7 space-x-4"
                  onClick={() => setAuthPopup("qrValidate")}
                >
                  Next
                </button>
              </>
            )}
            {authPopup == "qrValidate" && (
              <>
                <h2 className="text-xl font-semibold dark:text-black text-center p-10">
                  Set up authenticator app
                </h2>
                <label className="pl-1 text-gray-600">
                  Enter the 6-digit code you see in the app
                </label>
                <input
                  className="w-full px-4 py-2 mt-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Code"
                  value={authToken}
                  onChange={(e) => setAuthToken(e.target.value)}
                />
                {authError && (
                  <p className="text-sm text-red-500 p-4">Incorrect code</p>
                )}
                <button
                  className="text-blue-500 hover:text-gray-700 font-semibold absolute bottom-7 left-7 flex space-x-4"
                  onClick={() => {
                    setAuthError(false);
                    setAuthPopup("qrOpen");
                  }}
                >
                  Back
                </button>
                <button
                  className="text-blue-500 hover:text-gray-700 font-semibold absolute bottom-7 right-7 space-x-4"
                  onClick={() => handleTokenVerification(user, "authenticator")}
                >
                  Verify
                </button>
              </>
            )}
            {authPopup == "emailOpen" && (
              <>
                <h2 className="text-xl font-semibold dark:text-black text-center p-10">
                  Set up email authentication
                </h2>
                <p className="pl-4">
                  Send code to: <strong>{user.email}</strong>
                </p>
                <button
                  className="pl-4 pt-4 text-blue-500 font-semibold hover:text-gray-600"
                  onClick={() => {
                    handleSendEmailToken(user);
                    setAuthPopup("emailValidate");
                  }}
                >
                  Send Code
                </button>
                <button
                  className="text-blue-500 hover:text-gray-700 font-semibold absolute bottom-7 left-7 flex space-x-4"
                  onClick={() => setAuthPopup("closed")}
                >
                  Back
                </button>
              </>
            )}
            {authPopup == "emailValidate" && (
              <div className="pt-10">
                <label className="pl-1 text-gray-600">
                  Enter the 6-digit code from your email
                </label>
                <input
                  className="w-full px-4 py-2 mt-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Code"
                  value={authToken}
                  onChange={(e) => setAuthToken(e.target.value)}
                />
                <p className="text-base text-gray-500 pl-4 pt-3">
                  Didn't receive code?
                  <button
                    className="pl-1 text-blue-500 hover:text-gray-600"
                    onClick={() => {
                      handleSendEmailToken(user);
                      setSuccessMessage(false);
                    }}
                  >
                    Re-send code
                  </button>
                </p>
                {authError && (
                  <p className="text-sm text-red-500 p-4">Incorrect code</p>
                )}
                {successMessage && (
                  <p className="text-sm text-gray-500 p-4">Code sent</p>
                )}
                <button
                  className="text-blue-500 hover:text-gray-700 font-semibold absolute bottom-7 left-7 flex space-x-4"
                  onClick={() => {
                    setAuthError(false);
                    setAuthPopup("emailOpen");
                  }}
                >
                  Back
                </button>
                <button
                  className="text-blue-500 hover:text-gray-700 font-semibold absolute bottom-7 right-7 space-x-4"
                  onClick={() => handleTokenVerification(user, "email")}
                >
                  Verify
                </button>
              </div>
            )}
            {authPopup != "closed" && (
              <button
                className="text-blue-500 hover:text-gray-700 font-semibold absolute bottom-7 right-[80px]"
                onClick={() => {
                  setAuthPopup("closed");
                  setAuthCard(false);
                  setSuccessMessage(false);
                  setAuthError(false);
                }}
              >
                Cancel
              </button>
            )}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setAuthPopup("closed");
                setAuthCard(false);
                setSuccessMessage(false);
                setAuthError(false);
              }}
            >
              &#x2715;
            </button>
          </div>
        </div>
      )}
      {authUpdatedPopup && (
        <div className="absolute w-[200px] bg-opacity-80 top-20 right-20 bg-gray-700 text-white text-center p-4 rounded-lg">
          2-Step method updated!
        </div>
      )}
    </div>
  );
};

export default Account;
