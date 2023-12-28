"use client";

import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import useTechStore from "@/utils/store/user/techStore";
import { useEffect } from "react";

const Technician = () => {
  const { tech } = useTechStore();
  const {
    showTechnicians,
    isMobile,
    errorMessage,
    technicianInputs,
    technicians,
    setTechnicianInputs,
    setIsMobile,
    setShowTechnicians,

    handleAddManageTechnician,
    initializeManageTechnicians,
  } = useManageStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1023);
      };
      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    initializeManageTechnicians();
  }, [tech]);

  return (
    <div className="flex flex-col  justify-between h-full overflow-hidden">
      <div className="flex flex-col overflow-hidden">
        <div className="flex flex-col gap-4  overflow-hidden lg:flex-row">
          {technicians?.length !== 0 ? (
            <div className="flex flex-col w-full text-xl font-bold overflow-hidden">
              {isMobile && (
                <button
                  onClick={() => setShowTechnicians(!showTechnicians)}
                  className="p-4  text-left"
                >
                  {showTechnicians
                    ? "- Hide Technicians"
                    : "+ View Technicians"}
                </button>
              )}
              {(!isMobile || (isMobile && showTechnicians)) && (
                <p className="px-4">Your Current Technicians</p>
              )}
              {(!isMobile || (isMobile && showTechnicians)) && (
                <div className="flex flex-col gap-2  items-start text-sm overflow-auto scrollbar-thin p-4">
                  {technicians?.map((technician) => {
                    const {
                      id,
                      firstName,
                      lastName,
                      identifier,
                      officeEmail,
                      primaryEmail,
                    } = technician;
                    return (
                      <div
                        key={id}
                        className="flex flex-col w-full gap-1 border rounded-xl p-2 shadow-lg "
                      >
                        <div className="text-lg flex items-center gap-1">
                          <p>{firstName}</p>
                          <p>{lastName}</p>
                        </div>
                        <p>{identifier}</p>
                        <p>Primary Email: {primaryEmail}</p>
                        <p>Office Email: {officeEmail}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <p className="text-xl font-bold text-black/20 pb-8 pt-4">
              Currently have no technicians listed.
            </p>
          )}

          <div className="flex flex-col w-full overflow-hidden">
            <p className="text-xl font-bold px-4">
              Fill out form to save technician.
            </p>
            <div className="flex flex-col p-4 overflow-auto scrollbar-thin">
              <div className="flex flex-col">
                <div className="flex flex-col items-start w-full ">
                  <p className=" font-bold">Identifier</p>
                  <input
                    value={technicianInputs?.identifier}
                    onChange={(e) =>
                      setTechnicianInputs("identifier", e.target.value)
                    }
                    className="w-full p-1 border"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 lg:flex-row">
                <div className="flex flex-col items-start w-full ">
                  <p className=" font-bold">First Name</p>
                  <input
                    value={technicianInputs?.firstName}
                    onChange={(e) =>
                      setTechnicianInputs("firstName", e.target.value)
                    }
                    className="w-full p-1 border"
                  />
                </div>
                <div className="flex flex-col items-start w-full ">
                  <p className="font-bold">Last Name</p>
                  <input
                    value={technicianInputs?.lastName}
                    onChange={(e) =>
                      setTechnicianInputs("lastName", e.target.value)
                    }
                    className="w-full p-1 border"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-4  lg:flex-row">
                <div className="flex flex-col items-start w-full  ">
                  <p className=" font-bold">Primary Email Address</p>
                  <input
                    value={technicianInputs?.primaryEmail}
                    onChange={(e) =>
                      setTechnicianInputs("primaryEmail", e.target.value)
                    }
                    className="w-full p-1 border"
                  />
                </div>
                <div className="flex flex-col items-start w-full ">
                  <p className=" font-bold">Office Email Address</p>
                  <input
                    value={technicianInputs?.officeEmail}
                    onChange={(e) =>
                      setTechnicianInputs("officeEmail", e.target.value)
                    }
                    className="w-full p-1 border"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-4  lg:flex-row">
                <div className="flex flex-col items-start w-full  ">
                  <p className=" font-bold">Mobile Phone Number</p>
                  <input
                    value={technicianInputs?.mobileNumber}
                    onChange={(e) =>
                      setTechnicianInputs("mobileNumber", e.target.value)
                    }
                    className="w-full p-1 border"
                  />
                </div>
                <div className="flex flex-col items-start w-full ">
                  <p className=" font-bold">Office Phone Number</p>
                  <input
                    value={technicianInputs?.officeNumber}
                    onChange={(e) =>
                      setTechnicianInputs("officeNumber", e.target.value)
                    }
                    className="w-full p-1 border"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end">
              {errorMessage && (
                <p className="text-red-500">Error Saving Technician</p>
              )}
              <button
                onClick={() => handleAddManageTechnician(tech?.mspCustomDomain)}
                className="hover:bg-blue-500  bg-blue-800 text-white px-6 py-2 rounded-lg font-bold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between font-bold py-4">
        <button className="hover:bg-blue-500  bg-blue-800 text-white px-6 py-2 rounded-lg">
          Previous
        </button>
        <button className="hover:bg-blue-500  bg-blue-800 text-white px-6 py-2 rounded-lg">
          Next
        </button>
      </div>
    </div>
  );
};

export default Technician;
