"use client";

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
  } = initialUser;

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
            <p>Photo</p>
            <RxAvatar size={50} />
          </div>
          <div className="flex items-center justify-between ">
            <p>Name</p>
            <p>{firstName + " " + lastName}</p>
          </div>
          <div className="flex items-center justify-between ">
            <p>Business Name</p>
            <p>{businessName}</p>
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
            <p>{businessPhone}</p>
          </div>
        </div>
        <div className="flex flex-col w-full border dark:border-white/40 rounded-md p-5 gap-6">
          <p className="text-lg">Address</p>

          <div className="flex items-center justify-between ">
            <p>Street</p>
            <p>{street} Street</p>
          </div>
          <div className="flex items-center justify-between ">
            <p>City</p>
            <p>{city}</p>
          </div>
          <div className="flex items-center justify-between ">
            <p>Zipcode</p>
            <p>{zipcode}</p>
          </div>
          <div className="flex items-center justify-between ">
            <p>State</p>
            <p>{state}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
