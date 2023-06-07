"use client";

import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoMdFingerPrint } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";

const Account = ({ initialUser }) => {
  const {
    businessEmail,
    businessName,
    businessPhone,
    firstName,
    lastName,
    address: { street, city, zipcode, state },
    password,
  } = initialUser;

  const [editing, setEditing] = useState({});

  const [userInputs, setUserInputs] = useState({
    firstName: firstName,
    lastName: lastName,
    businessEmail: businessEmail,
    businessName: businessName,
    businessPhone: businessPhone,
    street: street,
    city: city,
    zipcode: zipcode,
    state: state,
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
    setEditing({ ...editing, [field]: false });
  };

  const handleEditOnChange = (field, e) => {
    setUserInputs({ ...userInputs, [field]: e.target.value });
  };

  const handlePasswordChange = (field, e) => {
    setUserPasswords({ ...userPasswords, [field]: e.target.value });
  };

  const handleSaveChanges = async (field, input) => {
    setUserInputs({ ...userInputs, [field]: input });
    setEditing({ ...editing, [field]: false });

    const updatedUser = { ...initialUser, [field]: input };

    try {
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/
        editBusinessUserProfile`,
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

  return (
    <div className="overflow-y-auto px-4 py-2 w-full flex items-center justify-center">
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
          <p className="text-lg">Basic Info</p>
          <div className="flex items-center justify-between ">
            <p>First Name</p>
            {editing["firstName"] ? (
              <div className="flex items-center gap-4">
                <input
                  className="px-1"
                  value={userInputs["firstName"]}
                  onChange={(e) => handleEditOnChange("firstName", e)}
                  placeholder="First name"
                />
                <button
                  onClick={() =>
                    handleSaveChanges("firstName", userInputs["firstName"])
                  }
                >
                  Save
                </button>
                <button onClick={() => handleCancelEdit("firstName")}>
                  Cancel
                </button>
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
          <div className="flex items-center justify-between ">
            <p>Last Name</p>
            {editing["lastName"] ? (
              <div className="flex items-center gap-4">
                <input
                  className="px-1"
                  value={userInputs["lastName"]}
                  onChange={(e) => handleEditOnChange("lastName", e)}
                  placeholder="Last name"
                />
                <button
                  onClick={() =>
                    handleSaveChanges("lastName", userInputs["lastName"])
                  }
                >
                  Save
                </button>
                <button onClick={() => handleCancelEdit("lastName")}>
                  Cancel
                </button>
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
          <div className="flex items-center justify-between ">
            <p>Business Name</p>
            {editing["businessName"] ? (
              <div className="flex items-center gap-4">
                <input
                  className="px-1"
                  value={userInputs["businessName"]}
                  onChange={(e) => handleEditOnChange("businessName", e)}
                  placeholder="Business name"
                />
                <button
                  onClick={() =>
                    handleSaveChanges(
                      "businessName",
                      userInputs["businessName"]
                    )
                  }
                >
                  Save
                </button>
                <button onClick={() => handleCancelEdit("businessName")}>
                  Cancel
                </button>
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
          <p className="text-lg">Contact Info</p>
          <div className="flex items-center justify-between ">
            <p>Email</p>
            <p>{businessEmail}</p>
          </div>
          <div className="flex items-center justify-between ">
            <p>Phone</p>
            {editing["businessPhone"] ? (
              <div className="flex items-center gap-4">
                <input
                  className="px-1"
                  value={userInputs["businessPhone"]}
                  onChange={(e) => handleEditOnChange("businessPhone", e)}
                  placeholder="Business phone"
                />
                <button
                  onClick={() =>
                    handleSaveChanges(
                      "businessPhone",
                      userInputs["businessPhone"]
                    )
                  }
                >
                  Save
                </button>
                <button onClick={() => handleCancelEdit("businessPhone")}>
                  Cancel
                </button>
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
          <p className="text-lg">Address</p>

          <div className="flex items-center justify-between ">
            <p>Street</p>
            {editing["street"] ? (
              <div className="flex items-center gap-4">
                <input
                  className="px-1"
                  value={userInputs["street"]}
                  onChange={(e) => handleEditOnChange("street", e)}
                  placeholder="Street"
                />
                <button
                  onClick={() =>
                    handleSaveChanges("street", userInputs["street"])
                  }
                >
                  Save
                </button>
                <button onClick={() => handleCancelEdit("street")}>
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p>{userInputs["street"]}</p>
                <AiFillEdit
                  size={25}
                  className="cursor-pointer"
                  onClick={() => handleStartEdit("street")}
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between ">
            <p>City</p>
            {editing["city"] ? (
              <div className="flex items-center gap-4">
                <input
                  className="px-1"
                  value={userInputs["city"]}
                  onChange={(e) => handleEditOnChange("city", e)}
                  placeholder="City"
                />
                <button
                  onClick={() => handleSaveChanges("city", userInputs["city"])}
                >
                  Save
                </button>
                <button onClick={() => handleCancelEdit("city")}>Cancel</button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p>{userInputs["city"]}</p>
                <AiFillEdit
                  size={25}
                  className="cursor-pointer"
                  onClick={() => handleStartEdit("city")}
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between ">
            <p>Zipcode</p>
            {editing["zipcode"] ? (
              <div className="flex items-center gap-4">
                <input
                  className="px-1"
                  value={userInputs["zipcode"]}
                  onChange={(e) => handleEditOnChange("zipcode", e)}
                  placeholder="Zipcode"
                />
                <button
                  onClick={() =>
                    handleSaveChanges("zipcode", userInputs["zipcode"])
                  }
                >
                  Save
                </button>
                <button onClick={() => handleCancelEdit("zipcode")}>
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p>{userInputs["zipcode"]}</p>
                <AiFillEdit
                  size={25}
                  className="cursor-pointer"
                  onClick={() => handleStartEdit("zipcode")}
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between ">
            <p>State</p>
            {editing["state"] ? (
              <div className="flex items-center gap-4">
                <input
                  className="px-1"
                  value={userInputs["state"]}
                  onChange={(e) => handleEditOnChange("state", e)}
                  placeholder="State"
                />
                <button
                  onClick={() =>
                    handleSaveChanges("state", userInputs["state"])
                  }
                >
                  Save
                </button>
                <button onClick={() => handleCancelEdit("state")}>
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p>{userInputs["state"]}</p>
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
            <div className="flex items-center justify-between ">
              <p>Password</p>
              {editing["password"] ? (
                <div className="flex items-center gap-4">
                  {passwordError && (
                    <p className="text-red-500 text-sm">Incorrect password</p>
                  )}
                  <div className="flex flex-col gap-1">
                    <input
                      className="px-1"
                      type="password"
                      value={userPasswords.oldPassword}
                      onChange={(e) => {
                        handlePasswordChange("oldPassword", e);
                        setPasswordError(false);
                      }}
                      placeholder="Old password"
                    />
                    <input
                      className="px-1"
                      type="password"
                      value={userPasswords.newPassword}
                      onChange={(e) => handlePasswordChange("newPassword", e)}
                      placeholder="New password"
                    />
                  </div>
                  <button
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
                  >
                    Save
                  </button>
                  <button onClick={() => handleCancelEdit("password")}>
                    Cancel
                  </button>
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
