"use client";
import useUserStore from "@/utils/store/user/userStore";
import useEmployeesStore from "@/utils/store/admin/control/employees/employeesStore";
import { AiOutlineClose } from "react-icons/ai";

const AddEmployee = () => {
  const { user } = useUserStore();
  const {
    errors,
    successMessage,
    errorMessage,
    setAddEmployee,
    setNewEmployeeInputs,
    handleSaveNewEmployee,
  } = useEmployeesStore();

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
                  Add An Employee To Create An Account
                </p>
              </div>
              <div className="flex flex-col items-center w-full gap-4">
                <div className="flex items-center gap-2 w-full">
                  <p className="w-1/6 min-w-[80px]">First Name</p>
                  <input
                    type="text"
                    className="flex-1 border p-1"
                    onChange={(e) =>
                      setNewEmployeeInputs("firstName", e.target.value)
                    }
                  />
                </div>
                <div className="flex items-center gap-2 w-full">
                  <p className="w-1/6 min-w-[80px]">Last Name</p>
                  <input
                    type="text"
                    className="flex-1 border p-1"
                    onChange={(e) =>
                      setNewEmployeeInputs("lastName", e.target.value)
                    }
                  />
                </div>
                <div className="flex items-center gap-2 w-full">
                  <p className="w-1/6 min-w-[80px]">Email</p>
                  <input
                    type="email"
                    className="flex-1  border p-1"
                    onChange={(e) =>
                      setNewEmployeeInputs("email", e.target.value)
                    }
                  />
                </div>
                <div className="flex items-center gap-2 w-full">
                  <p className="w-1/6 min-w-[80px]">Phone</p>
                  <input
                    type="text"
                    className="flex-1 border p-1"
                    onChange={(e) =>
                      setNewEmployeeInputs("phone", e.target.value)
                    }
                  />
                </div>
                <div className="flex items-center gap-2 w-full">
                  <p className="w-1/6 min-w-[80px]">Password</p>
                  <input
                    type="password"
                    className="flex-1 border p-1"
                    onChange={(e) =>
                      setNewEmployeeInputs("password", e.target.value)
                    }
                  />
                </div>
              </div>
              {errors.uniqueEmail && (
                <p className="font-semibold text-red-500">
                  Account already exists with that email
                </p>
              )}
              {errors.emptyFields && (
                <p className="font-semibold text-red-500">
                  Fields cannot be empty
                </p>
              )}
            </div>
          </div>
          <div className="flex items-end gap-4 justify-end h-full w-full ">
            {successMessage && (
              <p className="font-semibold text-emerald-500">
                Successfully Added Employee!
              </p>
            )}
            {errorMessage && (
              <p className="font-bold text-red-500">Error Saving Employee!</p>
            )}
            <button
              onClick={() => handleSaveNewEmployee(user?.mspCustomDomain)}
              className="border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]   bg-[#465E89] text-white rounded-lg py-2 px-20 font-bold"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
