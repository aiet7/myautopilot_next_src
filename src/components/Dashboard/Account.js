"use client";

import { AiFillEdit } from "react-icons/ai";
import { IoMdFingerPrint } from "react-icons/io";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

import useUserStore from "@/utils/store/user/userStore";

const Account = ({}) => {
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

  return (
    <div className="dark:bg-black bg-white relative overflow-y-auto px-4 py-2 w-full flex items-center justify-center transition-all duration-300 ease">
      <div className="flex flex-col h-full items-center gap-2 max-w-[800px]">
        <div className="flex flex-col items-center pt-2 text-center">
          <h1 className="text-xl">Personal Info</h1>
          <h2>Info about you and your preferences</h2>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col gap-2">
            <p className="text-3xl">Your profile info in {user?.companyName}</p>
            <p>
              Personal info and options to manage it. You can make some of this
              info, like your contact details, visible to others so they can
              reach you easily. You can also see a summary of your profiles.
            </p>
          </div>
          <IoMdFingerPrint size={200} />
        </div>
        <div className="flex flex-col w-full border dark:border-white/40 rounded-md p-5 gap-6">
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          <p className="text-2xl">Basic Info</p>
          <div className="flex items-center justify-between h-[20px]">
            <p className="w-18">First Name</p>
            {editing["firstName"] ? (
              <div className="flex items-center gap-4">
                <input
                  className="px-1 w-40 border bg-white text-black "
                  value={userInputs["firstName"]}
                  onChange={(e) =>
                    handleEditOnChange("firstName", e.target.value)
                  }
                  placeholder="First name"
                />
                <AiOutlineCheck
                  className="cursor-pointer"
                  onClick={() =>
                    handleSaveChanges("firstName", userInputs["firstName"])
                  }
                />

                <AiOutlineClose
                  className="cursor-pointer"
                  onClick={() => handleCancelEdit("firstName")}
                />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p>{userInputs["firstName"]}</p>
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
            {editing["lastName"] ? (
              <div className="flex items-center gap-4">
                <input
                  className="px-1 w-40 border bg-white text-black  "
                  value={userInputs["lastName"]}
                  onChange={(e) =>
                    handleEditOnChange("lastName", e.target.value)
                  }
                  placeholder="Last name"
                />
                <AiOutlineCheck
                  className="cursor-pointer"
                  onClick={() =>
                    handleSaveChanges("lastName", userInputs["lastName"])
                  }
                />

                <AiOutlineClose
                  className="cursor-pointer"
                  onClick={() => handleCancelEdit("lastName")}
                />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p>{userInputs["lastName"]}</p>
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
            {editing["companyName"] ? (
              <div className="flex items-center gap-4">
                <input
                  className="px-1 w-40 border bg-white text-black "
                  value={userInputs["companyName"]}
                  onChange={(e) =>
                    handleEditOnChange("companyName", e.target.value)
                  }
                  placeholder="Company name"
                />
                <AiOutlineCheck
                  className="cursor-pointer"
                  onClick={() =>
                    handleSaveChanges("companyName", userInputs["companyName"])
                  }
                />

                <AiOutlineClose
                  className="cursor-pointer"
                  onClick={() => handleCancelEdit("companyName")}
                />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p>{userInputs["companyName"]}</p>
                <AiFillEdit
                  size={25}
                  className="cursor-pointer"
                  onClick={() => handleStartEdit("companyName")}
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between h-[20px]">
            <p className="w-18">Company ID</p>
            <p>{userInputs.companyId}</p>
          </div>
        </div>
        <div className="flex flex-col w-full border dark:border-white/40 rounded-md p-5 gap-6">
          <p className="text-2xl">Contact Info</p>
          <div className="flex items-center justify-between h-[20px]">
            <p className="w-18">Email</p>
            <p>{userInputs.email}</p>
          </div>
          <div className="flex items-center justify-between h-[20px]">
            <p className="w-18">Phone</p>
            {editing["phoneNumber"] ? (
              <div className="flex items-center gap-4">
                <input
                  maxLength={10}
                  className="px-1 w-40 border bg-white text-black "
                  value={userInputs["phoneNumber"]}
                  onChange={(e) =>
                    handleEditOnChange("phoneNumber", e.target.value)
                  }
                  placeholder="Business phone"
                />
                <AiOutlineCheck
                  className="cursor-pointer"
                  onClick={() =>
                    handleSaveChanges("phoneNumber", userInputs["phoneNumber"])
                  }
                />
                <AiOutlineClose
                  className="cursor-pointer"
                  onClick={() => handleCancelEdit("phoneNumber")}
                />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p>{userInputs["phoneNumber"]}</p>
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
            {editing["street"] ? (
              <div className="flex items-center gap-4">
                <input
                  className="px-1 w-40 border bg-white text-black "
                  value={userInputs.companyAddress["street"]}
                  onChange={(e) => handleEditOnChange("street", e.target.value)}
                  placeholder="Street"
                />
                <AiOutlineCheck
                  className="cursor-pointer"
                  onClick={() =>
                    handleSaveChanges(
                      "street",
                      userInputs.companyAddress["street"]
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
                <p>{userInputs.companyAddress["street"]}</p>
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
            {editing["city"] ? (
              <div className="flex items-center gap-4">
                <input
                  className="px-1 w-40 border bg-white text-black "
                  value={userInputs.companyAddress["city"]}
                  onChange={(e) => handleEditOnChange("city", e.target.value)}
                  placeholder="City"
                />
                <AiOutlineCheck
                  className="cursor-pointer"
                  onClick={() =>
                    handleSaveChanges("city", userInputs.companyAddress["city"])
                  }
                />
                <AiOutlineClose
                  className="cursor-pointer"
                  onClick={() => handleCancelEdit("city")}
                />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p>{userInputs.companyAddress["city"]}</p>
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
            {editing["zipcode"] ? (
              <div className="flex items-center gap-4">
                <input
                  maxLength={5}
                  className="px-1 w-40 border bg-white text-black "
                  value={userInputs.companyAddress["zipcode"]}
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
                      userInputs.companyAddress["zipcode"]
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
                <p>{userInputs.companyAddress["zipcode"]}</p>
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
            {editing["state"] ? (
              <div className="flex items-center gap-4">
                <input
                  maxLength={2}
                  className="px-1 w-40 border bg-white text-black "
                  value={userInputs.companyAddress["state"]}
                  onChange={(e) => handleEditOnChange("state", e.target.value)}
                  placeholder="State"
                />
                <AiOutlineCheck
                  className="cursor-pointer"
                  onClick={() =>
                    handleSaveChanges(
                      "state",
                      userInputs.companyAddress["state"]
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
                <p>{userInputs.companyAddress["state"]}</p>
                <AiFillEdit
                  size={25}
                  className="cursor-pointer"
                  onClick={() => handleStartEdit("state")}
                />
              </div>
            )}
          </div>
        </div>
        {userInputs.password !== null && (
          <div className="flex flex-col w-full border dark:border-white/40 rounded-md p-5 gap-6">
            <div className="flex items-center justify-between h-[40px]">
              <p className="w-18">Password</p>
              {editing["password"] ? (
                <div className="flex items-center gap-4">
                  {passwordError && (
                    <p className="text-red-500 text-sm">Incorrect password</p>
                  )}
                  <div className="flex flex-col gap-1">
                    <input
                      className="px-1 w-40 border bg-white text-black "
                      type="password"
                      value={userPasswords.oldPassword}
                      onChange={(e) =>
                        handlePasswordChange("oldPassword", e.target.value)
                      }
                      placeholder="Old password"
                    />
                    <input
                      className="px-1 w-40 border bg-white text-black "
                      type="password"
                      value={userPasswords.newPassword}
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
        )}
      </div>
    </div>
  );
};

export default Account;
