"use client";

import { IoMdFingerPrint } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";

const Account = () => {
  return (
    <div className="max-h-[80vh] flex flex-col w-full h-full items-center sm:max-h-full">
      <div className="flex flex-col h-full items-center gap-2 max-w-[800px]  overflow-y-auto px-4 no-scrollbar ">
        <div className="flex flex-col items-center pt-2">
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
            <p>Tim Mukhamedov</p>
          </div>
          <div className="flex items-center justify-between ">
            <p>Birthday</p>
            <p>October 21, 1993</p>
          </div>
        </div>
        <div className="flex flex-col w-full border dark:border-white/40 rounded-md p-5 gap-6">
          <p className="text-lg">Contact Info</p>
          <div className="flex items-center justify-between ">
            <p>Email</p>
            <p>tim@etech7.com</p>
          </div>
          <div className="flex items-center justify-between ">
            <p>Phone</p>
            <p>1-347-679-9994</p>
          </div>
        </div>
        <div className="flex flex-col w-full border dark:border-white/40 rounded-md p-5 gap-6">
          <p className="text-lg">Addresses</p>
          <div className="flex items-center justify-between ">
            <p>Home</p>
            <p>9830 67th Avenue, Rego Park</p>
          </div>
          <div className="flex items-center justify-between ">
            <p>Work</p>
            <p>30W 47th Street #300</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
