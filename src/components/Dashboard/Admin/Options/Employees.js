"use client";

import useUiStore from "@/utils/store/ui/uiStore";
import { useEffect, useState } from "react";

const Employees = ({}) => {
  const { openAdmin, handleHistoryMenu } = useUiStore();

  const [search, setSearch] = useState("");
  const [filteredPeople, setFilteredPeople] = useState([]);

  const people = Array.from({ length: 50 }, (_, idx) => ({
    id: idx,
    name: `Person ${idx + 1}`,
    role: idx % 2 === 0 ? "Admin" : "User",
    displayName: `person${idx + 1}_123`,
  }));

  useEffect(() => {
    const results = people.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPeople(results);
  }, [search]);

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1023) {
          openAdmin && handleHistoryMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full ${
        openAdmin && "lg:opacity-100 opacity-5 xl:ml-[350px]"
      }  dark:bg-black transition-all duration-300 ease bg-white`}
    >
      <div className="w-full h-full flex flex-col">
        <div className="dark:border-b-white/20 border-b p-4">
          <h1 className="text-2xl">Employees</h1>
        </div>
        <div className="dark:shadow-white/40 dark:border-white/20 overflow-hidden flex flex-col lg:dark:shadow-white/40 lg:border lg:shadow lg:my-12 lg:mx-4">
          <div className="flex flex-col gap-2 p-4">
            <p className="dark:text-white/70 text-sm text-black/50">
              Users, passwords, and roles stored within this application
            </p>
            <div className="flex items-center gap-2">
              <button className="dark:border-white/20 hover:bg-blue-500 border bg-blue-800 text-white py-1 px-3">
                Create User
              </button>
              <input
                type="text"
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="dark:border-white/20 p-1 border mr-2"
              />
            </div>
          </div>

          <div className="px-4 pb-4 block text-sm overflow-auto scrollbar-thin max-h-full max-w-full">
            <table className="dark:text-white/70 text-black/50 min-w-full table-fixed border-separate border-spacing-0 text-left">
              <thead className="dark:bg-gray-700 sticky top-0 bg-[#F5F8FA]">
                <tr className="">
                  <th className="p-2 w-[44px] h-[44px] border"></th>
                  <th className="p-2 truncate border-t border-b border-r">
                    Name
                  </th>
                  <th className="p-2 truncate border-t border-b border-r">
                    Role(s)
                  </th>
                  <th className="p-2 truncate border-t border-b border-r">
                    Display Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPeople.map((person, index) => {
                  return (
                    <tr key={index} className="">
                      <td className="p-2 border-r border-l border-b">
                        <div className="flex items-center justify-center gap-2">
                          <button className="hover:underline text-blue-500">
                            Edit
                          </button>
                          <button className="hover:underline text-blue-500">
                            Delete
                          </button>
                        </div>
                      </td>
                      <td className="p-2 truncate border-r border-b">
                        {person.name}
                      </td>
                      <td className="p-2 truncate border-r border-b">
                        {person.role}
                      </td>
                      <td className="p-2 truncate border-r border-b">
                        {person.displayName}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
