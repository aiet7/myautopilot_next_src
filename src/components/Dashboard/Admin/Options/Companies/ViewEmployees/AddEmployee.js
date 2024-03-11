"use client";

import useUserStore from "@/utils/store/user/userStore";
import useCompaniesStore from "@/utils/store/admin/control/companies/companiesStore";
import { AiOutlineClose } from "react-icons/ai";

const AddEmployee = () => {
  const { setAddEmployee } = useCompaniesStore();

  return (
    <div className="dark:bg-black/80 absolute bg-black/60 z-[99] top-0 bottom-0 right-0 left-0 p-2 lg:p-10">
      <div className="flex flex-col items-end bg-white max-w-[700px] h-full p-4 rounded-lg text-black mx-auto">
        <AiOutlineClose
          className="cursor-pointer"
          size={20}
          onClick={() => {
            setAddEmployee(false);
          }}
        />
        <div className="flex flex-col gap-4 overflow-hidden w-full h-full">
          <div className="flex flex-col items-center justify-center font-semibold">
            <div className="flex flex-col items-center gap-8 w-full">
              <div className="flex flex-col items-center gap-1">
                <h2 className="text-4xl font-bold">Add Employee</h2>
                <p className="font-semibold text-black/30 italic">
                  Add An Employee Directly To ConnectWise Manage
                </p>
              </div>
              <div className="flex items-center w-full gap-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
