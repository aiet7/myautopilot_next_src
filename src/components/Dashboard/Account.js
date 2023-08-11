"use client";

import { googleLogout } from "@react-oauth/google";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillEdit } from "react-icons/ai";
import { IoMdFingerPrint } from "react-icons/io";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

import Cookie from "js-cookie";

const Account = ({ initialUser }) => {
  const router = useRouter();

  const {
    id,
    businessEmail,
    businessName,
    businessPhone,
    firstName,
    lastName,
    address: { street, city, zipcode, state },
    password,
  } = initialUser;

  const addressFields = ["street", "city", "zipcode", "state"];

  const [editing, setEditing] = useState({});
  const [deleting, setDeleting] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState("");

  const [userInputs, setUserInputs] = useState({
    id: id,
    firstName: firstName,
    lastName: lastName,
    businessEmail: businessEmail,
    businessName: businessName,
    businessPhone: businessPhone,
    address: {
      street: street,
      city: city,
      zipcode: zipcode,
      state: state,
    },

    password: password,
  });

  const [userPasswords, setUserPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [passwordError, setPasswordError] = useState(false);

  const handleStartEdit = (field) => {
    setEditing({ ...editing, [field]: true });
  };

  const handleCancelEdit = (field) => {
    if (addressFields.includes(field)) {
      setUserInputs({
        ...userInputs,
        address: {
          ...userInputs.address,
          [field]: initialUser.address[field],
        },
      });
    } else {
      setUserInputs({
        ...userInputs,
        [field]: initialUser[field],
      });
    }

    setEditing({ ...editing, [field]: false });
  };

  const handleEditOnChange = (field, e) => {
    if (addressFields.includes(field)) {
      setUserInputs({
        ...userInputs,
        address: {
          ...userInputs.address,
          [field]: e.target.value,
        },
      });
    } else {
      setUserInputs({
        ...userInputs,
        [field]: e.target.value,
      });
    }
  };

  const handlePasswordChange = (field, e) => {
    setUserPasswords({ ...userPasswords, [field]: e.target.value });
  };

  const handleSaveChanges = async (field, input) => {
    let updatedUser;

    if (addressFields.includes(field)) {
      const updatedInputs = {
        ...userInputs,
        address: {
          ...userInputs.address,
          [field]: input,
        },
      };
      setUserInputs(updatedInputs);
      updatedUser = updatedInputs;
    } else {
      const updatedInputs = {
        ...userInputs,
        [field]: input,
      };
      setUserInputs(updatedInputs);
      updatedUser = updatedInputs;
    }

    setEditing({ ...editing, [field]: false });

    try {
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/editBusinessUserProfile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        console.log("Saved!");
      } else {
        console.log("Error saving.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteUser = async () => {
    if (confirmationEmail !== businessEmail) {
      return;
    }

    try {
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/deleteUser?id=${id}`
      );
      if (response.ok) {
        localStorage.removeItem("lastTab");
        localStorage.removeItem("lastConversationIndices");
        localStorage.removeItem("wsIsPending");
        localStorage.removeItem("lastRoomIndex");

        Cookie.remove("Secure-next.session-token-g");
        Cookie.remove("microsoft_session_token");
        Cookie.remove("session_token");
        Cookie.remove("user_id");

        googleLogout();
        router.push("/auth/login");
      } else {
        console.log("Error Deleting");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative overflow-y-auto px-4 py-2 w-full flex items-center justify-center">
      <div className="flex flex-col h-full items-center gap-2 max-w-[800px]">
        <div className="flex flex-col items-center pt-2 text-center">
          <h1 className="text-xl">Personal Info</h1>
          <h2>Info about you and your preferences across MyAutoPilot</h2>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col gap-2">
            <p className="text-3xl">Your profile info in MyAutoPilot</p>
            <p>
              Personal info and options to manage it. You can make some of this
              info, like your contact details, visible to others so they can
              reach you easily. You can also see a summary of your profiles.
            </p>
          </div>
          <IoMdFingerPrint size={200} />
        </div>
        <div className="flex flex-col w-full border dark:border-white/40 rounded-md p-5 gap-6">
          <p className="text-2xl">Basic Info</p>
          <div className="flex items-center justify-between h-[20px]">
            <p className="w-18">First Name</p>
            {editing["firstName"] ? (
              <div className="flex items-center gap-4">
                <input
                  className="px-1 w-40 border bg-white text-black "
                  value={userInputs["firstName"]}
                  onChange={(e) => handleEditOnChange("firstName", e)}
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
                  onChange={(e) => handleEditOnChange("lastName", e)}
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
            <p className="w-18">Business Name</p>
            {editing["businessName"] ? (
              <div className="flex items-center gap-4">
                <input
                  className="px-1 w-40 border bg-white text-black "
                  value={userInputs["businessName"]}
                  onChange={(e) => handleEditOnChange("businessName", e)}
                  placeholder="Business name"
                />
                <AiOutlineCheck
                  className="cursor-pointer"
                  onClick={() =>
                    handleSaveChanges(
                      "businessName",
                      userInputs["businessName"]
                    )
                  }
                />

                <AiOutlineClose
                  className="cursor-pointer"
                  onClick={() => handleCancelEdit("businessName")}
                />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p>{userInputs["businessName"]}</p>
                <AiFillEdit
                  size={25}
                  className="cursor-pointer"
                  onClick={() => handleStartEdit("businessName")}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full border dark:border-white/40 rounded-md p-5 gap-6">
          <p className="text-2xl">Contact Info</p>
          <div className="flex items-center justify-between h-[20px]">
            <p className="w-18">Email</p>
            <p>{businessEmail}</p>
          </div>
          <div className="flex items-center justify-between h-[20px]">
            <p className="w-18">Phone</p>
            {editing["businessPhone"] ? (
              <div className="flex items-center gap-4">
                <input
                  className="px-1 w-40 border bg-white text-black "
                  value={userInputs["businessPhone"]}
                  onChange={(e) => handleEditOnChange("businessPhone", e)}
                  placeholder="Business phone"
                />
                <AiOutlineCheck
                  className="cursor-pointer"
                  onClick={() =>
                    handleSaveChanges(
                      "businessPhone",
                      userInputs["businessPhone"]
                    )
                  }
                />
                <AiOutlineClose
                  className="cursor-pointer"
                  onClick={() => handleCancelEdit("businessPhone")}
                />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p>{userInputs["businessPhone"]}</p>
                <AiFillEdit
                  size={25}
                  className="cursor-pointer"
                  onClick={() => handleStartEdit("businessPhone")}
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
                  value={userInputs.address["street"]}
                  onChange={(e) => handleEditOnChange("street", e)}
                  placeholder="Street"
                />
                <AiOutlineCheck
                  className="cursor-pointer"
                  onClick={() =>
                    handleSaveChanges("street", userInputs.address["street"])
                  }
                />
                <AiOutlineClose
                  className="cursor-pointer"
                  onClick={() => handleCancelEdit("street")}
                />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p>{userInputs.address["street"]}</p>
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
                  value={userInputs.address["city"]}
                  onChange={(e) => handleEditOnChange("city", e)}
                  placeholder="City"
                />
                <AiOutlineCheck
                  className="cursor-pointer"
                  onClick={() =>
                    handleSaveChanges("city", userInputs.address["city"])
                  }
                />
                <AiOutlineClose
                  className="cursor-pointer"
                  onClick={() => handleCancelEdit("city")}
                />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p>{userInputs.address["city"]}</p>
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
                  value={userInputs.address["zipcode"]}
                  onChange={(e) => handleEditOnChange("zipcode", e)}
                  placeholder="Zipcode"
                />
                <AiOutlineCheck
                  className="cursor-pointer"
                  onClick={() =>
                    handleSaveChanges("zipcode", userInputs.address["zipcode"])
                  }
                />
                <AiOutlineClose
                  className="cursor-pointer"
                  onClick={() => handleCancelEdit("zipcode")}
                />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p>{userInputs.address["zipcode"]}</p>
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
                  value={userInputs.address["state"]}
                  onChange={(e) => handleEditOnChange("state", e)}
                  placeholder="State"
                />
                <AiOutlineCheck
                  className="cursor-pointer"
                  onClick={() =>
                    handleSaveChanges("state", userInputs.address["state"])
                  }
                />
                <AiOutlineClose
                  className="cursor-pointer"
                  onClick={() => handleCancelEdit("state")}
                />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p>{userInputs.address["state"]}</p>
                <AiFillEdit
                  size={25}
                  className="cursor-pointer"
                  onClick={() => handleStartEdit("state")}
                />
              </div>
            )}
          </div>
        </div>
        {password !== null && (
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
                      onChange={(e) => {
                        handlePasswordChange("oldPassword", e);
                        setPasswordError(false);
                      }}
                      placeholder="Old password"
                    />
                    <input
                      className="px-1 w-40 border bg-white text-black "
                      type="password"
                      value={userPasswords.newPassword}
                      onChange={(e) => handlePasswordChange("newPassword", e)}
                      placeholder="New password"
                    />
                  </div>
                  <AiOutlineCheck
                    className="cursor-pointer"
                    onClick={() => {
                      if (initialUser.password === userPasswords.oldPassword) {
                        handleSaveChanges(
                          "password",
                          userPasswords.newPassword
                        );
                        setUserPasswords({ oldPassword: "", newPassword: "" });
                      } else {
                        setPasswordError(true);
                      }
                    }}
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
        <div className="flex flex-col w-full border border-red-500 rounded-md p-5 gap-6">
          <div className="flex items-center justify-between h-[100px]">
            <p className="w-18">Delete This Account</p>
            {deleting ? (
              <div className="flex flex-col gap-2">
                <p className="text-sm">
                  Confirm `<strong>{userInputs.businessEmail}</strong>` to
                  delete
                </p>
                <input
                  className="px-1 border bg-white text-black"
                  value={confirmationEmail}
                  onChange={(e) => setConfirmationEmail(e.target.value)}
                ></input>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={handleDeleteUser}
                    className="dark:border-white/20 hover:bg-red-500 hover:text-white border rounded-md px-1"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setDeleting(false)}
                    className="dark:border-white/20  border rounded-md px-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setDeleting(true)}
                className="dark:border-white/20 hover:bg-red-500 hover:text-white border px-4 py-2 rounded-md text-red-500"
              >
                Delete This Account
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
