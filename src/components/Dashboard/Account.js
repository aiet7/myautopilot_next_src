"use client";

import { AiFillEdit } from "react-icons/ai";
import { IoMdFingerPrint } from "react-icons/io";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

import useUserStore from "@/utils/store/user/userStore";
import useUiStore from "@/utils/store/ui/uiStore";

const Account = ({}) => {
  const { openNav } = useUiStore();
  const {
    user,
    userInputs,
    editing,
    errorMessage,
    handleStartEdit,
    handleEditOnChange,
    handleSaveChanges,
    handleCancelEdit,
  } = useUserStore();
  return (
    <div
      className={`relative flex flex-col h-full w-full text-sm ${
        openNav && "lg:opacity-100 opacity-5 xl:ml-[250px]"
      } dark:bg-black bg-white transition-all duration-300 ease`}
    >
      <div className="flex-grow overflow-auto scrollbar-thin">
        <div className="px-4 py-4 w-full">
          <div className="max-w-[1250px] flex flex-col gap-4 mx-auto">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-xl">Personal Info</h1>
              <h2>Info about you and your preferences</h2>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col gap-8">
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
                      className="px-1 w-40 border bg-white text-black"
                      value={userInputs?.["firstName"] || ""}
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
              <div className="flex items-center justify-between h-[20px]">
                <p className="w-18">Last Name</p>
                {editing?.["lastName"] ? (
                  <div className="flex items-center gap-4">
                    <input
                      className="px-1 w-40 border bg-white text-black"
                      value={userInputs?.["lastName"] || ""}
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

                <div className="flex items-center gap-4">
                  <p>
                    {userInputs?.["companyName"]
                      ? userInputs?.["companyName"]
                      : userInputs?.["mspCustomDomain"]}
                  </p>
                </div>
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
                    <input
                      maxLength={10}
                      className="px-1 w-40 border bg-white text-black"
                      value={userInputs?.["phoneNumber"] || ""}
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
                    <p>{userInputs?.["phoneNumber"] || ""}</p>
                    <AiFillEdit
                      size={25}
                      className="cursor-pointer"
                      onClick={() => handleStartEdit("phoneNumber")}
                    />
                  </div>
                )}
              </div>
            </div>
            {/* <div className="flex flex-col w-full border dark:border-white/40 rounded-md p-5 gap-6">
              <p className="text-2xl">Address</p>

              <div className="flex items-center justify-between h-[20px]">
                <p className="w-18">Street</p>
                {editing?.["companyAddress.street"] ? (
                  <div className="flex items-center gap-4">
                    <input
                      className="px-1 w-40 border bg-white text-black"
                      value={userInputs?.companyAddress?.["street"] || ""}
                      onChange={(e) =>
                        handleEditOnChange(
                          "companyAddress.street",
                          e.target.value
                        )
                      }
                      placeholder="Street"
                    />
                    <AiOutlineCheck
                      className="cursor-pointer"
                      onClick={() =>
                        handleSaveChanges(
                          "companyAddress.street",
                          userInputs?.companyAddress?.street
                        )
                      }
                    />
                    <AiOutlineClose
                      className="cursor-pointer"
                      onClick={() => handleCancelEdit("companyAddress.street")}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <p>{userInputs?.companyAddress?.street}</p>
                    <AiFillEdit
                      size={25}
                      className="cursor-pointer"
                      onClick={() => handleStartEdit("companyAddress.street")}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between h-[20px]">
                <p className="w-18">City</p>
                {editing?.["companyAddress.city"] ? (
                  <div className="flex items-center gap-4">
                    <input
                      className="px-1 w-40 border bg-white text-black"
                      value={userInputs?.companyAddress?.["city"] || ""}
                      onChange={(e) =>
                        handleEditOnChange(
                          "companyAddress.city",
                          e.target.value
                        )
                      }
                      placeholder="City"
                    />
                    <AiOutlineCheck
                      className="cursor-pointer"
                      onClick={() =>
                        handleSaveChanges(
                          "companyAddress.city",
                          userInputs?.companyAddress?.city
                        )
                      }
                    />
                    <AiOutlineClose
                      className="cursor-pointer"
                      onClick={() => handleCancelEdit("companyAddress.city")}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <p>{userInputs?.companyAddress?.city}</p>
                    <AiFillEdit
                      size={25}
                      className="cursor-pointer"
                      onClick={() => handleStartEdit("companyAddress.city")}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between h-[20px]">
                <p className="w-18">Zipcode</p>
                {editing?.["companyAddress.zipcode"] ? (
                  <div className="flex items-center gap-4">
                    <input
                      maxLength={5}
                      className="px-1 w-40 border bg-white text-black"
                      value={userInputs?.companyAddress?.["zipcode"] || ""}
                      onChange={(e) =>
                        handleEditOnChange(
                          "companyAddress.zipcode",
                          e.target.value
                        )
                      }
                      placeholder="Zipcode"
                    />
                    <AiOutlineCheck
                      className="cursor-pointer"
                      onClick={() =>
                        handleSaveChanges(
                          "companyAddress.zipcode",
                          userInputs?.companyAddress?.zipcode
                        )
                      }
                    />
                    <AiOutlineClose
                      className="cursor-pointer"
                      onClick={() => handleCancelEdit("companyAddress.zipcode")}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <p>{userInputs?.companyAddress?.zipcode}</p>
                    <AiFillEdit
                      size={25}
                      className="cursor-pointer"
                      onClick={() => handleStartEdit("companyAddress.zipcode")}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between h-[20px]">
                <p className="w-18">State</p>
                {editing?.["companyAddress.state"] ? (
                  <div className="flex items-center gap-4">
                    <input
                      maxLength={2}
                      className="px-1 w-40 border bg-white text-black"
                      value={userInputs?.companyAddress?.["state"] || ""}
                      onChange={(e) =>
                        handleEditOnChange(
                          "companyAddress.state",
                          e.target.value
                        )
                      }
                      placeholder="State"
                    />
                    <AiOutlineCheck
                      className="cursor-pointer"
                      onClick={() =>
                        handleSaveChanges(
                          "companyAddress.state",
                          userInputs?.companyAddress?.state
                        )
                      }
                    />
                    <AiOutlineClose
                      className="cursor-pointer"
                      onClick={() => handleCancelEdit("companyAddress.state")}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <p>{userInputs?.companyAddress?.state}</p>
                    <AiFillEdit
                      size={25}
                      className="cursor-pointer"
                      onClick={() => handleStartEdit("companyAddress.state")}
                    />
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
