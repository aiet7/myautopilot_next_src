"use client";

import { AiFillEdit } from "react-icons/ai";
import { IoMdFingerPrint } from "react-icons/io";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BsQrCodeScan } from "react-icons/bs";

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

  const { qrCodePopup, setQrCodePopup, userType } = useMspStore();

  return (
    <div
      className={`relative flex flex-col h-full w-full text-sm  ${
        openNav && "lg:opacity-100 opacity-5 xl:ml-[250px]"
      } dark:bg-black bg-white transition-all duration-300 ease`}
    >
      <div
        className={`flex-grow overflow-auto scrollbar-thin transition-all duration-300 ${
          qrCodePopup && "filter blur-sm"
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
                    <input
                      className="px-1 w-40 border bg-white text-black "
                      value={userInputs?.["firstName"]}
                      onChange={(e) =>
                        handleEditOnChange("firstName", e.target.value)
                      }
                      placeholder="First name"
                    />
                    <AiOutlineCheck
                      className="cursor-pointer"
                      onClick={() =>
                        handleSaveChanges(
                          "firstName",
                          userInputs?.["firstName"]
                        )
                      }
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
                    <input
                      className="px-1 w-40 border bg-white text-black  "
                      value={userInputs?.["lastName"]}
                      onChange={(e) =>
                        handleEditOnChange("lastName", e.target.value)
                      }
                      placeholder="Last name"
                    />
                    <AiOutlineCheck
                      className="cursor-pointer"
                      onClick={() =>
                        handleSaveChanges("lastName", userInputs?.["lastName"])
                      }
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
                {editing?.["companyName"] ? (
                  <div className="flex items-center gap-4">
                    <input
                      className="px-1 w-40 border bg-white text-black "
                      value={userInputs?.["companyName"]}
                      onChange={(e) =>
                        handleEditOnChange("companyName", e.target.value)
                      }
                      placeholder="Company name"
                    />
                    <AiOutlineCheck
                      className="cursor-pointer"
                      onClick={() =>
                        handleSaveChanges(
                          "companyName",
                          userInputs?.["companyName"]
                        )
                      }
                    />

                    <AiOutlineClose
                      className="cursor-pointer"
                      onClick={() => handleCancelEdit("companyName")}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <p>{userInputs?.["mspCustomDomain"]}</p>
                    <AiFillEdit
                      size={25}
                      className="cursor-pointer"
                      onClick={() => handleStartEdit("companyName")}
                    />
                  </div>
                )}
              </div>
              {/* <div className="flex items-center justify-between h-[20px]">
                <p className="w-18">Company ID</p>
                <p>{userInputs?.companyId}</p>
              </div> */}
              {userType === "tech" && (
                <div
                  className="flex items-center gap-2 text-sm text-blue-800 font-extrabold cursor-pointer w-1/6"
                  onClick={() => setQrCodePopup(true)}
                >
                  <p>Authenticator QR code</p>
                  <BsQrCodeScan size={20} />
                </div>
              )}
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
                    <input
                      maxLength={10}
                      className="px-1 w-40 border bg-white text-black "
                      value={userInputs?.["phoneNumber"]}
                      onChange={(e) =>
                        handleEditOnChange("phoneNumber", e.target.value)
                      }
                      placeholder="Business phone"
                    />
                    <AiOutlineCheck
                      className="cursor-pointer"
                      onClick={() =>
                        handleSaveChanges(
                          "phoneNumber",
                          userInputs?.["phoneNumber"]
                        )
                      }
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
            <div className="flex flex-col w-full border dark:border-white/40 rounded-md p-5 gap-6">
              <p className="text-2xl">Address</p>

              <div className="flex items-center justify-between h-[20px]">
                <p className="w-18">Street</p>
                {editing?.["street"] ? (
                  <div className="flex items-center gap-4">
                    <input
                      className="px-1 w-40 border bg-white text-black "
                      value={userInputs?.companyAddress?.["street"]}
                      onChange={(e) =>
                        handleEditOnChange("street", e.target.value)
                      }
                      placeholder="Street"
                    />
                    <AiOutlineCheck
                      className="cursor-pointer"
                      onClick={() =>
                        handleSaveChanges(
                          "street",
                          userInputs?.companyAddress?.["street"]
                        )
                      }
                    />
                    <AiOutlineClose
                      className="cursor-pointer"
                      onClick={() => handleCancelEdit("street")}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <p>{userInputs?.companyAddress?.["street"]}</p>
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
                    <input
                      className="px-1 w-40 border bg-white text-black "
                      value={userInputs?.companyAddress?.["city"]}
                      onChange={(e) =>
                        handleEditOnChange("city", e.target.value)
                      }
                      placeholder="City"
                    />
                    <AiOutlineCheck
                      className="cursor-pointer"
                      onClick={() =>
                        handleSaveChanges(
                          "city",
                          userInputs?.companyAddress?.["city"]
                        )
                      }
                    />
                    <AiOutlineClose
                      className="cursor-pointer"
                      onClick={() => handleCancelEdit("city")}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <p>{userInputs?.companyAddress?.["city"]}</p>
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
                    <input
                      maxLength={5}
                      className="px-1 w-40 border bg-white text-black "
                      value={userInputs?.companyAddress?.["zipcode"]}
                      onChange={(e) =>
                        handleEditOnChange("zipcode", e.target.value)
                      }
                      placeholder="Zipcode"
                    />
                    <AiOutlineCheck
                      className="cursor-pointer"
                      onClick={() =>
                        handleSaveChanges(
                          "zipcode",
                          userInputs?.companyAddress?.["zipcode"]
                        )
                      }
                    />
                    <AiOutlineClose
                      className="cursor-pointer"
                      onClick={() => handleCancelEdit("zipcode")}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <p>{userInputs?.companyAddress?.["zipcode"]}</p>
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
                    <input
                      maxLength={2}
                      className="px-1 w-40 border bg-white text-black "
                      value={userInputs.companyAddress?.["state"]}
                      onChange={(e) =>
                        handleEditOnChange("state", e.target.value)
                      }
                      placeholder="State"
                    />
                    <AiOutlineCheck
                      className="cursor-pointer"
                      onClick={() =>
                        handleSaveChanges(
                          "state",
                          userInputs?.companyAddress?.["state"]
                        )
                      }
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
          </div>
        </div>
      </div>
      {qrCodePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="p-6 rounded-lg shadow-lg max-w-md relative"
            style={{ backgroundColor: "rgb(236, 236, 236)" }}
          >
            <h2 className="text-xl font-semibold mb-4">Scan here:</h2>
            <p className="items-center bg-blue">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=otpauth://totp/${user?.mspCustomDomain}:${user?.email}?secret=${user?.secret}&issuer=${user?.mspCustomDomain}`}
              />
            </p>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setQrCodePopup(false)}
            >
              &#x2715; {/* Unicode for 'X' */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
